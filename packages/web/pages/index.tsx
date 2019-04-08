import Layout from "../components/Layout";
import { InteractiveMap } from "../modules/InteractiveMap/InteractiveMap";
import { NextFunctionComponent } from "next";

const IndexPage: NextFunctionComponent = () => {
  return (
    <Layout title="Satisfactory Map">
      <InteractiveMap />
    </Layout>
  );
};

export default IndexPage;
