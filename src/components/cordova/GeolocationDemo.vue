<template>
  <q-card class="geolocation-demo">
    <q-card-section>
      <div class="text-h6 q-mb-md">
        <q-icon name="location_on" class="q-mr-sm" />
        地理位置服务
      </div>
      
      <div class="row q-gutter-md">
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">当前位置</div>
              
              <div v-if="currentPosition" class="position-info">
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="my_location" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>经度</q-item-label>
                      <q-item-label caption>{{ currentPosition.longitude.toFixed(6) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="my_location" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>纬度</q-item-label>
                      <q-item-label caption>{{ currentPosition.latitude.toFixed(6) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="gps_fixed" color="green" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>精度</q-item-label>
                      <q-item-label caption>{{ currentPosition.accuracy.toFixed(2) }} 米</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item v-if="currentPosition.altitude">
                    <q-item-section avatar>
                      <q-icon name="height" color="blue" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>海拔</q-item-label>
                      <q-item-label caption>{{ currentPosition.altitude.toFixed(2) }} 米</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item v-if="currentPosition.speed">
                    <q-item-section avatar>
                      <q-icon name="speed" color="orange" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>速度</q-item-label>
                      <q-item-label caption>{{ currentPosition.speed.toFixed(2) }} m/s</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="access_time" color="grey" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>更新时间</q-item-label>
                      <q-item-label caption>{{ formatTime(currentPosition.timestamp) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              
              <div v-else class="no-position">
                <q-icon name="location_off" size="48px" color="grey-5" />
                <div class="text-grey-6 q-mt-sm">暂无位置信息</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">地图显示</div>
              
              <div class="map-container">
                <div v-if="currentPosition" class="map-info">
                  <div class="map-placeholder">
                    <q-icon name="map" size="64px" color="primary" />
                    <div class="q-mt-sm">
                      <div class="text-body2">位置坐标</div>
                      <div class="text-caption">
                        {{ currentPosition.latitude.toFixed(4) }}, {{ currentPosition.longitude.toFixed(4) }}
                      </div>
                    </div>
                    
                    <div class="map-actions q-mt-md">
                      <q-btn
                        flat
                        dense
                        icon="open_in_new"
                        label="在地图中查看"
                        color="primary"
                        @click="openInMap"
                      />
                    </div>
                  </div>
                </div>
                
                <div v-else class="no-map">
                  <q-icon name="map" size="48px" color="grey-5" />
                  <div class="text-grey-6 q-mt-sm">获取位置后显示地图</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      
      <div class="q-mt-md">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">位置设置</div>
            
            <div class="row q-gutter-md">
              <div class="col-12 col-md-4">
                <q-toggle
                  v-model="geoOptions.enableHighAccuracy"
                  label="高精度定位"
                  color="primary"
                />
              </div>
              
              <div class="col-12 col-md-4">
                <q-input
                  v-model.number="geoOptions.timeout"
                  type="number"
                  label="超时时间 (毫秒)"
                  outlined
                  dense
                />
              </div>
              
              <div class="col-12 col-md-4">
                <q-input
                  v-model.number="geoOptions.maximumAge"
                  type="number"
                  label="缓存时间 (毫秒)"
                  outlined
                  dense
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      
      <div v-if="positionHistory.length > 0" class="q-mt-md">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">位置历史</div>
            
            <div class="position-history" style="max-height: 200px; overflow-y: auto;">
              <q-list dense>
                <q-item v-for="(position, index) in positionHistory" :key="index">
                  <q-item-section avatar>
                    <q-avatar size="24px" color="primary" text-color="white">
                      {{ index + 1 }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      {{ position.latitude.toFixed(4) }}, {{ position.longitude.toFixed(4) }}
                    </q-item-label>
                    <q-item-label caption>
                      精度: {{ position.accuracy.toFixed(2) }}m - {{ formatTime(position.timestamp) }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      flat
                      dense
                      icon="open_in_new"
                      size="sm"
                      @click="openPositionInMap(position)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
    
    <q-card-actions align="right">
      <q-btn 
        flat 
        :loading="loading"
        @click="getCurrentPosition"
        color="primary"
        icon="my_location"
      >
        获取位置
      </q-btn>
      
      <q-btn 
        flat 
        :color="isWatching ? 'negative' : 'positive'"
        :icon="isWatching ? 'stop' : 'play_arrow'"
        @click="toggleWatching"
      >
        {{ isWatching ? '停止跟踪' : '开始跟踪' }}
      </q-btn>
      
      <q-btn 
        flat 
        color="grey"
        icon="clear_all"
        @click="clearHistory"
      >
        清除历史
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, inject } from 'vue'
import { useQuasar } from 'quasar'
import pluginManager from 'src/services/cordova/PluginManager.js'

export default {
  name: 'GeolocationDemo',
  setup() {
    const $q = useQuasar()
    const cordova = inject('cordova')
    
    const loading = ref(false)
    const isWatching = ref(false)
    const currentPosition = ref(null)
    const positionHistory = ref([])
    
    const geoOptions = reactive({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 300000
    })
    
    let watchId = null

    const getCurrentPosition = async () => {
      loading.value = true
      try {
        const position = await pluginManager.geolocation.getCurrentPosition(geoOptions)
        currentPosition.value = position
        
        // 添加到历史记录
        positionHistory.value.unshift(position)
        
        // 限制历史记录数量
        if (positionHistory.value.length > 20) {
          positionHistory.value = positionHistory.value.slice(0, 20)
        }
        
        $q.notify({
          type: 'positive',
          message: '位置获取成功！',
          position: 'top'
        })
      } catch (error) {
        console.error('获取位置失败:', error)
        $q.notify({
          type: 'negative',
          message: '位置获取失败: ' + getErrorMessage(error),
          position: 'top'
        })
      } finally {
        loading.value = false
      }
    }

    const toggleWatching = () => {
      if (isWatching.value) {
        stopWatching()
      } else {
        startWatching()
      }
    }

    const startWatching = () => {
      if (watchId) return
      
      isWatching.value = true
      watchId = pluginManager.geolocation.watchPosition((position) => {
        currentPosition.value = position
        
        // 添加到历史记录
        positionHistory.value.unshift(position)
        
        // 限制历史记录数量
        if (positionHistory.value.length > 20) {
          positionHistory.value = positionHistory.value.slice(0, 20)
        }
      }, geoOptions)
      
      $q.notify({
        type: 'info',
        message: '开始跟踪位置变化',
        position: 'top'
      })
    }

    const stopWatching = () => {
      if (watchId) {
        watchId()
        watchId = null
      }
      isWatching.value = false
      
      $q.notify({
        type: 'info',
        message: '停止跟踪位置变化',
        position: 'top'
      })
    }

    const clearHistory = () => {
      positionHistory.value = []
      $q.notify({
        type: 'info',
        message: '历史记录已清除',
        position: 'top'
      })
    }

    const openInMap = () => {
      if (!currentPosition.value) return
      openPositionInMap(currentPosition.value)
    }

    const openPositionInMap = (position) => {
      const url = `https://www.google.com/maps?q=${position.latitude},${position.longitude}`
      window.open(url, '_blank')
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleString()
    }

    const getErrorMessage = (error) => {
      switch (error.code) {
        case 1:
          return '用户拒绝了位置访问请求'
        case 2:
          return '位置信息不可用'
        case 3:
          return '获取位置超时'
        default:
          return error.message || '未知错误'
      }
    }

    onMounted(() => {
      cordova.onReady(() => {
        // 自动获取一次位置
        getCurrentPosition()
      })
    })

    onUnmounted(() => {
      stopWatching()
    })

    return {
      loading,
      isWatching,
      currentPosition,
      positionHistory,
      geoOptions,
      getCurrentPosition,
      toggleWatching,
      clearHistory,
      openInMap,
      openPositionInMap,
      formatTime
    }
  }
}
</script>

<style scoped>
.geolocation-demo {
  max-width: 1000px;
  margin: 0 auto;
}

.position-info {
  min-height: 200px;
}

.no-position {
  text-align: center;
  padding: 40px;
}

.map-container {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  text-align: center;
  padding: 20px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  width: 100%;
}

.no-map {
  text-align: center;
  padding: 40px;
}

.position-history {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
}

@media (max-width: 600px) {
  .row {
    flex-direction: column;
  }
}
</style>
