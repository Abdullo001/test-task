<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>

        <div v-if="error" class="text-red-500 text-center mt-4">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = () => {
  const registeredUser=JSON.parse(localStorage.getItem("registeredUser")||"")
  if(!!registeredUser){
    if (email.value === registeredUser.email && password.value === registeredUser.password) {
      const userInfo = { email: email.value };
      authStore.login(userInfo); 
      router.push('/home'); 
    } else {
      error.value = 'Invalid email or password';
    }
  }else{
    if (email.value === 'test@example.com' && password.value === 'password') {
      const userInfo = { email: email.value };
      authStore.login(userInfo); 
      router.push('/home'); 
    } else {
      error.value = 'Invalid email or password';
    }
  }
  
};
</script>
