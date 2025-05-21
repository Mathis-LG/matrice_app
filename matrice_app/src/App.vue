<script setup lang="ts">
import { ref } from 'vue'
import FicheMagasin from './components/FicheMagasin.vue'
import Description from './components/Description.vue'
import Categorisation from './components/Categorisation.vue'
import Actions from './components/Actions.vue'
import CreationDossier from './components/CreationDossier.vue'
import AffichageGenerations from './components/AffichageGenerations.vue'

const ficheMagasinRef = ref()
const descriptionRef = ref()
const categorisationRef = ref()
const actionsRef = ref() // ✅ Nouvelle ref

function resetFormulaire() {
  ficheMagasinRef.value?.reset?.()
  descriptionRef.value?.reset?.()
  categorisationRef.value?.reset?.()
  actionsRef.value?.reset?.() // ✅ Appel du reset de Actions
}
</script>

<template>
  <div class="min-h-screen bg-gray-300 p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Colonne de gauche -->
      <div class="space-y-6 bg-white rounded-lg">
        <FicheMagasin ref="ficheMagasinRef" />
        <Description ref="descriptionRef" />
        <Categorisation ref="categorisationRef" />
      </div>

      <!-- Colonne de droite -->
      <div class="space-y-6 bg-white rounded-lg">
        <Actions ref="actionsRef" /> <!-- Ref ajoutée -->
        <CreationDossier />
        <AffichageGenerations />
        <div class="flex justify-center mt-2">
          <button
            @click="resetFormulaire"
            class="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
          >
            RESET FORMULAIRE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tu peux ajouter ici des styles personnalisés si besoin */
</style>
