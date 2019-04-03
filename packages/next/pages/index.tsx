import Head from "next/head";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const markersQuery = gql`
  query markersConnection {
    markersConnection {
      edges {
        node {
          id
        }
      }
    }
  }
`;

function Home() {
  return (
    <div>
      <Head>
        <title>Satisfactory Interactive Map</title>
      </Head>
      <Query query={markersQuery}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

          return <pre>{JSON.stringify(data, null, 2)}</pre>;
        }}
      </Query>
    </div>
  );
}

export default Home;
