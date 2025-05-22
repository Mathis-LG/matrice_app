<template>
  <section class="border-2 p-4">
    <h2 class="font-bold text-blue-800 text-center">AFFICHAGE DES GÉNÉRATIONS</h2>
    <textarea
      class="border w-full h-64 mt-2 p-2"
      :value="texte"
      readonly
    ></textarea>
  </section>
</template>

<script setup>
defineProps({
  texte: {
    type: String,
    default: ''
  }
})
</script>
