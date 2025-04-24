<template>
    <section class="border-2 p-4">
      <h2 class="font-bold text-blue-800 text-center">DESCRIPTION</h2>
      <div class="mt-2">
        <div class="flex gap-2 text-xs">
          <button class="border px-2 py-1 rounded-sm">Recherche par anomalie</button>
          <button class="border px-2 py-1 rounded-sm">Recherche par SYM</button>
          <button class="border px-2 py-1 rounded-sm">Recherche par anomalie SCO</button>
        </div>
        <p class="text-red-600 italic text-xs mt-2">Recherche à faire sans accent</p>
        <div class="flex gap-2 items-center mt-2">
          <input type="text" placeholder="Recherche" class="border p-1 flex-1" />
          <select class="border p-1">
            <option value="">N°CAISSE</option>
          </select>
        </div>
        <textarea class="border w-full h-24 mt-2 p-2" placeholder="Résultat"></textarea>
        <div class="flex justify-between mt-2">
          <button class="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg">SYM manquant</button>
          <button class="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg">Site Manquant</button>
          <button class="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg">Correction SYM</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // Composant Description
  </script>
  