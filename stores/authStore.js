import { defineStore } from 'pinia'
import { useAuth } from '../composables/userAuth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async login(username, password) {
      const { login } = useAuth()
      const result = await login(username, password)
      if (result.success) {
        this.user = { username }
        this.error = null
      } else {
        this.error = result.message
      }
    },
    logout() {
      this.user = null
    },
  },
})
