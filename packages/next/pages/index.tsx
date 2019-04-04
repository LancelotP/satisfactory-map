import dynamic from "next/dynamic";
import { AllMarkersComponent } from "../__generated__";
import { Layout } from "../components/Layout/Layout";

const NOSSRMap = dynamic(
  () => import("../components/SMap/SMap").then(c => c.SMap),
  {
    ssr: false
  }
);

function Home() {
  return (
    <Layout title="Satisfactory Interactive Map">
      <AllMarkersComponent>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          else if (error) return <div>Something went wrong</div>;
          else {
            return (
              <NOSSRMap markers={data!.markers.edges.map(edge => edge.node)} />
            );
          }
        }}
      </AllMarkersComponent>
    </Layout>
  );
}

export default Home;
