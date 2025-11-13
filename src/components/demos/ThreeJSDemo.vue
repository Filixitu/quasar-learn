<template>
    <div class="threejs-container">
        <!-- Three.js 演示卡片 -->
        <q-card class="my-card">
            <q-card-section>
                <div class="text-h6 flex items-center">
                    <q-icon name="view_in_ar" class="q-mr-sm" />
                    Three.js 3D 场景演示
                </div>
                <div class="text-subtitle2 text-grey-7">
                    基于 WebGL 的 3D 图形渲染 - 旋转几何体、光照效果、实时控制
                </div>
            </q-card-section>

            <q-separator />

            <!-- 3D 渲染区域 -->
            <q-card-section class="q-pa-none">
                <div ref="threeContainer" class="three-canvas-container" :style="{ height: canvasHeight + 'px' }">
                    <!-- Three.js 画布将插入这里 -->
                    <div v-if="!webglSupported" class="webgl-fallback">
                        <q-icon name="warning" size="48px" color="warning" />
                        <div class="text-h6 q-mt-md">WebGL 不受支持</div>
                        <div class="text-body2 q-mt-sm text-grey-7">
                            您的浏览器不支持 WebGL，无法显示 3D 内容
                        </div>
                        <q-btn color="primary" label="了解更多" flat @click="showWebGLInfo" class="q-mt-md" />
                    </div>

                    <div v-if="loading" class="loading-overlay">
                        <q-spinner-gears size="50px" color="primary" />
                        <div class="text-subtitle1 q-mt-md">正在初始化 3D 场景...</div>
                    </div>
                </div>
            </q-card-section>

            <q-separator />

            <!-- 控制面板 -->
            <q-card-section>
                <div class="text-subtitle2 q-mb-md flex items-center">
                    <q-icon name="tune" class="q-mr-sm" />
                    场景控制
                </div>

                <div class="row q-gutter-md">
                    <q-btn :color="isAnimating ? 'negative' : 'positive'" :icon="isAnimating ? 'pause' : 'play_arrow'"
                        :label="isAnimating ? '暂停动画' : '开始动画'" @click="toggleAnimation" :disable="!initialized"
                        glossy />
                    <q-btn color="secondary" icon="refresh" label="重置场景" @click="resetScene" :disable="!initialized"
                        outline />
                    <q-btn color="accent" icon="3d_rotation" label="切换几何体" @click="changeGeometry"
                        :disable="!initialized" outline />
                </div>
            </q-card-section>

            <q-separator />

            <!-- 参数控制 -->
            <q-card-section>
                <div class="text-subtitle2 q-mb-md flex items-center">
                    <q-icon name="settings" class="q-mr-sm" />
                    参数调节
                </div>

                <div class="row q-gutter-md">
                    <div class="col-12 col-md-6">
                        <div class="text-caption q-mb-sm">旋转速度</div>
                        <q-slider v-model="rotationSpeed" :min="0" :max="0.05" :step="0.001" :disable="!initialized"
                            color="primary" track-color="grey-3" thumb-color="primary" label label-always />
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="text-caption q-mb-sm">光照强度</div>
                        <q-slider v-model="lightIntensity" :min="0" :max="3" :step="0.1" :disable="!initialized"
                            color="orange" track-color="grey-3" thumb-color="orange" label label-always />
                    </div>
                </div>

                <div class="row q-gutter-md q-mt-md">
                    <div class="col-12 col-md-6">
                        <div class="text-caption q-mb-sm">材质颜色</div>
                        <q-color v-model="meshColor" :disable="!initialized" format-model="hex"
                            @change="updateMeshColor" class="color-picker-small" />
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="text-caption q-mb-sm">背景颜色</div>
                        <q-color v-model="backgroundColor" :disable="!initialized" format-model="hex"
                            @change="updateBackgroundColor" class="color-picker-small" />
                    </div>
                </div>
            </q-card-section>

            <q-separator />

            <!-- 信息显示 -->
            <q-card-section>
                <div class="text-subtitle2 q-mb-md flex items-center">
                    <q-icon name="info" class="q-mr-sm" />
                    场景信息
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <q-icon name="speed" class="info-icon" />
                        <div>
                            <div class="info-value">{{ fps }} FPS</div>
                            <div class="info-label">帧率</div>
                        </div>
                    </div>

                    <div class="info-item">
                        <q-icon name="category" class="info-icon" />
                        <div>
                            <div class="info-value">{{ currentGeometry }}</div>
                            <div class="info-label">几何体</div>
                        </div>
                    </div>

                    <div class="info-item">
                        <q-icon name="timeline" class="info-icon" />
                        <div>
                            <div class="info-value">{{ triangleCount }}</div>
                            <div class="info-label">三角形</div>
                        </div>
                    </div>

                    <div class="info-item">
                        <q-icon name="lightbulb" class="info-icon" />
                        <div>
                            <div class="info-value">{{ lightIntensity.toFixed(1) }}</div>
                            <div class="info-label">光强</div>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-separator />

            <!-- 使用提示 -->
            <q-card-section>
                <q-expansion-item icon="help_outline" label="使用说明" caption="了解如何操作 3D 场景">
                    <div class="q-pa-md bg-grey-1">
                        <div class="text-subtitle2 q-mb-sm">鼠标控制：</div>
                        <ul class="q-pl-md">
                            <li><strong>拖拽：</strong> 旋转视角</li>
                            <li><strong>滚轮：</strong> 缩放场景</li>
                            <li><strong>右键拖拽：</strong> 平移视角</li>
                        </ul>

                        <div class="text-subtitle2 q-mt-md q-mb-sm">功能说明：</div>
                        <ul class="q-pl-md">
                            <li><strong>切换几何体：</strong> 循环切换不同的 3D 形状</li>
                            <li><strong>旋转速度：</strong> 控制对象自动旋转的快慢</li>
                            <li><strong>光照强度：</strong> 调节场景中的光照亮度</li>
                            <li><strong>颜色设置：</strong> 自定义材质和背景颜色</li>
                        </ul>
                    </div>
                </q-expansion-item>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useQuasar } from 'quasar'

