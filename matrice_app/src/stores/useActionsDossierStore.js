import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useActionsDossierStore = defineStore('actionsDossier', () => {
  // Groupe matériel sélectionné
  const groupe = ref('')

  // Toutes les actions de type checkbox
  const actions = reactive({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
    checkboxhidden1: false,
    checkboxhidden2: false,
    checkboxhidden3: false,
    checkboxhidden4: false
  })

  // Textareas
  const text = reactive({
    textarea1: '',
    textarea2: '',
    textarea3: '',
    complements: '' // ajouté pour correspondre au dernier textarea dans ton template
  })

  function resetStore() {
    groupe.value = ''
    for (const key in actions) {
      actions[key] = false
    }
    for (const key in text) {
      text[key] = ''
    }
  }

  return {
    groupe,
    actions,
    text,
    resetStore
  }
})
