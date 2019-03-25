import React, { useEffect, useState } from "react";
import * as L from "leaflet";
import "leaflet-mouse-position";
import "leaflet/dist/leaflet.css";

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
    crs.transformation = new L.Transformation(1, -0, 1, 0);
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

    map.fitBounds(bounds);

    // @ts-ignore
    map.on("mousemove", ({ latlng }) => setLatLng(L.latLng(latlng)));

    // const ironNodeGroup = L.layerGroup();

    // ironNodeGroup.addTo(map);

    // const ironIcon = L.icon({
    //   iconUrl:
    //     "https://www.conanexilesmap.com/data/images/icons/icon_ironstone.png",

    //   iconSize: [32, 32],
    //   iconAnchor: [16, 16],
    //   popupAnchor: [0, -10]
    // });

    // L.marker([2000, 2000], { icon: ironIcon })
    //   .bindPopup("Pure icon")
    //   .addTo(ironNodeGroup);
  }

  // console.log(latLng);

  return (
    <div style={{ position: "relative" }}>
      <div id="test" style={{ height: "100vh" }} />
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
        {JSON.stringify(latLng)}
      </div>
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
