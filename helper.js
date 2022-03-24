import { ObjectId } from "mongodb";
import { client } from "./index.js";

export async function GetAllPlayers() {
  return await client.db("b30wd").collection("players").find({}).toArray();
}

export async function GetPlayerById(id) {
  return await client
    .db("b30wd")
    .collection("players")
    .findOne({ _id: ObjectId(id) });
}

export async function UpdatePlayerById(id, Updatedplayer) {
  return await client
    .db("b30wd")
    .collection("players")
    .updateOne({ _id: ObjectId(id) }, { $set: Updatedplayer });
}

export async function DeletePlayerById(id) {
  return await client
    .db("b30wd")
    .collection("players")
    .deleteOne({ _id: ObjectId(id) });
}

export async function CreatePlayers(data) {
  return await client.db("b30wd").collection("players").insertMany(data);
}

export async function createUser(data) {
  return await client.db("b30wd").collection("users").insertOne(data);
}

export async function getUserByName(username) {
  return await client
    .db("b30wd")
    .collection("users")
    .findOne({ username: username });
}
