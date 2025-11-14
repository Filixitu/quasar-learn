<template>
  <q-page class="cordova-plugins-page">
    <div class="q-pa-md">
      <div class="page-header q-mb-lg">
        <h4 class="text-h4 q-ma-none">
          <q-icon name="extension" class="q-mr-sm" />
          Cordova插件演示
        </h4>
        <p class="text-subtitle1 text-grey-7 q-mt-sm">
          测试和演示各种Cordova插件功能
        </p>
      </div>

      <!-- 环境状态 -->
      <q-card class="q-mb-lg" flat bordered>
        <q-card-section>
          <div class="row items-center">
            <div class="col">
              <div class="text-h6">运行环境</div>
            </div>
            <div class="col-auto">
              <q-chip :color="cordovaStatus.isCordova ? 'positive' : 'warning'" text-color="white"
                :icon="cordovaStatus.isCordova ? 'smartphone' : 'computer'">
                {{ cordovaStatus.isCordova ? 'Cordova环境' : 'Web浏览器' }}
              </q-chip>
            </div>
          </div>

          <div class="q-mt-sm">
            <q-linear-progress :value="cordovaStatus.isReady ? 1 : 0"
              :color="cordovaStatus.isReady ? 'positive' : 'warning'" class="q-mb-sm" />
            <div class="text-caption">
              {{ cordovaStatus.isReady ? '设备就绪' : '正在初始化...' }}
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 插件演示选项卡 -->
      <q-card flat bordered>
        <q-tabs v-model="activeTab" dense class="text-grey" active-color="primary" indicator-color="primary"
          align="justify" narrow-indicator>
          <q-tab name="device" icon="smartphone" label="设备信息" />
          <q-tab name="battery" icon="battery_charging_full" label="电池状态" />
          <q-tab name="camera" icon="camera_alt" label="相机" />
          <q-tab name="geolocation" icon="location_on" label="地理位置" />
          <q-tab name="motion" icon="vibration" label="设备运动" />
          <q-tab name="network" icon="wifi" label="网络信息" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <!-- 设备信息 -->
          <q-tab-panel name="device" class="q-pa-none">
            <div class="q-pa-md">
              <DeviceDemo />
            </div>
          </q-tab-panel>

          <!-- 电池状态 -->
          <q-tab-panel name="battery" class="q-pa-none">
            <div class="q-pa-md">
              <BatteryDemo />
            </div>
          </q-tab-panel>

          <!-- 相机 -->
          <q-tab-panel name="camera" class="q-pa-none">
            <div class="q-pa-md">
              <CameraDemo />
            </div>
          </q-tab-panel>

          <!-- 地理位置 -->
          <q-tab-panel name="geolocation" class="q-pa-none">
            <div class="q-pa-md">
              <GeolocationDemo />
            </div>
          </q-tab-panel>

          <!-- 设备运动 -->
          <q-tab-panel name="motion" class="q-pa-none">
            <div class="q-pa-md">
              <DeviceMotionDemo />
            </div>
          </q-tab-panel>

          <!-- 网络信息 -->
          <q-tab-panel name="network" class="q-pa-none">
            <div class="q-pa-md">
              <NetworkDemo />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <!-- 快速操作 -->
      <q-card class="q-mt-lg" flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">快速操作</div>

          <div class="row q-gutter-md">
            <div class="col-12 col-sm-6 col-md-3">
              <q-btn color="primary" icon="refresh" label="刷新所有状态" @click="refreshAllStatus" class="full-width"
                :loading="refreshing" />
            </div>

            <div class="col-12 col-sm-6 col-md-3">
              <q-btn color="secondary" icon="vibration" label="测试振动" @click="testVibration" class="full-width" />
            </div>

            <div class="col-12 col-sm-6 col-md-3">
              <q-btn color="positive" icon="my_location" label="获取位置" @click="testLocation" class="full-width"
                :loading="gettingLocation" />
            </div>

            <div class="col-12 col-sm-6 col-md-3">
              <q-btn color="warning" icon="info" label="显示设备信息" @click="showDeviceInfo" class="full-width" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 帮助信息 -->
      <q-card class="q-mt-lg" flat bordered>
        <q-card-section>
          <q-expansion-item icon="help" label="使用说明" class="text-h6">
            <div class="q-pa-md">
              <div class="text-body1 q-mb-md">
                <strong>Web环境测试：</strong>
              </div>
              <ul class="q-mb-md">
                <li>在浏览器中运行时，部分功能会使用模拟数据</li>
                <li>相机功能会调用浏览器的文件选择器</li>
                <li>地理位置使用浏览器的Geolocation API</li>
                <li>振动功能使用浏览器的Vibration API（如果支持）</li>
              </ul>

              <div class="text-body1 q-mb-md">
                <strong>移动设备测试：</strong>
              </div>
              <ul class="q-mb-md">
                <li>需要先使用 <code>quasar mode add cordova</code> 添加Cordova支持</li>
                <li>安装相应的Cordova插件</li>
                <li>使用 <code>quasar dev -m cordova -T android</code> 进行调试</li>
                <li>确保在config.xml中配置了必要的权限</li>
              </ul>

              <div class="text-body1 q-mb-md">
                <strong>注意事项：</strong>
              </div>
              <ul>
                <li>某些功能需要用户授权（如相机、位置访问）</li>
                <li>在iOS设备上，某些API可能有不同的行为</li>
                <li>建议在真实设备上测试所有功能</li>
              </ul>
            </div>
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted, inject } from 'vue'
import { useQuasar } from 'quasar'
import BatteryDemo from 'src/components/cordova/BatteryDemo.vue'
import CameraDemo from 'src/components/cordova/CameraDemo.vue'
import GeolocationDemo from 'src/components/cordova/GeolocationDemo.vue'
import DeviceDemo from 'src/components/cordova/DeviceDemo.vue'
import pluginManager from 'src/services/cordova/PluginManager.js'

