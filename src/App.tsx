import React, { useEffect, useState } from "react";

function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState<"x" | "o">("x");

  const checkWinner = () => {};

  const handleCellClick = (x: number, y: number) => {
    if (board[x][y] !== "") {
      alert("already clicked!");
      return;
    }

    // check if all the cells are full

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
    setBoard(tmp);
    checkWinner();
  };

  return (
    <div className="app">
      <div className="container">
        <div>Turn: {turn}</div>
        <table>
          <tbody>
            {board.map((rows, i) => (
              <tr key={i}>
                {rows.map((cell, j) => (
                  <td
                    key={j}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                      handleCellClick(i, j)
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
