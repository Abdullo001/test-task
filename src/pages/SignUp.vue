<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <form @submit.prevent="submitSignUp">
        <div class="mb-4">
          <label class="block text-sm font-medium">Name</label>
          <input
            v-model="name"
            type="text"
            class="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            class="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth'; 

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const userStore = useAuthStore();
const router = useRouter();

const validateForm = () => {
  let isValid = true;

  if (name.value.length < 3) {
    errors.value.name = 'Name must be at least 3 characters long.';
    isValid = false;
  } else {
    errors.value.name = '';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    errors.value.email = 'Please enter a valid email.';
    isValid = false;
  } else {
    errors.value.email = '';
  }

  if (password.value.length < 4) {
    errors.value.password = 'Password must be at least 4 characters long.';
    isValid = false;
  } else {
    errors.value.password = '';
  }

  if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match.';
    isValid = false;
  } else {
    errors.value.confirmPassword = '';
  }

  return isValid;
};

const submitSignUp = () => {
  if (!validateForm()) {
    return;
  }

  const newUser = {
    id: Date.now(),
    name: name.value,
    email: email.value,
    password: password.value, 
  };

  userStore.registerUser(newUser);

  router.push('/home');
};
</script>

<style scoped>

</style>
