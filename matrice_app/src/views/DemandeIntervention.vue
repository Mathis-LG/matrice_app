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
  import { useRouter } from 'vue-router'
  import FicheMagasin from '@/components/FicheMagasin.vue'
  import DescriptionDossier from '@/components/creation_dossier/DescriptionDossier.vue'
  import ActionsDossier from '@/components/creation_dossier/ActionsDossier.vue'
  import ParticulariteDossier from '@/components/creation_dossier/ParticulariteDossier.vue'
  import AffichageGenerations from '@/components/AffichageGenerations.vue'
  import { ref } from 'vue'

  const groupe = ref('')

  const texteAAfficher = ref('')

  const router = useRouter()

  function retourAccueil() {
    router.push('/')
  }


function afficherTexte(type) {

  if (type === 'descriptif') {
    texteAAfficher.value = 'Test affichage'
  }
}

</script>