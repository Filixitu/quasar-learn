/**
 * Cordova服务管理器
 * 统一管理Cordova插件的初始化、状态检测和错误处理
 */

class CordovaService {
  constructor() {
    this.isReady = false
    this.isCordova = false
    this.plugins = {}
    this.readyCallbacks = []
    
    this.init()
  }

  /**
   * 初始化Cordova服务
   */
  init() {
    // 检测是否在Cordova环境中
    this.isCordova = !!window.cordova

    if (this.isCordova) {
      document.addEventListener('deviceready', () => {
        this.isReady = true
        this.initializePlugins()
        this.executeReadyCallbacks()
      }, false)
    } else {
      // Web环境下模拟设备就绪
      setTimeout(() => {
        this.isReady = true
        this.executeReadyCallbacks()
      }, 100)
    }
  }

  /**
   * 初始化所有插件
   */
  initializePlugins() {
    if (!this.isCordova) return

    // 检测可用插件
    this.plugins = {
      battery: !!navigator.battery,
      camera: !!navigator.camera,
      contacts: !!navigator.contacts,
      device: !!window.device,
      accelerometer: !!navigator.accelerometer,
      geolocation: !!navigator.geolocation,
      media: !!window.Media,
      capture: !!navigator.device?.capture,
      connection: !!navigator.connection,
      splashscreen: !!navigator.splashscreen,
      vibration: !!navigator.vibrate,
      statusbar: !!window.StatusBar
    }

    console.log('Cordova plugins initialized:', this.plugins)
  }

  /**
   * 执行就绪回调
   */
  executeReadyCallbacks() {
    this.readyCallbacks.forEach(callback => callback())
    this.readyCallbacks = []
  }

  /**
   * 设备就绪时执行回调
   * @param {Function} callback 回调函数
   */
  onReady(callback) {
    if (this.isReady) {
      callback()
    } else {
      this.readyCallbacks.push(callback)
    }
  }

  /**
   * 检查插件是否可用
   * @param {string} pluginName 插件名称
   * @returns {boolean}
   */
  isPluginAvailable(pluginName) {
    return this.isCordova && this.plugins[pluginName]
  }

  /**
   * 获取设备信息
   * @returns {Object}
   */
  getDeviceInfo() {
    if (this.isCordova && window.device) {
      return {
        cordova: window.device.cordova,
        model: window.device.model,
        platform: window.device.platform,
        uuid: window.device.uuid,
        version: window.device.version,
        manufacturer: window.device.manufacturer,
        isVirtual: window.device.isVirtual,
        serial: window.device.serial
      }
    }
    
    // Web环境模拟数据
    return {
      cordova: 'Web',
      model: 'Browser',
      platform: navigator.platform,
      uuid: 'web-uuid-' + Date.now(),
      version: navigator.userAgent,
      manufacturer: 'Web Browser',
      isVirtual: true,
      serial: 'web-serial'
    }
  }

  /**
   * 显示原生提示框
   * @param {string} message 消息内容
   * @param {string} title 标题
   * @param {string} buttonName 按钮名称
   */
  showAlert(message, title = 'Alert', buttonName = 'OK') {
    return new Promise((resolve) => {
      if (this.isCordova && navigator.notification) {
        navigator.notification.alert(message, resolve, title, buttonName)
      } else {
        alert(`${title}: ${message}`)
        resolve()
      }
    })
  }

  /**
   * 显示确认对话框
   * @param {string} message 消息内容
   * @param {string} title 标题
   * @param {Array} buttonLabels 按钮标签数组
   */
  showConfirm(message, title = 'Confirm', buttonLabels = ['OK', 'Cancel']) {
    return new Promise((resolve) => {
      if (this.isCordova && navigator.notification) {
        navigator.notification.confirm(
          message,
          (buttonIndex) => resolve(buttonIndex),
          title,
          buttonLabels
        )
      } else {
        const result = confirm(`${title}: ${message}`)
        resolve(result ? 1 : 2)
      }
    })
  }

  /**
   * 错误处理
   * @param {Error} error 错误对象
   * @param {string} context 错误上下文
   */
  handleError(error, context = 'Cordova') {
    console.error(`${context} Error:`, error)
    
    const errorMessage = error.message || error.toString()
    this.showAlert(
      `操作失败: ${errorMessage}`,
      '错误',
      '确定'
    )
  }

  /**
   * 格式化错误信息
   * @param {*} error 错误对象
   * @returns {string}
   */
  formatError(error) {
    if (typeof error === 'string') return error
    if (error.message) return error.message
    if (error.code) return `Error Code: ${error.code}`
    return JSON.stringify(error)
  }
}

// 创建单例实例
const cordovaService = new CordovaService()

export default cordovaService
