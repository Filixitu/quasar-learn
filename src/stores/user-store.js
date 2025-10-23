import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || '')
  const permissions = ref([])

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => user.value?.name || '游客')
  const hasPermission = computed(() => (permission) => {
    return permissions.value.includes(permission)
  })

  // Actions
  function login(userData) {
    user.value = userData
    token.value = userData.token
    permissions.value = userData.permissions || []
    localStorage.setItem('token', userData.token)
  }

  function logout() {
    user.value = null
    token.value = ''
    permissions.value = []
    localStorage.removeItem('token')
  }

  function updateProfile(data) {
    user.value = { ...user.value, ...data }
  }

  return {
    // State
    user,
    token,
    permissions,
    // Getters
    isLoggedIn,
    userName,
    hasPermission,
    // Actions
    login,
    logout,
    updateProfile,
  }
})
