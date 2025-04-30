<template>
    <section class="border-2 p-4">
      <h2 class="font-bold text-blue-800 text-center">ACTIONS</h2>
      <p class="text-red-600 text-xs">
        Merci d'effectuer les tâches supports ci dessous<br/>
        Si vous ne les faites pas, supprimez-les du descriptif généré. DÉTAILLEZ VOS ACTIONS !
      </p>
      <textarea class="border w-full h-24 mt-2 p-2" :value="incident?.support"></textarea>
    </section>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useIncidentStore } from '../stores/useIncidentStore'
  import { defineExpose } from 'vue'
  
  const store = useIncidentStore()
  const incident = computed(() => store.selectedIncident)
  
  function reset() {
    store.selectedIncident = null
  }
  
  defineExpose({ reset })
  </script>
  
  