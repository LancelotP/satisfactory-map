import { ReactNode, Component } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { MarkerFragment } from "../../../../__generated__";

type Props<T> = {
  render: (m: T) => ReactNode;
  markers: T[];
  displayed: boolean;
};

export class ClusterGroup<T extends MarkerFragment> extends Component<
  Props<T>
> {
  shouldComponentUpdate(nextProps: Props<T>) {
    return (
      nextProps.displayed !== this.props.displayed ||
      nextProps.markers.length !== this.props.markers.length
    );
  }

  render() {
    const { render, markers, displayed } = this.props;

    console.log(displayed);

    if (displayed === false) {
      return null;
    }

    console.log("render");

    return (
      <MarkerClusterGroup
        removeOutsideVisibleBounds={true}
        maxClusterRadius={0}
        chunkedLoading={true}
      >
        {markers.map(m => render(m))}
      </MarkerClusterGroup>
    );
  }
}
