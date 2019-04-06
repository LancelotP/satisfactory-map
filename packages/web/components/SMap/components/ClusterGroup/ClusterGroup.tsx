import { ReactNode, Component } from "react";
import * as L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  MarkerFragment,
  SlugType,
  ResourceNodeQuality
} from "../../../../__generated__";

type Props<T> = {
  render: (m: T) => ReactNode;
  markers: T[];
  displayed: boolean;
  clusterSize?: number;
  rerender?: number;
};

export class ClusterGroup<T extends MarkerFragment> extends Component<
  Props<T>
> {
  shouldComponentUpdate(nextProps: Props<T>) {
    return (
      nextProps.displayed !== this.props.displayed ||
      nextProps.clusterSize !== this.props.clusterSize ||
      nextProps.rerender !== this.props.rerender ||
      nextProps.markers.length !== this.props.markers.length
    );
  }

  renderIcon(cluster: L.MarkerCluster) {
    const children = {
      N_IMPURE: 0,
      N_NORMAL: 0,
      N_PURE: 0,
      S_GREEN: 0,
      S_YELLOW: 0,
      S_PURPLE: 0,
      GEYSERS: 0,
      DROP_PODS: 0
    };

    const childrenMarkers = cluster.getAllChildMarkers();
    // @ts-ignore
    const markerSample = childrenMarkers[0].options.position as T;

    childrenMarkers.map(child => {
      // @ts-ignore
      const marker = child.options.position as T;

      if (marker.target.__typename === "DropPod") {
        children.DROP_PODS++;
      } else if (marker.target.__typename === "Slug") {
        if (marker.target.slugType === SlugType.Green) children.S_GREEN++;
        if (marker.target.slugType === SlugType.Yellow) children.S_YELLOW++;
        if (marker.target.slugType === SlugType.Purple) children.S_PURPLE++;
      } else if (marker.target.__typename === "ResourceNode") {
        if (marker.target.rnQuality === ResourceNodeQuality.Impure)
          children.N_IMPURE++;
        if (marker.target.rnQuality === ResourceNodeQuality.Normal)
          children.N_NORMAL++;
        if (marker.target.rnQuality === ResourceNodeQuality.Pure)
          children.N_PURE++;
      }
    });

    if (markerSample.target.__typename === "Slug") {
      return L.divIcon({
        iconSize: [60, 60],
        // html: `${childrenMarkers.length}`,
        className: `slug_${markerSample.target.slugType}`,
        iconAnchor: [20, 20],
        popupAnchor: [0, -60]
      });
    }

    return L.icon({
      iconUrl: "",
      iconSize: [42, 66],
      iconAnchor: [21, 64],
      popupAnchor: [0, -50]
    });
  }

  render() {
    const { render, markers, displayed, clusterSize } = this.props;

    console.log("rerender");

    if (displayed === false) {
      return null;
    }

    return (
      <MarkerClusterGroup
        removeOutsideVisibleBounds={true}
        animate={true}
        disableClusteringAtZoom={7}
        // iconCreateFunction={this.rendesrIcon}
        maxClusterRadius={0}
        chunkedLoading={true}
      >
        {markers.map(m => render(m))}
      </MarkerClusterGroup>
    );
  }
}
