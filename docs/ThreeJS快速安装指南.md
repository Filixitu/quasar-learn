# Three.js 快速安装指南 🚀

> **在当前 Quasar 项目中安装和配置 Three.js 的步骤**

## 📦 安装 Three.js

在项目根目录执行以下命令：

```bash
# 安装 Three.js 核心库
npm install three

# 安装 TypeScript 类型定义（推荐）
npm install @types/three --save-dev
```

## ⚙️ 配置（可选）

如果遇到模块解析问题，可以在 `quasar.config.js` 中添加以下配置：

```javascript
// quasar.config.js
export default defineConfig((ctx) => {
  return {
    build: {
      chainWebpack(chain) {
        // Three.js 模块别名
        chain.resolve.alias.set('three', 'three/build/three.module.js')

        // 如果使用 Three.js 插件
        chain.resolve.alias.set('three/addons', 'three/examples/jsm')
      },
    },
  }
})
```

## 🎯 基础使用

创建一个简单的 Three.js 组件：

```vue
<template>
  <div ref="container" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'

const container = ref(null)

onMounted(async () => {
  // 动态导入 Three.js（推荐）
  const THREE = await import('three')

  // 创建场景
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()

  renderer.setSize(800, 600)
  container.value.appendChild(renderer.domElement)

  // 创建几何体
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5

  // 动画循环
  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()
})
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
}
</style>
```

## 📱 在 Quasar 组件中使用

查看完整示例：`src/components/demos/ThreeJSDemo.vue`

## ✅ 验证安装

运行开发服务器：

```bash
npm run dev
# 或
quasar dev
```

访问 `http://localhost:9000`，在组件库中找到 "3D 图形渲染" → "Three.js 3D 场景" 查看演示。

## 📚 更多资源

- [完整集成文档](./THREEJS_INTEGRATION_GUIDE.md)
- [Three.js 官方文档](https://threejs.org/docs/)
- [Quasar Framework](https://quasar.dev/)

---

_安装完成后，您就可以在 Quasar 项目中使用 Three.js 创建令人惊叹的 3D 效果了！_ 🎨✨
