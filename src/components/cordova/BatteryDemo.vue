<template>
  <q-card class="battery-demo">
    <q-card-section>
      <div class="text-h6 q-mb-md">
        <q-icon name="battery_charging_full" class="q-mr-sm" />
        电池状态监控
      </div>
      
      <div class="row q-gutter-md">
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">当前状态</div>
              <div class="battery-info">
                <div class="battery-level">
                  <q-circular-progress
                    :value="batteryInfo.level"
                    size="80px"
                    :thickness="0.15"
                    :color="getBatteryColor(batteryInfo.level)"
                    track-color="grey-3"
                    class="q-ma-md"
                  >
                    <div class="text-h6">{{ batteryInfo.level }}%</div>
                  </q-circular-progress>
                </div>
                
                <div class="battery-details q-mt-md">
                  <q-list dense>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon :name="batteryInfo.isPlugged ? 'power' : 'battery_std'" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>充电状态</q-item-label>
                        <q-item-label caption>
                          {{ batteryInfo.isPlugged ? '正在充电' : '未充电' }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="info" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>电池状态</q-item-label>
                        <q-item-label caption>{{ batteryInfo.status }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">历史记录</div>
              <div class="battery-history" style="height: 200px; overflow-y: auto;">
                <q-list dense>
                  <q-item v-for="(record, index) in batteryHistory" :key="index">
                    <q-item-section avatar>
                      <q-avatar size="24px" :color="getBatteryColor(record.level)" text-color="white">
                        {{ record.level }}
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ record.level }}% - {{ record.status }}</q-item-label>
                      <q-item-label caption>{{ formatTime(record.timestamp) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
    
    <q-card-actions align="right">
      <q-btn 
        flat 
        :loading="loading"
        @click="refreshBatteryStatus"
        color="primary"
        icon="refresh"
      >
        刷新状态
      </q-btn>
      
      <q-btn 
        flat 
        :color="isMonitoring ? 'negative' : 'positive'"
        :icon="isMonitoring ? 'stop' : 'play_arrow'"
        @click="toggleMonitoring"
      >
        {{ isMonitoring ? '停止监控' : '开始监控' }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import pluginManager from 'src/services/cordova/PluginManager.js'

export default {
  name: 'BatteryDemo',
  setup() {
    const cordova = inject('cordova')
    
    const loading = ref(false)
    const isMonitoring = ref(false)
    const batteryInfo = ref({
      level: 0,
      isPlugged: false,
      status: 'unknown'
    })
    const batteryHistory = ref([])
    
    let unsubscribe = null

    const getBatteryColor = (level) => {
      if (level > 60) return 'green'
      if (level > 30) return 'orange'
      return 'red'
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString()
    }

    const updateBatteryStatus = (status) => {
      batteryInfo.value = {
        level: status.level,
        isPlugged: status.isPlugged,
        status: status.isPlugged ? 'charging' : 'discharging'
      }
      
      // 添加到历史记录
      batteryHistory.value.unshift({
        ...batteryInfo.value,
        timestamp: Date.now()
      })
      
      // 限制历史记录数量
      if (batteryHistory.value.length > 20) {
        batteryHistory.value = batteryHistory.value.slice(0, 20)
      }
    }

    const refreshBatteryStatus = async () => {
      loading.value = true
      try {
        // 使用标准Cordova API方式
        if (cordova.isCordova) {
          // 在Cordova环境中，batterystatus事件会自动触发
          // 这里我们手动触发一次获取
          setTimeout(() => {
            loading.value = false
          }, 1000)
        } else {
          // Web环境模拟
          const status = await pluginManager.battery.getStatus()
          updateBatteryStatus(status)
          loading.value = false
        }
      } catch (error) {
        console.error('Failed to get battery status:', error)
        loading.value = false
      }
    }

    const toggleMonitoring = () => {
      if (isMonitoring.value) {
        stopMonitoring()
      } else {
        startMonitoring()
      }
    }

    const startMonitoring = () => {
      if (unsubscribe) return
      
      isMonitoring.value = true
      
      // 使用标准Cordova API方式注册事件监听器
      if (cordova.isCordova) {
        window.addEventListener('batterystatus', updateBatteryStatus, false)
        unsubscribe = () => {
          window.removeEventListener('batterystatus', updateBatteryStatus, false)
        }
      } else {
        // Web环境使用插件管理器的模拟功能
        unsubscribe = pluginManager.battery.onStatusChange(updateBatteryStatus)
      }
    }

    const stopMonitoring = () => {
      if (unsubscribe) {
        unsubscribe()
        unsubscribe = null
      }
      isMonitoring.value = false
    }

    onMounted(() => {
      cordova.onReady(() => {
        refreshBatteryStatus()
      })
    })

    onUnmounted(() => {
      stopMonitoring()
    })

    return {
      loading,
      isMonitoring,
      batteryInfo,
      batteryHistory,
      getBatteryColor,
      formatTime,
      refreshBatteryStatus,
      toggleMonitoring
    }
  }
}
</script>

<style scoped>
.battery-demo {
  max-width: 800px;
  margin: 0 auto;
}

.battery-info {
  text-align: center;
}

.battery-level {
  display: flex;
  justify-content: center;
}

.battery-details {
  text-align: left;
}

.battery-history {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
}
</style>
