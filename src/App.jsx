import "./App.css";
// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from "@apollo/client";

// Define the query we want to execute
const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      {data.launches.map((launch, index) => (
        <div key={index}>
          <h3>{launch.rocket.rocket_name}</h3>
          <p>{launch.details ? launch.details : "No details"}</p>
          <p>{launch.launch_date_utc}</p>
          <p>{launch.launch_success ? "Success" : "Failed"}</p>
          <a href={launch.links.video_link} target="_blank" rel="noreferrer">
            {launch.links.video_link}
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
