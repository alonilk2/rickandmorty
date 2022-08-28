import "./App.css";
import useCharacters from "./hooks/useCharacters";
import BarChart from "./components/chart.jsx";
import ChartUnit from "./components/chartunit";

function App() {
  const characters = useCharacters();

  return (
    <div className="App">
      <header className="App-header">
        {characters.loading && <p>Loading...</p>}
        {characters.error && <p>{characters.error}</p>}
        {characters.unpopular && (
          <p>
            Most unpopular character from origin Earth-C137:{" "}
            <b>{characters.unpopular.name}</b>
          </p>
        )}
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Origin Name</th>
            <th>Origin Dimension</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{characters.unpopular?.name}</td>
            <td>{characters.origin?.name}</td>
            <td>{characters.origin?.dimension}</td>
            <td>{characters.unpopular?.episode.length}</td>
          </tr>
        </tbody>
      </table>
      <BarChart>
        {characters?.charactersList?.data?.map((char) => {
          if (
            char.name === "Rick Sanchez" ||
            char.name === "Summer Smith" ||
            char.name === "Morty Smith" ||
            char.name === "Beth Smith" ||
            char.name === "Jerry Smith"
          ) {
            return <ChartUnit character={char} color={"#b00bbe"}></ChartUnit>;
          }
        })}
      </BarChart>
    </div>
  );
}

export default App;
