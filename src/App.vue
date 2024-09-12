<template>
  <div class="min-h-screen flex flex-col">
    
    <header class="bg-blue-600 text-white p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Customer Management Platform</h1>

        <div v-if="isAuthenticated" class="space-x-4">
          <router-link to="/Home" class="hover:underline">Home</router-link>
          <button @click="logout" class="hover:underline">Logout</button>
        </div>

        <div v-else class="space-x-4">
          <router-link to="/login" class="hover:underline">Login</router-link>
          <router-link to="/sign-up" class="hover:underline">SignUp</router-link>
        </div>
      </nav>
    </header>

   
    <main class="flex-grow">
      <router-view />
    </main>

    
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2024 </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAuthStore } from './stores/auth';
import { computed,onMounted } from 'vue';

const router = useRouter()
const authStore = useAuthStore();
const isAuthenticated = computed(()=>authStore.isAuthenticated)


onMounted(()=>{
  const userData=localStorage.getItem("user")
  if(typeof userData==='string'){
    authStore.isAuthenticated=true
  }
})

const logout = () => {
  authStore.logout();
  router.push("/login")
};
</script>

<style>
</style>
