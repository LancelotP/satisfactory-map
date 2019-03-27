import React, { useState } from "react";

import * as L from "leaflet";
import * as S from "./MapView.style";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { T } from "../T/T";
import { Legend } from "./components/Legend/Legend";
import { Menu, MarkerSelection } from "./components/Menu/Menu";
import { useMapView } from "../../__generated__";

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

  function handleMouseMove(event: L.LeafletMouseEvent) {
    setHoverPos(event.latlng);
  }

  const { data } = useMapView();

  return (
    <S.Root>
      <Map
        crs={crs}
        zoom={2}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        center={[2000, 2000]}
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
        {data &&
          data.defaultMap &&
          data.defaultMap.markers.edges
            .filter(({ node }) => {
              if (selection[node.type.toLowerCase() as keyof MarkerSelection]) {
                return true;
              }

              return false;
            })
            .map(({ node }) => (
              <Marker
                position={L.latLng(node.lat, node.lng)}
                icon={
                  new L.DivIcon({
                    html: `<div>${node.type[0]}</div>`,
                    className: `${node.type.toLowerCase()} ${node.quality.toLowerCase()}`,
                    iconSize: [40, 40]
                  })
                }
              >
                <Popup>
                  {node.quality.toLowerCase()} {node.type.toLowerCase()}
                </Popup>
              </Marker>
            ))}
      </Map>
      <S.HoverPosWrapper>
        <T>
          {hoverPos.lat.toFixed()}, {hoverPos.lng.toFixed()}
        </T>
      </S.HoverPosWrapper>
      <Legend />
      <Menu onChange={setSelection} selection={selection} />
    </S.Root>
  );
};
