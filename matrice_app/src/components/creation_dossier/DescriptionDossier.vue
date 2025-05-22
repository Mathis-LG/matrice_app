<template>
  <section class="border-2 p-4">
    <h2 class="font-bold text-blue-800 text-center">DESCRIPTION</h2>

    <div class="grid grid-cols-5 gap-2 items-center">
      <select v-model="selected.caisse" class="border p-1">
        <option value="">CAISSE</option>
        <option v-for="option in options.caisse" :key="option" :value="option">{{ option }}</option>
      </select>

      <select v-model="selected.groupe" class="border p-1">
        <option value="">GROUPE MAT</option>
        <option v-for="option in options.groupe" :key="option" :value="option">{{ option }}</option>
      </select>

      <select v-model="selected.materiel" class="border p-1">
        <option value="">MATERIEL</option>
        <option v-for="option in options.materiel" :key="option" :value="option">{{ option }}</option>
      </select>


      <select v-model="selected.niveau" class="border p-1">
        <option value="">- NIV -</option>
        <option v-for="option in options.niveau" :key="option" :value="option">{{ option }}</option>
      </select>

      <select v-model="selected.anomalie" class="border p-1 col-span-2">
        <option value="">ANOMALIE</option>
        <option v-for="option in options.anomalie" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </section>
  
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ActionDossier from './ActionsDossier.vue'

const emit = defineEmits(['update:groupe'])

const selected = ref({
  caisse: '',
  groupe: '',
  materiel: '',
  niveau: '',
  anomalie: ''
})

const options = ref({
  caisse: [],
  groupe: [],
  materiel: [],
  niveau: [],
  anomalie: []
})

// Initial load (caisses, niveaux, groupes)
onMounted(async () => {
  try {
    const [resCaisses, resNiveaux, resGroupes] = await Promise.all([
      fetch('http://localhost:3001/caisses'),
      fetch('http://localhost:3001/niveaux-priorite'),
      fetch('http://localhost:3001/groupes-materiel')
    ])

    options.value.caisse = await resCaisses.json()
    options.value.niveau = await resNiveaux.json()
    options.value.groupe = await resGroupes.json()
  } catch (error) {
    console.error('Erreur chargement options initiales :', error)
  }
})

// Watch du groupe pour charger les matériels liés
watch(() => selected.value.groupe, async (newGroupe) => {
  emit('update:groupe', newGroupe) // ➤ NOTIFIE LA VUE PARENTE

  if (!newGroupe) {
    options.value.materiel = []
    selected.value.materiel = ''
    options.value.anomalie = []
    selected.value.anomalie = ''
    return
  }

  try {
    const [resMat, resAno] = await Promise.all([
      fetch(`http://localhost:3001/materiels/${encodeURIComponent(newGroupe)}`),
      fetch(`http://localhost:3001/anomalies/${encodeURIComponent(newGroupe)}`)
    ])

    options.value.materiel = await resMat.json()
    options.value.anomalie = await resAno.json()

    selected.value.materiel = ''
    selected.value.anomalie = ''
  } catch (error) {
    console.error('Erreur chargement matériel/anomalie :', error)
    options.value.materiel = []
    options.value.anomalie = []
  }
})


</script>



