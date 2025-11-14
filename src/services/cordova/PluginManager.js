/**
 * Cordova插件管理器
 * 提供统一的插件API接口和功能封装
 */

import cordovaService from './CordovaService.js'

class PluginManager {
  constructor() {
    this.listeners = new Map()
  }

  /**
   * 电池状态插件
   */
  battery = {
    // 获取电池状态
    getStatus: () => {
      return new Promise((resolve, reject) => {
        if (!cordovaService.isPluginAvailable('battery')) {
          // Web环境模拟数据
          resolve({
            level: Math.floor(Math.random() * 100),
            isPlugged: Math.random() > 0.5,
            status: Math.random() > 0.5 ? 'charging' : 'discharging'
          })
          return
        }

        const onSuccess = (info) => {
          resolve({
            level: info.level,
            isPlugged: info.isPlugged,
            status: info.isPlugged ? 'charging' : 'discharging'
          })
        }

        const onError = (error) => {
          cordovaService.handleError(error, 'Battery')
          reject(error)
        }

        window.addEventListener('batterystatus', onSuccess, false)
        // 触发一次获取
        setTimeout(() => {
          if (navigator.battery) {
            onSuccess(navigator.battery)
          }
        }, 100)
      })
    },

    // 监听电池状态变化
    onStatusChange: (callback) => {
      const handler = (info) => {
        callback({
          level: info.level,
          isPlugged: info.isPlugged,
          status: info.isPlugged ? 'charging' : 'discharging'
        })
      }

      if (cordovaService.isCordova) {
        window.addEventListener('batterystatus', handler, false)
        return () => window.removeEventListener('batterystatus', handler, false)
      } else {
        // Web环境模拟
        const interval = setInterval(() => {
          handler({
            level: Math.floor(Math.random() * 100),
            isPlugged: Math.random() > 0.5
          })
        }, 5000)
        return () => clearInterval(interval)
      }
    }
  }

  /**
   * 相机插件
   */
  camera = {
    // 拍照
    takePicture: (options = {}) => {
      return new Promise((resolve, reject) => {
        if (!cordovaService.isPluginAvailable('camera')) {
          // Web环境使用input file
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.capture = 'camera'
          
          input.onchange = (e) => {
            const file = e.target.files[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = (e) => resolve(e.target.result)
              reader.readAsDataURL(file)
            } else {
              reject(new Error('No image selected'))
            }
          }
          
          input.click()
          return
        }

        const cameraOptions = {
          quality: options.quality || 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: options.targetWidth || 300,
          targetHeight: options.targetHeight || 300,
          ...options
        }

        navigator.camera.getPicture(
          (imageData) => resolve('data:image/jpeg;base64,' + imageData),
          (error) => {
            cordovaService.handleError(error, 'Camera')
            reject(error)
          },
          cameraOptions
        )
      })
    },

    // 从相册选择
    selectFromLibrary: (options = {}) => {
      return new Promise((resolve, reject) => {
        if (!cordovaService.isPluginAvailable('camera')) {
          // Web环境使用input file
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          
          input.onchange = (e) => {
            const file = e.target.files[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = (e) => resolve(e.target.result)
              reader.readAsDataURL(file)
            } else {
              reject(new Error('No image selected'))
            }
          }
          
          input.click()
          return
        }

        const cameraOptions = {
          quality: options.quality || 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: options.targetWidth || 300,
          targetHeight: options.targetHeight || 300,
          ...options
        }

        navigator.camera.getPicture(
          (imageData) => resolve('data:image/jpeg;base64,' + imageData),
          (error) => {
            cordovaService.handleError(error, 'Camera')
            reject(error)
          },
          cameraOptions
        )
      })
    }
  }

