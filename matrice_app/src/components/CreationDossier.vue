<template>
  <section class="border-2 p-4">
    <h2 class="font-bold text-blue-800 text-center">CRÉATION DOSSIER</h2>
    <div class="grid grid-cols-3 gap-2 mt-2">
      <button
        class="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
        @click="afficherTexte('descriptif')"
      >
        DESCRIPTIF
      </button>

      <button
        class="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
        @click="goToDemandeIntervention"
      >
        DEMANDE D'INTERVENTION
      </button>

      <button
        class="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg"
        @click="afficherTexte('escalade')"
      >
        ESCALADE
      </button>

      <button class="cursor-pointer bg-red-800 hover:bg-red-900 text-white py-2 rounded-lg"
       @click="goToDemandeEscalade"
      >
        ESCALADE INGENICO
      </button>

      <button class="cursor-pointer bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg"
       @click="goToDemandeEscalade"
      >
        ESCALADE NCR LOGICIEL
      </button>
      
      <button 
        class="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg"
        @click="afficherTexte('resolution')"
      >
      RÉSOLUTION
      </button>

      <!-- autres boutons si besoin -->
    </div>

    <!-- Affichage ici -->
    <AffichageGenerations class="mt-6" :texte="texteAAfficher" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useIncidentStore } from '../stores/useIncidentStore'
import { useMagasinStore } from '../stores/useMagasinStore'
import AffichageGenerations from './AffichageGenerations.vue'

const router = useRouter()
const store_incident = useIncidentStore()
const store_magasin = useMagasinStore()

const incident = computed(() => store_incident.selectedIncident)
const magasin = computed(() => store_magasin.selectedMagasin)

const texteAAfficher = ref('')

function afficherTexte(type) {
  // if (!incident.value || !magasin.value) {
  //   texteAAfficher.value = 'Aucun incident ou magasin sélectionné.'
  //   return
  // }

  if (type === 'descriptif') {
    texteAAfficher.value = `DEMANDE MAGASIN :

ERREUR DETECTEE : ${incident.value.description || ''}

*****************************************************
Details de la demande : ${incident.value.cas || ''}   

Code Anabel : ${magasin.value.anabel || ''}                 
Adresse :
${magasin.value.enseigne || ''} 
${magasin.value.adresse || ''}                                  
${magasin.value.cp || ''} ${magasin.value.ville || ''}

Téléphone : ${magasin.value.telephone || ''}
Téléphone de contact : ${store_magasin.telephone_entrant || ''}

Numéro de caisse : ${incident.value.numero_caisse || 'N°CAISSE'} 
Modele UC : ${magasin.value.type_caisse || ''}
ANOMALIE : ${incident.value.mot_cle || ''}`
  } else if (type === 'escalade') {
    texteAAfficher.value = `Template Escalade : 
 
Bonjour, Pouvez-vous voir la demande ci dessous :
 

Diagnostic
 
 
Actions réalisées :
 
 
Solution Technique (A adapter en cas de besoin):
 
 
Cordialement,
 
Support CHAPSVISION`
  } else if (type === 'resolution') {
    texteAAfficher.value = `Bonjour,

Vous avez contacté SYMAG pour la problématique suivante : 
Voici les actions effectuées : 
${incident.value.support || ''}


Si vous êtes satisfait du traitement de cette demande, n'hésitez pas à nous mettre un 9 ou 10 sur l'enquête de satisfaction qui suit ; quelques secondes suffisent.
Si la résolution ne vous a pas apporté totale satisfaction, vous avez 10 jours pour rouvrir l'incident via le portail CARE, ou via un rappel téléphonique en précisant le numéro de votre demande.

Renforcez votre autonomie en utilisant le 'Guide de 1er secours encaissement' : https://drive.google.com/file/d/1hcAgnPSu-DeeLTWpz1f67V-fiFKKcMye/view

Cordialement,
Support Carrefour`
  }
}

function goToDemandeIntervention() {
  router.push('/demande-intervention')
}

function goToDemandeEscalade() {
  router.push('/escalade')
}
</script>
