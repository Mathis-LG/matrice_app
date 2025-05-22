<template>
  <section class="border-2 p-4 mt-4">
    <h2 class="font-bold text-blue-800 text-center">ACTION DOSSIER</h2>

    <div v-if="!groupe" class="text-red-600 text-center mt-4">
      Veuillez sélectionner un groupe matériel pour afficher les actions disponibles.
    </div>

    <div v-else class="mt-4 grid gap-4">
      <!-- Checkboxes -->
      <div class="grid grid-cols-2 gap-2">
        <label v-for="checkbox in currentGroupConfig.checkboxes" :key="checkbox.modelKey" v-show="!checkbox.showIf || actions[checkbox.showIf]">
          <input type="checkbox" v-model="actions[checkbox.modelKey]" />
          {{ checkbox.label }}
        </label>
      </div>

      <!-- CheckboxHidden : affichés selon dependsOn -->
      <div class="grid grid-cols-2 gap-2" v-if="currentGroupConfig.checkboxHiddens">
        <label 
          v-for="chkHidden in currentGroupConfig.checkboxHiddens" 
          :key="chkHidden.modelKey"
          v-show="!chkHidden.dependsOn || actions[chkHidden.dependsOn]"
        >
          <input type="checkbox" v-model="actions[chkHidden.modelKey]" />
          {{ chkHidden.label }}
        </label>
      </div>

      <!-- Textareas -->
      <div class="grid gap-2" v-if="currentGroupConfig.textareas">
        <label v-for="textarea in currentGroupConfig.textareas" :key="textarea.modelKey" :class="textarea.class || ''">
          {{ textarea.label }} :
          <textarea
            v-model="text[textarea.modelKey]"
            class="border p-1"
            :placeholder="textarea.placeholder"
          ></textarea>
        </label>
      </div>
    </div>
  </section>
</template>


<script setup>
import { watch, computed } from 'vue'
import { useActionsDossierStore } from '@/stores/useActionsDossierStore'

const props = defineProps({
  groupe: String
})

const actionsDossierStore = useActionsDossierStore()

