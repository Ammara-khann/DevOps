const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: "Text required" });
  const task = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text: text.trim(),
    done: false,
  };
  tasks.unshift(task);
  res.status(201).json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });
  task.done = !task.done;
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.status(204).end();
});

app.delete("/api/tasks", (req, res) => {
  tasks = tasks.filter((t) => !t.done);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));