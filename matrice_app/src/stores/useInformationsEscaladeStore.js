// stores/useInformationsObligatoires.js
import { defineStore } from 'pinia'

export const useInformationsEscaladeStore = defineStore('informationsEscaladeStore', {
  state: () => ({
    dateHeure: '',
    numCaisse: '',
    lienFileXchange: '',
    versionFastLane: '',
  }),
  actions: {
    setDateHeure(value) {
      this.dateHeure = value
    },
    setNumCaisse(value) {
      this.numCaisse = value
    },
    setLienFileXchange(value) {
      this.lienFileXchange = value
    },
    setVersionFastLane(value) {
      this.versionFastLane = value
    },
    reset() {
      this.dateHeure = ''
      this.numCaisse = ''
      this.lienFileXchange = ''
      this.versionFastLane = ''
    },
  },
})
