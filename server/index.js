// server/index.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Config de connexion PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'matrice_db',
  password: 'Symag',
  port: 5432,
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API backend');
  });
  

// Exemple de route pour tester la connexion
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur de connexion BDD');
  }
});

app.get('/magasin/:sycron', async (req, res) => {
  const { sycron } = req.params;
  try {
    const result = await pool.query('SELECT * FROM magasin WHERE sycron = $1', [sycron]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Magasin non trouvé' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du magasin:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
