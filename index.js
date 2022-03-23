import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 5000;

console.log(process.env);
console.log(process.env.MONGO_URL);

// const players = [
//   {
//     id: "7",
//     name: "Mahendra Singh Dhoni",
//     team: "Chennai Super Kings",
//     img: "https://images.indianexpress.com/2020/10/148841-clraytzonv-1602133322.jpg",
//     logo: "https://img1.pnghut.com/6/0/25/49JW8UBi89/team-logo-indian-premier-league-cricket-artwork.jpg",
//     nickname: "Thala",
//     shot: "Helicopter",
//   },
//   {
//     id: "45",
//     name: "Rohit Sharma",
//     team: "Mumbai Indians",
//     img: "https://images.indianexpress.com/2021/12/rohit-sharma-mi.jpg",
//     logo: "https://mpng.subpng.com/20180712/cxl/kisspng-mumbai-indians-2018-indian-premier-league-rajastha-5b476625c0f689.0907459215314058617904.jpg",
//     nickname: "Hit-man",
//     shot: "Pullshot",
//   },
//   {
//     id: "18",
//     name: "Virat Kohli",
//     team: "Royal Challengers Bangalore",
//     img: "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/309400/309456.7.jpg",
//     logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_2020.svg/1200px-Royal_Challengers_Bangalore_2020.svg.png",
//     nickname: "King-kohli",
//     shot: "Cover-drive",
//   },
//   {
//     id: "1",
//     name: "KL Rahul",
//     team: "Lucknow Supergiants",
//     img: "https://c.ndtvimg.com/2022-03/gv66jrb4_kl-rahul_625x300_21_March_22.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605",
//     logo: "https://www.sportstiger.com/wp-content/uploads/2022/01/Untitled-2-7.jpg",
//     nickname: "Classy-KL",
//     shot: "Pickup-flick",
//   },
//   {
//     id: "41",
//     name: "Shreyas Iyer",
//     team: "Kolkata Knight Riders",
//     img: "https://img.fresherslive.com/latestnews/images/articles/ians/width-900/2022/02/16/kolkata-knight-riders-announce-shreyas-iyer-as-captain-ahead-of-ipl-2022-620cede029cf6-1645014496.jpg",
//     logo: "https://toppng.com/uploads/preview/kkr-squad-ipl-kolkata-knight-riders-logo-11562993217o9jojr35hy.png",
//     nickname: "Shre",
//     shot: "Slog",
//   },
// ];

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected😎");
  return client;
}

const client = await createConnection();
app.get("/", function (request, response) {
  response.send("Welcome to My Ipl app");
});

// app.get("/players", function (request, response) {
//   response.send(players);
// });

app.get("/players", async function (request, response) {
  const players = await client
    .db("b30wd")
    .collection("players")
    .find({})
    .toArray();
  response.send(players);
});

// app.get("/players/:id", function (request, response) {
//   const { id } = request.params;
//   const player = players.find((cap) => cap.id === id);
//   response.send(player);
// });

app.get("/players/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params);
  const player = await client
    .db("b30wd")
    .collection("players")
    .findOne({ id: id });

  player
    ? response.send(player)
    : response.status(404).send({ message: "No such player found" });
});

app.put("/players/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params);
  const Updatedplayer = request.body;
  const player = await client
    .db("b30wd")
    .collection("players")
    .updateOne({ id: id }, { $set: Updatedplayer });
  response.send(player);
});

app.delete("/players/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params);
  const result = await client
    .db("b30wd")
    .collection("players")
    .deleteOne({ id: id });
  response.send(result);
});

app.post("/players", async function (request, response) {
  const data = request.body;
  console.log(data);
  const res = await client.db("b30wd").collection("players").insertMany(data);
  response.send(res);
});

app.listen(PORT, () => {
  console.log("Server is Started💪");
});
