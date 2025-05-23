<template>
  <div class="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 text-center">DESCRIPTION</h2>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">N° CARE</label>
      <input
        v-model="description.numeroCare"
        type="text"
        placeholder="Ex: CARE123456"
        class="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Code erreur</label>
      <input
        v-model="description.codeErreur"
        type="text"
        placeholder="Ex: ERR-405"
        class="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Anomalie</label>
      <textarea
        v-model="description.anomalie"
        placeholder="Décrivez l'anomalie observée..."
        class="w-full border rounded-lg px-3 py-2 h-24 resize-none"
      ></textarea>
    </div>
  </div>
</template>


<script setup>

import { useDescriptionEscaladeStore } from '@/stores/useDescriptionEscaladeStore'
const description = useDescriptionEscaladeStore()

</script>

