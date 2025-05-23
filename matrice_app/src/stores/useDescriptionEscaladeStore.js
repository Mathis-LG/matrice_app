// stores/useDescriptionEscalade.js
import { defineStore } from 'pinia'

export const useDescriptionEscaladeStore = defineStore('descriptionEscalade', {
  state: () => ({
    numeroCare: '',
    codeErreur: '',
    anomalie: '',
  }),
  actions: {
    setNumeroCare(value) {
      this.numeroCare = value
    },
    setCodeErreur(value) {
      this.codeErreur = value
    },
    setAnomalie(value) {
      this.anomalie = value
    },
    reset() {
      this.numeroCare = ''
      this.codeErreur = ''
      this.anomalie = ''
    },
  },
})
