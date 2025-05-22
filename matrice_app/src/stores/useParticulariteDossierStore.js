import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useParticulariteDossierStore = defineStore('particularite', () => {
  const selected = reactive({
    avecCable: false,
    sansCable: false,
    enonce: ''
  })

  function reset() {
    selected.avecCable = false
    selected.sansCable = false
    selected.enonce = ''
  }

  return { selected, reset }
})
