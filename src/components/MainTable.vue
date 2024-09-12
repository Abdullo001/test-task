<template>
  <div>
    <div class="mb-4 flex justify-between">
      <div>
        <input v-model="searchQuery" placeholder="Search by name" class="border border-gray-300 rounded-lg p-2 " />
      </div>
      <div class="mb-4">
        <button @click="openModal" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Add New Customer</button>
      </div>
    </div>

    
    <table class="min-w-full table-auto bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="py-2 px-4 cursor-pointer" @click="sortByName">Name </th>
          <th class="py-2 px-4">Age</th>
          <th class="py-2 px-4">Email</th>
          <th class="py-2 px-4">Phone</th>
          <th class="py-2 px-4">Hobbies</th>
          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in paginatedCustomers" :key="customer.id" class="hover:bg-gray-100 border-b">
          <td class="py-2 px-4">{{ customer.name }}</td>
          <td class="py-2 px-4">{{ customer.age }}</td>
          <td class="py-2 px-4">{{ customer.email }}</td>
          <td class="py-2 px-4">{{ customer.phone }}</td>
          <td class="py-2 px-4">{{ customer.hobbies.join(', ') }}</td>
          <td class="py-2 px-4">
            <button class="bg-green-500 text-white px-4 py-1 rounded-lg mr-2" @click="editCustomer(customer)">Edit</button>
            <button class="bg-red-500 text-white px-4 py-1 rounded-lg" @click="confirmDelete(customer.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between mt-4">
      <button :disabled="currentPage === 1" @click="prevPage" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Next
      </button>
    </div>

    <Modal :isOpen="isModalOpen" title="Add New Customer" @close="closeModal" @submit="addCustomer">
      <form @submit.prevent="addCustomer">

        <div class="mb-4">
          <label class="block text-sm font-medium">Name</label>
          <input v-model="newCustomer.name" type="text" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Age</label>
          <input v-model="newCustomer.age" type="number" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.age" class="text-red-500 text-sm">{{ errors.age }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Email</label>
          <input v-model="newCustomer.email" type="email" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Phone</label>
          <input v-model="newCustomer.phone" type="text" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Hobbies (comma-separated)</label>
          <input v-model="newCustomer.hobbies" type="text" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.hobbies" class="text-red-500 text-sm">{{ errors.hobbies }}</span>
        </div>
      </form>
    </Modal>
    <Modal :isOpen="isEditModelOpen" title="Edit Customer" @close="closeEditModal" @submit="editedCustomer">
      <form @submit.prevent="editedCustomer">
        
        <div class="mb-4">
          <label class="block text-sm font-medium">Name</label>
          <input v-model="selectedCustomer.name" type="text" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>
      
        <div class="mb-4">
          <label class="block text-sm font-medium">Age</label>
          <input v-model="selectedCustomer.age" type="number" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.age" class="text-red-500 text-sm">{{ errors.age }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Email</label>
          <input v-model="selectedCustomer.email" type="email" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Phone</label>
          <input v-model="selectedCustomer.phone" type="text" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Hobbies (comma-separated)</label>
          <input v-model="selectedCustomer.hobbies" type="text" class="border border-gray-300 rounded-lg p-2 w-full" required />
          <span v-if="errors.hobbies" class="text-red-500 text-sm">{{ errors.hobbies }}</span>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed,onMounted } from 'vue';
import { useCustomerStore } from '../stores/customers';
import Modal from '../components/Modal.vue'; 

const store = useCustomerStore();
const isModalOpen = ref(false);
const isEditModelOpen = ref(false);


const newCustomer = ref({
  name: '',
  age: 0,
  email: '',
  phone: '',
  hobbies: '',
});
const selectedCustomer = ref({
  id:0,
  name: '',
  age: 0,
  email: '',
  phone: '',
  hobbies: '',
});
const errors = ref({
  name: '',
  age: '',
  email: '',
  phone: '',
  hobbies: '',
});

const validateForm = (item) => {
  let isValid = true;
  if (!item.value.name || item.value.name.length < 3) {
    errors.value.name = 'Name must be at least 3 characters long.';
    isValid = false;
  } else {
    errors.value.name = '';
  }

  if (!item.value.age || item.value.age <= 0 ) {
    errors.value.age = 'Age must be a positive number.';
    isValid = false;
  } else {
    errors.value.age = '';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!item.value.email || !emailPattern.test(item.value.email)) {
    errors.value.email = 'Please enter a valid email.';
    isValid = false;
  } else {
    errors.value.email = '';
  }

  const phonePattern = /^[0-9]{10,15}$/; // Simple regex for phone number
  if (!item.value.phone || !phonePattern.test(item.value.phone)) {
    errors.value.phone = 'Please enter a valid phone number.';
    isValid = false;
  } else {
    errors.value.phone = '';
  }

  if (!item.value.hobbies || item.value.hobbies.trim() === '') {
    errors.value.hobbies = 'Hobbies are required.';
    isValid = false;
  } else {
    errors.value.hobbies = '';
  }

  return isValid;
};
const openModal = () => {
  isModalOpen.value = true;
};
const openEditModal = () => {
  isEditModelOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
const closeEditModal = () => {
  isEditModelOpen.value = false;
};

const addCustomer = () => {
  if (!validateForm(newCustomer)) {
    return;
  }
  const customer = {
    id: Date.now(),
    name: newCustomer.value.name,
    age: newCustomer.value.age,
    email: newCustomer.value.email,
    phone: newCustomer.value.phone,
    hobbies: newCustomer.value.hobbies.split(',').map(h => h.trim()),
  };

  store.addCustomer(customer);

  closeModal();
  newCustomer.value = { name: '', age: 0, email: '', phone: '', hobbies: '' };
};
const editedCustomer = () => {
  if (!validateForm(selectedCustomer)) {
    return;
  }
  const customer = {
    id: selectedCustomer.value.id, 
    name: selectedCustomer.value.name,
    age: selectedCustomer.value.age,
    email: selectedCustomer.value.email,
    phone: selectedCustomer.value.phone,
    hobbies: selectedCustomer.value.hobbies.split(',').map(h => h.trim()),
  };

  store.updateCustomer(customer);

  closeEditModal();
  selectedCustomer.value = {id:0, name: '', age: 0, email: '', phone: '', hobbies: '' };
};

const resetForm = () => {
  newCustomer.value = { name: '', age: 0, email: '', phone: '', hobbies: '' };
  errors.value = { name: '', age: '', email: '', phone: '', hobbies: '' };
};

const currentPage = ref(1);
const itemsPerPage = 5; 


const searchQuery = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');

onMounted(()=>{
  if(typeof localStorage.getItem("customerList")==='string'){
    const customerList=JSON.parse(localStorage.getItem("customerList")||"")
    store.customers=customerList
  }
  if(typeof localStorage.getItem("customerList")!=='string'){
    store.fetchCustomers()
  }
})


const filteredCustomers = computed(() => {
  let customers = store.customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (sortOrder.value === 'asc') {
    customers.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    customers.sort((a, b) => b.name.localeCompare(a.name));
  }

  return customers;
});

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCustomers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredCustomers.value.length / itemsPerPage);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const sortByName = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

const editCustomer = (customer) => {
  selectedCustomer.value={
    id:customer.id, name: customer.name, age: customer.age, email: customer.email, phone: customer.phone, hobbies: customer.hobbies
  }

  selectedCustomer.value.hobbies=customer.hobbies.toString()
  selectedCustomer.value.phone=customer.phone.split('-').join('')
  isEditModelOpen.value=true
};

const confirmDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    store.deleteCustomer(id);
  }
};
</script>