  /**
   * 地理位置插件
   */
  geolocation = {
    // 获取当前位置
    getCurrentPosition: (options = {}) => {
      return new Promise((resolve, reject) => {
        const geoOptions = {
          timeout: options.timeout || 30000,
          enableHighAccuracy: options.enableHighAccuracy || true,
          maximumAge: options.maximumAge || 300000,
          ...options
        }

        const onSuccess = (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
          })
        }

        const onError = (error) => {
          cordovaService.handleError(error, 'Geolocation')
          reject(error)
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions)
        } else {
          reject(new Error('Geolocation not supported'))
        }
      })
    },

    // 监听位置变化
    watchPosition: (callback, options = {}) => {
      const geoOptions = {
        timeout: options.timeout || 30000,
        enableHighAccuracy: options.enableHighAccuracy || true,
        maximumAge: options.maximumAge || 300000,
        ...options
      }

      const onSuccess = (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp
        })
      }

      const onError = (error) => {
        cordovaService.handleError(error, 'Geolocation')
      }

      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(onSuccess, onError, geoOptions)
        return () => navigator.geolocation.clearWatch(watchId)
      } else {
        return () => {}
      }
    }
  }

  /**
   * 振动插件
   */
  vibration = {
    // 振动
    vibrate: (duration = 1000) => {
      if (cordovaService.isPluginAvailable('vibration')) {
        navigator.vibrate(duration)
      } else if (navigator.vibrate) {
        navigator.vibrate(duration)
      } else {
        console.log('Vibration not supported')
      }
    },

    // 振动模式
    vibratePattern: (pattern) => {
      if (cordovaService.isPluginAvailable('vibration')) {
        navigator.vibrate(pattern)
      } else if (navigator.vibrate) {
        navigator.vibrate(pattern)
      } else {
        console.log('Vibration pattern not supported')
      }
    }
  }

  /**
   * 网络信息插件
   */
  network = {
    // 获取网络类型
    getConnectionType: () => {
      if (cordovaService.isPluginAvailable('connection')) {
        return navigator.connection.type
      } else if (navigator.onLine !== undefined) {
        return navigator.onLine ? 'wifi' : 'none'
      } else {
        return 'unknown'
      }
    },

    // 监听网络状态变化
    onStatusChange: (callback) => {
      if (cordovaService.isCordova) {
        const onOnline = () => callback({ type: 'online', connection: navigator.connection?.type || 'wifi' })
        const onOffline = () => callback({ type: 'offline', connection: 'none' })

        document.addEventListener('online', onOnline, false)
        document.addEventListener('offline', onOffline, false)

        return () => {
          document.removeEventListener('online', onOnline, false)
          document.removeEventListener('offline', onOffline, false)
        }
      } else {
        const handler = () => {
          callback({
            type: navigator.onLine ? 'online' : 'offline',
            connection: navigator.onLine ? 'wifi' : 'none'
          })
        }

        window.addEventListener('online', handler)
        window.addEventListener('offline', handler)

        return () => {
          window.removeEventListener('online', handler)
          window.removeEventListener('offline', handler)
        }
      }
    }
  }

  /**
   * 设备运动插件
   */
  deviceMotion = {
    // 获取加速度
    getCurrentAcceleration: () => {
      return new Promise((resolve, reject) => {
        if (!cordovaService.isPluginAvailable('accelerometer')) {
          // Web环境模拟数据
          resolve({
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 20,
            timestamp: Date.now()
          })
          return
        }

        navigator.accelerometer.getCurrentAcceleration(
          (acceleration) => {
            resolve({
              x: acceleration.x,
              y: acceleration.y,
              z: acceleration.z,
              timestamp: acceleration.timestamp
            })
          },
          (error) => {
            cordovaService.handleError(error, 'Accelerometer')
            reject(error)
          }
        )
      })
    },

    // 监听加速度变化
    watchAcceleration: (callback, options = {}) => {
      const accelerometerOptions = {
        frequency: options.frequency || 1000,
        ...options
      }

      if (cordovaService.isPluginAvailable('accelerometer')) {
        const watchId = navigator.accelerometer.watchAcceleration(
          (acceleration) => {
            callback({
              x: acceleration.x,
              y: acceleration.y,
              z: acceleration.z,
              timestamp: acceleration.timestamp
            })
          },
          (error) => cordovaService.handleError(error, 'Accelerometer'),
          accelerometerOptions
        )

        return () => navigator.accelerometer.clearWatch(watchId)
      } else {
        // Web环境模拟
        const interval = setInterval(() => {
          callback({
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 20,
            timestamp: Date.now()
          })
        }, accelerometerOptions.frequency)

        return () => clearInterval(interval)
      }
    }
  }
}

// 创建单例实例
const pluginManager = new PluginManager()

export default pluginManager
