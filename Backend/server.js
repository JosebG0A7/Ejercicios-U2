const express = require("express");
const app = express();

console.log("Servidor iniciando...");

app.use(express.json());

const API_KEY = "123456";

app.use((req, res, next) => {
  const auth = req.headers.authorization;

  if (auth === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
});

let tasks = [];
let goals = [];

app.get("/getTasks", (req, res) => {
  res.json(tasks);
});

app.get("/getGoals", (req, res) => {
  res.json(goals);
});

app.post("/addTask", (req, res) => {
  tasks.push(req.body);
  res.json({ message: "Task agregada" });
});

app.post("/addGoal", (req, res) => {
  goals.push(req.body);
  res.json({ message: "Goal agregada" });
});

app.delete("/removeTask/:index", (req, res) => {
  tasks.splice(req.params.index, 1);
  res.json({ message: "Task eliminada" });
});

app.delete("/removeGoal/:index", (req, res) => {
  goals.splice(req.params.index, 1);
  res.json({ message: "Goal eliminada" });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});