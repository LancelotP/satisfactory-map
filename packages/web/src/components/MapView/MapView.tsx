import React, { useState, useEffect } from "react";

import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import * as L from "leaflet";
import * as S from "./MapView.style";
import { Map, TileLayer, LayerGroup } from "react-leaflet";
import { Menu } from "./components/Menu/Menu";
import {
  useMapView,
  MarkerType,
  DepositType,
  SlugType
} from "../../__generated__";
import { getDefaultMarkerSelection } from "../../utils/getDefaultMarkerSelection";
import { getDefaultMarkers } from "../../utils/getDefaultMarkers";
import { DepositMarker } from "./components/DepositMarker/DepositMarker";
import { SlugMarker } from "./components/SlugMarker/SlugMarker";
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
  const [selection, setSelection] = useState(getDefaultMarkerSelection());
  const [markers, setMarkers] = useState(getDefaultMarkers());

  const [adding, setAdding] = useState<L.LatLng | undefined>(undefined);
  const [markerType, setMarkerType] = useState<MarkerType | undefined>(
    undefined
  );

  function handleMarkerAdd(type: MarkerType) {
    return (event: L.LeafletMouseEvent) => {
      setMarkerType(type);
      setAdding(event.latlng);
    };
  }

  function handleMarkerAddClose() {
    setMarkerType(undefined);
    setAdding(undefined);
  }

  const { data } = useMapView();

  useEffect(() => {
    if (data && data.defaultMap && data.defaultMap.markers) {
      const newMarkers = getDefaultMarkers();

      data.defaultMap.markers.edges.forEach(edge => {
        if (edge.node.__typename === "Slug") {
          newMarkers.slugs[edge.node.slugType].push(edge.node);
        } else if (edge.node.__typename === "Deposit") {
          newMarkers.deposits[edge.node.type].push(edge.node);
        }
      });

      setMarkers(newMarkers);
    }
  }, [data, selection, adding]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <S.Root>
      <Menu isOpen={isMenuOpen} selection={selection} onChange={setSelection} />
      <S.Wrapper>
        <Map
          iconSize={[20, 20]}
          crs={crs}
          zoom={2}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          center={[2000, 2000]}
          contextmenu={true}
          contextmenuWidth={200}
          contextmenuItems={[
            {
              text: "Add deposit here",
              callback: handleMarkerAdd(MarkerType.Deposit)
            },
            {
              text: "Add slug here",
              callback: handleMarkerAdd(MarkerType.Slug)
            }
          ]}
          attributionControl={false}
          maxBounds={L.latLngBounds(
            L.latLng(-2000, -2000),
            L.latLng(6000, 6000)
          )}
        >
          <TileLayer
            url="/tiles/{z}/{x}/{y}.png"
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
            bounds={[[0, 0], [4000, 4000]]}
          />
          <LayerGroup>
            {Object.keys(markers.deposits).map(
              name =>
                selection.deposits[name as DepositType] && (
                  <LayerGroup key={name}>
                    {markers.deposits[name as DepositType].map(marker => (
                      <React.Fragment key={marker.id}>
                        <DepositMarker marker={marker} />
                      </React.Fragment>
                    ))}
                  </LayerGroup>
                )
            )}
          </LayerGroup>
          <LayerGroup>
            {Object.keys(markers.slugs).map(
              name =>
                selection.slugs[name as SlugType] && (
                  <LayerGroup key={name}>
                    {markers.slugs[name as SlugType].map(slug => (
                      <React.Fragment key={slug.id}>
                        <SlugMarker marker={slug} />
                      </React.Fragment>
                    ))}
                  </LayerGroup>
                )
            )}
          </LayerGroup>
        </Map>
        <S.MenuToggle
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <img src={require("./MapViewMenu.svg")} />
        </S.MenuToggle>
      </S.Wrapper>
      {adding && markerType && (
        <MarkerAdd
          onClose={handleMarkerAddClose}
          type={markerType}
          position={adding}
        />
      )}
    </S.Root>
  );
};
