const express = require('express');
const cors = require('cors');
const { getAllGames, getGameById } = require('./controllers');

const app = express();

app.use(cors());
app.use(express.json());

// - Exercise 1: Retrieve All Games -
app.get('/games', (req, res) => {
  try {
    const games = getAllGames();
    if (games.length === 0) {
      return res.status(400).json({ message: 'Games not found' });
    }
    return res.status(200).json({ games });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// - Exercise 2: Retrieve Game by ID -
app.get('/games/details/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const game = getGameById(id);
    if (!game) {
      return res.status(400).json({ message: 'Game not found' });
    }
    return res.status(200).json({ game });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
