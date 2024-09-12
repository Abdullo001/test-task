// store/customers.ts
import { defineStore } from 'pinia';

interface Customer {
  id: number;
  name: string;
  age: number;
  email: string;
  phone: string;
  hobbies: string[];
}

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    customers: [] as Customer[],
    loading: false,
  }),
  actions: {
    async fetchCustomers() {
      this.loading = true;
      try {
        const response = await fetch('https://freetestapi.com/api/v1/users');
        const data = await response.json();
        this.customers = data;
        localStorage.setItem("customerList",JSON.stringify(this.customers))
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    addCustomer(customer: Customer) {
      this.customers.push(customer);
      localStorage.setItem("customerList",JSON.stringify(this.customers))
    },
    updateCustomer(updatedCustomer: Customer) {
      const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
      if (index !== -1) this.customers.splice(index, 1, updatedCustomer);
      localStorage.setItem("customerList",JSON.stringify(this.customers))
    },
    deleteCustomer(id: number) {
      this.customers = this.customers.filter(customer => customer.id !== id);
      localStorage.setItem("customerList",JSON.stringify(this.customers))
    },
  },
});
