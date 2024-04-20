import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-compination";
import GameOver from "./components/GameOver";
const PLAYERS = {
  X: "player 1",
  O: "player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlaye(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedWinner(gameBoard, players) {
  let winner;
  for (const compination of WINNING_COMBINATIONS) {
    const firstSquareSymbole =
      gameBoard[compination[0].row][compination[0].column];
    const secondSquareSymbole =
      gameBoard[compination[1].row][compination[1].column];
    const thirdSquareSymbole =
      gameBoard[compination[2].row][compination[2].column];
    if (
      firstSquareSymbole &&
      firstSquareSymbole === secondSquareSymbole &&
      firstSquareSymbole === thirdSquareSymbole
    ) {
      winner = players[firstSquareSymbole];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = derivedActivePlaye(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);

  let isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlaye(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleReset() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        {winner && <p>You win {winner}!</p>}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X" && "active"}
            onChageName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O" && "active"}
            onChageName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} isDraw={isDraw} onReset={handleReset} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
