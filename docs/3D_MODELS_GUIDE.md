# Three.js 3D 模型导入指南 🎯

> **完整指南：如何下载、导入和使用 3D 模型**

---

## 📋 目录

1. [支持的模型格式](#-支持的模型格式)
2. [3D 模型资源网站](#-3d-模型资源网站)
3. [安装模型加载器](#-安装模型加载器)
4. [基础模型加载](#-基础模型加载)
5. [高级功能示例](#-高级功能示例)
6. [模型优化技巧](#-模型优化技巧)
7. [常见问题解决](#-常见问题解决)

---

## 🎨 支持的模型格式

### 1. **推荐格式**

#### ✅ **GLTF/GLB (推荐)**
- **优点：** 现代标准、体积小、支持动画、材质、纹理
- **用途：** 游戏、产品展示、复杂模型
- **扩展名：** `.gltf` (JSON + 外部文件) 或 `.glb` (二进制)

#### ✅ **FBX**
- **优点：** 广泛支持、动画丰富
- **用途：** 角色动画、复杂场景
- **扩展名：** `.fbx`

#### ✅ **OBJ**
- **优点：** 简单、通用性强
- **缺点：** 不支持动画和复杂材质
- **用途：** 静态模型、建筑
- **扩展名：** `.obj` (通常配合 `.mtl` 材质文件)

### 2. **其他支持格式**

- **STL** - 3D 打印模型
- **PLY** - 点云数据
- **DAE (Collada)** - 开放标准
- **3DS** - 3ds Max 格式

---

## 🌐 3D 模型资源网站

### 🆓 **免费资源**

#### 1. **Sketchfab** 
- **网址：** https://sketchfab.com
- **特点：** 高质量、可预览、支持下载
- **格式：** GLTF、OBJ、FBX
- **筛选：** 选择 "Downloadable" 和 "CC Attribution"

#### 2. **Poly Pizza**
- **网址：** https://poly.pizza
- **特点：** 简单模型、低面数
- **格式：** GLTF

#### 3. **Free3D**
- **网址：** https://free3d.com
- **特点：** 各种类别模型
- **格式：** 多种格式

#### 4. **TurboSquid (免费区)**
- **网址：** https://www.turbosquid.com/Search/3D-Models/free
- **特点：** 专业级模型
- **格式：** 多种格式

### 💰 **付费资源**

- **CGTrader** - https://www.cgtrader.com
- **TurboSquid** - https://www.turbosquid.com
- **Unity Asset Store** - https://assetstore.unity.com

---

## 📦 安装模型加载器

在项目中安装必要的加载器：

```bash
# Three.js 已经包含了大部分加载器，无需额外安装
# 但如果需要特定加载器，可以安装：

# GLTF 加载器（推荐，Three.js 内置）
# 无需额外安装

# FBX 加载器（Three.js 内置）
# 无需额外安装

# 其他加载器
npm install three-obj-loader
npm install three-fbx-loader
```

---

## 🚀 基础模型加载

### 1. **GLTF 模型加载 (推荐)**

创建 `src/components/demos/Model3DDemo.vue`：

```vue
<template>
  <div class="model-demo-container">
    <q-card class="model-card">
      <q-card-section>
        <div class="text-h6 flex items-center">
          <q-icon name="view_in_ar" class="q-mr-sm" />
          3D 模型加载演示
        </div>
        <div class="text-subtitle2 text-grey-7">
          支持 GLTF、FBX、OBJ 等多种格式
        </div>
      </q-card-section>

      <q-separator />

      <!-- 3D 渲染区域 -->
      <q-card-section class="q-pa-none">
        <div 
          ref="modelContainer" 
          class="model-canvas-container"
          :style="{ height: canvasHeight + 'px' }"
        >
          <div v-if="loading" class="loading-overlay">
            <q-spinner-cube size="50px" color="primary" />
            <div class="text-subtitle1 q-mt-md">正在加载 3D 模型...</div>
            <div class="text-caption">{{ loadingProgress }}%</div>
          </div>
          
          <div v-if="error" class="error-overlay">
            <q-icon name="error" size="48px" color="negative" />
            <div class="text-h6 q-mt-md">模型加载失败</div>
            <div class="text-body2 q-mt-sm text-grey-7">{{ error }}</div>
            <q-btn color="primary" outline @click="loadDefaultModel" class="q-mt-md">
              加载默认模型
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- 控制面板 -->
      <q-card-section>
        <div class="text-subtitle2 q-mb-md flex items-center">
          <q-icon name="settings" class="q-mr-sm" />
          模型控制
        </div>
        
        <div class="row q-gutter-md">
          <q-btn 
            color="primary" 
            icon="folder_open"
            label="选择模型文件"
            @click="openFileDialog"
            :disable="loading"
          />
          <q-btn 
            color="secondary" 
            icon="cloud_download"
            label="加载在线模型"
            @click="loadOnlineModel"
            :disable="loading"
          />
          <q-btn 
            color="accent" 
            icon="refresh"
            label="重置视角"
            @click="resetCamera"
            :disable="!modelLoaded"
          />
        </div>

        <!-- 文件选择（隐藏） -->
        <input 
          ref="fileInput"
          type="file"
          accept=".gltf,.glb,.fbx,.obj"
          @change="handleFileSelect"
          style="display: none"
        />
      </q-card-section>

      <!-- 预设模型选择 -->
      <q-card-section>
        <div class="text-subtitle2 q-mb-md">预设模型</div>
        <div class="row q-gutter-sm">
          <q-btn 
            v-for="model in presetModels" 
            :key="model.name"
            size="sm"
            :color="currentModel === model.name ? 'primary' : 'grey-5'"
            :label="model.name"
            @click="loadPresetModel(model)"
            :loading="loading && currentModel === model.name"
          />
        </div>
      </q-card-section>

      <!-- 模型信息 -->
      <q-card-section v-if="modelInfo">
        <div class="text-subtitle2 q-mb-md">模型信息</div>
        <div class="model-info-grid">
          <div class="info-item">
            <div class="info-label">顶点数</div>
            <div class="info-value">{{ modelInfo.vertices }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">面数</div>
            <div class="info-value">{{ modelInfo.faces }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">动画</div>
            <div class="info-value">{{ modelInfo.animations }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">文件大小</div>
            <div class="info-value">{{ modelInfo.size }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- 动画控制 -->
      <q-card-section v-if="animations.length > 0">
        <div class="text-subtitle2 q-mb-md">动画控制</div>
        <div class="row q-gutter-md items-center">
          <q-select
            v-model="selectedAnimation"
            :options="animationOptions"
            label="选择动画"
            style="min-width: 150px"
            @update:model-value="playAnimation"
          />
          <q-btn 
            :icon="isAnimationPlaying ? 'pause' : 'play_arrow'"
            :label="isAnimationPlaying ? '暂停' : '播放'"
            @click="toggleAnimation"
            :disable="!selectedAnimation"
          />
        </div>
      </q-card-section>

      <!-- 使用说明 -->
      <q-card-section>
        <q-expansion-item
          icon="help_outline"
          label="使用说明"
          caption="了解如何使用 3D 模型功能"
        >
          <div class="q-pa-md bg-grey-1">
            <div class="text-subtitle2 q-mb-sm">支持的文件格式：</div>
            <ul class="q-pl-md">
              <li><strong>GLTF/GLB：</strong> 推荐格式，支持动画和材质</li>
              <li><strong>FBX：</strong> 支持复杂动画和场景</li>
              <li><strong>OBJ：</strong> 简单静态模型</li>
            </ul>
            
            <div class="text-subtitle2 q-mt-md q-mb-sm">操作说明：</div>
            <ul class="q-pl-md">
              <li><strong>鼠标拖拽：</strong> 旋转模型</li>
              <li><strong>滚轮：</strong> 缩放模型</li>
              <li><strong>右键拖拽：</strong> 平移视角</li>
            </ul>
            
            <div class="text-subtitle2 q-mt-md q-mb-sm">推荐模型网站：</div>
            <ul class="q-pl-md">
              <li><a href="https://sketchfab.com" target="_blank">Sketchfab</a> - 高质量模型</li>
              <li><a href="https://poly.pizza" target="_blank">Poly Pizza</a> - 简单模型</li>
              <li><a href="https://free3d.com" target="_blank">Free3D</a> - 免费模型</li>
            </ul>
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 响应式数据
const modelContainer = ref(null)
const fileInput = ref(null)
const canvasHeight = ref(500)
const loading = ref(false)
const loadingProgress = ref(0)
const error = ref('')
const modelLoaded = ref(false)
const currentModel = ref('')
const modelInfo = ref(null)
const selectedAnimation = ref('')
const isAnimationPlaying = ref(false)
const animations = ref([])

// Three.js 对象
let THREE = null
let scene, camera, renderer, controls
let currentLoadedModel = null
let animationMixer = null
let animationActions = []
let animationId = null

// 预设模型列表
const presetModels = ref([
  {
    name: '立方体',
    type: 'primitive',
    create: () => new THREE.BoxGeometry(1, 1, 1)
  },
  {
    name: '球体',
    type: 'primitive', 
    create: () => new THREE.SphereGeometry(0.8, 32, 32)
  },
  {
    name: '在线模型',
    type: 'gltf',
    url: 'https://threejs.org/examples/models/gltf/DamagedHelmet/DamagedHelmet.gltf'
  }
])

// 动画选项
const animationOptions = computed(() => {
  return animations.value.map(anim => ({
    label: anim.name,
    value: anim.name
  }))
})

// 初始化 Three.js 场景
async function initThreeJS() {
  try {
    // 动态导入 Three.js
    THREE = await import('three')
    
    // 创建场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    // 创建相机
    const aspect = modelContainer.value.clientWidth / canvasHeight.value
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    camera.position.set(3, 3, 3)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(modelContainer.value.clientWidth, canvasHeight.value)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    modelContainer.value.appendChild(renderer.domElement)

    // 添加控制器（轨道控制）
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // 添加光照
    setupLighting()

    // 开始动画循环
    animate()
    
    // 加载默认模型
    loadDefaultModel()

  } catch (err) {
    error.value = '3D 引擎初始化失败：' + err.message
    console.error('Three.js initialization failed:', err)
  }
}

// 设置光照
function setupLighting() {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
  scene.add(ambientLight)

  // 方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // 额外的填充光
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
  fillLight.position.set(-5, 0, -5)
  scene.add(fillLight)
}

// 动画循环
function animate() {
  animationId = requestAnimationFrame(animate)
  
  if (controls) {
    controls.update()
  }
  
  if (animationMixer) {
    animationMixer.update(0.016) // 60fps
  }
  
  renderer.render(scene, camera)
}

// 加载 GLTF 模型
async function loadGLTFModel(url) {
  try {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
    const loader = new GLTFLoader()

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          resolve(gltf)
        },
        (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100)
          loadingProgress.value = percent
        },
        (error) => {
          reject(error)
        }
      )
    })
  } catch (err) {
    throw new Error('GLTF 加载器初始化失败：' + err.message)
  }
}

// 加载 FBX 模型
async function loadFBXModel(url) {
  try {
    const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js')
    const loader = new FBXLoader()

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (fbx) => {
          resolve(fbx)
        },
        (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100)
          loadingProgress.value = percent
        },
        (error) => {
          reject(error)
        }
      )
    })
  } catch (err) {
    throw new Error('FBX 加载器初始化失败：' + err.message)
  }
}

// 加载 OBJ 模型
async function loadOBJModel(url) {
  try {
    const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js')
    const loader = new OBJLoader()

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (obj) => {
          resolve(obj)
        },
        (progress) => {
          const percent = Math.round((progress.loaded / progress.total) * 100)
          loadingProgress.value = percent
        },
        (error) => {
          reject(error)
        }
      )
    })
  } catch (err) {
    throw new Error('OBJ 加载器初始化失败：' + err.message)
  }
}

// 清理当前模型
function clearCurrentModel() {
  if (currentLoadedModel) {
    scene.remove(currentLoadedModel)
    
    // 清理几何体和材质
    currentLoadedModel.traverse((child) => {
      if (child.geometry) {
        child.geometry.dispose()
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose())
        } else {
          child.material.dispose()
        }
      }
    })
    
    currentLoadedModel = null
  }
  
  // 清理动画
  if (animationMixer) {
    animationMixer.stopAllAction()
    animationMixer = null
  }
  animationActions = []
  animations.value = []
  selectedAnimation.value = ''
  isAnimationPlaying.value = false
}

// 添加模型到场景
function addModelToScene(model, modelData = null) {
  clearCurrentModel()
  
  // 计算模型边界并调整大小
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const maxSize = Math.max(size.x, size.y, size.z)
  const scale = 2 / maxSize // 标准化到2个单位大小
  
  model.scale.multiplyScalar(scale)
  
  // 居中模型
  const center = box.getCenter(new THREE.Vector3())
  model.position.sub(center.multiplyScalar(scale))
  
  // 启用阴影
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  
  scene.add(model)
  currentLoadedModel = model
  
  // 处理动画
  if (modelData && modelData.animations && modelData.animations.length > 0) {
    animationMixer = new THREE.AnimationMixer(model)
    animations.value = modelData.animations.map(clip => ({
      name: clip.name,
      clip: clip
    }))
    
    // 创建动画动作
    modelData.animations.forEach(clip => {
      const action = animationMixer.clipAction(clip)
      animationActions.push(action)
    })
  }
  
  // 更新模型信息
  updateModelInfo(model)
  
  modelLoaded.value = true
  
  // 调整相机位置
  fitCameraToModel(model)
}

// 更新模型信息
function updateModelInfo(model) {
  let vertices = 0
  let faces = 0
  
  model.traverse((child) => {
    if (child.geometry) {
      if (child.geometry.attributes.position) {
        vertices += child.geometry.attributes.position.count
      }
      if (child.geometry.index) {
        faces += child.geometry.index.count / 3
      } else if (child.geometry.attributes.position) {
        faces += child.geometry.attributes.position.count / 3
      }
    }
  })
  
  modelInfo.value = {
    vertices: vertices.toLocaleString(),
    faces: Math.round(faces).toLocaleString(),
    animations: animations.value.length,
    size: '计算中...'
  }
}

// 调整相机以适应模型
function fitCameraToModel(model) {
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const maxSize = Math.max(size.x, size.y, size.z)
  
  const distance = maxSize * 2
  camera.position.set(distance, distance * 0.8, distance)
  camera.lookAt(0, 0, 0)
  
  if (controls) {
    controls.reset()
  }
}

// 加载预设模型
async function loadPresetModel(model) {
  loading.value = true
  error.value = ''
  currentModel.value = model.name
  loadingProgress.value = 0
  
  try {
    if (model.type === 'primitive') {
      // 创建基础几何体
      const geometry = model.create()
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x00ff88,
        shininess: 100
      })
      const mesh = new THREE.Mesh(geometry, material)
      addModelToScene(mesh)
    } else if (model.type === 'gltf') {
      // 加载 GLTF 模型
      const gltf = await loadGLTFModel(model.url)
      addModelToScene(gltf.scene, gltf)
    }
    
    $q.notify({
      message: `${model.name} 加载成功！`,
      type: 'positive',
      position: 'top'
    })
    
  } catch (err) {
    error.value = `模型加载失败: ${err.message}`
    console.error('Model loading failed:', err)
    
    $q.notify({
      message: `${model.name} 加载失败`,
      type: 'negative',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

// 加载默认模型
function loadDefaultModel() {
  loadPresetModel(presetModels.value[0])
}

// 加载在线模型
function loadOnlineModel() {
  loadPresetModel(presetModels.value[2])
}

// 打开文件选择对话框
function openFileDialog() {
  fileInput.value.click()
}

// 处理文件选择
async function handleFileSelect(event) {
  const file = event.target.files[0]
  if (!file) return
  
  loading.value = true
  error.value = ''
  currentModel.value = file.name
  
  try {
    const url = URL.createObjectURL(file)
    const extension = file.name.split('.').pop().toLowerCase()
    
    let modelData
    switch (extension) {
      case 'gltf':
      case 'glb':
        modelData = await loadGLTFModel(url)
        addModelToScene(modelData.scene, modelData)
        break
      case 'fbx':
        modelData = await loadFBXModel(url)
        addModelToScene(modelData, { animations: modelData.animations || [] })
        break
      case 'obj':
        modelData = await loadOBJModel(url)
        addModelToScene(modelData)
        break
      default:
        throw new Error(`不支持的文件格式: ${extension}`)
    }
    
    // 清理 URL
    URL.revokeObjectURL(url)
    
    $q.notify({
      message: '模型加载成功！',
      type: 'positive',
      position: 'top'
    })
    
  } catch (err) {
    error.value = `文件加载失败: ${err.message}`
    console.error('File loading failed:', err)
    
    $q.notify({
      message: '文件加载失败',
      type: 'negative',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

// 重置相机
function resetCamera() {
  if (currentLoadedModel) {
    fitCameraToModel(currentLoadedModel)
  }
}

// 播放动画
function playAnimation(animationName) {
  if (!animationMixer || !animationName) return
  
  // 停止所有动画
  animationActions.forEach(action => {
    action.stop()
  })
  
  // 找到并播放选中的动画
  const animation = animations.value.find(anim => anim.name === animationName)
  if (animation) {
    const action = animationMixer.clipAction(animation.clip)
    action.reset()
    action.play()
    isAnimationPlaying.value = true
  }
}

// 切换动画播放状态
function toggleAnimation() {
  if (!animationMixer) return
  
  if (isAnimationPlaying.value) {
    animationMixer.timeScale = 0
    isAnimationPlaying.value = false
  } else {
    animationMixer.timeScale = 1
    isAnimationPlaying.value = true
  }
}

// 窗口大小调整
function onWindowResize() {
  if (!camera || !renderer || !modelContainer.value) return
  
  const width = modelContainer.value.clientWidth
  const height = canvasHeight.value
  
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// 防抖处理
let resizeTimeout = null
function handleResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(onWindowResize, 100)
}

// 组件生命周期
onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  // 清理 Three.js 资源
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  clearCurrentModel()
  
  if (renderer) {
    renderer.dispose()
    if (modelContainer.value && renderer.domElement) {
      modelContainer.value.removeChild(renderer.domElement)
    }
  }
  
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
})
</script>

<style scoped>
.model-demo-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.model-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.model-canvas-container {
  position: relative;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(245, 245, 245, 0.95);
  z-index: 10;
}

.model-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.info-item {
  text-align: center;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 8px;
  border-left: 3px solid #1976d2;
}

.info-label {
  font-size: 0.85em;
  opacity: 0.7;
  margin-bottom: 4px;
}

.info-value {
  font-size: 1.1em;
  font-weight: 600;
  color: #1976d2;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .model-demo-container {
    padding: 0.5rem;
  }
  
  .model-canvas-container {
    height: 350px !important;
  }
  
  .model-info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 动画效果 */
.model-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.model-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.info-item {
  transition: transform 0.2s ease;
}

.info-item:hover {
  transform: scale(1.02);
}
</style>
```

---

## 🎮 使用步骤

### 1. **将组件添加到项目**

在 `src/pages/ComponentsPage.vue` 中添加：

```javascript
// 导入新组件
import Model3DDemo from '../components/demos/Model3DDemo.vue'

// 添加到组件映射
const componentMap = {
  // ... 其他组件
  Model3DDemo,
}

// 在 3D 图形渲染分类中添加
{
  label: '3D 图形渲染',
  icon: 'view_in_ar',
  components: [
    { id: 'ThreeJSDemo', name: 'Three.js 3D 场景', description: 'WebGL 3D 图形渲染和动画演示' },
    { id: 'Model3DDemo', name: '3D 模型加载器', description: '支持 GLTF、FBX、OBJ 等格式的 3D 模型加载' },
  ]
},
```

### 2. **下载和使用 3D 模型**

#### 🔍 **推荐网站下载步骤：**

1. **访问 Sketchfab**
   - 打开 https://sketchfab.com
   - 搜索你想要的模型
   - 筛选条件选择 "Downloadable" + "CC Attribution"
   - 下载 GLTF 格式

2. **本地使用**
   - 将下载的模型文件放到 `public/models/` 目录
   - 在组件中使用相对路径加载：`/models/your-model.gltf`

3. **在线使用**
   - 直接使用模型的 CDN 链接
   - 确保 CORS 策略允许跨域访问

---

## 🎯 实际应用示例

### 1. **产品展示**
```javascript
// 电商产品 3D 预览
const productModels = [
  { name: '椅子', url: '/models/chair.gltf' },
  { name: '桌子', url: '/models/table.gltf' },
  { name: '沙发', url: '/models/sofa.gltf' }
]
```

### 2. **角色动画**
```javascript
// 加载带动画的角色模型
const characterModel = '/models/character-animated.fbx'
// 支持行走、跑步、跳跃等动画
```

### 3. **建筑可视化**
```javascript
// 建筑模型展示
const buildingModel = '/models/house.gltf'
// 支持材质切换、灯光效果
```

---

## ⚡ 优化建议

### 1. **文件大小优化**
- 使用 **GLTF/GLB** 格式（压缩率高）
- 压缩纹理（JPG 而不是 PNG）
- 减少多边形数量
- 移除不必要的动画

### 2. **加载性能优化**
```javascript
// 预加载模型
const modelCache = new Map()
async function preloadModel(url) {
  if (!modelCache.has(url)) {
    const model = await loadGLTFModel(url)
    modelCache.set(url, model)
  }
  return modelCache.get(url)
}
```

### 3. **内存管理**
```javascript
// 及时清理不用的模型
function disposeModel(model) {
  model.traverse((child) => {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(mat => mat.dispose())
      } else {
        child.material.dispose()
      }
    }
  })
}
```

---

## 🎉 总结

通过这个完整的解决方案，您可以：

✅ **下载各种 3D 模型** - 支持多个免费资源网站  
✅ **导入多种格式** - GLTF、FBX、OBJ 等  
✅ **实时预览** - 拖拽、缩放、旋转交互  
✅ **动画播放** - 支持模型动画控制  
✅ **性能优化** - 内存管理和加载优化  

立即体验：运行项目后访问 "3D 图形渲染" → "3D 模型加载器" 🚀✨
