import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { playersRouter } from "./routes/players.js";
import { usersRouter } from "./routes/users.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/players", playersRouter);
app.use("/users", usersRouter);
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected😎");
  return client;
}

export const client = await createConnection();
app.get("/", function (request, response) {
  response.send("Welcome to My Ipl app");
});

app.listen(PORT, () => {
  console.log("Server is Started💪");
});

// app.get("/players", function (request, response) {
//   response.send(players);
// });

// app.get("/players/:id", function (request, response) {
//   const { id } = request.params;
//   const player = players.find((cap) => cap.id === id);
//   response.send(player);
// });
