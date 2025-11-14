<template>
  <q-card class="device-demo">
    <q-card-section>
      <div class="text-h6 q-mb-md">
        <q-icon name="smartphone" class="q-mr-sm" />
        设备信息
      </div>
      
      <div class="row q-gutter-md">
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">基本信息</div>
              
              <q-list dense>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="info" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>设备型号</q-item-label>
                    <q-item-label caption>{{ deviceInfo.model }}</q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="computer" color="blue" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>操作系统</q-item-label>
                    <q-item-label caption>{{ deviceInfo.platform }}</q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="update" color="green" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>系统版本</q-item-label>
                    <q-item-label caption>{{ deviceInfo.version }}</q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="business" color="orange" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>制造商</q-item-label>
                    <q-item-label caption>{{ deviceInfo.manufacturer }}</q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="fingerprint" color="purple" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>设备UUID</q-item-label>
                    <q-item-label caption>{{ deviceInfo.uuid }}</q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="code" color="grey" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Cordova版本</q-item-label>
                    <q-item-label caption>{{ deviceInfo.cordova }}</q-item-label>
                  </q-item-section>
                </q-item>
                
                <q-item>
                  <q-item-section avatar>
                    <q-icon :name="deviceInfo.isVirtual ? 'computer' : 'smartphone'" :color="deviceInfo.isVirtual ? 'blue' : 'green'" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>设备类型</q-item-label>
                    <q-item-label caption>{{ deviceInfo.isVirtual ? '虚拟设备/模拟器' : '真实设备' }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">振动测试</div>
              
              <div class="vibration-controls">
                <div class="q-mb-md">
                  <q-btn
                    color="primary"
                    icon="vibration"
                    label="短振动 (200ms)"
                    @click="vibrateShort"
                    class="q-mr-sm q-mb-sm"
                  />
                  
                  <q-btn
                    color="secondary"
                    icon="vibration"
                    label="长振动 (1000ms)"
                    @click="vibrateLong"
                    class="q-mb-sm"
                  />
                </div>
                
                <div class="q-mb-md">
                  <q-btn
                    color="positive"
                    icon="notifications"
                    label="通知振动"
                    @click="vibrateNotification"
                    class="q-mr-sm q-mb-sm"
                  />
                  
                  <q-btn
                    color="warning"
                    icon="warning"
                    label="警告振动"
                    @click="vibrateWarning"
                    class="q-mb-sm"
                  />
                </div>
                
                <div class="custom-vibration q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">自定义振动</div>
                  
                  <q-input
                    v-model.number="customDuration"
                    type="number"
                    label="振动时长 (毫秒)"
                    outlined
                    dense
                    class="q-mb-sm"
                    style="max-width: 200px;"
                  />
                  
                  <q-btn
                    color="accent"
                    icon="tune"
                    label="自定义振动"
                    @click="vibrateCustom"
                    :disabled="!customDuration || customDuration <= 0"
                  />
                </div>
                
                <div class="pattern-vibration q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">振动模式</div>
                  
                  <div class="pattern-buttons">
                    <q-btn
                      flat
                      dense
                      label="SOS"
                      @click="vibrateSOS"
                      class="q-mr-sm q-mb-sm"
                    />
                    
                    <q-btn
                      flat
                      dense
                      label="心跳"
                      @click="vibrateHeartbeat"
                      class="q-mr-sm q-mb-sm"
                    />
                    
                    <q-btn
                      flat
                      dense
                      label="节拍"
                      @click="vibrateRhythm"
                      class="q-mb-sm"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      
      <div class="q-mt-md">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">设备能力检测</div>
            
            <div class="capabilities-grid">
              <div class="capability-item">
                <q-icon :name="capabilities.vibration ? 'check_circle' : 'cancel'" :color="capabilities.vibration ? 'positive' : 'negative'" />
                <span class="q-ml-sm">振动支持</span>
              </div>
              
              <div class="capability-item">
                <q-icon :name="capabilities.geolocation ? 'check_circle' : 'cancel'" :color="capabilities.geolocation ? 'positive' : 'negative'" />
                <span class="q-ml-sm">地理位置</span>
              </div>
              
              <div class="capability-item">
                <q-icon :name="capabilities.camera ? 'check_circle' : 'cancel'" :color="capabilities.camera ? 'positive' : 'negative'" />
                <span class="q-ml-sm">相机功能</span>
              </div>
              
              <div class="capability-item">
                <q-icon :name="capabilities.accelerometer ? 'check_circle' : 'cancel'" :color="capabilities.accelerometer ? 'positive' : 'negative'" />
                <span class="q-ml-sm">加速度计</span>
              </div>
              
              <div class="capability-item">
                <q-icon :name="capabilities.network ? 'check_circle' : 'cancel'" :color="capabilities.network ? 'positive' : 'negative'" />
                <span class="q-ml-sm">网络检测</span>
              </div>
              
              <div class="capability-item">
                <q-icon :name="capabilities.battery ? 'check_circle' : 'cancel'" :color="capabilities.battery ? 'positive' : 'negative'" />
                <span class="q-ml-sm">电池状态</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
    
    <q-card-actions align="right">
      <q-btn 
        flat 
        @click="refreshDeviceInfo"
        color="primary"
        icon="refresh"
      >
        刷新信息
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, reactive, onMounted, inject } from 'vue'
import { useQuasar } from 'quasar'
import cordovaService from 'src/services/cordova/CordovaService.js'
import pluginManager from 'src/services/cordova/PluginManager.js'

