<template>
  <section class="border-2 p-4">
    <h2 class="font-bold text-blue-800 text-center">DESCRIPTION</h2>

    <div class="mt-2">
      <div class="flex gap-2 text-xs">
        <button
          @click="switchMode('anomalie')"
          :class="['border px-2 py-1 rounded-sm', selectedMode === 'anomalie' ? 'bg-blue-600 text-white' : '']"
        >
          Recherche par anomalie
        </button>
        <button
          @click="switchMode('sym')"
          :class="['border px-2 py-1 rounded-sm', selectedMode === 'sym' ? 'bg-blue-600 text-white' : '']"
        >
          Recherche par SYM
        </button>
        <button
          @click="switchMode('sco')"
          :class="['border px-2 py-1 rounded-sm', selectedMode === 'sco' ? 'bg-blue-600 text-white' : '']"
        >
          Recherche par SCO
        </button>
      </div>

      <p class="text-red-600 italic text-xs mt-2">Recherche à faire sans accent</p>

      <!-- Partie Recherche -->
      <div class="flex gap-2 items-center mt-2">
        <input
          type="text"
          v-model="searchValues[selectedMode]"
          placeholder="Recherche"
          class="border p-1 flex-1"
        />
        <select v-if="selectedMode === 'anomalie' || selectedMode === 'sco'" class="border p-1">
          <option value="">N°CAISSE</option>
        </select>
      </div>

      <!-- Résultats principaux -->
      <div
        v-if="selectedMode === 'sym'"
        class="border w-full h-24 mt-2 p-2 overflow-y-auto text-sm whitespace-pre-line cursor-pointer"
      >
        <div
          v-for="line in resultats.sym.split('\n')"
          :key="line"
          @click="handleResultClick(line)"
          class="hover:bg-blue-100 px-1"
        >
          {{ line }}
        </div>
      </div>

      <div
        v-else-if="selectedMode === 'anomalie'"
        class="border w-full h-24 mt-2 p-2 overflow-y-auto text-sm whitespace-pre-line cursor-pointer"
      >
        <div
          v-for="(item, index) in anomalieResults"
          :key="index"
          @click="handleAnomalieClick(item)"
          class="hover:bg-blue-100 px-1"
        >
          {{ item.mot_cle }}
        </div>
      </div>

      <div
        v-if="selectedMode === 'sco'"
        class="border w-full h-24 mt-2 p-2 overflow-y-auto text-sm whitespace-pre-line cursor-pointer"
      >
        <div
          v-for="(item, index) in scoResults"
          :key="index"
          @click="handleScoClick(item)"
          class="hover:bg-blue-100 px-1"
        >
          {{ item.description }}
        </div>
      </div>


      <!-- Description affichée -->
      <textarea
        v-if="selectedMode === 'sym' || selectedMode === 'anomalie' || selectedMode === 'sco'"
        class="border w-full h-24 mt-2 p-2"
        placeholder="Description"
        :value="symDescription"
        readonly
      ></textarea>

      <!-- Boutons d'action visibles uniquement pour anomalie -->
      <div v-if="selectedMode === 'anomalie'" class="flex justify-between mt-2">
        <button class="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg">SYM manquant</button>
        <button class="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg">Site Manquant</button>
        <button class="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg">Correction SYM</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSelectionStore } from '../stores/useIncidentStore'

const store = useSelectionStore()

const selectedMode = ref('anomalie')

const searchValues = ref({
  anomalie: '',
  sym: '',
  sco: ''
})

const resultats = ref({
  anomalie: '',
  sym: '',
  sco: ''
})

const symDescription = ref('')

const anomalieResults = ref([])
const scoResults = ref([]) // <-- nouveau tableau pour résultats SCO

function switchMode(mode) {
  selectedMode.value = mode
}

watch(
  () => searchValues.value[selectedMode.value],
  async (val) => {
    const trimmed = val.trim()

    if (!trimmed) {
      resultats.value[selectedMode.value] = ''
      symDescription.value = ''
      anomalieResults.value = []
      scoResults.value = []
      return
    }

    if (selectedMode.value === 'sym') {
      try {
        const response = await fetch(`http://localhost:3001/cas/${encodeURIComponent(trimmed)}`)
        if (!response.ok) {
          resultats.value.sym = 'Aucun résultat trouvé'
          symDescription.value = ''
          return
        }

        const data = await response.json()
        resultats.value.sym = data.map(item => item.cas).join('\n')
        symDescription.value = ''
      } catch (error) {
        resultats.value.sym = 'Erreur de requête'
        symDescription.value = ''
        console.error(error)
      }
    }

    if (selectedMode.value === 'anomalie') {
      try {
        const response = await fetch(`http://localhost:3001/description_incidents/search/${encodeURIComponent(trimmed)}`)
        if (!response.ok) {
          resultats.value.anomalie = 'Aucun résultat trouvé'
          anomalieResults.value = []
          return
        }

        const data = await response.json()
        anomalieResults.value = data
        resultats.value.anomalie = data.map(item => item.mot_cle + ' : ' + item.description).join('\n\n')
      } catch (error) {
        resultats.value.anomalie = 'Erreur de requête'
        anomalieResults.value = []
        console.error(error)
      }
    }

    if (selectedMode.value === 'sco') {
      try {
        const response = await fetch(`http://localhost:3001/description_incidents/sco/${encodeURIComponent(trimmed)}`)
        if (!response.ok) {
          resultats.value.sco = 'Aucun résultat trouvé'
          scoResults.value = []
          return
        }

        const data = await response.json()
        scoResults.value = data
        resultats.value.sco = data.map(item => item.description).join('\n\n')
      } catch (error) {
        resultats.value.sco = 'Erreur de requête'
        scoResults.value = []
        console.error(error)
      }
    }
  }
)

function handleResultClick(sym) {
  fetch(`http://localhost:3001/description_incidents/cas/${encodeURIComponent(sym)}`)
    .then(res => res.json())
    .then(data => {
      const item = data.find(i => i.cas === sym)
      symDescription.value = item?.description || 'Pas de description'
    })
    .catch(err => {
      console.error(err)
      symDescription.value = 'Erreur lors de la récupération'
    })
}

function handleAnomalieClick(item) {
  symDescription.value = item.description || 'Pas de description'
}

function handleScoClick(item) {
  symDescription.value = item.description || 'Pas de description'
}

</script>
