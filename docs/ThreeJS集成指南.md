# Three.js 集成指南 - Quasar Vue 3 项目 🎨

> **全面指南：如何在 Quasar Vue 3 项目中集成 Three.js 进行 3D 开发**

---

## 📋 目录

1. [Three.js 简介](#-threejs-简介)
2. [安装和配置](#-安装和配置)
3. [功能特性](#-功能特性)
4. [基础集成](#-基础集成)
5. [实际应用场景](#-实际应用场景)
6. [完整示例](#-完整示例)
7. [最佳实践](#-最佳实践)
8. [性能优化](#-性能优化)
9. [常见问题](#-常见问题)
10. [扩展资源](#-扩展资源)

---

## 🌟 Three.js 简介

### 什么是 Three.js？

Three.js 是一个跨浏览器的 JavaScript 库和应用程序接口（API），用于在 Web 浏览器中创建和显示动画 3D 计算机图形。它使用 WebGL 技术，让开发者能够轻松创建复杂的 3D 场景。

### 为什么选择 Three.js？

- **🚀 易于上手** - 简化了 WebGL 的复杂性
- **📱 跨平台** - 支持所有现代浏览器
- **⚡ 高性能** - 基于 WebGL，GPU 加速
- **🎨 功能丰富** - 支持各种 3D 图形效果
- **📚 社区活跃** - 大量教程和资源

---

## 🛠️ 安装和配置

### 1. 安装 Three.js

在项目根目录执行以下命令：

```bash
npm install three
npm install @types/three --save-dev  # TypeScript 支持（可选）
```

### 2. 安装常用插件（可选但推荐）

```bash
# 3D 模型加载器
npm install three-gltf-loader

# 控制器
npm install three-orbitcontrols

# 额外的几何体和材质
npm install three-addons
```

### 3. Quasar 配置修改

编辑 `quasar.config.js` 文件，添加 Three.js 支持：

```javascript
// quasar.config.js
export default defineConfig((ctx) => {
  return {
    // ... 其他配置

    build: {
      // 添加 Three.js 相关的 webpack 配置
      chainWebpack(chain) {
        // 处理 Three.js 的模块导入
        chain.resolve.alias.set('three', 'three/build/three.module.js')

        // 处理 .glsl 着色器文件（如需要）
        chain.module
          .rule('glsl')
          .test(/\.(glsl|vs|fs)$/)
          .use('raw-loader')
          .loader('raw-loader')
      },
    },

    // 如果需要 PWA 支持
    pwa: {
      workboxMode: 'GenerateSW',
      // Three.js 文件比较大，需要预缓存配置
      extendGenerateSWOptions(cfg) {
        cfg.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024 // 50MB
      },
    },
  }
})
```

### 4. TypeScript 支持（如果使用 TS）

在 `jsconfig.json` 或 `tsconfig.json` 中添加：

```json
{
  "compilerOptions": {
    "types": ["three"]
  }
}
```

---

## ✨ 功能特性

### 🎮 Three.js 核心功能

#### 1. **3D 几何体创建**

- ✅ 基础几何体（立方体、球体、平面等）
- ✅ 复杂几何体（环面、多面体等）
- ✅ 自定义几何体
- ✅ 3D 模型加载（GLTF、OBJ、FBX 等）

#### 2. **材质和纹理**

- ✅ 多种材质类型（基础、兰伯特、冯氏等）
- ✅ 纹理贴图和法线贴图
- ✅ 环境贴图和反射
- ✅ 动画纹理和视频纹理

#### 3. **光照系统**

- ✅ 环境光（AmbientLight）
- ✅ 方向光（DirectionalLight）
- ✅ 点光源（PointLight）
- ✅ 聚光灯（SpotLight）
- ✅ 阴影效果

#### 4. **动画系统**

- ✅ 关键帧动画
- ✅ 骨骼动画
- ✅ 变形动画
- ✅ 自定义动画混合

#### 5. **相机控制**

- ✅ 透视相机（PerspectiveCamera）
- ✅ 正交相机（OrthographicCamera）
- ✅ 轨道控制器（OrbitControls）
- ✅ 飞行控制器（FlyControls）

#### 6. **后期处理**

- ✅ 抗锯齿效果
- ✅ 景深效果
- ✅ 辉光效果
- ✅ 色调映射

---

## 🔗 基础集成

### 1. 创建基础 Three.js 组件

首先在 `src/components/demos/` 目录下创建 `ThreeJSDemo.vue`：

```vue
<template>
  <div class="threejs-container">
    <!-- Quasar 卡片包装 -->
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Three.js 3D 场景演示</div>
        <div class="text-subtitle2">基于 WebGL 的 3D 图形渲染</div>
      </q-card-section>

      <!-- 3D 渲染区域 -->
      <q-card-section>
        <div
          ref="threeContainer"
          class="three-canvas-container"
          :style="{ height: canvasHeight + 'px' }"
        >
          <!-- Three.js 画布将插入这里 -->
        </div>
      </q-card-section>

      <!-- 控制面板 -->
      <q-card-section>
        <div class="row q-gutter-md">
          <q-btn
            color="primary"
            @click="toggleAnimation"
            :label="isAnimating ? '暂停动画' : '开始动画'"
            icon="play_arrow"
          />
          <q-btn color="secondary" @click="resetScene" label="重置场景" icon="refresh" />
          <q-btn color="accent" @click="changeGeometry" label="切换几何体" icon="3d_rotation" />
        </div>
      </q-card-section>

      <!-- 参数控制 -->
      <q-card-section>
        <div class="text-subtitle2 q-mb-md">参数控制</div>

        <div class="row q-gutter-md">
          <div class="col-12 col-md-6">
            <q-slider
              v-model="rotationSpeed"
              :min="0"
              :max="0.1"
              :step="0.001"
              label
              label-always
              color="primary"
            >
              <template v-slot:marker-labels="{ marker }"> 旋转速度: {{ marker.value }} </template>
            </q-slider>
          </div>

          <div class="col-12 col-md-6">
            <q-slider
              v-model="lightIntensity"
              :min="0"
              :max="3"
              :step="0.1"
              label
              label-always
              color="orange"
            >
              <template v-slot:marker-labels="{ marker }"> 光照强度: {{ marker.value }} </template>
            </q-slider>
          </div>
        </div>
      </q-card-section>

      <!-- 信息显示 -->
      <q-card-section>
        <div class="text-caption">
          <div>FPS: {{ fps }}</div>
          <div>几何体: {{ currentGeometry }}</div>
          <div>三角形数量: {{ triangleCount }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import * as THREE from 'three'

// Quasar 插件
const $q = useQuasar()

// 响应式数据
const threeContainer = ref(null)
const canvasHeight = ref(400)
const isAnimating = ref(true)
const rotationSpeed = ref(0.01)
const lightIntensity = ref(1)
const fps = ref(0)
const currentGeometry = ref('Box')
const triangleCount = ref(0)

// Three.js 核心对象
let scene, camera, renderer, mesh, directionalLight
let animationId = null
let clock = new THREE.Clock()

// 几何体类型数组
const geometries = [
  { name: 'Box', create: () => new THREE.BoxGeometry(1, 1, 1) },
  { name: 'Sphere', create: () => new THREE.SphereGeometry(0.7, 32, 32) },
  { name: 'Cone', create: () => new THREE.ConeGeometry(0.7, 1.5, 32) },
  { name: 'Torus', create: () => new THREE.TorusGeometry(0.7, 0.3, 16, 100) },
]
let currentGeometryIndex = 0

// 初始化 Three.js
function initThree() {
  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  // 创建相机
  const aspect = threeContainer.value.clientWidth / canvasHeight.value
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.z = 3

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(threeContainer.value.clientWidth, canvasHeight.value)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // 将画布添加到容器
  threeContainer.value.appendChild(renderer.domElement)

  // 创建几何体和材质
  const geometry = geometries[0].create()
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 100,
  })
  mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  scene.add(mesh)

  // 添加光照
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
  scene.add(ambientLight)

  directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity.value)
  directionalLight.position.set(5, 5, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // 添加地面
  const planeGeometry = new THREE.PlaneGeometry(10, 10)
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -Math.PI / 2
  plane.position.y = -1
  plane.receiveShadow = true
  scene.add(plane)

  // 更新统计信息
  updateStats()

  // 开始动画循环
  animate()
}

// 动画循环
function animate() {
  if (!isAnimating.value) return

  animationId = requestAnimationFrame(animate)

  const deltaTime = clock.getDelta()

  // 旋转网格
  if (mesh) {
    mesh.rotation.x += rotationSpeed.value
    mesh.rotation.y += rotationSpeed.value
  }

  // 更新 FPS
  fps.value = Math.round(1 / deltaTime)

  // 渲染场景
  renderer.render(scene, camera)
}

// 更新统计信息
function updateStats() {
  if (mesh && mesh.geometry) {
    triangleCount.value = mesh.geometry.attributes.position.count / 3
  }
}

// 控制方法
function toggleAnimation() {
  isAnimating.value = !isAnimating.value
  if (isAnimating.value) {
    animate()
  } else {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }
}

function resetScene() {
  if (mesh) {
    mesh.rotation.x = 0
    mesh.rotation.y = 0
    mesh.position.set(0, 0, 0)
  }
  $q.notify({
    message: '场景已重置',
    type: 'positive',
    position: 'top',
  })
}

function changeGeometry() {
  currentGeometryIndex = (currentGeometryIndex + 1) % geometries.length
  const geometryData = geometries[currentGeometryIndex]

  if (mesh) {
    // 删除旧几何体
    mesh.geometry.dispose()
    // 创建新几何体
    mesh.geometry = geometryData.create()
    currentGeometry.value = geometryData.name
    updateStats()
  }

  $q.notify({
    message: `切换到 ${geometryData.name} 几何体`,
    type: 'info',
    position: 'top',
  })
}

// 监听参数变化
watch(lightIntensity, (newValue) => {
  if (directionalLight) {
    directionalLight.intensity = newValue
  }
})

// 窗口大小调整
function onWindowResize() {
  if (!camera || !renderer || !threeContainer.value) return

  const width = threeContainer.value.clientWidth
  const height = canvasHeight.value

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// 组件生命周期
onMounted(() => {
  initThree()
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)

  // 清理 Three.js 资源
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (mesh && mesh.geometry) {
    mesh.geometry.dispose()
  }

  if (mesh && mesh.material) {
    mesh.material.dispose()
  }

  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.threejs-container {
  padding: 16px;
}

.three-canvas-container {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(45deg, #f5f5f5 0%, #ffffff 100%);
}

.my-card {
  max-width: 800px;
  margin: 0 auto;
}

.text-caption {
  opacity: 0.7;
}
</style>
```

### 2. 将组件添加到路由和页面

编辑 `src/pages/ComponentsPage.vue`，添加 Three.js 演示：

```vue
<!-- 在 ComponentsPage.vue 中添加 -->
<template>
  <!-- ... 其他组件 ... -->

  <!-- Three.js 演示 -->
  <q-expansion-item
    expand-separator
    icon="view_in_ar"
    label="Three.js 3D 图形"
    caption="WebGL 3D 渲染和动画"
  >
    <ThreeJSDemo />
  </q-expansion-item>

  <!-- ... 其他组件 ... -->
</template>

<script setup>
// ... 其他导入 ...
import ThreeJSDemo from '@/components/demos/ThreeJSDemo.vue'
</script>
```

---

## 🎯 实际应用场景

### 1. **产品展示和电商**

#### 3D 产品预览器

```vue
<template>
  <div class="product-viewer">
    <div ref="productContainer" class="product-canvas"></div>

    <div class="controls">
      <q-btn-group>
        <q-btn @click="rotateLeft" icon="rotate_left" />
        <q-btn @click="rotateRight" icon="rotate_right" />
        <q-btn @click="zoomIn" icon="zoom_in" />
        <q-btn @click="zoomOut" icon="zoom_out" />
      </q-btn-group>

      <q-select
        v-model="selectedTexture"
        :options="textureOptions"
        label="材质选择"
        @update:model-value="changeTexture"
      />
    </div>
  </div>
</template>
```

**应用场景：**

- 🛍️ 电商网站 3D 商品展示
- 👗 服装试穿预览
- 🏠 家具摆放模拟
- 🚗 汽车配置器
- 💍 珠宝定制预览

### 2. **数据可视化**

#### 3D 图表和统计

```javascript
// 3D 柱状图示例
function create3DChart(data) {
  const scene = new THREE.Scene()

  data.forEach((item, index) => {
    const geometry = new THREE.BoxGeometry(0.8, item.value, 0.8)
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(index / data.length, 1, 0.5),
    })
    const bar = new THREE.Mesh(geometry, material)
    bar.position.set(index * 1.2, item.value / 2, 0)
    scene.add(bar)
  })
}
```

**应用场景：**

- 📊 3D 数据图表展示
- 🌍 地理信息系统（GIS）
- 📈 金融数据可视化
- 🏢 建筑信息模型（BIM）
- 🔬 科学数据可视化

### 3. **游戏和娱乐**

#### 简单 3D 游戏

```javascript
// 3D 游戏基础框架
class Game3D {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    this.player = null
    this.enemies = []
    this.score = 0
  }

  createPlayer() {
    const geometry = new THREE.ConeGeometry(0.5, 1, 8)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    this.player = new THREE.Mesh(geometry, material)
    this.scene.add(this.player)
  }

  gameLoop() {
    this.updatePlayer()
    this.updateEnemies()
    this.checkCollisions()
    this.render()
    requestAnimationFrame(() => this.gameLoop())
  }
}
```

**应用场景：**

- 🎮 Web 3D 游戏
- 🎯 交互式体验
- 🎨 艺术创作工具
- 🎪 虚拟展览
- 🎬 3D 动画制作

### 4. **教育和培训**

#### 3D 解剖模型

```vue
<template>
  <div class="anatomy-viewer">
    <div ref="anatomyContainer" class="anatomy-canvas"></div>

    <q-list>
      <q-item v-for="organ in organs" :key="organ.id" clickable @click="focusOnOrgan(organ)">
        <q-item-section>
          <q-item-label>{{ organ.name }}</q-item-label>
          <q-item-label caption>{{ organ.description }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="organ.visible" @update:model-value="toggleOrgan(organ)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
```

**应用场景：**

- 🧠 医学解剖教学
- 🔬 分子结构展示
- 🏗️ 工程结构分析
- 🌌 天文现象模拟
- 📚 互动教学材料

### 5. **建筑和设计**

#### 室内设计预览

```javascript
// 室内设计3D预览
class InteriorDesigner {
  constructor() {
    this.scene = new THREE.Scene()
    this.room = null
    this.furniture = []
    this.materials = new Map()
  }

  createRoom(width, height, depth) {
    const roomGeometry = new THREE.BoxGeometry(width, height, depth)
    const roomMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    })
    this.room = new THREE.Mesh(roomGeometry, roomMaterial)
    this.scene.add(this.room)
  }

  addFurniture(type, position, rotation) {
    // 加载家具模型
    this.loadModel(`/models/${type}.gltf`).then((model) => {
      model.position.copy(position)
      model.rotation.copy(rotation)
      this.furniture.push(model)
      this.scene.add(model)
    })
  }
}
```

**应用场景：**

- 🏠 室内设计预览
- 🏢 建筑可视化
- 🌆 城市规划展示
- 🎨 艺术画廊虚拟展示
- 🏭 工厂布局规划

---

## 🚀 完整示例

### 高级 3D 场景示例

让我创建一个更复杂的示例，展示多个 Three.js 功能：

```vue
<template>
  <q-page class="flex flex-center">
    <div class="advanced-threejs-demo">
      <!-- 主要 3D 视图 -->
      <q-card class="main-viewer">
        <q-card-section>
          <div class="text-h5">高级 3D 场景演示</div>
          <div class="text-subtitle2">包含模型加载、粒子系统、后期处理</div>
        </q-card-section>

        <q-card-section>
          <div ref="advancedContainer" class="advanced-canvas">
            <!-- Three.js 高级场景 -->
          </div>
        </q-card-section>

        <q-card-section>
          <q-tabs v-model="activeTab" dense class="text-grey" active-color="primary">
            <q-tab name="scene" label="场景设置" />
            <q-tab name="lighting" label="光照控制" />
            <q-tab name="effects" label="特效参数" />
            <q-tab name="performance" label="性能监控" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="activeTab" animated>
            <!-- 场景设置面板 -->
            <q-tab-panel name="scene">
              <div class="row q-gutter-md">
                <div class="col">
                  <q-select
                    v-model="selectedScene"
                    :options="sceneOptions"
                    label="预设场景"
                    @update:model-value="loadScene"
                  />
                </div>
                <div class="col">
                  <q-btn @click="loadRandomModel" color="primary" label="随机模型" />
                </div>
              </div>

              <q-slider
                v-model="cameraDistance"
                :min="5"
                :max="50"
                label
                label-always
                @update:model-value="updateCameraDistance"
              >
                <template v-slot:marker-labels="{ marker }">
                  相机距离: {{ marker.value }}
                </template>
              </q-slider>
            </q-tab-panel>

            <!-- 光照控制面板 -->
            <q-tab-panel name="lighting">
              <div class="lighting-controls">
                <div class="row q-gutter-md">
                  <div class="col-6">
                    <q-slider
                      v-model="ambientIntensity"
                      :min="0"
                      :max="2"
                      :step="0.1"
                      label="环境光强度"
                      @update:model-value="updateAmbientLight"
                    />
                  </div>
                  <div class="col-6">
                    <q-slider
                      v-model="directionalIntensity"
                      :min="0"
                      :max="3"
                      :step="0.1"
                      label="方向光强度"
                      @update:model-value="updateDirectionalLight"
                    />
                  </div>
                </div>

                <div class="row q-gutter-md q-mt-md">
                  <q-color v-model="lightColor" @change="updateLightColor" />
                  <q-toggle
                    v-model="shadowsEnabled"
                    label="阴影"
                    @update:model-value="toggleShadows"
                  />
                </div>
              </div>
            </q-tab-panel>

            <!-- 特效参数面板 -->
            <q-tab-panel name="effects">
              <div class="effects-controls">
                <q-toggle
                  v-model="particlesEnabled"
                  label="粒子系统"
                  @update:model-value="toggleParticles"
                />
                <q-toggle
                  v-model="postProcessingEnabled"
                  label="后期处理"
                  @update:model-value="togglePostProcessing"
                />

                <div v-if="particlesEnabled" class="q-mt-md">
                  <q-slider
                    v-model="particleCount"
                    :min="100"
                    :max="10000"
                    :step="100"
                    label="粒子数量"
                    @update:model-value="updateParticles"
                  />
                </div>
              </div>
            </q-tab-panel>

            <!-- 性能监控面板 -->
            <q-tab-panel name="performance">
              <div class="performance-stats">
                <div class="text-h6">性能统计</div>
                <div class="stats-grid">
                  <div class="stat-item">
                    <div class="stat-value">{{ performanceStats.fps }}</div>
                    <div class="stat-label">FPS</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ performanceStats.triangles }}</div>
                    <div class="stat-label">三角形</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ performanceStats.drawCalls }}</div>
                    <div class="stat-label">绘制调用</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ performanceStats.memory }}MB</div>
                    <div class="stat-label">显存使用</div>
                  </div>
                </div>

                <q-linear-progress
                  :value="performanceStats.fps / 60"
                  color="primary"
                  class="q-mt-md"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      color="white"
                      text-color="primary"
                      :label="`${performanceStats.fps} FPS`"
                    />
                  </div>
                </q-linear-progress>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import * as THREE from 'three'

// Quasar
const $q = useQuasar()

// 响应式数据
const advancedContainer = ref(null)
const activeTab = ref('scene')
const selectedScene = ref('default')
const cameraDistance = ref(15)
const ambientIntensity = ref(0.4)
const directionalIntensity = ref(1)
const lightColor = ref('#ffffff')
const shadowsEnabled = ref(true)
const particlesEnabled = ref(false)
const postProcessingEnabled = ref(false)
const particleCount = ref(1000)

// 性能统计
const performanceStats = ref({
  fps: 0,
  triangles: 0,
  drawCalls: 0,
  memory: 0,
})

// Three.js 对象
let scene, camera, renderer, controls
let ambientLight, directionalLight
let particleSystem = null
let animationId = null
let stats = null

// 场景选项
const sceneOptions = [
  { label: '默认场景', value: 'default' },
  { label: '太空场景', value: 'space' },
  { label: '森林场景', value: 'forest' },
  { label: '城市场景', value: 'city' },
]

// 初始化高级场景
async function initAdvancedScene() {
  try {
    // 创建场景
    scene = new THREE.Scene()

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, advancedContainer.value.clientWidth / 400, 0.1, 1000)
    camera.position.set(0, 5, cameraDistance.value)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(advancedContainer.value.clientWidth, 400)
    renderer.shadowMap.enabled = shadowsEnabled.value
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    advancedContainer.value.appendChild(renderer.domElement)

    // 添加轨道控制器（需要额外安装：npm install three-orbitcontrols）
    // 这里简化处理，手动实现基础控制
    setupBasicControls()

    // 设置光照
    setupLighting()

    // 加载默认场景
    await loadScene('default')

    // 开始动画循环
    animate()

    $q.notify({
      message: '3D 场景加载完成',
      type: 'positive',
    })
  } catch (error) {
    console.error('Three.js 初始化失败:', error)
    $q.notify({
      message: '3D 场景加载失败',
      type: 'negative',
    })
  }
}

// 设置光照
function setupLighting() {
  // 环境光
  ambientLight = new THREE.AmbientLight(0x404040, ambientIntensity.value)
  scene.add(ambientLight)

  // 方向光
  directionalLight = new THREE.DirectionalLight(0xffffff, directionalIntensity.value)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = shadowsEnabled.value
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)
}

// 基础控制设置
function setupBasicControls() {
  let isDragging = false
  let previousMousePosition = { x: 0, y: 0 }

  const canvas = renderer.domElement

  canvas.addEventListener('mousedown', (event) => {
    isDragging = true
    previousMousePosition = { x: event.clientX, y: event.clientY }
  })

  canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      }

      const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ'),
      )

      camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion)
      previousMousePosition = { x: event.clientX, y: event.clientY }
    }
  })

  canvas.addEventListener('mouseup', () => {
    isDragging = false
  })

  canvas.addEventListener('wheel', (event) => {
    const zoom = event.deltaY * 0.01
    camera.position.multiplyScalar(1 + zoom)
  })
}

// 加载场景
async function loadScene(sceneType) {
  // 清理现有场景对象
  clearScene()

  switch (sceneType) {
    case 'default':
      await createDefaultScene()
      break
    case 'space':
      await createSpaceScene()
      break
    case 'forest':
      await createForestScene()
      break
    case 'city':
      await createCityScene()
      break
  }

  updatePerformanceStats()
}

// 创建默认场景
async function createDefaultScene() {
  scene.background = new THREE.Color(0x87ceeb) // 天空蓝

  // 添加几何体
  const geometries = [
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.SphereGeometry(1.5, 32, 32),
    new THREE.ConeGeometry(1, 3, 32),
  ]

  const colors = [0xff4444, 0x44ff44, 0x4444ff]

  geometries.forEach((geometry, index) => {
    const material = new THREE.MeshPhongMaterial({ color: colors[index] })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (index - 1) * 4
    mesh.castShadow = true
    scene.add(mesh)
  })

  // 添加地面
  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -Math.PI / 2
  plane.position.y = -2
  plane.receiveShadow = true
  scene.add(plane)
}

// 创建太空场景
async function createSpaceScene() {
  scene.background = new THREE.Color(0x000011) // 深色背景

  // 创建星空
  const starsGeometry = new THREE.BufferGeometry()
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 })

  const starsVertices = []
  for (let i = 0; i < 10000; i++) {
    starsVertices.push((Math.random() - 0.5) * 200)
    starsVertices.push((Math.random() - 0.5) * 200)
    starsVertices.push((Math.random() - 0.5) * 200)
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
  const stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)

  // 添加行星
  const planetGeometry = new THREE.SphereGeometry(2, 32, 32)
  const planetMaterial = new THREE.MeshPhongMaterial({ color: 0xff6600 })
  const planet = new THREE.Mesh(planetGeometry, planetMaterial)
  scene.add(planet)
}

// 创建森林场景
async function createForestScene() {
  scene.background = new THREE.Color(0x228b22) // 森林绿

  // 创建简单的树
  for (let i = 0; i < 20; i++) {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 3)
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 })
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)

    const leavesGeometry = new THREE.SphereGeometry(1.5, 8, 8)
    const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 })
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial)
    leaves.position.y = 2

    const tree = new THREE.Group()
    tree.add(trunk)
    tree.add(leaves)

    tree.position.x = (Math.random() - 0.5) * 30
    tree.position.z = (Math.random() - 0.5) * 30
    tree.position.y = -1

    scene.add(tree)
  }
}

// 创建城市场景
async function createCityScene() {
  scene.background = new THREE.Color(0x87ceeb) // 城市天空

  // 创建简单的建筑
  for (let i = 0; i < 15; i++) {
    const height = Math.random() * 10 + 2
    const buildingGeometry = new THREE.BoxGeometry(2, height, 2)
    const buildingMaterial = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.3, 0.7),
    })
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial)

    building.position.x = (Math.random() - 0.5) * 30
    building.position.z = (Math.random() - 0.5) * 30
    building.position.y = height / 2 - 1
    building.castShadow = true

    scene.add(building)
  }
}

// 清理场景
function clearScene() {
  const objectsToRemove = []
  scene.traverse((child) => {
    if (child.isMesh || child.isPoints) {
      objectsToRemove.push(child)
    }
  })

  objectsToRemove.forEach((object) => {
    scene.remove(object)
    if (object.geometry) object.geometry.dispose()
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose())
      } else {
        object.material.dispose()
      }
    }
  })
}

// 动画循环
function animate() {
  animationId = requestAnimationFrame(animate)

  // 旋转场景中的对象
  scene.traverse((child) => {
    if (child.isMesh && child !== scene.getObjectByName('plane')) {
      child.rotation.y += 0.01
    }
  })

  // 更新性能统计
  updatePerformanceStats()

  // 渲染
  renderer.render(scene, camera)
}

// 更新性能统计
function updatePerformanceStats() {
  // 简化的性能统计
  performanceStats.value.fps = Math.round(60) // 实际项目中应该计算真实FPS
  performanceStats.value.triangles = renderer.info.render.triangles
  performanceStats.value.drawCalls = renderer.info.render.calls
  performanceStats.value.memory = Math.round(
    renderer.info.memory.geometries + renderer.info.memory.textures,
  )
}

// 控制方法
function updateCameraDistance(distance) {
  camera.position.setLength(distance)
}

function updateAmbientLight(intensity) {
  if (ambientLight) {
    ambientLight.intensity = intensity
  }
}

function updateDirectionalLight(intensity) {
  if (directionalLight) {
    directionalLight.intensity = intensity
  }
}

function updateLightColor(color) {
  if (directionalLight) {
    directionalLight.color.setHex(color.replace('#', '0x'))
  }
}

function toggleShadows(enabled) {
  if (renderer) {
    renderer.shadowMap.enabled = enabled
    if (directionalLight) {
      directionalLight.castShadow = enabled
    }
  }
}

function toggleParticles(enabled) {
  if (enabled && !particleSystem) {
    createParticleSystem()
  } else if (!enabled && particleSystem) {
    scene.remove(particleSystem)
    particleSystem = null
  }
}

function createParticleSystem() {
  const particles = new THREE.BufferGeometry()
  const particleCount = 1000

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
    colors[i] = Math.random()
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
  })

  particleSystem = new THREE.Points(particles, particleMaterial)
  scene.add(particleSystem)
}

function togglePostProcessing(enabled) {
  // 后期处理实现（需要额外的后期处理库）
  console.log('后期处理', enabled ? '开启' : '关闭')
}

function loadRandomModel() {
  // 随机生成几何体
  const geometryTypes = [
    () => new THREE.BoxGeometry(2, 2, 2),
    () => new THREE.SphereGeometry(1.5, 32, 32),
    () => new THREE.ConeGeometry(1, 3, 32),
    () => new THREE.TorusGeometry(1, 0.4, 16, 100),
    () => new THREE.DodecahedronGeometry(1.5, 0),
  ]

  const randomGeometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)]()
  const randomMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
  })

  const mesh = new THREE.Mesh(randomGeometry, randomMaterial)
  mesh.position.set((Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10)
  mesh.castShadow = true

  scene.add(mesh)

  $q.notify({
    message: '已添加随机模型',
    type: 'info',
  })
}

// 工具函数
function toRadians(angle) {
  return angle * (Math.PI / 180)
}

// 生命周期
onMounted(() => {
  initAdvancedScene()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // 清理资源
  clearScene()

  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.advanced-threejs-demo {
  width: 100%;
  max-width: 1000px;
}

.main-viewer {
  min-height: 600px;
}

.advanced-canvas {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(45deg, #f5f5f5 0%, #ffffff 100%);
  height: 400px;
}

.lighting-controls,
.effects-controls {
  padding: 16px 0;
}

.performance-stats {
  padding: 16px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.stat-value {
  font-size: 1.5em;
  font-weight: bold;
  color: #1976d2;
}

.stat-label {
  font-size: 0.9em;
  opacity: 0.7;
  margin-top: 4px;
}
</style>
```

---

## 💡 最佳实践

### 1. **性能优化**

#### 几何体优化

```javascript
// 避免：每帧创建新几何体
function badExample() {
  scene.children.forEach((child) => scene.remove(child))
  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1) // 每次都创建新几何体
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
  }
}

// 推荐：复用几何体和材质
class OptimizedScene {
  constructor() {
    this.sharedGeometry = new THREE.BoxGeometry(1, 1, 1)
    this.materialPool = new Map()
  }

  getMaterial(color) {
    if (!this.materialPool.has(color)) {
      this.materialPool.set(color, new THREE.MeshBasicMaterial({ color }))
    }
    return this.materialPool.get(color)
  }

  createMesh(color) {
    return new THREE.Mesh(this.sharedGeometry, this.getMaterial(color))
  }
}
```

#### 实例化渲染

```javascript
// 大量相似对象使用实例化渲染
function createInstancedMeshes(count) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

  const instancedMesh = new THREE.InstancedMesh(geometry, material, count)

  const matrix = new THREE.Matrix4()
  for (let i = 0; i < count; i++) {
    matrix.setPosition(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
    )
    instancedMesh.setMatrixAt(i, matrix)
  }

  instancedMesh.instanceMatrix.needsUpdate = true
  scene.add(instancedMesh)
}
```

### 2. **内存管理**

#### 资源清理

```javascript
class ResourceManager {
  constructor() {
    this.geometries = new Set()
    this.materials = new Set()
    this.textures = new Set()
  }

  createGeometry(type, ...args) {
    const geometry = new THREE[type](...args)
    this.geometries.add(geometry)
    return geometry
  }

  createMaterial(type, options) {
    const material = new THREE[type](options)
    this.materials.add(material)
    return material
  }

  dispose() {
    // 清理所有资源
    this.geometries.forEach((geometry) => geometry.dispose())
    this.materials.forEach((material) => material.dispose())
    this.textures.forEach((texture) => texture.dispose())

    this.geometries.clear()
    this.materials.clear()
    this.textures.clear()
  }
}

// 在 Vue 组件中使用
let resourceManager = null

onMounted(() => {
  resourceManager = new ResourceManager()
})

onUnmounted(() => {
  if (resourceManager) {
    resourceManager.dispose()
  }
})
```

### 3. **响应式设计**

#### 自适应画布大小

```javascript
function handleResize() {
  if (!camera || !renderer || !container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  // 更新相机
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(width, height)

  // 更新渲染分辨率（可选，用于性能优化）
  const pixelRatio = Math.min(window.devicePixelRatio, 2)
  renderer.setPixelRatio(pixelRatio)
}

// 使用防抖优化
import { debounce } from 'quasar'
const debouncedResize = debounce(handleResize, 100)

onMounted(() => {
  window.addEventListener('resize', debouncedResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize)
})
```

### 4. **错误处理**

#### 渐进式功能加载

```javascript
class ThreeJSWrapper {
  constructor(container) {
    this.container = container
    this.capabilities = this.checkCapabilities()
  }

  checkCapabilities() {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')

    return {
      webgl: !!gl,
      webgl2: !!canvas.getContext('webgl2'),
      extensions: {
        floatTextures: !!gl?.getExtension('OES_texture_float'),
        derivatives: !!gl?.getExtension('OES_standard_derivatives'),
      },
    }
  }

  async init() {
    if (!this.capabilities.webgl) {
      throw new Error('WebGL 不受支持')
    }

    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: this.capabilities.webgl2, // 只在 WebGL2 中启用抗锯齿
        alpha: true,
      })

      // 根据能力调整设置
      if (this.capabilities.extensions.floatTextures) {
        this.enableHighQualityEffects()
      } else {
        this.enableBasicEffects()
      }
    } catch (error) {
      console.error('Three.js 初始化失败:', error)
      this.initFallback()
    }
  }

  enableHighQualityEffects() {
    // 启用高质量效果
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
  }

  enableBasicEffects() {
    // 基础效果
    this.renderer.shadowMap.enabled = false
  }

  initFallback() {
    // 降级方案：显示静态图片或 CSS 3D
    this.container.innerHTML = `
      <div class="fallback-3d">
        <img src="/fallback-3d-image.png" alt="3D 场景预览" />
        <p>您的浏览器不支持 WebGL，显示静态预览</p>
      </div>
    `
  }
}
```

---

## ⚡ 性能优化

### 1. **渲染优化**

#### 层级细节（LOD）

```javascript
// 根据距离使用不同精度的模型
function createLODObject() {
  const lod = new THREE.LOD()

  // 高精度模型（近距离）
  const highDetailGeometry = new THREE.SphereGeometry(1, 32, 32)
  const highDetailMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
  const highDetailMesh = new THREE.Mesh(highDetailGeometry, highDetailMaterial)
  lod.addLevel(highDetailMesh, 0)

  // 中精度模型（中等距离）
  const mediumDetailGeometry = new THREE.SphereGeometry(1, 16, 16)
  const mediumDetailMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  const mediumDetailMesh = new THREE.Mesh(mediumDetailGeometry, mediumDetailMaterial)
  lod.addLevel(mediumDetailMesh, 10)

  // 低精度模型（远距离）
  const lowDetailGeometry = new THREE.SphereGeometry(1, 8, 8)
  const lowDetailMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const lowDetailMesh = new THREE.Mesh(lowDetailGeometry, lowDetailMaterial)
  lod.addLevel(lowDetailMesh, 50)

  return lod
}
```

#### 视锥体剔除

```javascript
// 只渲染相机可见的对象
function optimizeRendering() {
  const frustum = new THREE.Frustum()
  const matrix = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse,
  )
  frustum.setFromProjectionMatrix(matrix)

  scene.children.forEach((child) => {
    if (child.isMesh) {
      child.visible = frustum.intersectsObject(child)
    }
  })
}
```

### 2. **资源加载优化**

#### 纹理压缩和预加载

```javascript
class TextureManager {
  constructor() {
    this.loader = new THREE.TextureLoader()
    this.cache = new Map()
  }

  async loadTexture(url, options = {}) {
    if (this.cache.has(url)) {
      return this.cache.get(url)
    }

    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => {
          // 优化纹理设置
          texture.generateMipmaps = options.generateMipmaps !== false
          texture.wrapS = options.wrapS || THREE.RepeatWrapping
          texture.wrapT = options.wrapT || THREE.RepeatWrapping
          texture.minFilter = options.minFilter || THREE.LinearMipmapLinearFilter
          texture.magFilter = options.magFilter || THREE.LinearFilter

          // 压缩纹理（如果支持）
          if (options.compress && this.supportsCompression()) {
            texture.format = THREE.RGBAFormat
            texture.type = THREE.UnsignedByteType
          }

          this.cache.set(url, texture)
          resolve(texture)
        },
        undefined,
        reject,
      )
    })
  }

  supportsCompression() {
    // 检查浏览器压缩支持
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    return !!(gl && gl.getExtension('WEBGL_compressed_texture_s3tc'))
  }

  preloadTextures(urls) {
    return Promise.all(urls.map((url) => this.loadTexture(url)))
  }
}
```

### 3. **动画优化**

#### 使用requestAnimationFrame和时间差

```javascript
class AnimationManager {
  constructor() {
    this.clock = new THREE.Clock()
    this.mixer = null
    this.actions = []
  }

  update() {
    const deltaTime = this.clock.getDelta()

    // 限制最大时间步长，避免大的跳跃
    const maxDelta = 1 / 30 // 30fps 最低帧率
    const clampedDelta = Math.min(deltaTime, maxDelta)

    if (this.mixer) {
      this.mixer.update(clampedDelta)
    }

    // 更新自定义动画
    this.updateCustomAnimations(clampedDelta)
  }

  updateCustomAnimations(deltaTime) {
    // 平滑的动画更新
    scene.children.forEach((child) => {
      if (child.userData.rotationSpeed) {
        child.rotation.y += child.userData.rotationSpeed * deltaTime
      }
    })
  }
}
```

---

## ❓ 常见问题

### 1. **安装和配置问题**

#### Q: Three.js 安装后出现模块解析错误？

**A: 解决方案：**

```javascript
// 在 quasar.config.js 中添加别名
build: {
  chainWebpack(chain) {
    chain.resolve.alias
      .set('three', path.resolve(__dirname, 'node_modules/three/build/three.module.js'))
      .set('three/addons', path.resolve(__dirname, 'node_modules/three/examples/jsm'))
  }
}
```

#### Q: TypeScript 类型定义问题？

**A: 解决方案：**

```bash
# 安装类型定义
npm install --save-dev @types/three

# 在 tsconfig.json 或 jsconfig.json 中
{
  "compilerOptions": {
    "types": ["three"],
    "moduleResolution": "node"
  }
}
```

### 2. **性能问题**

#### Q: 场景渲染卡顿，FPS 很低？

**A: 优化建议：**

1. **减少多边形数量**

```javascript
// 降低几何体复杂度
const sphere = new THREE.SphereGeometry(1, 16, 16) // 而不是 (1, 64, 64)
```

2. **使用实例化渲染**

```javascript
// 大量相似对象使用 InstancedMesh
const instancedMesh = new THREE.InstancedMesh(geometry, material, count)
```

3. **优化材质**

```javascript
// 使用更简单的材质
const material = new THREE.MeshLambertMaterial() // 而不是 MeshPhongMaterial
```

#### Q: 内存使用过高？

**A: 内存管理：**

```javascript
// 及时清理不用的资源
function cleanupResources(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose()
    }
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose())
      } else {
        child.material.dispose()
      }
    }
    if (child.texture) {
      child.texture.dispose()
    }
  })
}
```

### 3. **移动端适配问题**

#### Q: 移动设备性能差？

**A: 移动端优化：**

```javascript
// 检测移动设备并降低质量
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function initRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: !isMobile(), // 移动端关闭抗锯齿
    powerPreference: isMobile() ? 'low-power' : 'high-performance',
  })

  // 移动端降低渲染分辨率
  if (isMobile()) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  } else {
    renderer.setPixelRatio(window.devicePixelRatio)
  }
}
```

### 4. **浏览器兼容性**

#### Q: 某些浏览器不支持 WebGL？

**A: 降级处理：**

```javascript
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!context
  } catch (e) {
    return false
  }
}

function initWithFallback() {
  if (checkWebGLSupport()) {
    initThreeJS()
  } else {
    showFallbackContent()
  }
}

function showFallbackContent() {
  container.innerHTML = `
    <div class="webgl-fallback">
      <h3>WebGL 不受支持</h3>
      <p>您的浏览器不支持 WebGL，请升级浏览器或使用现代浏览器。</p>
      <img src="/static-3d-preview.jpg" alt="3D 场景预览" />
    </div>
  `
}
```

---

## 📚 扩展资源

### 官方文档和教程

- **[Three.js 官方文档](https://threejs.org/docs/)** - 完整 API 文档
- **[Three.js 示例](https://threejs.org/examples/)** - 官方示例库
- **[Three.js 编辑器](https://threejs.org/editor/)** - 在线 3D 编辑器

### 学习资源

- **[Three.js Fundamentals](https://threejs.org/manual/)** - 基础教程
- **[Discover Three.js](https://discoverthreejs.com/)** - 深入教程
- **[Three.js Cookbook](https://github.com/josdirksen/threejs-cookbook)** - 实用技巧

### 相关库和插件

```bash
# 常用扩展库
npm install three-gltf-loader        # GLTF 模型加载
npm install three-orbitcontrols      # 轨道控制器
npm install three-transformcontrols  # 变换控制器
npm install cannon-es                # 物理引擎
npm install postprocessing           # 后期处理效果

# Vue 相关
npm install @vueuse/core             # Vue 工具函数
npm install vue-three                # Vue Three.js 包装器
```

### 模型资源

- **[Sketchfab](https://sketchfab.com/)** - 3D 模型库
- **[Poly Haven](https://polyhaven.com/)** - 免费 HDR 和纹理
- **[Mixamo](https://www.mixamo.com/)** - 3D 角色和动画
- **[Blender](https://www.blender.org/)** - 开源 3D 建模软件

### 社区和论坛

- **[Three.js Discord](https://discord.gg/56GBJwAnUS)** - 官方社区
- **[r/threejs](https://www.reddit.com/r/threejs/)** - Reddit 社区
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/three.js)** - 技术问答

---

## 🚀 下一步计划

### 学习路径建议

1. **🟢 基础阶段（1-2周）**
   - 理解 Three.js 基本概念
   - 创建简单的 3D 场景
   - 掌握几何体、材质、光照

2. **🟡 进阶阶段（2-4周）**
   - 学习动画系统
   - 掌握相机控制
   - 了解纹理和材质进阶用法

3. **🔴 高级阶段（4-8周）**
   - 掌握 3D 模型加载
   - 学习着色器编程
   - 实现复杂的交互效果

4. **🏆 专家阶段（持续学习）**
   - 性能优化技巧
   - 自定义着色器开发
   - 复杂项目架构设计

### 实践项目建议

1. **🎯 产品展示器** - 3D 商品预览
2. **🎮 简单游戏** - 3D 迷宫或射击游戏
3. **📊 数据可视化** - 3D 图表和统计
4. **🏠 虚拟展厅** - 3D 展览或房屋游览
5. **🎨 创意工具** - 3D 绘图或建模应用

---

## 🎉 总结

Three.js 为 Web 开发带来了强大的 3D 能力，结合 Quasar Vue 3 可以创建令人印象深刻的 3D 应用。从简单的几何体展示到复杂的交互式 3D 场景，Three.js 都能胜任。

**记住关键点：**

- ⚡ **性能优先** - 始终考虑性能影响
- 🧹 **资源管理** - 及时清理不用的资源
- 📱 **移动适配** - 针对不同设备优化
- 🔧 **渐进增强** - 提供降级方案
- 📚 **持续学习** - 3D 技术发展快速

现在开始您的 Three.js 之旅，创造令人惊叹的 3D Web 体验吧！🚀✨

---

_最后更新：2024年10月_
_适用于：Three.js r158+, Quasar v2.16+, Vue 3.5+_
