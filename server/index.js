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

// route pour la recherche de magasin par code SYCRON
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

// route pour la recherche d'anomalie par mot clé
app.get('/description_incidents/search/:keyword', async (req, res) => {
  const { keyword } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM description_incidents WHERE mot_cle ILIKE $1`,
      [`%${keyword}%`]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aucun incident trouvé pour ce mot clé' });
    }
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la recherche de description_incidents:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// route pour recherche d'anomalie par code SYM
app.get('/cas/:cas', async (req, res) => {
    const { cas } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM description_incidents WHERE cas ILIKE $1`,
        [`%${cas}%`]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Erreur SQL:', err);  // Affiche l'erreur détaillée dans la console
      res.status(500).send('Erreur serveur');
    }
  });
  


// route recherche par SCO
app.get('/description_incidents/sco/:terme', async (req, res) => {
  const { terme } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM description_incidents WHERE LOWER(description) LIKE LOWER($1)`,
      [`SCO NCR :%${terme}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la recherche SCO :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la recherche SCO' });
  }
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
