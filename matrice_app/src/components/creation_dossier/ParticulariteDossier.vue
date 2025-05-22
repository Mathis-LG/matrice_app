<template>
  <section class="border-2 p-4 mt-4">
    <h2 class="font-bold text-blue-800 text-center">PARTICULARITE</h2>

    <div class="flex gap-4 mt-4 items-center">
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="selected.avecCable" />
        Avec câble
      </label>

      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="selected.sansCable" />
        Sans câble
      </label>
    </div>

    <div class="mt-4">
      <label class="block font-semibold text-sm mb-1">Rajouter au: </label>
      <textarea
        v-model="selected.enonce"
        class="border p-2 w-full"
        rows="4"
        placeholder=""
      ></textarea>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref({
  avecCable: false,
  sansCable: false,
  enonce: ''
})
</script>

<style scoped>
textarea {
  resize: vertical;
}
</style>
