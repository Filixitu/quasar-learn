import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export const useThemeStore = defineStore('theme', () => {
  const $q = useQuasar()

  // State
  const isDark = ref($q.dark.isActive)
  const primaryColor = ref('blue')
  const fontSize = ref(14)

  const colorOptions = [
    'blue',
    'indigo',
    'purple',
    'pink',
    'red',
    'orange',
    'amber',
    'yellow',
    'green',
    'teal',
  ]

  // Actions
  function toggleDark(value) {
    $q.dark.set(value)
    isDark.value = value
    localStorage.setItem('darkMode', value)
  }

  function setPrimaryColor(color) {
    primaryColor.value = color
    // 在实际项目中，这里需要动态修改 CSS 变量
    localStorage.setItem('primaryColor', color)
  }

  function setFontSize(size) {
    fontSize.value = size
    document.documentElement.style.fontSize = `${size}px`
    localStorage.setItem('fontSize', size)
  }

  // 初始化
  function init() {
    const savedDark = localStorage.getItem('darkMode')
    if (savedDark !== null) {
      toggleDark(savedDark === 'true')
    }

    const savedColor = localStorage.getItem('primaryColor')
    if (savedColor) {
      setPrimaryColor(savedColor)
    }

    const savedFontSize = localStorage.getItem('fontSize')
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize))
    }
  }

  init()

  return {
    isDark,
    primaryColor,
    fontSize,
    colorOptions,
    toggleDark,
    setPrimaryColor,
    setFontSize,
  }
})
