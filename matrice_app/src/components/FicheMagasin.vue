<template>
  <section class="border-2 p-4">
    <h2 class="font-bold text-blue-800 text-center">FICHE MAGASIN</h2>
    <div class="grid grid-cols-3 gap-2 mt-2">
      <input
        v-model="sycronInput"
        @input="handleSycronInput"
        type="text"
        placeholder="CODE SYCRON"
        class="col-span-1 border p-1 bg-red-600 text-white font-bold"
      />
      <input v-model="store.telephone_entrant" type="text" placeholder="Numéro de téléphone appelant" class="col-span-1 border p-1 bg-red-600 text-white font-bold" />
      <input v-model="telephone" type="text" placeholder="Numéro de téléphone " class="col-span-1 border p-1" />
      <input v-model="enseigne" type="text" placeholder="Enseigne" class="col-span-1 border p-1" />
      <input v-model="adresse" type="text" placeholder="Adresse" class="col-span-1 border p-1" />
      <input v-model="cp" type="text" placeholder="Code Postal" class="col-span-1 border p-1" />
      <input v-model="ville" type="text" placeholder="Ville" class="col-span-1 border p-1" />
      <input v-model="anabel" type="text" placeholder="Code Anabel" class="col-span-1 border p-1" />
      <input v-model="equipement_uc" type="text" placeholder="Équipement UC" class="col-span-1 border p-1" />
      <input v-model="serveur" type="text" placeholder="Équipement Serveur" class="col-span-1 border p-1" />
    </div>
  </section>
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
