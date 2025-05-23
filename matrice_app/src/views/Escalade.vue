<template>
  <div  class="min-h-screen bg-gray-300 p-6">
    <div class="space-y-6 bg-white rounded-lg">
      <h1 class="text-2xl font-bold text-center mb-4">Demande d'intervention</h1>

      <FicheMagasin />
      <DescriptionEscalade />
      <InformationEscalade />

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

import { useMagasinStore } from '@/stores/useMagasinStore'
import { useDescriptionEscaladeStore } from '@/stores/useDescriptionEscaladeStore'
import { useInformationsEscaladeStore } from '@/stores/useInformationsEscaladeStore'


import FicheMagasin from '@/components/FicheMagasin.vue'
import DescriptionEscalade from '@/components/escalade/DescriptionEscalade.vue'
import InformationEscalade from '@/components/escalade/InformationEscalade.vue'
import AffichageGenerations from '@/components/AffichageGenerations.vue'

const router = useRouter()

// Instanciation des stores
const magasinStore = useMagasinStore()
const descriptionStore = useDescriptionEscaladeStore()
const informationsStore = useInformationsEscaladeStore()


// Groupe lié au store actionsDossier
const groupe = computed({
  get: () => actionsDossierStore.groupe,
  set: val => (actionsDossierStore.groupe = val)
})


function retourAccueil() {
  router.push('/')
}

const texteAAfficher = ref('')

function afficherTexte() {
  const magasin = magasinStore.selectedMagasin

  const texte = `
🏬 Informations Magasin
• Enseigne : ${magasin.enseigne || 'Non renseigné'}
• Adresse : ${magasin.adresse || 'Non renseigné'}, ${magasin.cp || ''} ${magasin.ville || ''}
• Téléphone : ${magasin.telephone || 'Non renseigné'}
• Anabel : ${magasin.anabel || 'Non renseigné'}
• Type de caisse : ${magasin.type_caisse || 'Non renseigné'}
• Serveur : ${magasin.serveur || 'Non renseigné'}
• Téléphone entrant : ${magasinStore.telephone_entrant || 'Non renseigné'}
• Sycron : ${magasinStore.sycron || 'Non renseigné'}

📆 Anomalie
• Date et heure : ${informationsStore.dateHeure || 'Non renseigné'}
• Numéro de caisse : ${informationsStore.numCaisse || 'Non renseigné'}
• Lien FileXchange : ${informationsStore.lienFileXchange || 'Non renseigné'}
• Version FastLane : ${informationsStore.versionFastLane || 'Non renseigné'}

📋 Description de l'anomalie
• N° CARE : ${descriptionStore.numeroCare || 'Non renseigné'}
• Code erreur : ${descriptionStore.codeErreur || 'Non renseigné'}
• Anomalie : ${descriptionStore.anomalie || 'Non renseigné'}
  `.trim()

  texteAAfficher.value = texte
}




</script>