// Quasar 插件
const $q = useQuasar()

// 响应式数据
const threeContainer = ref(null)
const canvasHeight = ref(400)
const initialized = ref(false)
const loading = ref(true)
const webglSupported = ref(true)
const isAnimating = ref(true)
const rotationSpeed = ref(0.01)
const lightIntensity = ref(1)
const fps = ref(0)
const currentGeometry = ref('Box')
const triangleCount = ref(0)
const meshColor = ref('#00ff00')
const backgroundColor = ref('#f0f0f0')

// Three.js 核心对象
let THREE = null
let scene, camera, renderer, mesh, directionalLight, ambientLight
let animationId = null
let clock = null

// 几何体类型数组
const geometries = [
    { name: 'Box', create: () => new THREE.BoxGeometry(1, 1, 1) },
    { name: 'Sphere', create: () => new THREE.SphereGeometry(0.7, 32, 32) },
    { name: 'Cone', create: () => new THREE.ConeGeometry(0.7, 1.5, 32) },
    { name: 'Torus', create: () => new THREE.TorusGeometry(0.7, 0.3, 16, 100) },
    { name: 'Cylinder', create: () => new THREE.CylinderGeometry(0.5, 0.7, 1.5, 32) },
    { name: 'Octahedron', create: () => new THREE.OctahedronGeometry(0.8) },
]
let currentGeometryIndex = 0

// 性能监控
let frameCount = 0
let lastTime = 0

// 检查 WebGL 支持
function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        return !!context
    } catch {
        return false
    }
}

