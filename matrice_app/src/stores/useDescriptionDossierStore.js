import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useDescriptionDossierStore = defineStore('description', () => {
  // Selected values
  const selected = reactive({
    caisse: '',
    groupe: '',
    materiel: '',
    niveau: '',
    anomalie: ''
  })

  // Options pour chaque select
  const options = reactive({
    caisse: [],
    groupe: [],
    materiel: [],
    niveau: [],
    anomalie: []
  })

  // Chargement des options initiales caisses, niveaux, groupes
  async function loadInitialOptions() {
    try {
      const [resCaisses, resNiveaux, resGroupes] = await Promise.all([
        fetch('http://localhost:3001/caisses'),
        fetch('http://localhost:3001/niveaux-priorite'),
        fetch('http://localhost:3001/groupes-materiel')
      ])

      options.caisse = await resCaisses.json()
      options.niveau = await resNiveaux.json()
      options.groupe = await resGroupes.json()
    } catch (error) {
      console.error('Erreur chargement options initiales :', error)
    }
  }

  // Charger matériels et anomalies selon groupe
  async function loadMaterielAnomalies(groupe) {
    if (!groupe) {
      options.materiel = []
      selected.materiel = ''
      options.anomalie = []
      selected.anomalie = ''
      return
    }

    try {
      const [resMat, resAno] = await Promise.all([
        fetch(`http://localhost:3001/materiels/${encodeURIComponent(groupe)}`),
        fetch(`http://localhost:3001/anomalies/${encodeURIComponent(groupe)}`)
      ])

      options.materiel = await resMat.json()
      options.anomalie = await resAno.json()

      selected.materiel = ''
      selected.anomalie = ''
    } catch (error) {
      console.error('Erreur chargement matériel/anomalie :', error)
      options.materiel = []
      options.anomalie = []
    }
  }

  // Pour setter groupe et recharger materiel/anomalies en même temps
  async function setGroupe(groupe) {
    selected.groupe = groupe
    await loadMaterielAnomalies(groupe)
  }

  return {
    selected,
    options,
    loadInitialOptions,
    loadMaterielAnomalies,
    setGroupe
  }
})
