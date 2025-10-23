import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // Actions
  function addItem(product) {
    const existingItem = items.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  function removeItem(productId) {
    const index = items.value.findIndex((item) => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function increaseQuantity(productId) {
    const item = items.value.find((item) => item.id === productId)
    if (item) {
      item.quantity++
    }
  }

  function decreaseQuantity(productId) {
    const item = items.value.find((item) => item.id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }
})
