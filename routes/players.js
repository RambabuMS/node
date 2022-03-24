import express from "express";
import {
  GetAllPlayers,
  GetPlayerById,
  UpdatePlayerById,
  DeletePlayerById,
  CreatePlayers,
} from "../helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async function (request, response) {
  const players = await GetAllPlayers();
  response.send(players);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params);
  const player = await GetPlayerById(id);

  player
    ? response.send(player)
    : response.status(404).send({ message: "No such player found" });
});

router.put("/:id", auth, async function (request, response) {
  const { id } = request.params;
  console.log(request.params);
  const Updatedplayer = request.body;
  const player = await UpdatePlayerById(id, Updatedplayer);
  response.send(player);
});

router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params);
  const result = await DeletePlayerById(id);
  response.send(result);
});

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const res = await CreatePlayers(data);
  response.send(res);
});

export const playersRouter = router;
