<template>
    <section class="border-2 p-4">
      <h2 class="font-bold text-blue-800 text-center">AFFICHAGE DES GÉNÉRATIONS</h2>
      <textarea
      class="border w-full h-64 mt-2 p-2"
      :placeholder="formattedPlaceholder"
    ></textarea>
    </section>
  </template>
  
  <script setup>
    import { computed } from 'vue'
    import { useIncidentStore } from '../stores/useIncidentStore'
    import { useMagasinStore } from '../stores/useMagasinStore'
    import { defineExpose } from 'vue'
    
    const store_incident = useIncidentStore()
    const incident = computed(() => store_incident.selectedIncident)

    const store_magasin = useMagasinStore()
    const magasin = computed(() => store_magasin.selectedMagasin)
    
    function reset() {
      store_incident.selectedIncident = null
      store_magasin.selectedMagasin = null
    }

    const formattedPlaceholder = computed(() => {
      if (!incident.value) return ''

      return `DEMANDE MAGASIN : 
      
      ERREUR DETECTEE : ${incident.value.description || ''}

      *****************************************************
      Details de la demande : ${incident.value.cas || ''}   

      Code Anabel : ${magasin.value.anabel || ''}                 
      Adresse :
      ${magasin.value.enseigne || ''} 
      ${magasin.value.adresse || ''}                                  
      ${magasin.value.cp || ''} ${magasin.value.ville || ''}

      Téléphone : ${magasin.value.telephone || ''}

      Téléphone de contact : ${store_magasin.telephone_entrant || ''}

      Numéro de caisse : ${incident.value.numero_caisse || 'N°CAISSE'} 
      Modele UC : ${magasin.value.type_caisse || ''}
      ANOMALIE : ${incident.value.mot_cle || ''}
      `
      })
    
    defineExpose({ reset })
  </script>
  