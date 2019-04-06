import React, { createRef } from "react";
import { FeatureGroup, TileLayer, Marker } from "react-leaflet";
import { Map } from "react-leaflet";
import * as L from "leaflet";
import * as S from "./SMap.style";
import {
  MarkerFragment,
  ResourceNodeQuality,
  MarkerResourceNodeInlineFragment
} from "../../__generated__";
import { sortMarkers } from "./utils/sortMarkers";
import { ClusterGroup } from "./components/ClusterGroup/ClusterGroup";
import Head from "next/head";
import { ResourceNodeMarker } from "./components/ResourceNodeMarker/ResourceNodeMarker";
import { DropPodMarker } from "./components/DropPodMarker/DropPodMarker";
import { GeyserMarker } from "./components/GeyserMarker/GeyserMarker";
import { SlugMarker } from "./components/SlugMarker/SlugMarker";
import { DefaultMarker } from "./components/DefaultMarker/DefaultMarker";
import { Menu } from "./components/Menu/Menu";
import {
  getDefaultSelection,
  MarkerSelection
} from "./utils/getDefaultSelection";
import { getMarkerSelectionHash } from "./utils/markerSelectionToHash";
import { getPlayersFromSave, PlayerLocation } from "./utils/getPlayerFromSave";
import { Popup } from "./components/Popup/Popup";
import MapMenu from "../MapMenu/MapMenu";

// @ts-ignore
const crs = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(0.00015625, 63.5, 0.00015625, 63.5)
});

type Props = {
  markers: MarkerFragment[];
  embed: boolean;
};

type State = {
  selection: MarkerSelection;
  iconSize: number;
  clusterSize: number;
  rerender: number;
  markers: ReturnType<typeof sortMarkers>;
  locating: boolean;
  center: [number, number];
  zoom: number;
  save?: File;
  loadingPlayer: boolean;
  error: boolean;
  players: PlayerLocation[];
};

export class SMap extends React.PureComponent<Props, State> {
  map = createRef<Map>();

  constructor(props: Props) {
    super(props);

    this.state = {
      selection: getDefaultSelection(),
      iconSize: 1,
      clusterSize: 0,
      rerender: Math.random(),
      locating: false,
      center: [0, 0],
      zoom: 3,
      markers: sortMarkers(props.markers),
      loadingPlayer: false,
      error: false,
      players: []
    };

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleIconSizeChange = this.handleIconSizeChange.bind(this);
    this.shouldRenderRNNode = this.shouldRenderRNNode.bind(this);
    this.toggleLocating = this.toggleLocating.bind(this);
    this.persistState = this.persistState.bind(this);
    this.doLocate = this.doLocate.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.markers.length !== this.props.markers.length) {
      this.setState({ markers: sortMarkers(this.props.markers) });
    }

