import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-compination";
import GameOver from "./components/GameOver";
function derivedActivePlaye(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

////////////
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = derivedActivePlaye(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;
  for (let compination of WINNING_COMBINATIONS) {
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
      winner = firstSquareSymbole;
    }
  }
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
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X" && "active"}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O" && "active"}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        {(winner || isDraw) && (
          <GameOver winner={winner} isDraw={isDraw} onReset={handleReset} />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
