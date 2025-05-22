<template>
  <div  class="min-h-screen bg-gray-300 p-6">
    <div class="space-y-6 bg-white rounded-lg">
      <h1 class="text-2xl font-bold text-center mb-4">Demande d'intervention</h1>

      <FicheMagasin />
      <DescriptionDossier @update:groupe="groupe = $event" />
      <ActionsDossier :groupe="groupe" />
      <ParticulariteDossier />

      <button
        class="cursor-pointer  bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
        @click="afficherTexte('descriptif')"
      >
        DESCRIPTIF
      </button>
      <AffichageGenerations :texte="texteAAfficher" />

      <!-- Bouton retour -->
      <div class="mb-4 text-center">
        <button
          @click="retourAccueil"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retour à l'accueil
        </button>
      </div>

    </div>
    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useActionsDossierStore } from '@/stores/useActionsDossierStore'
import { useMagasinStore } from '@/stores/useMagasinStore'
import { useDescriptionDossierStore } from '@/stores/useDescriptionDossierStore'
import { useParticulariteDossierStore } from '@/stores/useParticulariteDossierStore'

import FicheMagasin from '@/components/FicheMagasin.vue'
import DescriptionDossier from '@/components/creation_dossier/DescriptionDossier.vue'
import ActionsDossier from '@/components/creation_dossier/ActionsDossier.vue'
import ParticulariteDossier from '@/components/creation_dossier/ParticulariteDossier.vue'
import AffichageGenerations from '@/components/AffichageGenerations.vue'

const router = useRouter()

// Instanciation des stores
const actionsDossierStore = useActionsDossierStore()
const magasinStore = useMagasinStore()
const descriptionDossierStore = useDescriptionDossierStore()
const particulariteDossierStore = useParticulariteDossierStore()

// Groupe lié au store actionsDossier
const groupe = computed({
  get: () => actionsDossierStore.groupe,
  set: val => (actionsDossierStore.groupe = val)
})

const texteAAfficher = ref('')

function retourAccueil() {
  router.push('/')
}

function afficherTexte(type) {
  if (type === 'descriptif') {
    const { groupe, actions, text } = actionsDossierStore
    const { selectedMagasin } = magasinStore
    const { selected: description } = descriptionDossierStore
    const { selected: particularite } = particulariteDossierStore

    // Assure-toi que groupesConfig est disponible ici, sinon importe ou définis-le
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

    const currentGroupConfig = groupesConfig[groupe] || { checkboxes: [], checkboxHiddens: [], textareas: [] }

    // Fusionner checkboxes et checkboxHiddens
    const allCheckboxes = [
      ...(currentGroupConfig.checkboxes || []),
      ...(currentGroupConfig.checkboxHiddens || [])
    ]

    // Fonction pour récupérer le label correspondant à une clé dans les textareas
    function getLabelFromKey(key, textareas) {
      const textarea = textareas.find(t => t.modelKey === key)
      return textarea ? textarea.label : key
    }

    let texte = '--- Informations Magasin ---\n'
    texte += `Enseigne : ${selectedMagasin.enseigne}\n`
    texte += `Téléphone : ${selectedMagasin.telephone}\n`
    texte += `Adresse : ${selectedMagasin.adresse}, ${selectedMagasin.cp} ${selectedMagasin.ville}\n`
    texte += `Anabel : ${selectedMagasin.anabel}\n`
    texte += `Type caisse : ${selectedMagasin.type_caisse}\n`
    texte += `Serveur : ${selectedMagasin.serveur}\n\n`

    texte += '--- Description Dossier ---\n'
    texte += `Caisse : ${description.caisse || '-'}\n`
    texte += `Groupe matériel : ${description.groupe || '-'}\n`
    texte += `Matériel : ${description.materiel || '-'}\n`
    texte += `Niveau : ${description.niveau || '-'}\n`
    texte += `Anomalie : ${description.anomalie || '-'}\n\n`

    texte += '--- Actions sélectionnées ---\n'
    // Parcours toutes les checkboxes, si cochée dans actions, affiche son label
    allCheckboxes.forEach(chk => {
      if (actions[chk.modelKey]) {
        texte += ` - ${chk.label}\n`
      }
    })

    texte += '\nCommentaires :\n'
    for (const [key, val] of Object.entries(text)) {
      if (val && val.trim() !== '') {
        const label = getLabelFromKey(key, currentGroupConfig.textareas || [])
        texte += `• ${label} : ${val}\n`
      }
    }

    texte += '\n--- Particularités ---\n'
    texte += `Avec câble : ${particularite.avecCable ? 'Oui' : 'Non'}\n`
    texte += `Sans câble : ${particularite.sansCable ? 'Oui' : 'Non'}\n`
    texte += `Rajouter au : ${particularite.enonce || '-'}\n`

    texteAAfficher.value = texte
  }
}


</script>
