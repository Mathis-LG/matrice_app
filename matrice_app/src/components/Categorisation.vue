<template>
    <section class="border-2 p-4">
      <h2 class="font-bold text-blue-800 text-center">CATÉGORISATION / SERVICE / TAG / PRIORISATION</h2>
      <div class="grid grid-cols-2 gap-2 mt-2">
        <input type="text" placeholder="Titre" class="border p-1"  :value="incident?.mot_cle" />
        <input type="text" placeholder="TAG" class="border p-1" :value="incident?.tags" />
        <input type="text" placeholder="Catégorisation" class="border p-1 col-span-2" :value="incident?.categorisation" />
        <input type="text" placeholder="Service impacté" class="border p-1" :value="incident?.impacte" />
        <input type="text" placeholder="Service impactant" class="border p-1" :value="incident?.service_libelle" />
        <input type="text" placeholder="Causalité" class="border p-1 " :value="incident?.causalite" />
        <input type="text" placeholder="Groupe Expert" class="border p-1" :value="incident?.groupe_expert" />
      </div>
      <div class="flex justify-around mt-4">
        <input type="text" placeholder="Ajout PM" class="col-span-1 border p-1 bg-red-600 text-white font-bold" />
        <input type="text" placeholder="Ajout KM" class="col-span-1 border p-1 bg-red-600 text-white font-bold" :value="incident?.km"/>
      </div>
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
  
  
  