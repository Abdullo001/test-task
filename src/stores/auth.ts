import { defineStore } from 'pinia';
interface ILogin {
  email: string;
  password: string;
}
interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {} as ILogin,
    isAuthenticated: false,
    currentUser:{} as IUser,
  }),
  actions: {
    login(userInfo : ILogin) {
      this.user = userInfo;
      this.isAuthenticated = true;
      
      localStorage.setItem('user', JSON.stringify(userInfo)); 
    },
    registerUser(user: IUser) {
      this.currentUser = user;
      this.isAuthenticated=true
      localStorage.setItem('registeredUser', JSON.stringify(user)); 
      localStorage.setItem('user', JSON.stringify({email:user.email})); 
    },
    logout() {
      this.user = {
        email:"",
        password:"",
      };
      this.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    checkAuth() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        this.isAuthenticated = true;
      }
    },
  },
});
