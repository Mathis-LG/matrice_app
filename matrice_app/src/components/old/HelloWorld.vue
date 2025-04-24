<template>
  <div class="p-4 grid grid-cols-2 gap-4 bg-white min-h-screen text-sm">
    <!-- Colonne gauche -->
    <div class="space-y-4">
      <!-- Fiche magasin -->
      <section class="border p-4">
        <h2 class="font-bold text-blue-800">FICHE MAGASIN</h2>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <input type="text" placeholder="CODE SYCRON" class="col-span-1 border p-1 bg-red-600 text-white font-bold" />
          <input type="text" placeholder="Adresse" class="col-span-1 border p-1" />
          <input type="text" placeholder="Code Anabel" class="col-span-1 border p-1" />
          <input type="text" placeholder="Numéro de téléphone appelant" class="col-span-3 border p-1" />
          <input type="text" placeholder="Équipement UC" class="col-span-1 border p-1" />
          <input type="text" placeholder="Équipement Serveur" class="col-span-1 border p-1" />
        </div>
      </section>

      <!-- Description -->
      <section class="border p-4">
        <h2 class="font-bold text-blue-800 text-center">DESCRIPTION</h2>
        <div class="mt-2">
          <div class="flex gap-2 text-xs">
            <button class="border px-2 py-1">Recherche par anomalie</button>
            <button class="border px-2 py-1">Recherche par SYM</button>
            <button class="border px-2 py-1">Recherche par anomalie SCO</button>
          </div>
          <p class="text-red-600 italic text-xs mt-2">Recherche à faire sans accent</p>
          <div class="flex gap-2 items-center mt-2">
            <input type="text" placeholder="Recherche" class="border p-1 flex-1" />
            <select class="border p-1">
              <option value="">N°CAISSE</option>
            </select>
          </div>
          <textarea class="border w-full h-24 mt-2 p-2" placeholder="Résultat"></textarea>
          <div class="flex justify-between mt-2">
            <button class="bg-green-600 text-white px-4 py-1">SYM manquant</button>
            <button class="bg-red-600 text-white px-4 py-1">Site Manquant</button>
            <button class="bg-green-600 text-white px-4 py-1">Correction SYM</button>
          </div>
        </div>
      </section>

      <!-- Catégorisation -->
      <section class="border p-4">
        <h2 class="font-bold text-blue-800 text-center">CATÉGORISATION / SERVICE / TAG / PRIORISATION</h2>
        <div class="grid grid-cols-2 gap-2 mt-2">
          <input type="text" placeholder="Titre" class="border p-1" />
          <input type="text" placeholder="TAG" class="border p-1" />
          <input type="text" placeholder="Catégorisation" class="border p-1" />
          <input type="text" placeholder="Service impacté" class="border p-1" />
          <input type="text" placeholder="Service impactant" class="border p-1" />
          <input type="text" placeholder="Groupe Expert" class="border p-1" />
          <input type="text" placeholder="Causalité" class="border p-1 col-span-2" />
        </div>
        <div class="flex justify-around mt-4">
          <button class="bg-red-600 text-white px-4 py-1">AJOUT PM</button>
          <button class="bg-red-600 text-white px-4 py-1">AJOUT KM</button>
        </div>
      </section>
    </div>

    <!-- Colonne droite -->
    <div class="space-y-4">
      <!-- Actions -->
      <section class="border p-4">
        <h2 class="font-bold text-blue-800 text-center">ACTIONS</h2>
        <p class="text-red-600 text-xs">Merci d'effectuer les tâches supports ci dessous<br/>Si vous ne les faites pas, supprimez-les du descriptif généré. DÉTAILLEZ VOS ACTIONS !</p>
        <textarea class="border w-full h-24 mt-2 p-2"></textarea>
        <div class="flex gap-4 mt-2 justify-center">
          <button class="border px-4 py-1">AIDE CABLAGE</button>
          <button class="border px-4 py-1">SCAN MAG</button>
        </div>
      </section>

      <!-- Création dossier -->
      <section class="border p-4">
        <h2 class="font-bold text-blue-800 text-center">CRÉATION DOSSIER</h2>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <button class="bg-orange-500 text-white py-2">DESCRIPTIF</button>
          <button class="bg-pink-500 text-white py-2">DEMANDE D'INTERVENTION</button>
          <button class="bg-purple-700 text-white py-2">ESCALADE N2</button>
          <button class="bg-red-800 text-white py-2">ESCALADE INGENICO</button>
          <button class="bg-green-700 text-white py-2">ESCALADE NCR LOGICIEL</button>
          <button class="bg-blue-700 text-white py-2">RÉSOLUTION</button>
        </div>
      </section>

      <!-- Affichage des générations -->
      <section class="border p-4">
        <h2 class="font-bold text-blue-800 text-center">AFFICHAGE DES GÉNÉRATIONS</h2>
        <textarea class="border w-full h-32 mt-2 p-2" placeholder="Descriptif à copier/coller sur le dossier CARE"></textarea>
        <div class="flex justify-end mt-2">
          <button class="bg-green-500 text-white px-4 py-1">RESET FORMULAIRE</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// logique ici (si besoin)
</script>

<style scoped>
/* tu peux aussi mettre du style personnalisé ici */
</style>
