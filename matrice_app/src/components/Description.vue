<template>
  <section class="border-2 p-4">
    <h2 class="font-bold text-blue-800 text-center">DESCRIPTION</h2>

    <div class="mt-2">
      <div class="flex gap-2 text-xs">
        <button @click="selectedMode = 'anomalie'" class="border px-2 py-1 rounded-sm">Recherche par anomalie</button>
        <button @click="selectedMode = 'sym'" class="border px-2 py-1 rounded-sm">Recherche par SYM</button>
        <button @click="selectedMode = 'sco'" class="border px-2 py-1 rounded-sm">Recherche par SCO</button>
      </div>

      <p class="text-red-600 italic text-xs mt-2">Recherche à faire sans accent</p>

      <!-- Partie Recherche -->
      <div class="flex gap-2 items-center mt-2">
        <input type="text" placeholder="Recherche" class="border p-1 flex-1" />
        <!-- Dropdown visible uniquement pour anomalie et sco -->
        <select v-if="selectedMode === 'anomalie' || selectedMode === 'sco'" class="border p-1">
          <option value="">N°CAISSE</option>
        </select>
      </div>

      <!-- Résultats principaux -->
      <textarea class="border w-full h-24 mt-2 p-2" placeholder="Résultat de la recherche"></textarea>

      <!-- Résultat supplémentaire uniquement pour SYM -->
      <textarea v-if="selectedMode === 'sym'" class="border w-full h-24 mt-2 p-2" placeholder="Erreur"></textarea>

      <!-- Boutons d'action visibles uniquement pour anomalie -->
      <div class="flex justify-between mt-2">
        <button class="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg">SYM manquant</button>
        <button class="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg">Site Manquant</button>
        <button class="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg">Correction SYM</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedMode = ref('anomalie') // Mode par défaut
</script>