// 动态导入 Three.js
async function loadThreeJS() {
    try {
        THREE = await import('three')
        clock = new THREE.Clock()
        return true
    } catch (error) {
        console.error('Failed to load Three.js:', error)
        $q.notify({
            message: 'Three.js 加载失败，请检查网络连接',
            type: 'negative',
            position: 'top'
        })
        return false
    }
}

// 初始化 Three.js 场景
async function initThree() {
    loading.value = true

    // 检查 WebGL 支持
    if (!checkWebGLSupport()) {
        webglSupported.value = false
        loading.value = false
        return
    }

    // 动态加载 Three.js
    const threeLoaded = await loadThreeJS()
    if (!threeLoaded) {
        loading.value = false
        return
    }

    try {
        // 创建场景
        scene = new THREE.Scene()
        scene.background = new THREE.Color(backgroundColor.value)

        // 创建相机
        const aspect = threeContainer.value.clientWidth / canvasHeight.value
        camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
        camera.position.set(2, 2, 3)
        camera.lookAt(0, 0, 0)

        // 创建渲染器
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        })
        renderer.setSize(threeContainer.value.clientWidth, canvasHeight.value)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.outputEncoding = THREE.sRGBEncoding

        // 将画布添加到容器
        threeContainer.value.appendChild(renderer.domElement)

        // 创建几何体和材质
        const geometry = geometries[0].create()
        const material = new THREE.MeshPhongMaterial({
            color: meshColor.value,
            shininess: 100,
            specular: 0x111111
        })
        mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)

        // 添加光照
        ambientLight = new THREE.AmbientLight(0x404040, 0.4)
        scene.add(ambientLight)

        directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity.value)
        directionalLight.position.set(5, 5, 5)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        directionalLight.shadow.camera.near = 0.1
        directionalLight.shadow.camera.far = 50
        directionalLight.shadow.camera.left = -10
        directionalLight.shadow.camera.right = 10
        directionalLight.shadow.camera.top = 10
        directionalLight.shadow.camera.bottom = -10
        scene.add(directionalLight)

        // 添加地面
        const planeGeometry = new THREE.PlaneGeometry(10, 10)
        const planeMaterial = new THREE.MeshLambertMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.8
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -Math.PI / 2
        plane.position.y = -1
        plane.receiveShadow = true
        scene.add(plane)

        // 添加基础的鼠标控制
        setupMouseControls()

        // 更新统计信息
        updateStats()

        initialized.value = true
        loading.value = false

        // 开始动画循环
        animate()

        $q.notify({
            message: 'Three.js 场景初始化完成！',
            type: 'positive',
            position: 'top',
            timeout: 2000
        })

    } catch (error) {
        console.error('Three.js initialization failed:', error)
        loading.value = false
        $q.notify({
            message: 'Three.js 场景初始化失败',
            type: 'negative',
            position: 'top'
        })
    }
}

// 简单的鼠标控制
function setupMouseControls() {
    const canvas = renderer.domElement
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }

    canvas.addEventListener('mousedown', (event) => {
        isDragging = true
        previousMousePosition = { x: event.clientX, y: event.clientY }
    })

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            }

            // 旋转相机围绕场景中心
            const spherical = new THREE.Spherical()
            spherical.setFromVector3(camera.position)

            spherical.theta -= deltaMove.x * 0.01
            spherical.phi += deltaMove.y * 0.01

            // 限制垂直角度
            spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi))

            camera.position.setFromSpherical(spherical)
            camera.lookAt(0, 0, 0)

            previousMousePosition = { x: event.clientX, y: event.clientY }
        }
    })

    canvas.addEventListener('mouseup', () => {
        isDragging = false
    })

    canvas.addEventListener('wheel', (event) => {
        event.preventDefault()
        const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9
        camera.position.multiplyScalar(zoomFactor)

        // 限制缩放范围
        const distance = camera.position.length()
        if (distance < 2) camera.position.setLength(2)
        if (distance > 20) camera.position.setLength(20)
    })
}

