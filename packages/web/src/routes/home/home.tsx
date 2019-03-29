import React, { useState } from "react";
import { useHome, DepositQuality, DepositType } from "../../__generated__";

import { Map, TileLayer, LayerGroup, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { MapView } from "../../components/MapView/MapView";
import { InteractiveMap } from "../../modules/InteractiveMap/InteractiveMap";

export const HomeRoute = () => {
  return <InteractiveMap />;

  const [hoverPos, setHoverPos] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0
  });
  const [adding, setAdding] = useState(false);
  const [type, setType] = useState<DepositType | "">("");
  const [quality, setQuality] = useState<DepositQuality | "">("");
  const [savedPos, setSavedPos] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const { data, error } = useHome({ suspend: true });

  const bounds = L.latLngBounds(L.latLng(0, 0), L.latLng(4000, 4000));
  const mapMinZoom = 2;
  const mapMaxZoom = 6;
  const mapMaxResolution = 0.25;
  const mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
  const crs = L.CRS.Simple;

  // @ts-ignore
  crs.transformation = new L.Transformation(1, 0, 1, 0);
  crs.scale = function(zoom) {
    return Math.pow(2, zoom) / mapMinResolution;
  };
  crs.zoom = function(scale) {
    return Math.log(scale * mapMinResolution) / Math.LN2;
  };

  return <MapView mapId="1" />;
};
