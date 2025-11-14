/**
 * Cordova初始化boot文件
 * 在应用启动时初始化Cordova服务
 */

import { boot } from 'quasar/wrappers'
import cordovaService from 'src/services/cordova/CordovaService.js'

export default boot(({ app }) => {
  // 将Cordova服务注入到全局属性中
  app.config.globalProperties.$cordova = cordovaService
  
  // 提供全局访问
  app.provide('cordova', cordovaService)
  
  console.log('Cordova service initialized')
})
