import React, { useState } from "react";

function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState<"x" | "o">("x");
  const [gameFinish, setGameFinish] = useState(false);

  const resetGame = () => {
    setGameFinish(false);
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  const checkWinner = (cells: string[], turn: string) => {
    const horizontal = [0, 3, 6].map((i) => {
      return [i, i + 1, i + 2];
    });
    const vertical = [0, 1, 2].map((i) => {
      return [i, i + 3, i + 6];
    });
    const diagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ];

    var allwins = []
      .concat(horizontal as any)
      .concat(vertical as any)
      .concat(diagonal as any);

    let res = allwins.some((indices) => {
      return (
        cells[indices[0]] === turn &&
        cells[indices[1]] === turn &&
        cells[indices[2]] === turn
      );
    });
    if (res) {
      alert("Player " + turn + " win.");
      setGameFinish(true);
    }
  };

  const handleCellClick = (x: number, y: number) => {
    if (gameFinish) return;

    if (board[x][y] !== "") {
      alert("already clicked!");
      return;
    }

    if (turn === "x") setTurn("o");
    else setTurn("x");

    let tmp = [...board];

    tmp.forEach((rows, i) => {
      rows.forEach((cell, j) => {
        if (i === x && j === y) {
          tmp[x][y] = turn;
        }
      });
    });
    let cells = [].concat(...(board as any));
    checkWinner(cells, turn);

    setBoard(tmp);
  };

  return (
    <div className="app">
      <div className="container">
        <div>Turn: Player {turn.toUpperCase()}</div>
        <table>
          <tbody>
            {board.map((rows, i) => (
              <tr key={i}>
                {rows.map((cell, j) => (
                  <td key={j} onClick={() => handleCellClick(i, j)}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={resetGame}>play again</button>
      </div>
    </div>
  );
}

export default App;
