let board = [".", ".", ".", ".", ".", ".", ".", ".", "."];
let count = 0,
  winner = "";

const reset = () => {
  board = [".", ".", ".", ".", ".", ".", ".", ".", "."];
  winner = "";
  count = 0;
};

const display = (data) => {
    let i = 0, show = "\n";
    do {
      show += board[i] + " "
      i += 1
      if (i % 3 == 0) show += "\n"
    } while (i < board.length);

  data(show);
};

const move = (player, pos) => {
  if (winner != "") {
    return `player ${winner} already won`;
  } else if (count >= 9 && winner == "null") {
    return "Game tied";
  } else if (board[pos - 1] != ".") {
    return "invalid move";
  } else {
    board[pos - 1] = player == "X" ? "X" : "O";
    count++;
    if (getWinner()) {
      winner = player;
      return `player ${player} won`;
    } else if (count >= 9) {
      return "Game tied";
    } else {
      return "";
    } 
  }
};

const getWinner = () => {
    let c = board;
    if (
      (c[0] == c[1] && c[1] == c[2] && c[0] != ".") ||
      (c[3] == c[4] && c[4] == c[5] && c[3] != ".") ||
      (c[6] == c[7] && c[7] == c[8] && c[6] != ".")
    ) {
      return true;
    } else if (
      (c[0] == c[3] && c[3] == c[6] && c[0] != ".") ||
      (c[1] == c[4] && c[4] == c[7] && c[1] != ".") ||
      (c[2] == c[5] && c[5] == c[8] && c[2] != ".")
    ) {
      return true;
    } else if (
      (c[0] == c[4] && c[4] == c[8] && c[0] != ".") ||
      (c[2] == c[4] && c[4] == c[6] && c[2] != ".")
    ) {
      return true;
    }
    return false;
  };

module.exports = {
  reset,
  display,
  move
};
