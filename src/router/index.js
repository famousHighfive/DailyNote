import { isAuth } from '@/services/authService'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {requiresAuth: true}
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !isAuth.value){
    next('/')
  }else if(to.name === 'login' && isAuth.value){
    next('/home')
  }else{
    next()
  }
})

export default router
