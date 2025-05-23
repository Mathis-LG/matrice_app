<template>
  <div class="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 text-center">INFORMATIONS OBLIGATOIRES</h2>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Date et heure de l'anomalie</label>
      <input
        v-model="information.dateHeure"
        type="datetime-local"
        class="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Numéro de caisse</label>
      <input
        v-model="information.numCaisse"
        type="text"
        placeholder="Ex: 001"
        class="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Lien FileXchange</label>
      <input
        v-model="information.lienFileXchange"
        type="text"
        placeholder="https://filexchange..."
        class="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Version FastLane</label>
      <input
        v-model="information.versionFastLane"
        type="text"
        placeholder="Ex: v2.3.1"
        class="w-full border rounded-lg px-3 py-2"
      />
    </div>
  </div>
</template>

<script setup>

import { useInformationsEscaladeStore } from '@/stores/useInformationsEscaladeStore'
const information = useInformationsEscaladeStore()

</script>
