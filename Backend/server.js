const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "123456";

// 🔐 Middleware de autorización
app.use((req, res, next) => {
  const auth = req.headers.authorization;

  if (auth === API_KEY) {
    next();
  } else {
    return res.status(401).json({ error: "No autorizado" });
  }
});

let tasks = [];
let goals = [];

// ✅ GET TASKS
app.get("/getTasks", (req, res) => {
  res.status(200).json(tasks);
});

// ✅ GET GOALS
app.get("/getGoals", (req, res) => {
  res.status(200).json(goals);
});

// ✅ ADD TASK
app.post("/addTask", (req, res) => {
  const { nombre, descripcion, fecha } = req.body;

  if (!nombre || !descripcion || !fecha) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  tasks.push(req.body);
  res.status(200).json({ message: "Task agregada" });
});

// ✅ ADD GOAL
app.post("/addGoal", (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  goals.push(req.body);
  res.status(200).json({ message: "Goal agregada" });
});

// ✅ DELETE TASK
app.delete("/removeTask/:index", (req, res) => {
  const index = req.params.index;

  if (index === undefined || index >= tasks.length) {
    return res.status(400).json({ error: "Índice inválido" });
  }

  tasks.splice(index, 1);
  res.status(200).json({ message: "Task eliminada" });
});

// ✅ DELETE GOAL
app.delete("/removeGoal/:index", (req, res) => {
  const index = req.params.index;

  if (index === undefined || index >= goals.length) {
    return res.status(400).json({ error: "Índice inválido" });
  }

  goals.splice(index, 1);
  res.status(200).json({ message: "Goal eliminada" });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});