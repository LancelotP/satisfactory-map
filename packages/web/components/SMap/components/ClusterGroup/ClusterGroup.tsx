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

import ironSvg from "../../../Icons/markers/iron.svg";

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

    cluster.getAllChildMarkers().map(child => {
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

    return L.icon({
      iconUrl: ironSvg,
      iconSize: [42, 66],
      iconAnchor: [21, 64],
      popupAnchor: [0, -50]
    });
  }

  render() {
    const { render, markers, displayed } = this.props;

    console.log("rerender");

    if (displayed === false) {
      return null;
    }

    return (
      <MarkerClusterGroup
        removeOutsideVisibleBounds={true}
        animate={true}
        disableClusteringAtZoom={7}
        iconCreateFunction={this.renderIcon}
        maxClusterRadius={0}
        chunkedLoading={true}
      >
        {markers.map(m => render(m))}
      </MarkerClusterGroup>
    );
  }
}