    this.persistState();
  }

  componentDidMount() {
    let dms = { lat: 0, lng: 0, zoom: 3, filter: 455 };

    if (typeof location !== "undefined" && location.hash) {
      const [lat, lng, zoom, filter] = location.hash
        .slice(1)
        .split(";")
        .map(e => parseFloat(e))
        .filter(e => e && !isNaN(e));

      if (lat) dms.lat = lat;
      if (lng) dms.lng = lng;
      if (zoom) dms.zoom = zoom;
      if (filter) dms.filter = filter;
    } else if (typeof localStorage !== "undefined") {
      try {
        const storedData = localStorage.getItem("map_hash");
        // @ts-ignore
        const { lat, lng, zoom, filter } = storedData
          ? JSON.parse(storedData)
          : {};

        if (lat) dms.lat = lat;
        if (lng) dms.lng = lng;
        if (zoom) dms.zoom = zoom;
        if (filter) dms.filter = filter;
      } catch (e) {
        console.log("No data stored");
      }
    }

    this.map.current!.leafletElement.setView([dms.lat, dms.lng], dms.zoom, {
      animate: true
    });

    this.map.current!.leafletElement.on("moveend", this.persistState);

    this.setState({ selection: getDefaultSelection(dms.filter) });
  }

  persistState() {
    const bounds = this.map.current!.leafletElement.getCenter();
    const zoom = this.map.current!.leafletElement.getZoom();
    const { selection } = this.state;
    const filter = getMarkerSelectionHash(selection);

    if (typeof localStorage !== "undefined") {
      const mapState = {
        lat: bounds.lat,
        lng: bounds.lng,
        zoom: zoom,
        filter
      };

      localStorage.setItem("map_hash", JSON.stringify(mapState));
    }

    if (typeof location !== "undefined") {
      location.hash = `${bounds.lat};${bounds.lng};${zoom};${filter}`;
    }
  }

  toggleLocating() {
    const { locating } = this.state;

    this.setState({ locating: !locating });
  }

  doLocate() {
    this.setState({ loadingPlayer: true });
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const loc = await getPlayersFromSave(reader.result!);
        if (loc.length === 0) {
          throw new Error("No players has been found");
        }
        this.setState({
          players: loc,
          loadingPlayer: false
        });

        if (loc.length === 1) {
          this.map.current!.leafletElement.setView([loc[0].y, loc[0].x], 6);
        }

        this.toggleLocating();
      } catch (e) {
        console.log(e);
        this.setState({ error: true, loadingPlayer: false });
      }
    };
    reader.onerror = console.error;
    reader.readAsArrayBuffer(this.state.save!);
  }

  handleSelectionChange(
    selection: State["selection"]
    // qualityChanged: boolean
  ) {
    // FIXME we can do better than this
    if (
      selection.quality.impure !== this.state.selection.quality.impure ||
      selection.quality.normal !== this.state.selection.quality.normal ||
      selection.quality.pure !== this.state.selection.quality.pure
    ) {
      this.setState({ selection, rerender: Math.random() });
    } else {
      this.setState({ selection });
    }
  }

  handleIconSizeChange(iconSize: number) {
    this.setState({ iconSize, rerender: Math.random() });
  }

  shouldRenderRNNode(m: { target: MarkerResourceNodeInlineFragment }) {
    const {
      selection: { quality }
    } = this.state;
    const {
      target: { rnQuality }
    } = m;

    if (rnQuality === ResourceNodeQuality.Impure && quality.impure) {
      return true;
    } else if (rnQuality === ResourceNodeQuality.Normal && quality.normal) {
      return true;
    } else if (rnQuality === ResourceNodeQuality.Pure && quality.pure) {
      return true;
    }

    return false;
  }

  render() {
    const {
      rerender,
      iconSize,
      selection,
      clusterSize,
      markers,
      locating
    } = this.state;
    const { embed } = this.props;

    return (
      <S.Root>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossOrigin=""
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
          />
        </Head>
        <MapMenu
          selection={selection}
          onSelectionChange={this.handleSelectionChange}
          embed={embed}
        />
        {/* <Menu
          iconSize={iconSize}
          onIconSizeChange={this.handleIconSizeChange}
          selection={selection}
          onSelectionChange={this.handleSelectionChange}
          onLocateMeClick={this.toggleLocating}
        /> */}
        <Map
          style={{ height: "100vh", width: "100vw" }}
          zoomSnap={0.5}
          maxZoom={7}
          minZoom={3}
          maxBounds={[[-406400, -406400], [508000, 508000]]}
          zoom={this.state.zoom}
          center={this.state.center}
          crs={crs}
          ref={this.map}
          preferCanvas={true}
        >
          <TileLayer
            url="/static/tiles_rework/{z}/{x}/{y}.png"
            noWrap={true}
            bounds={[[-406400, -406400], [508000, 508000]]}
          />
          {/* Matrix markers */}
          {/* <FeatureGroup>
            <CircleMarker center={[-406400, -406400]} radius={10} />
            <CircleMarker center={[-406400, 508000]} radius={10} />
            <CircleMarker center={[508000, -406400]} radius={10} />
            <CircleMarker center={[508000, 508000]} radius={10} />
          </FeatureGroup> */}
          <FeatureGroup>
            {[
              {
                markers: markers.slugs.GREEN,
                displayed: selection.slugs.green
              },
              {
                markers: markers.slugs.YELLOW,
                displayed: selection.slugs.yellow
              },
              {
                markers: markers.slugs.PURPLE,
                displayed: selection.slugs.purple
              }
            ].map((group, i) => (
              <ClusterGroup
                key={i}
                clusterSize={80}
                rerender={iconSize}
                markers={group.markers}
                displayed={group.displayed}
                render={m => (
                  <SlugMarker key={m.id} marker={m} iconSize={iconSize} />
                )}
              />
            ))}
            {[
              {
                markers: markers.nodes.BAUXITE,
                displayed: selection.nodes.bauxite
              },
              {
                markers: markers.nodes.CATERIUM,
                displayed: selection.nodes.caterium
              },
              {
                markers: markers.nodes.COAL,
                displayed: selection.nodes.coal
              },
              {
                markers: markers.nodes.COPPER,
                displayed: selection.nodes.copper
              },
              {
                markers: markers.nodes.IRON,
                displayed: selection.nodes.iron
              },
              {
                markers: markers.nodes.LIMESTONE,
                displayed: selection.nodes.limestone
              },
              {
                markers: markers.nodes.OIL,
                displayed: selection.nodes.oil
              },
              {
                markers: markers.nodes.QUARTZ,
                displayed: selection.nodes.quartz
              },
              {
                markers: markers.nodes.SAM,
                displayed: selection.nodes.sam
              },
              {
                markers: markers.nodes.SULFUR,
                displayed: selection.nodes.sulfur
              },
              {
                markers: markers.nodes.URANIUM,
                displayed: selection.nodes.uranium
              }
            ].map((group, i) => (
              <ClusterGroup
                key={i}
                clusterSize={0}
                rerender={rerender}
                markers={group.markers}
                displayed={group.displayed}
                render={m =>
                  this.shouldRenderRNNode(m) && (
                    <ResourceNodeMarker
                      key={m.id}
                      marker={m}
                      iconSize={iconSize}
                    />
                  )
                }
              />
            ))}
            <ClusterGroup
              clusterSize={0}
              rerender={iconSize}
              markers={markers.geysers}
              displayed={selection.geysers}
              render={m => (
                <GeyserMarker key={m.id} marker={m} iconSize={iconSize} />
              )}
            />
            <ClusterGroup
              clusterSize={0}
              rerender={iconSize}
              markers={markers.unknowns}
              displayed={selection.unknowns}
              render={m => (
                <DefaultMarker key={m.id} marker={m} iconSize={iconSize} />
              )}
            />
            <ClusterGroup
              clusterSize={0}
              rerender={iconSize}
              markers={markers.dropPods}
              displayed={selection.dropPods}
              render={m => (
                <DropPodMarker key={m.id} marker={m} iconSize={iconSize} />
              )}
            />
            <FeatureGroup>
              {this.state.players.map(player => (
                <Marker
                  key={player.id}
                  position={[player.y, player.x]}
                  icon={L.icon({
                    iconUrl:
                      "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
                    iconSize: [24, 41]
                  })}
                >
                  <Popup>
                    <p>Player #{player.id}</p>
                    <ul>
                      <li>
                        <b>X:</b> {player.x}
                      </li>
                      <li>
                        <b>Y:</b> {player.y}
                      </li>
                      <li>
                        <b>Z:</b> {player.z}
                      </li>
                    </ul>
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
          </FeatureGroup>
        </Map>
        {locating && (
          <S.Overlay onClick={this.toggleLocating}>
            <S.Modal onClick={e => e.stopPropagation()}>
              <S.ModalTop>Find player location</S.ModalTop>
              <S.ModalContent>
                Upload your save file to display markers of all the players in
                it on the map.
                <br />
                <br />
                Default path is:
                <br />
                <br />
                <code>%appdata%..\Local\FactoryGame\Saved\SaveGames\</code>
                <input
                  type="file"
                  accept=".sav"
                  disabled={this.state.loadingPlayer}
                  onChange={e => {
                    if (!e.target.files || e.target.files.length !== 1) {
                      return;
                    }

                    this.setState({ save: e.target.files[0] });
                  }}
                />
              </S.ModalContent>
              <S.ModalBottom>
                <button onClick={this.toggleLocating}>Close</button>
                <button disabled={!this.state.save} onClick={this.doLocate}>
                  Locate Me
                </button>
              </S.ModalBottom>
            </S.Modal>
          </S.Overlay>
        )}
      </S.Root>
    );
  }
}
