const { io } = require("./server");
const board = require("./board");

let userCount = 0;
let users = [];
let userTurn = 0;
let win = false;

io.on("connection", (client) => {
  console.log("Conectado");

  if (userCount >= 2) {
    client.emit("event", "Game alredy in progress, try again later!");
    client.disconnect();
  } else {
    userCount++;
    users[userCount - 1] = client;
    client.emit("event", `You are user ${userCount}`);
  }

  if (userCount == 2) {
    io.emit("message", "Start game");
    board.display((data) => {
      console.log(data);
      io.emit("message", data);
    });
    users[0].emit("event", "Your turn");
  }

  client.on("move", (data) => {
    if (win) {
      client.emit("message", "Game Over! Type 'r' to exit");
    } else if (client.id != users[userTurn].id) {
      client.emit("message", "Wait for your turn");
    } else {
      let moveGame = board.move(users[0].id == client.id ? "X" : "O", data);
    
      if (moveGame == "") {
        // cycle user turn
        userTurn = (userTurn + 1) % 2;

        // diaplay the board
        board.display(function(data) {
          io.emit("message", data);
        });

        users[userTurn].emit("message", "your turn");
     }else {
        // won or draw check
        if (moveGame.includes("won") || moveGame.includes("tied")) {
          io.emit("message", moveGame);
          win = true;

          users[0].disconnect();
          users[1].disconnect();
          userCount = 0;
          users = [];

          board.reset();
        } else client.emit("message", moveGame);
      }
    }
  });

  client.on("disconnect", () => {
      console.log("desconectando")
    if (win == false) {
      io.emit("message", `The other player resigned, you won!`);
      users[0].disconnect();
      users[1].disconnect();
      board.reset();
    }

    userCount = 0;
    win = false;
    let userTurn = 0;
  });

});


