<template>
  <div class="p-4 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 text-center">FICHE MAGASIN</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Code SYCRON</label>
        <input
          v-model="sycronInput"
          @input="handleSycronInput"
          type="text"
          class="w-full border rounded-lg px-3 py-2 bg-red-600 text-white font-bold focus:outline-none focus:ring focus:ring-red-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone appelant</label>
        <input
          v-model="store.telephone_entrant"
          type="text"
          class="w-full border rounded-lg px-3 py-2 bg-red-600 text-white font-bold focus:outline-none focus:ring focus:ring-red-300"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
        <input
          v-model="telephone"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Enseigne</label>
        <input
          v-model="enseigne"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
        <input
          v-model="adresse"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
        <input
          v-model="cp"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
        <input
          v-model="ville"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Code Anabel</label>
        <input
          v-model="anabel"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Équipement UC</label>
        <input
          v-model="equipement_uc"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Équipement Serveur</label>
        <input
          v-model="serveur"
          type="text"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import { useMagasinStore } from '../stores/useMagasinStore'
import { onMounted } from 'vue'

const store = useMagasinStore()

// SYCRON synchronisé avec le store
const sycronInput = ref(store.sycron)

const telephone = ref('')
const enseigne = ref('')
const adresse = ref('')
const cp = ref('')
const ville = ref('')
const anabel = ref('')
const equipement_uc = ref('')
const serveur = ref('')

async function fetchMagasin() {
  try {
    const response = await fetch(`http://localhost:3001/magasin/${store.sycron}`)
    if (!response.ok) {
      throw new Error('Magasin non trouvé')
    }
    const data = await response.json()

    store.setMagasin(data)

    telephone.value = data.telephone || ''
    enseigne.value = data.enseigne || ''
    adresse.value = data.adresse || ''
    cp.value = data.cp || ''
    ville.value = data.ville || ''
    anabel.value = data.anabel || ''
    equipement_uc.value = data.type_caisse || ''
    serveur.value = data.serveur || ''
  } catch (error) {
    console.error('Erreur lors de la récupération du magasin:', error)
    clearFields()
  }
}

function clearFields() {
  telephone.value = ''
  enseigne.value = ''
  adresse.value = ''
  cp.value = ''
  ville.value = ''
  anabel.value = ''
  equipement_uc.value = ''
  serveur.value = ''
}

// Gère la saisie du code SYCRON et met à jour le store
function handleSycronInput() {
  const cleaned = sycronInput.value.replace(/\D/g, '')
  const limited = cleaned.slice(-4)
  const formatted = limited.padStart(4, '0')

  sycronInput.value = formatted
  store.setSycron(formatted)

  if (formatted.length === 4) {
    fetchMagasin()
  }
}

onMounted(() => {
  if (store.sycron && store.sycron.length === 4) {
    sycronInput.value = store.sycron
    fetchMagasin()
  }
})


function reset() {
  sycronInput.value = ''
  store.setSycron('')
  store.telephone_entrant = ''
  telephone.value = ''
  enseigne.value = ''
  adresse.value = ''
  cp.value = ''
  ville.value = ''
  anabel.value = ''
  equipement_uc.value = ''
  serveur.value = ''
}

defineExpose({ reset })
</script>
