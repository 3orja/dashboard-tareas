const express = require('express');
const cors = require('cors');
const tasks = require('./tasks');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/tasks', (req, res) => {
  res.json(tasks.getTasks());
});

// Obtener una tarea específica por ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.getTask(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const newTask = tasks.createTask(req.body);
  res.status(201).json(newTask);
});

// Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
  const updatedTask = tasks.updateTask(req.params.id, req.body);
  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(updatedTask);
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const success = tasks.deleteTask(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).send();
});

// Mantener la ruta original por compatibilidad, si es necesaria
app.post('/api/tasks/:id/run', (req, res) => {
  const result = tasks.runTask(req.params.id);
  res.json(result);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('API running on port 3000');
});
