import dynamic from "next/dynamic";
import React from "react";
import { withRouter } from "next/router";
import { AllMarkersComponent } from "../__generated__";
import { Layout } from "../components/Layout/Layout";

const NOSSRMap = dynamic(
  () => import("../components/SMap/SMap").then(c => c.SMap),
  {
    ssr: false
  }
);

class Home extends React.PureComponent {
  render() {
    return (
      <Layout title="Satisfactory Interactive Map">
        <AllMarkersComponent>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            else if (error) return <div>Something went wrong</div>;
            else {
              return (
                <NOSSRMap
                  embed={true}
                  markers={data!.markers.edges.map(edge => edge.node)}
                />
              );
            }
          }}
        </AllMarkersComponent>
      </Layout>
    );
  }
}

export default withRouter(Home);