export default {
  name: 'DeviceDemo',
  setup() {
    const $q = useQuasar()
    const cordova = inject('cordova')
    
    const deviceInfo = ref({})
    const customDuration = ref(500)
    
    const capabilities = reactive({
      vibration: false,
      geolocation: false,
      camera: false,
      accelerometer: false,
      network: false,
      battery: false
    })

    const refreshDeviceInfo = () => {
      // 使用标准Cordova Device API
      if (cordova.isCordova && window.device) {
        deviceInfo.value = {
          cordova: window.device.cordova,
          model: window.device.model,
          platform: window.device.platform,
          uuid: window.device.uuid,
          version: window.device.version,
          manufacturer: window.device.manufacturer,
          isVirtual: window.device.isVirtual,
          serial: window.device.serial
        }
      } else {
        // Web环境模拟数据
        deviceInfo.value = {
          cordova: 'Web Browser',
          model: 'Browser',
          platform: navigator.platform,
          uuid: 'web-uuid-' + Date.now(),
          version: navigator.userAgent,
          manufacturer: 'Web Browser',
          isVirtual: true,
          serial: 'web-serial'
        }
      }
      checkCapabilities()
    }

    const checkCapabilities = () => {
      capabilities.vibration = cordovaService.isPluginAvailable('vibration') || !!navigator.vibrate
      capabilities.geolocation = !!navigator.geolocation
      capabilities.camera = cordovaService.isPluginAvailable('camera')
      capabilities.accelerometer = cordovaService.isPluginAvailable('accelerometer')
      capabilities.network = cordovaService.isPluginAvailable('connection') || navigator.onLine !== undefined
      capabilities.battery = cordovaService.isPluginAvailable('battery')
    }

    const vibrateShort = () => {
      pluginManager.vibration.vibrate(200)
      showVibrateNotification('短振动')
    }

    const vibrateLong = () => {
      pluginManager.vibration.vibrate(1000)
      showVibrateNotification('长振动')
    }

    const vibrateNotification = () => {
      // 通知振动模式: 短-停-短
      pluginManager.vibration.vibratePattern([200, 100, 200])
      showVibrateNotification('通知振动')
    }

    const vibrateWarning = () => {
      // 警告振动模式: 长-停-长-停-长
      pluginManager.vibration.vibratePattern([500, 200, 500, 200, 500])
      showVibrateNotification('警告振动')
    }

    const vibrateCustom = () => {
      if (customDuration.value > 0) {
        pluginManager.vibration.vibrate(customDuration.value)
        showVibrateNotification(`自定义振动 (${customDuration.value}ms)`)
      }
    }

    const vibrateSOS = () => {
      // SOS摩尔斯电码: 短短短-长长长-短短短
      pluginManager.vibration.vibratePattern([
        100, 100, 100, 100, 100, 200,  // 短短短
        300, 100, 300, 100, 300, 200,  // 长长长
        100, 100, 100, 100, 100        // 短短短
      ])
      showVibrateNotification('SOS振动')
    }

    const vibrateHeartbeat = () => {
      // 心跳模式: 短短-停-短短-停
      pluginManager.vibration.vibratePattern([100, 50, 100, 300, 100, 50, 100, 300])
      showVibrateNotification('心跳振动')
    }

    const vibrateRhythm = () => {
      // 节拍模式: 规律的短振动
      pluginManager.vibration.vibratePattern([150, 150, 150, 150, 150, 150, 150, 150])
      showVibrateNotification('节拍振动')
    }

    const showVibrateNotification = (message) => {
      $q.notify({
        type: 'info',
        message: message,
        position: 'top',
        timeout: 1000
      })
    }

    onMounted(() => {
      cordova.onReady(() => {
        refreshDeviceInfo()
      })
    })

    return {
      deviceInfo,
      customDuration,
      capabilities,
      refreshDeviceInfo,
      vibrateShort,
      vibrateLong,
      vibrateNotification,
      vibrateWarning,
      vibrateCustom,
      vibrateSOS,
      vibrateHeartbeat,
      vibrateRhythm
    }
  }
}
</script>

<style scoped>
.device-demo {
  max-width: 1000px;
  margin: 0 auto;
}

.vibration-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.custom-vibration {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.pattern-vibration {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.pattern-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.capability-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

@media (max-width: 600px) {
  .capabilities-grid {
    grid-template-columns: 1fr;
  }
  
  .pattern-buttons {
    flex-direction: column;
  }
}
</style>
