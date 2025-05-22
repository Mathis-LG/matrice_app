<template>
  <section class="border-2 p-4">
    <h2 class="font-bold text-blue-800 text-center">DESCRIPTION</h2>

    <div class="grid grid-cols-5 gap-2 items-center">
      <select v-model="descriptionStore.selected.caisse" class="border p-1">
        <option value="">CAISSE</option>
        <option
          v-for="option in descriptionStore.options.caisse"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>

      <select v-model="descriptionStore.selected.groupe" class="border p-1">
        <option value="">GROUPE MAT</option>
        <option
          v-for="option in descriptionStore.options.groupe"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>

      <select v-model="descriptionStore.selected.materiel" class="border p-1">
        <option value="">MATERIEL</option>
        <option
          v-for="option in descriptionStore.options.materiel"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>

      <select v-model="descriptionStore.selected.niveau" class="border p-1">
        <option value="">- NIV -</option>
        <option
          v-for="option in descriptionStore.options.niveau"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>

      <select
        v-model="descriptionStore.selected.anomalie"
        class="border p-1 col-span-2"
      >
        <option value="">ANOMALIE</option>
        <option
          v-for="option in descriptionStore.options.anomalie"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </section>
</template>


<script setup>
import { onMounted, watch } from 'vue'
import { useDescriptionDossierStore } from '@/stores/useDescriptionDossierStore'

const descriptionStore = useDescriptionDossierStore()

const emit = defineEmits(['update:groupe'])

// Chargement au montage
onMounted(() => {
  descriptionStore.loadInitialOptions()
})

// Watch sur selected.groupe dans le store
watch(() => descriptionStore.selected.groupe, async (newGroupe) => {
  emit('update:groupe', newGroupe)
  await descriptionStore.loadMaterielAnomalies(newGroupe)
})



</script>



