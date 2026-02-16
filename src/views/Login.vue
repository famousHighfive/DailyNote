<script setup>
import { reactive, ref } from 'vue';
import { conneXion, users } from '@/services/authService';
import { useRouter } from 'vue-router';

const router = useRouter()
const msg = ref(null)
const modalOpen = ref(false)

/*--------------------------------------------------------
Variable du formulaire
---------------------------------------------------------*/
const form = reactive({
  email : '',
  password : ''
})

/*--------------------------------------------------------
Valider la connexion
---------------------------------------------------------*/
const logIn = () => {
    const checked = conneXion(form.email, form.password)

    if(checked.success){
      router.push({name: 'home'})
    }else{
      msg.value = checked.message
      modalOpen.value = true

      setTimeout(() => {
        modalOpen.value = false
      }, 3000)
      form.email = ''
      form.password = ''
    }
}
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-white tracking-tight">Connexion</h1>
        <p class="text-zinc-500 mt-2">Accédez à votre calendrier des taches</p>
      </div>

      <form @submit.prevent="logIn" class="space-y-6">
        <div>
          <label class="block text-xs font-semibold text-orange-500 uppercase tracking-wider mb-2">Email</label>
          <input v-model="form.email" type="email" class="w-full bg-black border border-zinc-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder:text-zinc-600" placeholder="admin@orange.com">
        </div>

        <div>
          <div class="flex justify-between mb-2">
            <label class="text-xs font-semibold text-orange-500 uppercase tracking-wider">Mot de passe</label>
            <a href="#" class="text-xs text-zinc-500 hover:text-orange-400 transition-colors">Oublié ?</a>
          </div>
          <input v-model="form.password" type="password" class="w-full bg-black border border-zinc-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder:text-zinc-600" placeholder="••••••••">
        </div>

        <button class="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-900/20">
          SE CONNECTER
        </button>
      </form>
    </div>
  </div>

      <!-- Modal -->
    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

        <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center animate-scale">

            <svg class="w-20 h-20 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            <h3 class="text-lg font-semibold text-gray-700 mb-4">
               {{ msg }}
            </h3>

            <button @click="modalOpen = false"
                class="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition">
                OK
            </button>

        </div>
    </div>
</template>
