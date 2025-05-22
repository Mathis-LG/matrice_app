<template>
  <section class="border-2 p-4 mt-4">
    <h2 class="font-bold text-blue-800 text-center">ACTION DOSSIER</h2>

    <div v-if="!groupe" class="text-red-600 text-center mt-4">
      Veuillez sélectionner un groupe matériel pour afficher les actions disponibles.
    </div>

    <div v-else-if="groupe === 'UC'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> PING</label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Reboot</label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> deb/reb alimentation</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Branchement mural</label>
        <label><input type="checkbox" v-model="actions.checkbox5" /> Vérification onduleur</label>
      </div>

      <div class="grid gap-2">
        <label>Eventvwr :</label><textarea v-model="text.textarea1" class="border p-1" placeholder="Résultat Eventvwr"></textarea>
        <label>CHKDSK :</label><textarea v-model="text.textarea2" class="border p-1" placeholder="Résultat CHKDSK"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'SERVEUR'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> PING</label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Reboot</label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> deb/reb alimentation</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Branchement mural</label>
        <label><input type="checkbox" v-model="actions.checkbox5" /> Nettoyage / chgt pate thermique</label>
        <label><input type="checkbox" v-model="actions.checkbox6" /> Sans conservation des disques</label>
        <label><input type="checkbox" v-model="actions.checkbox7" /> Cable alimentation et réseau bien branchés</label>
        <label><input type="checkbox" v-model="actions.checkbox8" /> Cause environnementale: Travaux</label>
      </div>

      <div class="grid gap-2">
        <label>Version :</label><textarea v-model="text.textarea1" class="border p-1" placeholder="Version"></textarea>
        <label>HDD :</label><textarea v-model="text.textarea2" class="border p-1" placeholder="HDD"></textarea>
        <label class="text-red-600">N° :</label><textarea v-model="text.textarea3" class="border p-1 " placeholder="N°"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'IMPRIMANTE'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden1" /> Action faite sans succès</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden2" /> Refus manipulation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden3" /> Pas d'accès </label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden4" /> La question n'a pas été posée </label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Cable data </label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> Si voyant, correction </label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Selftest</label>
        <label><input type="checkbox" v-model="actions.checkbox5" /> IMP désactivée sur VLP</label>
      </div>

      <div class="grid gap-2">
        <label class="text-red-600">S\N :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="S\N"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'SCANNER'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden1" /> Action faite sans succès</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden2" /> Refus manipulation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden3" /> Pas d'accès </label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden4" /> La question n'a pas été posée </label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> OPOS </label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> Faisceau allumé</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Parametrage</label>
      </div>

      <div class="grid gap-2">
        <label class="text-red-600">Code erreur si :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="Code erreur si"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'BALANCE'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden1" /> Action faite sans succès</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden2" /> Refus manipulation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden3" /> Pas d'accès </label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden4" /> La question n'a pas été posée </label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> OPOS </label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> bat 925 + 924 </label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Vignette conformité </label>
        <label><input type="checkbox" v-model="actions.checkbox5" /> Nettoyage plateau</label>
      </div>

      <div class="grid gap-2">
        <label class="text-red-600">Numero de série :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="Numero de série"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'ECRAN'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> Calibrage écran</label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Molette</label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> deb/reb alimentation</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Reboot</label>

      </div>

      <div class="grid gap-2">
        <label >Type modèle :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="Type modèle"></textarea>
        <label >S/N (coté écran) :</label><textarea v-model="text.textarea2" class="border p-1 " placeholder="S/N (coté écran)"></textarea>
        <label >FRU PN (coté écran) :</label><textarea v-model="text.textarea3" class="border p-1 " placeholder="FRU PN (coté écran)"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'TPE'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden1" /> Action faite sans succès</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden2" /> Refus manipulation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden3" /> Pas d'accès </label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden4" /> La question n'a pas été posée </label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Souflette insertion CB </label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> Jaune + diez</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Alerte irruption</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Reboot</label>

      </div>

      <div class="grid gap-2">
        <label class="text-red-600">S\N :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="S\N"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'DOUCHETTE'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> SWAP de douchette</label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> Reboot</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Le scanner est il éteint ?</label>
      </div>

    </div>

    <div v-else-if="groupe === 'TIROIR'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> Ergo abscent</label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Reboot</label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> Objet bloquant</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> tiroir désactivé</label>
      </div>

    </div>

    <div v-else-if="groupe === 'VISEUR'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden1" /> Action faite sans succès</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden2" /> Refus manipulation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden3" /> Pas d'accès </label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden4" /> La question n'a pas été posée </label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> reboot</label>
      </div>
    </div>

    <div v-else-if="groupe === 'HDD'" class="mt-4 grid gap-4">
      <div class="grid gap-2">
        <label class="text-red-600">Eventvwr :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="Eventvwr"></textarea>
        <label class="text-red-600">CHKDSK :</label><textarea v-model="text.textarea2" class="border p-1 " placeholder="CHKDSK"></textarea>
      </div>

    </div>

    <div v-else-if="groupe === 'UC'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden1" /> Action faite sans succès</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden2" /> Refus manipulation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden3" /> Pas d'accès </label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden4" /> La question n'a pas été posée </label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Ping</label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> Branchement mural</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Reboot</label>
        <label><input type="checkbox" v-model="actions.checkbox5" /> Vérification onduleur</label>
      </div>
      <div class="grid gap-2">
        <label class="text-red-600">S/N :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="S/N"></textarea>
      </div>
    </div>

    <div v-else-if="groupe === 'RESEAU'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Reboot</label>
      </div>
    </div>

    <div v-else-if="groupe === 'SCO'" class="mt-4 grid gap-4">
      <div class="grid grid-cols-2 gap-2">
        <label><input type="checkbox" v-model="actions.checkbox1" /> deb/reb alimentation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden1" /> Action faite sans succès</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden2" /> Refus manipulation</label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden3" /> Pas d'accès </label>
        <label v-show="actions.checkbox1"><input type="checkbox" v-model="actions.checkboxhidden4" /> La question n'a pas été posée </label>
        <label><input type="checkbox" v-model="actions.checkbox2" /> Ping</label>
        <label><input type="checkbox" v-model="actions.checkbox3" /> Branchement mural</label>
        <label><input type="checkbox" v-model="actions.checkbox4" /> Reboot</label>
        <label><input type="checkbox" v-model="actions.checkbox5" /> Péréphérique</label>
      </div>
      <div class="grid gap-2">
        <label class="text-red-600">Vos actions :</label><textarea v-model="text.textarea1" class="border p-1 " placeholder="Vos actions"></textarea>
      </div>
    </div>

    <div class="grid gap-2">
      <label>Actions supplémentaires :</label><textarea v-model="text.complements" class="border p-2" placeholder="Action(s) spécifique(s)"></textarea>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  groupe: String
})

