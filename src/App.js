import "./App.css";
import useCharacters from "./hooks/useCharacters";

function App() {
  const characters = useCharacters();

  return (
    <div className="App">
      <header className="App-header">
        {characters.loading && <p>Loading...</p>}
        {characters.error && <p>{characters.error}</p>}
        {characters.unpopular && <p>{characters.unpopular.name}</p>}
      </header>
    </div>
  );
}

export default App;
