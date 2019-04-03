import { ReactNode, Component } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { MarkerFragment } from "../../../../__generated__";

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

  render() {
    const { render, markers, displayed, clusterSize } = this.props;

    console.log("rerender");

    if (displayed === false) {
      return null;
    }

    return (
      <MarkerClusterGroup
        removeOutsideVisibleBounds={true}
        maxClusterRadius={clusterSize || 0}
        chunkedLoading={true}
      >
        {markers.map(m => render(m))}
      </MarkerClusterGroup>
    );
  }
}
