import bcrypt from "bcrypt";
import express from "express";
import { createUser, getUserByName } from "../helper.js";
import jwt from "jsonwebtoken";
const router = express.Router();

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log({ salt, hashPassword });
  return hashPassword;
}
// genPassword("password@123");

router.post("/signup", async function (request, response) {
  // db.users.insertOne(data)
  const { username, password } = request.body;
  const hashPassword = await genPassword(password);
  const newUser = {
    username: username,
    password: hashPassword,
  };

  const result = await createUser(newUser);
  response.send(result);
});

router.post("/login", async function (request, response) {
  // db.users.insertOne(data)
  const { username, password } = request.body;
  // db.users.findOne({username: "aara"})
  const userFromDB = await getUserByName(username);
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(401).send({ message: "Invalid credentials" });
  } else {
    const storedPassword = userFromDB.password; // hashed password
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);

    if (isPasswordMatch) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      response.send({ message: "Successful login", token: token });
    } else {
      response.status(401).send({ message: "Invalid credentials" });
    }
  }
});

export const usersRouter = router;