export default {
  name: 'CordovaPluginsPage',
  components: {
    BatteryDemo,
    CameraDemo,
    GeolocationDemo,
    DeviceDemo,
    // 占位组件，后续可以添加更多
    DeviceMotionDemo: {
      template: '<div class="text-center q-pa-xl"><q-icon name="construction" size="64px" color="grey-5" /><div class="text-h6 q-mt-md">设备运动演示</div><div class="text-grey-6">功能开发中...</div></div>'
    },
    NetworkDemo: {
      template: '<div class="text-center q-pa-xl"><q-icon name="construction" size="64px" color="grey-5" /><div class="text-h6 q-mt-md">网络信息演示</div><div class="text-grey-6">功能开发中...</div></div>'
    }
  },
  setup() {
    const $q = useQuasar()
    const cordova = inject('cordova')

    const activeTab = ref('device')
    const refreshing = ref(false)
    const gettingLocation = ref(false)

    const cordovaStatus = reactive({
      isCordova: false,
      isReady: false
    })

    const updateCordovaStatus = () => {
      cordovaStatus.isCordova = cordova.isCordova
      cordovaStatus.isReady = cordova.isReady
    }

    const refreshAllStatus = async () => {
      refreshing.value = true
      try {
        // 模拟刷新操作
        await new Promise(resolve => setTimeout(resolve, 1000))

        updateCordovaStatus()

        $q.notify({
          type: 'positive',
          message: '状态刷新完成',
          position: 'top'
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: '刷新失败: ' + error.message,
          position: 'top'
        })
      } finally {
        refreshing.value = false
      }
    }

    const testVibration = () => {
      pluginManager.vibration.vibrate(300)
      $q.notify({
        type: 'info',
        message: '振动测试',
        position: 'top'
      })
    }

    const testLocation = async () => {
      gettingLocation.value = true
      try {
        const position = await pluginManager.geolocation.getCurrentPosition()
        $q.notify({
          type: 'positive',
          message: `位置: ${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`,
          position: 'top'
        })
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: '获取位置失败: ' + error.message,
          position: 'top'
        })
      } finally {
        gettingLocation.value = false
      }
    }

    const showDeviceInfo = () => {
      const deviceInfo = cordova.getDeviceInfo()
      $q.dialog({
        title: '设备信息',
        message: `
          <div style="text-align: left;">
            <strong>型号:</strong> ${deviceInfo.model}<br>
            <strong>平台:</strong> ${deviceInfo.platform}<br>
            <strong>版本:</strong> ${deviceInfo.version}<br>
            <strong>制造商:</strong> ${deviceInfo.manufacturer}<br>
            <strong>UUID:</strong> ${deviceInfo.uuid}
          </div>
        `,
        html: true
      })
    }

    onMounted(() => {
      updateCordovaStatus()

      cordova.onReady(() => {
        updateCordovaStatus()
      })
    })

    return {
      activeTab,
      refreshing,
      gettingLocation,
      cordovaStatus,
      refreshAllStatus,
      testVibration,
      testLocation,
      showDeviceInfo
    }
  }
}
</script>

<style scoped>
.cordova-plugins-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  padding: 20px 0;
}

@media (max-width: 600px) {
  .q-tabs {
    font-size: 12px;
  }

  .q-tab {
    min-height: 40px;
  }
}
</style>