// 动画循环
function animate() {
    if (!isAnimating.value || !initialized.value) return

    animationId = requestAnimationFrame(animate)

    const deltaTime = clock.getDelta()

    // 旋转网格 - 使用基于时间的动画确保帧率无关的一致性
    if (mesh) {
        mesh.rotation.x += rotationSpeed.value * deltaTime * 60 // 60fps基准
        mesh.rotation.y += rotationSpeed.value * 1.2 * deltaTime * 60
    }

    // 更新 FPS
    frameCount++
    const currentTime = performance.now()
    if (currentTime - lastTime >= 1000) {
        fps.value = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime
    }

    // 渲染场景
    renderer.render(scene, camera)
}

// 更新统计信息
function updateStats() {
    if (mesh && mesh.geometry) {
        const positions = mesh.geometry.attributes.position
        triangleCount.value = positions ? Math.floor(positions.count / 3) : 0
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

    if (camera) {
        camera.position.set(2, 2, 3)
        camera.lookAt(0, 0, 0)
    }

    $q.notify({
        message: '场景已重置',
        type: 'positive',
        position: 'top'
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
        position: 'top'
    })
}

function updateMeshColor(color) {
    if (mesh && mesh.material) {
        mesh.material.color.setHex(color.replace('#', '0x'))
    }
}

function updateBackgroundColor(color) {
    if (scene) {
        scene.background.setHex(color.replace('#', '0x'))
    }
}

function showWebGLInfo() {
    $q.dialog({
        title: 'WebGL 支持信息',
        message: `
      <div class="q-pa-md">
        <p><strong>什么是 WebGL？</strong></p>
        <p>WebGL 是一种 JavaScript API，用于在 Web 浏览器中渲染交互式 3D 图形。</p>

        <p class="q-mt-md"><strong>如何启用 WebGL？</strong></p>
        <ul>
          <li>更新到最新版本的浏览器</li>
          <li>确保启用了硬件加速</li>
          <li>检查显卡驱动程序是否为最新版本</li>
        </ul>

        <p class="q-mt-md"><strong>推荐浏览器：</strong></p>
        <ul>
          <li>Chrome 90+</li>
          <li>Firefox 88+</li>
          <li>Safari 14+</li>
          <li>Edge 90+</li>
        </ul>
      </div>
    `,
        html: true,
        ok: {
            color: 'primary',
            label: '了解了'
        }
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
    if (!camera || !renderer || !threeContainer.value || !initialized.value) return

    const width = threeContainer.value.clientWidth
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
    initThree()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)

    // 清理 Three.js 资源
    if (animationId) {
        cancelAnimationFrame(animationId)
    }

    if (mesh) {
        if (mesh.geometry) mesh.geometry.dispose()
        if (mesh.material) mesh.material.dispose()
    }

    if (renderer) {
        renderer.dispose()
        if (threeContainer.value && renderer.domElement) {
            threeContainer.value.removeChild(renderer.domElement)
        }
    }

    if (resizeTimeout) {
        clearTimeout(resizeTimeout)
    }
})
</script>

<style scoped>
.threejs-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
}

.my-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.three-canvas-container {
    position: relative;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
}

.webgl-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    text-align: center;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(245, 245, 245, 0.9);
    z-index: 10;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
}

.info-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    border-radius: 8px;
    border-left: 3px solid #1976d2;
}

.info-icon {
    color: #1976d2;
    margin-right: 0.75rem;
}

.info-value {
    font-size: 1.1em;
    font-weight: 600;
    color: #1976d2;
}

.info-label {
    font-size: 0.85em;
    opacity: 0.7;
    margin-top: 2px;
}

.color-picker-small {
    max-width: 200px;
}

/* 响应式设计 */
@media (max-width: 600px) {
    .threejs-container {
        padding: 0.5rem;
    }

    .three-canvas-container {
        height: 300px !important;
    }

    .info-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* 动画效果 */
.q-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.q-card:hover {
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