const actions = ref({
  checkbox1: false, 
  checkbox2: false, 
  checkbox3: false, 
  checkbox4: false, 
  checkbox5: false, 
  checkbox6: false, 
  checkbox7: false, 
  checkbox8: false, 
  checkbox9: false, 
  checkbox10: false, 
  checkboxhidden1: false, 
  checkboxhidden2: false,
  checkboxhidden3: false,
  checkboxhidden4: false,
  checkboxhidden5: false
})

const text = ref({
  textarea1: '',
  textarea2: '',
  textarea3: ''
})

// Optionnel : reset des champs quand le groupe change
watch(() => props.groupe, () => {
  actions.value = {
  checkbox1: false, 
  checkbox2: false, 
  checkbox3: false, 
  checkbox4: false, 
  checkbox5: false, 
  checkbox6: false, 
  checkbox7: false, 
  checkbox8: false, 
  checkbox9: false, 
  checkbox10: false, 
  checkboxhidden1: false, 
  checkboxhidden2: false,
  checkboxhidden3: false,
  checkboxhidden4: false,
  checkboxhidden5: false
  }

  text.value = {
  textarea1: '',
  textarea2: '',
  textarea3: ''
  }
})

// const actions = ref({
//   ping: false,
//   reboot: false,
//   alim: false,
//   branchement: false,
//   onduleur: false,
//   nettoyage: false,
//   no_disque: false,
//   cable_alim_res_plug: false,
//   travaux: false,
//   no_succes: false,
//   refus: false,
//   no_acces: false,
//   no_question: false,
//   data: false,
//   voyant: false,
//   selftest: false,
//   imp: false,
//   opos: false,
//   faisceau: false,
//   parametrage: false,
//   bat: false,
//   vignette: false,
//   nettoyage_plateau: false,
//   calibrage: false,
//   molette: false,
//   souflette: false,
//   jaune_diez: false,
//   alerte_irruption: false,
//   swap: false,
//   eteint: false
// })

// const text = ref({
//   eventvwr: '',
//   chkdsks: '',
//   complements: '',
//   versoin: '',
//   hdd: '',
//   numero: '',
//   sn: '',
//   code_erreur: '',
//   num_serie: '',
//   sn_ecran: '',
//   fru_pn_ecran: ''
// })

// // Optionnel : reset des champs quand le groupe change
// watch(() => props.groupe, () => {
//   actions.value = {
//     ping: false,
//     reboot: false,
//     alim: false,
//     branchement: false,
//     onduleur: false,
//     nettoyage: false,
//     no_disque: false,
//     cable_alim_res_plug: false,
//     travaux: false,
//     no_succes: false,
//     refus: false,
//     no_acces: false,
//     no_question: false,
//     data: false,
//     voyant: false,
//     selftest: false,
//     imp: false,
//     opos: false,
//     faisceau: false,
//     parametrage: false,
//     bat: false,
//     vignette: false,
//     nettoyage_plateau: false,
//     calibrage: false,
//     molette: false,
//     souflette: false,
//     jaune_diez: false,
//     alerte_irruption: false,
//     swap: false,
//     eteint: false
//   }

//   text.value = {
//     eventvwr: '',
//     chkdsks: '',
//     complements: '',
//     version: '',
//     hdd: '',
//     numero: '',
//     sn: '',
//     code_erreur: '',
//     num_serie: '',
//     sn_ecran: '',
//     fru_pn_ecran: ''
//   }
// })
</script>
