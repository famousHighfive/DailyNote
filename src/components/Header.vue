<script setup>
import { deconneXion, isAuth, currentUser } from '@/services/authService'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Logique du Mode Sombre / Clair
const isDark = ref(true) 

const toggleMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Persistance au chargement
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
})

const logOut = () => {
  deconneXion()
  router.replace('/')
}
</script>

<template>
  <nav class="fixed top-0 w-full z-50 transition-colors duration-300 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 px-6 h-16 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center">
      <span class="font-bold text-orange-500 dark:text-white uppercase tracking-tighter">DailyNotes</span>
    </div>

    <!-- Liens & Actions -->
    <div class="flex items-center gap-5">
      <router-link v-if="isAuth"
        to="/home" 
        class="text-sm font-medium hover:text-orange-500 transition-colors"
      >
        HOME
      </router-link>

      <span v-if="isAuth" class="bg-orange-200 p-2 rounded-2xl"><span class="font-bold">Connected :</span> {{ currentUser.email }}</span>

      <router-link v-if="!isAuth"
        to="/" 
        class="text-sm hover:text-orange-500 font-medium transition-colors"
      >
        Sign In
      </router-link>

      <!-- Bouton Sign Up -->
      <router-link v-if="!isAuth"
        to="/sign-up" 
        class="px-4 py-1.5 rounded-full border border-orange-600 text-orange-500 text-sm font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300"
      >
        Sign Up
      </router-link>
      <!-- Toggle Button -->
      <button v-if="isAuth"
        @click="toggleMode" 
        class="relative w-12 h-6 flex items-center bg-zinc-200 dark:bg-zinc-800 cursor-pointer rounded-full p-1 transition-all duration-300 focus:outline-none"
      >
        <div 
          class="bg-orange-600 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center"
          :class="isDark ? 'translate-x-6' : 'translate-x-0'"
        >
          <span class="text-[8px] text-white">{{ isDark ? '🌙' : '☀️' }}</span>
        </div>
      </button>

      <button v-if="isAuth" @click="logOut" title="LOGOUT" class="text-zinc-400 cursor-pointer hover:text-orange-500 transition-colors">
         <svg xmlns="http://www.w3.org" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  </nav>
</template>
