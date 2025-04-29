import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIncidentStore = defineStore('incident', () => {
  const selectedIncident = ref(null)

  function setIncident(incident) {
    selectedIncident.value = incident
  }

  return {
    selectedIncident,
    setIncident
  }
})
