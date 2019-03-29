import React from "react";

import * as L from "leaflet";
import * as S from "./InteractiveMap.style";

type Props = {
  embedded?: boolean;
};

type State = {};

export class InteractiveMap extends React.PureComponent<Props, State> {
  private containerId = "map-root";
  private bounds: L.LatLngBounds;
  private crs: L.CRS;
  private map?: L.Map;
  private backgroundLayer?: L.ImageOverlay;
  private layers?: L.FeatureGroup;

  constructor(props: Props) {
    super(props);

    this.state = {};

    this.bounds = L.latLngBounds(
      L.latLng([-3561.838893, -3561.838893]),
      L.latLng([4574.857608, 4574.857608])
    );

    // @ts-ignore
    this.crs = L.extend({}, L.CRS.Simple, {
      transformation: new L.Transformation(1, 1, 1, 0)
    });
  }

  componentDidMount() {
    this.backgroundLayer = L.imageOverlay("/tiles/0/0/0.png", this.bounds);
    this.layers = L.featureGroup();

    this.map = L.map(this.containerId, {
      crs: this.crs,
      minZoom: -3,
      maxZoom: 1.5,
      zoom: 0,
      zoomSnap: 0.1,
      maxBoundsViscosity: 0,
      layers: [this.backgroundLayer, this.layers]
    });
  }

  render() {
    return (
      <S.Root
        style={{ height: "100vh", width: "100vw" }}
        id={this.containerId}
      />
    );
  }
}
