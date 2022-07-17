
import express, { Application } from "express";
import bodyParser from "body-parser";

import connect from "./connect";
import { db } from "./config/config";

import * as UserController from "./controllers/user_controller";

const app: Application = express();
const port: number = 3001 || process.env.PORT;

connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routers here
app.get("/users", UserController.allUsers);
app.get("/users/:id", UserController.showUser);
app.post("/users", UserController.addUser);
app.patch("/users/:id", UserController.updateUser)
app.delete("/users/:id", UserController.deleteUser)
app.delete("/users", UserController.deleteAllUsers)

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});