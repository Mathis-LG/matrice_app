<!-- components/FicheMagasin.vue -->
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
      <input v-model="telephone_entrant" type="text" placeholder="Numéro de téléphone appelant" class="col-span-1 border p-1 bg-red-600 text-white font-bold" />
      <input v-model="telephone" type="text" placeholder="Numéro de téléphone " class="col-span-1 border p-1" />
      <input v-model="enseigne" type="text" placeholder="Enseigne" class="col-span-1 border p-1" />
      <input v-model="adresse" type="text" placeholder="Adresse" class="col-span-1 border p-1" />
      <input v-model="cp" type="text" placeholder="Code Postal" class="col-span-1 border p-1" />
      <input v-model="ville" type="text" placeholder="Ville" class="col-span-1 border p-1" />
      <input v-model="anabel" type="text" placeholder="Code Anabel" class="col-span-1 border p-1" />
      <input v-model="caisse" type="text" placeholder="Équipement UC" class="col-span-1 border p-1" />
      <input v-model="serveur" type="text" placeholder="Équipement Serveur" class="col-span-1 border p-1" />
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const sycronInput = ref('')
const sycron = ref('') // Ce sera la version complétée en 4 chiffres
const telephone_entrant = ref('')
const telephone = ref('')
const enseigne = ref('')
const adresse = ref('')
const cp = ref('')
const ville = ref('')
const anabel = ref('')
const caisse = ref('')
const serveur = ref('')

async function fetchMagasin() {
  try {
    const response = await fetch(`http://localhost:3001/magasin/${sycron.value}`)
    if (!response.ok) {
      throw new Error('Magasin non trouvé')
    }
    const data = await response.json()

    telephone.value = data.telephone || ''
    enseigne.value = data.enseigne || ''
    adresse.value = data.adresse || ''
    cp.value = data.cp || ''
    ville.value = data.ville || ''
    anabel.value = data.anabel || ''
    caisse.value = data.caisse || ''
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
  caisse.value = ''
  serveur.value = ''
}

// Fonction appelée à chaque saisie dans l'input
function handleSycronInput() {
  const cleaned = sycronInput.value.replace(/\D/g, '')

  // Ne garder que les 4 derniers chiffres tapés
  const limited = cleaned.slice(-4)

  // Compléter avec des 0 devant si nécessaire
  sycron.value = limited.padStart(4, '0')

  sycronInput.value = sycron.value

  if (sycron.value.length === 4) {
    fetchMagasin()
  }
}

function reset() {
  sycronInput.value = ''
  sycron.value = ''
  telephone.value = ''
  telephone_entrant.value = ''
  enseigne.value = ''
  adresse.value = ''
  cp.value = ''
  ville.value = ''
  anabel.value = ''
  caisse.value = ''
  serveur.value = ''
}

defineExpose({
  reset
})


</script>
