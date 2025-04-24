<!-- components/FicheMagasin.vue -->
<template>
    <section class="border-2 p-4">
      <h2 class="font-bold text-blue-800 text-center">FICHE MAGASIN</h2>
      <div class="grid grid-cols-3 gap-2 mt-2">
        <input type="text" placeholder="CODE SYCRON" class="col-span-1 border p-1 bg-red-600 text-white font-bold" />
        <input type="text" placeholder="Adresse" class="col-span-1 border p-1" />
        <input type="text" placeholder="Code Anabel" class="col-span-1 border p-1" />
        <input type="text" placeholder="Numéro de téléphone appelant" class="col-span-1 border p-1 bg-red-600 text-white font-bold" />
        <input type="text" placeholder="Équipement UC" class="col-span-1 border p-1" />
        <input type="text" placeholder="Équipement Serveur" class="col-span-1 border p-1" />
      </div>
    </section>
  </template>
  
  <script setup>
  // props, emits ou logique éventuelle ici
  </script>
  