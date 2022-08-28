
export default function ChartUnit(props) {
  let Color = props.color;
  let Character = props.character;
  
  return (
    <div className="unit-container">
      <p> {Character.episode.length}</p>
      <div
        className="bar-unit"
        style={{
          height: Character.episode.length * 8 + "px",
          backgroundColor: Color,
        }}
      ></div>
      <p>{Character.name}</p>
      <p>ID:{Character.id}</p>
    </div>
  );
}
