const socket = require("socket.io-client");

const client = socket("http://localhost:5050/");

const command = require("readcommand");

client.on("event", (message) => {
  console.log(message);
});

client.on("disconnect", function (data) {
  process.exit(0);
});

client.on("message", (data) => {
  console.log(data);
});

command.loop((err, args, str, next) => {
  let data = args[0];

  if (data === "r") {
    console.log("You lost");
    process.exit(0);
  }

  if (data <= 9 && data >= 1) {
    client.emit("move", data);
  } else {
    console.log("Invalid move, select a number between 1-9");
  }
  return next();
});
