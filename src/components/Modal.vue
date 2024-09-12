<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
      
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 ">&times;</button>
      </div>

      <div class="modal-body">
        <slot></slot>
      </div>

      <div class="mt-4 flex justify-end">
        <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
        <button @click="submitForm" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: String,
});

const emits = defineEmits(['close', 'submit']);

const closeModal = () => {
  emits('close');
};

const submitForm = () => {
  emits('submit');
};
</script>

<style scoped>

</style>
