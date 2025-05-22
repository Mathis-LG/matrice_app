import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMagasinStore = defineStore('magasin', () => {
  const selectedMagasin = ref({
    telephone: '',
    enseigne: '',
    adresse: '',
    cp: '',
    ville: '',
    anabel: '',
    type_caisse: '',
    serveur: ''
  })

  const telephone_entrant = ref('')
  const sycron = ref('') 

  function setMagasin(magasin) {
    selectedMagasin.value = magasin
  }

  function setSycron(value) {
    sycron.value = value
  }

  return {
    selectedMagasin,
    telephone_entrant,
    sycron,         
    setMagasin,
    setSycron       
  }
})
