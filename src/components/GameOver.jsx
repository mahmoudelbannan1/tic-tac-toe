const GameOver = ({ winner, isDraw, onReset }) => {
  return (
    <div id="game-over">
      <h1>Game Over !</h1>
      {winner && <p>{winner} Won ! </p>}
      {isDraw && <p>It is a draw</p>}
      <p>
        <button onClick={onReset}>Rematch !</button>
      </p>
    </div>
  );
};

export default GameOver;
