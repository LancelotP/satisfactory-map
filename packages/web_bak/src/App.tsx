import React, { useEffect, useState } from "react";
import * as L from "leaflet";
import "leaflet-mouse-position";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { copyToClipboard } from "./utils/copyToClipboard";

export const App = () => {
  const [latLng, setLatLng] = useState<undefined | L.LatLng>(undefined);

  useEffect(printMap, []);

  function printMap() {
    var bounds = L.latLngBounds(L.latLng(0, 0), L.latLng(4000, 4000));
    var mapMinZoom = 2;
    var mapMaxZoom = 6;
    var mapMaxResolution = 0.25;
    var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
    const crs = L.CRS.Simple;

    // @ts-ignore
    crs.transformation = new L.Transformation(1, 0, 1, 0);
    crs.scale = function(zoom) {
      return Math.pow(2, zoom) / mapMinResolution;
    };
    crs.zoom = function(scale) {
      return Math.log(scale * mapMinResolution) / Math.LN2;
    };

    var map = L.map("test", {
      crs: L.CRS.Simple,
      zoom: 0,
      center: [0, 0],
      maxBounds: L.latLngBounds(L.latLng(0, 0), L.latLng(4000, 4000))
    });

    const layer = L.tileLayer("/tiles/{z}/{x}/{y}.png", {
      minZoom: 0,
      maxZoom: 6,
      bounds: [[0, 0], [4000, 4000]]
      // tms: false
    }).addTo(map);

    // const lines = new Array(15).fill("").map((_, i) => {
    //   L.polyline([[0, 250 + i * 250], [4000, 250 + i * 250]], {
    //     color: "red"
    //   }).addTo(map);
    //   L.polyline([[250 + i * 250, 0], [250 + i * 250, 4000]], {
    //     color: "red"
    //   }).addTo(map);
    // });

    // var latlngs = [[0, 250], [4000, 250]];
    // @ts-ignore
    // var polyline = L.polyline(latlngs, { color: "red" }).addTo(map);

    map.fitBounds(bounds);

    // @ts-ignore
    map.on("mousemove", ({ latlng }) => setLatLng(L.latLng(latlng)));
    // @ts-ignore
    map.on("click", ({ latlng }) =>
      copyToClipboard(`${latlng.lat}, ${latlng.lng}`)
    );

    // const ironNodeGroup = L.layerGroup();

    // ironNodeGroup.addTo(map);

    const beauxiteIcon = L.icon({
      iconUrl: "/icons/beauxite.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const cateriumIcon = L.icon({
      iconUrl: "/icons/caterium.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const coalIcon = L.icon({
      iconUrl: "/icons/coal.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const copperIcon = L.icon({
      iconUrl: "/icons/copper_default.png",
      attribution: "toto",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const crudeOilIcon = L.icon({
      iconUrl: "/icons/crude_oil.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const ironIcon = L.icon({
      iconUrl: "/icons/iron_ore.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const limestoneIcon = L.icon({
      iconUrl: "/icons/limestone.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const quartzIcon = L.icon({
      iconUrl: "/icons/quartz.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const samIcon = L.icon({
      iconUrl: "/icons/sam.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const sulfurIcon = L.icon({
      iconUrl: "/icons/sulfur.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });
    const uraniumIcon = L.icon({
      iconUrl: "/icons/uranium.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -10]
    });

    L.marker([2000, 2000], { icon: beauxiteIcon })
      .bindPopup("Beauxite node")
      .addTo(map);
    L.marker([2000, 2100], { icon: coalIcon })
      .bindPopup("Coal node")
      .addTo(map);
    L.marker([2000, 2150], { icon: copperIcon })
      .bindPopup("Copper ore node")
      .addTo(map);
    L.marker([2000, 2200], { icon: crudeOilIcon })
      .bindPopup("Crude oil node")
      .addTo(map);
    L.marker([2000, 2250], { icon: ironIcon })
      .bindPopup("Iron node")
      .addTo(map);
    L.marker([2000, 2300], { icon: limestoneIcon })
      .bindPopup("Limestone node")
      .addTo(map);
    L.marker([2000, 2350], { icon: quartzIcon })
      .bindPopup("Quartz node")
      .addTo(map);
    L.marker([2000, 2400], { icon: samIcon })
      .bindPopup("S.A.M node")
      .addTo(map);
    L.marker([2000, 2450], { icon: sulfurIcon })
      .bindPopup("Sulfur node")
      .addTo(map);
    L.marker([2000, 2500], { icon: uraniumIcon })
      .bindPopup("Uranium node")
      .addTo(map);

    const cateriumGroup = L.layerGroup();
    const cateriumPure = L.layerGroup().addTo(cateriumGroup);
    const cateriumNormal = L.layerGroup().addTo(cateriumGroup);
    const cateriumImpure = L.layerGroup().addTo(cateriumGroup);
    cateriumGroup.addTo(map);

    L.marker([2885, 1092], { icon: cateriumIcon })
      .bindPopup("Caterium node")
      .addTo(cateriumPure);
    L.marker([3157, 1288], { icon: cateriumIcon })
      .bindPopup("Caterium node (blocked)")
      .addTo(cateriumPure);

    const copperGroup = L.layerGroup();
    const copperPure = L.layerGroup().addTo(copperGroup);
    const copperNormal = L.layerGroup().addTo(copperGroup);
    const copperImpure = L.layerGroup().addTo(copperGroup);
    copperGroup.addTo(map);

    const copperNodes = [
      [3129.2, 1333.9],
      [3118.5, 1330.5],
      [3234.3, 1566.3],
      [3166.4, 1642.4]
    ];

    copperNodes.forEach(latlng => {
      // @ts-ignore
      L.marker(latlng, { icon: copperIcon })
        .bindPopup("Copper node")
        .addTo(copperPure);
    });

    const ironNodes = [
      [3080, 1288.2],
      [3090.5, 1279.5],
      [3199.3, 1513.1],
      [3263.5, 1497.4],
      [3261.8, 1526.2]
    ];

    const ironGroup = L.layerGroup();
    const ironPure = L.layerGroup().addTo(ironGroup);
    const ironNormal = L.layerGroup().addTo(ironGroup);
    const ironImpure = L.layerGroup().addTo(ironGroup);
    ironGroup.addTo(map);

    ironNodes.forEach(latlng => {
      // @ts-ignore
      L.marker(latlng, { icon: ironIcon })
        .bindPopup("Iron node")
        .addTo(ironPure);
    });

    // L.marker([2000, 2000], { icon: ironIcon })
    //   .bindPopup("Pure icon")
    //   .addTo(ironNodeGroup);
  }

  // console.log(latLng);

  return (
    <div style={{ position: "relative" }}>
      <div id="test" style={{ height: "100vh" }} />
      {latLng && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            background: "red",
            padding: 12,
            zIndex: 100000
          }}
        >
          {Math.trunc(latLng.lat * 100) / 100},{" "}
          {Math.trunc(latLng.lng * 100) / 100}
        </div>
      )}
    </div>
  );
};

// function printMap() {
//   var mapExtent = [0.0, -4000.0, 4000.0, 0.0];
//   var mapMinZoom = 2;
//   var mapMaxZoom = 6;
//   var mapMaxResolution = 0.25;
//   var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
//   var tileExtent = [0.0, -4000.0, 4000.0, 0.0];
//   var maxBounds = [[0, 0], [-4000, 4000]];
//   var crs = L.CRS.Simple;
//   // @ts-ignore
//   crs.transformation = new L.Transformation(
//     1,
//     -tileExtent[0],
//     -1,
//     tileExtent[3]
//   );
//   crs.scale = function(zoom) {
//     return Math.pow(2, zoom) / mapMinResolution;
//   };
//   crs.zoom = function(scale) {
//     return Math.log(scale * mapMinResolution) / Math.LN2;
//   };

//   // @ts-ignore
//   var map = new L.Map("test", {
//     renderer: L.canvas,
//     maxZoom: mapMaxZoom,
//     minZoom: mapMinZoom,
//     // @ts-ignore
//     // layers: overlays,
//     crs: crs,
//     maxBounds: maxBounds,
//     maxBoundsViscosity: 1,
//     attributionControl: false,
//     zoomControl: false
//   });

//   // @ts-ignore
//   const layer = L.tileLayer("/tiles/{z}/{x}/{y}.png", {
//     minZoom: mapMinZoom,
//     maxZoom: mapMaxZoom,
//     bounds: [[0, 0], [-4000, 4000]],
//     tms: false
//   }).addTo(map);

//   map.fitBounds([
//     crs.unproject(L.point(mapExtent[2], mapExtent[3])),
//     crs.unproject(L.point(mapExtent[0], mapExtent[1]))
//   ]);

//   //Coordinates Display (Bottom Left)
//   // @ts-ignore
//   L.control.mousePosition().addTo(map);

//   const ironNodeGroup = L.layerGroup();

//   ironNodeGroup.addTo(map);

//   const ironIcon = L.icon({
//     iconUrl:
//       "https://www.conanexilesmap.com/data/images/icons/icon_ironstone.png",

//     iconSize: [32, 32],
//     iconAnchor: [16, 16],
//     popupAnchor: [0, -10]
//   });

//   L.marker([-1266.25, 1465], { icon: ironIcon })
//     .bindPopup("Pure icon")
//     .addTo(ironNodeGroup);
// }
