const GameOver = ({ winner, isDraw, onReset }) => {
  return (
    <div id="game-over">
      <p>Game over</p>
      {winner && <p>{winner} You Win </p>}
      {isDraw && <p>NO Winner! it is Draw </p>}
      <p>
        <button onClick={onReset}>Rematch</button>
      </p>
    </div>
  );
};

export default GameOver;
