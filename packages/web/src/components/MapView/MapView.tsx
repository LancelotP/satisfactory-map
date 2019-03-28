import React, { useState, useEffect } from "react";

import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import * as L from "leaflet";
import * as S from "./MapView.style";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { T } from "../T/T";
import { Legend } from "./components/Legend/Legend";
import { Menu, MarkerSelection } from "./components/Menu/Menu";
import { useMapView, MapViewMarkers, MapViewEdges } from "../../__generated__";
import { MarkerAdd } from "./components/MarkerAdd/MarkerAdd";

const MAX_ZOOM = 6;
const MIN_ZOOM = 2;

const MAX_RES = 0.25;
const MIN_RES = Math.pow(2, MAX_ZOOM * MAX_RES);
const crs = L.CRS.Simple;

// @ts-ignore
crs.transformation = new L.Transformation(1, 0, 1, 0);

crs.scale = function(zoom) {
  return Math.pow(2, zoom) / MIN_RES;
};

crs.zoom = function(scale) {
  return Math.log(scale * MIN_RES) / Math.LN2;
};

type Props = {
  mapId: string;
};

export const MapView = (props: Props) => {
  const { mapId } = props;
  const [selection, setSelection] = useState<MarkerSelection>({
    iron: true,
    copper: true,
    limestone: true,
    coal: true,
    oil: true,
    sulphur: true,
    caterium: true,
    sam: true,
    quartz: true,
    beauxite: true,
    uranium: true
  });
  const [hoverPos, setHoverPos] = useState<L.LatLng>(L.latLng(0, 0));
  const [addingPos, setAddingPos] = useState<L.LatLng | undefined>(undefined);
  const [markers, setMarkers] = useState<MapViewEdges[]>([]);

  function handleMouseMove(event: L.LeafletMouseEvent) {
    // setHoverPos(event.latlng);
  }

  function handleMarkerAdd(event: L.LeafletMouseEvent) {
    setAddingPos(event.latlng);
  }

  const { data } = useMapView();

  useEffect(() => {
    if (data && data.defaultMap && data.defaultMap.markers) {
      const edges = data.defaultMap.markers.edges.filter(({ node }) => {
        if (selection[node.type.toLowerCase() as keyof MarkerSelection]) {
          return true;
        }

        return false;
      });
      setMarkers(edges);
    }
  }, [data, selection, addingPos]);

  return (
    <S.Root>
      <Map
        crs={crs}
        zoom={2}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        center={[2000, 2000]}
        contextmenu={true}
        contextmenuWidth={200}
        contextmenuItems={[
          {
            text: "Add marker here",
            callback: handleMarkerAdd
          }
        ]}
        attributionControl={false}
        onmousemove={handleMouseMove}
        maxBounds={L.latLngBounds(L.latLng(-2000, -2000), L.latLng(6000, 6000))}
      >
        <TileLayer
          url="/tiles/{z}/{x}/{y}.png"
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          bounds={[[0, 0], [4000, 4000]]}
        />
        {markers.map(({ node }) => (
          <Marker
            position={L.latLng(node.lat, node.lng)}
            key={node.id}
            icon={
              new L.DivIcon({
                html: `<div>${node.type[0]}</div>`,
                className: `${node.type.toLowerCase()} ${node.quality.toLowerCase()}`,
                iconSize: [40, 40]
              })
            }
          >
            <Popup>
              <T align="center" transform="lowercase">
                {node.quality} {node.type}
              </T>
              {node.addedBy && (
                <T align="center">Added by {node.addedBy.userName}</T>
              )}
            </Popup>
          </Marker>
        ))}
      </Map>
      {/* <S.HoverPosWrapper>
        <T>
          {hoverPos.lat.toFixed()}, {hoverPos.lng.toFixed()}
        </T>
      </S.HoverPosWrapper> */}
      <Legend />
      <Menu onChange={setSelection} selection={selection} />
      <MarkerAdd onClose={() => setAddingPos(undefined)} position={addingPos} />
    </S.Root>
  );
};
