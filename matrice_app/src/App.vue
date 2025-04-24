<!-- App.vue -->
<script setup lang="ts">
import FicheMagasin from './components/FicheMagasin.vue'
import Description from './components/Description.vue'
import Categorisation from './components/Categorisation.vue'
import Actions from './components/Actions.vue'
import CreationDossier from './components/CreationDossier.vue'
import AffichageGenerations from './components/AffichageGenerations.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-300 p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Colonne de gauche -->
      <div class="space-y-6 bg-white rounded-lg">
        <FicheMagasin />
        <Description />
        <Categorisation />
      </div>

      <!-- Colonne de droite -->
      <div class="space-y-6 bg-white rounded-lg">
        <Actions />
        <CreationDossier />
        <AffichageGenerations />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tu peux ajouter ici des styles personnalisés si besoin */
</style>






<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