const groupesConfig = {
  UC: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'Ping' },
      { modelKey: 'checkbox3', label: 'Branchement mural' },
      { modelKey: 'checkbox4', label: 'Reboot' },
      { modelKey: 'checkbox5', label: 'Vérification onduleur' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès' },
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation' },
      { modelKey: 'checkboxhidden3', label: "Pas d'accès" },
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée" }
    ],
    textareas: [
      { modelKey: 'textarea1', label: 'S/N', placeholder: 'S/N' }
    ]
  },

  SERVEUR: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'PING' },
      { modelKey: 'checkbox2', label: 'Reboot' },
      { modelKey: 'checkbox3', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox4', label: 'Branchement mural' },
      { modelKey: 'checkbox5', label: 'Nettoyage / chgt pate thermique' },
      { modelKey: 'checkbox6', label: 'Sans conservation des disques' },
      { modelKey: 'checkbox7', label: 'Cable alimentation et réseau bien branchés' },
      { modelKey: 'checkbox8', label: 'Cause environnementale: Travaux' }
    ],
    textareas: [
      { modelKey: 'textarea1', label: 'Version', placeholder: 'Version' },
      { modelKey: 'textarea2', label: 'HDD', placeholder: 'HDD' },
      { modelKey: 'textarea3', label: 'N°', placeholder: 'N°', class: 'text-red-600' }
    ]
  },

  IMPRIMANTE: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'Cable data' },
      { modelKey: 'checkbox3', label: 'Si voyant, correction' },
      { modelKey: 'checkbox4', label: 'Selftest' },
      { modelKey: 'checkbox5', label: 'IMP désactivée sur VLP' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden3', label: "Pas d'accès", dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée", dependsOn: 'checkbox1' }
    ],
    textareas: [
      { modelKey: 'textarea1', label: 'S/N', placeholder: 'S/N', class: 'text-red-600' }
    ]
  },

  SCANNER: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'OPOS' },
      { modelKey: 'checkbox3', label: 'Faisceau allumé' },
      { modelKey: 'checkbox4', label: 'Parametrage' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden3', label: "Pas d'accès", dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée", dependsOn: 'checkbox1' }
    ],
    textareas: [
      { modelKey: 'textarea1', label: 'Code erreur si', placeholder: 'Code erreur si', class: 'text-red-600' }
    ]
  },

  BALANCE: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'OPOS' },
      { modelKey: 'checkbox3', label: 'bat 925 + 924' },
      { modelKey: 'checkbox4', label: 'Vignette conformité' },
      { modelKey: 'checkbox5', label: 'Nettoyage plateau' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden3', label: "Pas d'accès", dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée", dependsOn: 'checkbox1' }
    ],
    textareas: [
      { modelKey: 'textarea1', label: 'Numero de série', placeholder: 'Numero de série', class: 'text-red-600' }
    ]
  },

  ECRAN: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'Calibrage écran' },
      { modelKey: 'checkbox2', label: 'Molette' },
      { modelKey: 'checkbox3', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox4', label: 'Reboot' }
    ],
    textareas: [
      { modelKey: 'textarea1', label: 'Type modèle', placeholder: 'Type modèle' },
      { modelKey: 'textarea2', label: 'S/N (coté écran)', placeholder: 'S/N (coté écran)' },
      { modelKey: 'textarea3', label: 'FRU PN (coté écran)', placeholder: 'FRU PN (coté écran)' }
    ]
  },

  TPE: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'Souflette insertion CB' },
      { modelKey: 'checkbox3', label: 'Jaune + diez' },
      { modelKey: 'checkbox4', label: 'Alerte irruption' },
      { modelKey: 'checkbox5', label: 'Reboot' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden3', label: "Pas d'accès", dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée", dependsOn: 'checkbox1' }
    ],
    textareas: [
      { modelKey: 'textarea1', label: 'S/N', placeholder: 'S/N', class: 'text-red-600' }
    ]
  },

  DOUCHETTE: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'SWAP de douchette' },
      { modelKey: 'checkbox3', label: 'Reboot' },
      { modelKey: 'checkbox4', label: 'Le scanner est il éteint ?' }
    ]
  },

  TIROIR: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'Ergo abscent' },
      { modelKey: 'checkbox2', label: 'Reboot' },
      { modelKey: 'checkbox3', label: 'Objet bloquant' },
      { modelKey: 'checkbox4', label: 'tiroir désactivé' }
    ]
  },

  VISEUR: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'reboot' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation', dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden3', label: "Pas d'accès", dependsOn: 'checkbox1' },
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée", dependsOn: 'checkbox1' }
    ]
  },

  HDD: {
    textareas: [
      { modelKey: 'textarea1', label: 'Eventvwr', placeholder: 'Eventvwr', class: 'text-red-600' },
      { modelKey: 'textarea2', label: 'CHKDSK', placeholder: 'CHKDSK', class: 'text-red-600' }
    ]
  },

  RESEAU: {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'Reboot' }
    ]
  },

  "SCO DN": {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'Ping' },
      { modelKey: 'checkbox3', label: 'Branchement mural' },
      { modelKey: 'checkbox4', label: 'Reboot' },
      { modelKey: 'checkbox5', label: 'Péréphérique' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès', dependsOn: 'checkbox1'},
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation', dependsOn: 'checkbox1'},
      { modelKey: 'checkboxhidden3', label: "Pas d'accès", dependsOn: 'checkbox1'},
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée", dependsOn: 'checkbox1'}
    ]
  },
    "SCO NCR": {
    checkboxes: [
      { modelKey: 'checkbox1', label: 'deb/reb alimentation' },
      { modelKey: 'checkbox2', label: 'Ping' },
      { modelKey: 'checkbox3', label: 'Branchement mural' },
      { modelKey: 'checkbox4', label: 'Reboot' },
      { modelKey: 'checkbox5', label: 'Péréphérique' }
    ],
    checkboxHiddens: [
      { modelKey: 'checkboxhidden1', label: 'Action faite sans succès', dependsOn: 'checkbox1'},
      { modelKey: 'checkboxhidden2', label: 'Refus manipulation', dependsOn: 'checkbox1'},
      { modelKey: 'checkboxhidden3', label: "Pas d'accès", dependsOn: 'checkbox1'},
      { modelKey: 'checkboxhidden4', label: "La question n'a pas été posée", dependsOn: 'checkbox1'}
    ]
  }
};


watch(() => props.groupe, (newGroupe) => {
  actionsDossierStore.groupe = newGroupe || ''
  actionsDossierStore.resetStore()
  actionsDossierStore.groupe = newGroupe || ''
})

const groupe = computed(() => actionsDossierStore.groupe)
const actions = computed(() => actionsDossierStore.actions)
const text = computed(() => actionsDossierStore.text)

const currentGroupConfig = computed(() => groupesConfig[groupe.value] || { checkboxes: [], textareas: [] })
</script>
