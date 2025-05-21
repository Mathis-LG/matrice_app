import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMagasinStore = defineStore('magasin', () => {
  const selectedMagasin = ref(null)
  const telephone_entrant = ref('')

  function setMagasin(magasin) {
    selectedMagasin.value = magasin
  }

  return {
    selectedMagasin,
    telephone_entrant,
    setMagasin
  }
})
