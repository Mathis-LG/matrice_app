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

// route chercher numéro de caisse 
app.get('/caisses', async (req, res) => {
  try {
    const result = await pool.query('SELECT libelle FROM numero_caisse');
    res.json(result.rows.map(row => row.libelle));
  } catch (error) {
    console.error('Erreur lors de la récupération des caisses :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// route obtenir les niveau de priorité 
app.get('/niveaux-priorite', async (req, res) => {
  try {
    const result = await pool.query('SELECT niveau FROM niveaux_priorite ORDER BY niveau ASC');
    res.json(result.rows.map(row => row.niveau));
  } catch (error) {
    console.error('Erreur lors de la récupération des niveaux de priorité :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// route pour obtenir la liste des groupe de materiel
app.get('/groupes-materiel', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT groupe_materiel FROM grp_materiel ORDER BY groupe_materiel ASC');
    res.json(result.rows.map(row => row.groupe_materiel));
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes de matériel :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// route materiel en fonction du groupe selectionné
app.get('/materiels/:groupe', async (req, res) => {
  const { groupe } = req.params;
  try {
    const result = await pool.query(
      `SELECT DISTINCT materiel FROM grp_materiel WHERE groupe_materiel = $1 ORDER BY materiel ASC`,
      [groupe]
    );
    res.json(result.rows.map(row => row.materiel));
  } catch (error) {
    console.error('Erreur lors de la récupération des matériels :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// route anomalie en fonction du groupe materiel selectionné
app.get('/anomalies/:groupe', async (req, res) => {
  const { groupe } = req.params;
  try {
    const result = await pool.query(
      `SELECT DISTINCT anomalie FROM grp_anomalie WHERE groupe_materiel = $1 ORDER BY anomalie ASC`,
      [groupe]
    );
    res.json(result.rows.map(row => row.anomalie));
  } catch (error) {
    console.error('Erreur lors de la récupération des anomalies :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
