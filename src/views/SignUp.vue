<script setup>
import { ref } from 'vue';
const users = ref([])
const firstName = ref('')

function submitForm(){
    // champs non vides

    // push des donnees dans le tableau

    // sauvegarde dans localStorage (user)

    // redirection vers login

    // vider les champs si cest pas le bon identifant
}
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl border-t-4 border-t-orange-600">
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-white">Créer un compte</h1>
        <p class="text-zinc-500">C'est rapide et gratuit.</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1">Prénom</label>
            <input v-model="firstName" type="text" class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-zinc-400 mb-1">Nom</label>
            <input type="text" class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-1">Email</label>
          <input type="email" class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all">
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-1">Mot de passe</label>
          <input type="password" class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all">
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-400 mb-1">Confirmer mot de passe</label>
          <input type="password" class="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all">
        </div>

        <div class="flex items-start gap-3 pt-2">
          <input type="checkbox" class="mt-1 accent-orange-600 h-4 w-4">
          <label class="text-xs text-zinc-500">J'accepte les <span class="text-orange-500">Conditions d'Utilisation</span> et la Politique de Confidentialité.</label>
        </div>

        <button type="submit" class="w-full bg-white hover:bg-orange-600 text-black hover:text-white font-bold py-4 rounded-xl transition-all duration-300 mt-4">
          JE M'INSCRIS
        </button>
      </form>
    </div>
  </div>
</template>
