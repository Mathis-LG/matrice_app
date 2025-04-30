<template>
    <div class="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white w-96 p-4 rounded shadow-lg relative">
        <h2 class="text-lg font-bold text-center mb-4">Site MANQUANT</h2>
  
        <label class="block text-sm">Sycron Site</label>
        <input type="text" v-model="sycron" class="border w-full mb-2 p-1" />
  
        <label class="block text-sm">Nom magasin</label>
        <textarea v-model="magasin" class="border w-full mb-2 p-1 h-16"></textarea>
  
        <label class="block text-sm">Date d'ouverture</label>
        <textarea v-model="date" class="border w-full mb-2 p-1 h-16"></textarea>
  
        <div class="flex justify-between mt-4">
          <button @click="sendMail" class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Envoi MAIL</button>
          <button @click="$emit('close')" class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Annuler</button>
        </div>
  
        <!-- Bouton X en haut à droite -->
        <button @click="$emit('close')" class="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black">×</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const sycron = ref('')
  const magasin = ref('')
  const date = ref('')
  
  function sendMail() {
        const to = 'destinataire@domaine.com';
        const subject = encodeURIComponent(`Site MANQUANT - Magasin :${magasin.value}`);
        const body = encodeURIComponent(
            `Code Sycron :\n${sycron.value}\n\nDate :\n${date.value}`
        );

        const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }
  </script>
  