const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

// Configuration de la connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Create Todo model
const Todo = mongoose.model('Todo', {
  title: String,
  completed: Boolean,
});

// Routes
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const { title, completed } = req.body;
  const todo = new Todo({ title, completed });
  await todo.save();
  res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: 'Todo deleted successfully' });
});
// Démarrage du serveur
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
