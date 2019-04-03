import React, { useState, useEffect } from "react";
import { Map, FeatureGroup, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import * as S from "./SMap.style";
import { MarkerFragment } from "../../__generated__";
import { sortMarkers } from "./utils/sortMarkers";
import { ClusterGroup } from "./components/ClusterGroup/ClusterGroup";
import Head from "next/head";
import { ResourceNodeMarker } from "./components/ResourceNodeMarker/ResourceNodeMarker";
import { DropPodMarker } from "./components/DropPodMarker/DropPodMarker";
import { GeyserMarker } from "./components/GeyserMarker/GeyserMarker";
import { SlugMarker } from "./components/SlugMarker/SlugMarker";
import { DefaultMarker } from "./components/DefaultMarker/DefaultMarker";
import { Menu } from "./components/Menu/Menu";
import { getDefaultSelection } from "./utils/getDefaultSelection";

// @ts-ignore
const crs = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(0.000315, 96, 0.000315, 96)
});

type Props = {
  markers: MarkerFragment[];
};

export const SMap = (props: Props) => {
  const [selection, setSelection] = useState(getDefaultSelection());
  const markers = sortMarkers(props.markers);

  console.log(selection);

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
      <Menu selection={selection} onSelectionChange={setSelection} />
      <Map
        style={{ height: "100vh", width: "100vw" }}
        zoomSnap={0.5}
        maxZoom={7}
        minZoom={0}
        maxBounds={[
          [221428.57142857142 * 2, 563492.0634920634 * 2],
          [-221428.57142857142 * 2, -563492.0634920634 * 2]
        ]}
        zoom={2}
        center={[0, 0]}
        crs={crs}
      >
        <TileLayer url="/static/tiles/{z}/{x}/{y}.png" noWrap={true} />
        <FeatureGroup>
          <ClusterGroup
            markers={markers.slugs.GREEN}
            displayed={selection.slugs.green}
            render={m => <SlugMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.slugs.YELLOW}
            displayed={selection.slugs.yellow}
            render={m => <SlugMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.slugs.PURPLE}
            displayed={selection.slugs.purple}
            render={m => <SlugMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.BAUXITE}
            displayed={selection.nodes.bauxite}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.CATERIUM}
            displayed={selection.nodes.caterium}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.COAL}
            displayed={selection.nodes.coal}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.COPPER}
            displayed={selection.nodes.copper}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.IRON}
            displayed={selection.nodes.iron}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.LIMESTONE}
            displayed={selection.nodes.limestone}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.OIL}
            displayed={selection.nodes.oil}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.QUARTZ}
            displayed={selection.nodes.quartz}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.SAM}
            displayed={selection.nodes.sam}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.SULFUR}
            displayed={selection.nodes.sulfur}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.nodes.URANIUM}
            displayed={selection.nodes.uranium}
            render={m => <ResourceNodeMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.geysers}
            displayed={selection.geysers}
            render={m => <GeyserMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.unknowns}
            displayed={selection.unknowns}
            render={m => <DefaultMarker key={m.id} marker={m} />}
          />
          <ClusterGroup
            markers={markers.dropPods}
            displayed={selection.dropPods}
            render={m => <DropPodMarker key={m.id} marker={m} />}
          />
        </FeatureGroup>
      </Map>
    </S.Root>
  );
};
