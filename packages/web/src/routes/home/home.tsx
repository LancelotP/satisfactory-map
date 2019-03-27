import React, { useState } from "react";
import {
  useHome,
  HomeDepositInlineFragment,
  DepositQuality,
  DepositType,
  useDepositeCreate,
  HomeDocument
} from "../../__generated__";

import { Map, TileLayer, LayerGroup, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { MapView } from "../../components/MapView/MapView";

export const HomeRoute = () => {
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

  const mutate = useDepositeCreate({
    refetchQueries: [{ query: HomeDocument }]
  });

  async function handleSubmit() {
    await mutate({
      variables: {
        input: {
          quality: quality || DepositQuality.Impure,
          type: type as DepositType,
          lat: Math.trunc(savedPos!.lat),
          lng: Math.trunc(savedPos!.lng)
        }
      }
    });
    setSavedPos(undefined);
    setAdding(false);
  }

  const deposits: HomeDepositInlineFragment[] = [];

  if (data && data.defaultMap) {
    data.defaultMap.markers.edges.forEach(edge => {
      if (edge.node.__typename === "Deposit") {
        deposits.push(edge.node);
      }
    });
  }

  return <MapView mapId="1" />;

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Map
        style={{
          height: "100vh",
          width: "100vw"
        }}
        crs={crs}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        center={[0, 0]}
        maxBounds={L.latLngBounds(L.latLng(0, 0), L.latLng(4000, 4000))}
        onMouseMove={(e: any) => setHoverPos(e.latlng)}
        onClick={(e: any) => {
          setSavedPos(e.latlng);
          setAdding(true);
        }}
      >
        <TileLayer
          url="/tiles/{z}/{x}/{y}.png"
          minZoom={2}
          maxZoom={6}
          bounds={[[0, 0], [4000, 4000]]}
        />
        <LayerGroup name="deposit">
          <LayerGroup name="iron">
            <LayerGroup name="impure">
              {deposits.map(deposit => {
                const type = deposit.type.toLowerCase();
                const quality = (deposit.quality || "default").toLowerCase();
                const pos = {
                  lat: deposit.lat,
                  lng: deposit.lng
                };

                // const icon = new L.Icon({
                //   iconUrl: require(`./icons/${type}_${quality}.svg`),
                //   iconRetinaUrl: require(`./icons/${type}_${quality}.svg`),
                //   iconSize: [40, 40]
                // });

                return (
                  <Marker key={deposit.id} position={pos}>
                    <Popup>
                      {quality} {type} node
                    </Popup>
                  </Marker>
                );
              })}
            </LayerGroup>
          </LayerGroup>
        </LayerGroup>
      </Map>
      <div
        style={{
          position: "absolute",
          background: "white",
          padding: 16,
          zIndex: 100000,
          bottom: 0
        }}
      >
        {hoverPos.lat.toFixed()}, {hoverPos.lng.toFixed()}
      </div>
      {adding && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 100001,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.25)"
          }}
        >
          <div style={{ borderRadius: 4, background: "white", padding: 24 }}>
            <select
              onChange={e => setType(e.target.value as DepositType)}
              value={type}
            >
              <option value={DepositType.Beauxite}>Beauxite</option>
              <option value={DepositType.Caterium}>Caterium</option>
              <option value={DepositType.Coal}>Coal</option>
              <option value={DepositType.Copper}>Copper</option>
              <option value={DepositType.Iron}>Iron</option>
              <option value={DepositType.Limestone}>Limestone</option>
              <option value={DepositType.Oil}>Oil</option>
              <option value={DepositType.Quartz}>Quartz</option>
              <option value={DepositType.Sam}>Sam</option>
              <option value={DepositType.Sulphur}>Sulphur</option>
              <option value={DepositType.Uranium}>Uranium</option>
            </select>
            <select
              onChange={e => setQuality(e.target.value as DepositQuality)}
              value={quality}
            >
              <option value={DepositQuality.Impure}>Impure</option>
              <option value={DepositQuality.Normal}>Normal</option>
              <option value={DepositQuality.Pure}>Pure</option>
            </select>
            <button onClick={handleSubmit}>Ajouter</button>
          </div>
        </div>
      )}
    </div>
  );
};
