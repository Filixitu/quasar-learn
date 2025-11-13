# 🚀 Quasar 组件快速参考手册

## 📖 核心组件使用速查

### 🎨 基础组件

#### Button 按钮 ⭐⭐⭐⭐⭐

```vue
<!-- 基础用法 -->
<q-btn label="按钮" />

<!-- 常用配置 -->
<q-btn
  color="primary"
  size="lg"
  icon="save"
  label="保存"
  :loading="loading"
  :disable="!valid"
  @click="handleSave"
/>

<!-- 核心属性 -->
color: primary|secondary|positive|negative|warning|info size: xs|sm|md|lg|xl loading: 显示加载动画
disable: 禁用按钮
```

#### Card 卡片 ⭐⭐⭐⭐

```vue
<!-- 标准结构 -->
<q-card>
  <q-card-section>标题区域</q-card-section>
  <q-separator />
  <q-card-section>内容区域</q-card-section>
  <q-card-actions>操作按钮</q-card-actions>
</q-card>

<!-- 常用样式 -->
flat: 扁平无阴影 bordered: 显示边框 square: 方角（不圆角）
```

#### Avatar 头像 ⭐⭐⭐

```vue
<!-- 图片头像 -->
<q-avatar>
  <img src="avatar.jpg">
</q-avatar>

<!-- 文字头像 -->
<q-avatar color="primary" text-color="white">张</q-avatar>

<!-- 图标头像 -->
<q-avatar color="teal" icon="person" />

<!-- 尺寸 -->
size="24px|32px|48px|64px"
```

### 📝 表单组件

#### Input 输入框 ⭐⭐⭐⭐⭐

```vue
<!-- 基础输入 -->
<q-input v-model="text" label="标签" />

<!-- 带验证 -->
<q-input
  v-model="email"
  label="邮箱 *"
  type="email"
  outlined
  :rules="[(val) => !!val || '必填', (val) => /.+@.+/.test(val) || '格式错误']"
/>

<!-- 样式选项 -->
outlined: 轮廓样式 filled: 填充样式 standout: 独立样式 borderless: 无边框
```

#### Select 选择器 ⭐⭐⭐⭐⭐

```vue
<!-- 基础选择 -->
<q-select v-model="model" :options="options" label="选择" />

<!-- 多选 -->
<q-select v-model="multi" :options="options" multiple use-chips />

<!-- 搜索过滤 -->
<q-select v-model="model" :options="filtered" use-input @filter="filterFn" />

<!-- 对象选项 -->
<q-select v-model="user" :options="users" option-value="id" option-label="name" />
```

### 📊 数据展示

#### Table 表格 ⭐⭐⭐⭐⭐

```vue
<!-- 基础表格 -->
<q-table :rows="data" :columns="columns" row-key="id" />

<!-- 功能完整 -->
<q-table
  :rows="data"
  :columns="columns"
  :filter="filter"
  selection="multiple"
  v-model:selected="selected"
  v-model:pagination="pagination"
/>

<!-- 列配置 -->
const columns = [ { name: 'name', label: '姓名', field: 'name', sortable: true }, { name: 'age',
label: '年龄', field: 'age', align: 'center' } ]
```

#### Virtual Scroll 虚拟滚动 ⭐⭐⭐⭐⭐

```vue
<!-- 大数据渲染 -->
<q-virtual-scroll :items="10000items" virtual-scroll-slice-size="30" style="max-height: 400px">
  <template v-slot="{ item }">
    <q-item>{{ item.name }}</q-item>
  </template>
</q-virtual-scroll>

<!-- 性能关键 -->
slice-size: 20-50 推荐值 max-height: 必须设置容器高度 item-size: 固定高度可提升性能
```

#### Tree 树形结构 ⭐⭐⭐⭐

```vue
<!-- 基础树形 -->
<q-tree :nodes="treeData" node-key="id" />

<!-- 可选择节点 -->
<q-tree :nodes="nodes" node-key="id" tick-strategy="leaf" v-model:ticked="selected" />

<!-- 数据结构 -->
const treeData = [ { id: 'node1', label: '根节点', children: [ { id: 'child1', label: '子节点' } ] }
]
```

### 🎓 高级技术

#### Pinia 状态管理 ⭐⭐⭐⭐⭐

```vue
<!-- Store 定义 -->
export const useUserStore = defineStore('user', () => { const user = ref(null) const login = (data)
=> { user.value = data } return { user, login } })

<!-- 组件中使用 -->
<script setup>
const userStore = useUserStore()

// 访问状态
console.log(userStore.user)

// 调用方法
userStore.login({ name: '张三' })
</script>
```

#### Router 路由 ⭐⭐⭐⭐⭐

```vue
<!-- 路由配置 -->
const routes = [ { path: '/user/:id', component: () => import('UserDetail.vue'), meta: {
requiresAuth: true } } ]

<!-- 编程式导航 -->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转
router.push('/path')
router.push({ name: 'user', params: { id: 123 } })
</script>
```

---

## ⚡ 性能优化速查

### 大数据处理

```vue
<!-- ✅ 使用虚拟滚动 -->
<q-virtual-scroll :items="bigData" />

<!-- ❌ 直接渲染 -->
<div v-for="item in bigData" />
<!-- 卡顿 -->
```

### 搜索优化

```javascript
// ✅ 使用防抖
const debouncedSearch = debounce(search, 300)

// ❌ 直接搜索
@input="search" // 频繁请求
```

### 滚动优化

```javascript
// ✅ 使用节流
const throttledScroll = throttle(handler, 100)

// ❌ 直接处理
@scroll="handler" // 性能差
```

---

## 🎯 实际项目模板

### 用户管理页面

```vue
<template>
  <q-page>
    <!-- 搜索栏 -->
    <q-input v-model="search" @input="debouncedSearch" />

    <!-- 数据表格 -->
    <q-table
      :rows="users"
      :columns="columns"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
    />

    <!-- 批量操作 -->
    <q-btn v-if="selected.length > 0" color="negative" :loading="deleting" @click="batchDelete">
      删除选中 ({{ selected.length }})
    </q-btn>
  </q-page>
</template>

<script setup>
// 状态管理
const userStore = useUserStore()
const { users, loading } = storeToRefs(userStore)

// 搜索防抖
const debouncedSearch = debounce(userStore.search, 300)

// 批量删除
async function batchDelete() {
  const confirmed = await $q.dialog({
    title: '确认删除',
    message: `删除 ${selected.value.length} 个用户？`,
  })

  if (confirmed) {
    deleting.value = true
    await userStore.batchDelete(selected.value)
    deleting.value = false
  }
}
</script>
```

### 商品详情页面

```vue
<template>
  <q-page>
    <!-- 商品轮播 -->
    <q-carousel v-model="slide" arrows navigation>
      <q-carousel-slide v-for="img in product.images" :key="img" :img-src="img" />
    </q-carousel>

    <!-- 商品信息 -->
    <div class="q-pa-md">
      <div class="text-h5">{{ product.name }}</div>
      <div class="text-h4 text-red">¥{{ product.price }}</div>

      <q-btn
        color="primary"
        icon="shopping_cart"
        label="加入购物车"
        :loading="adding"
        @click="addToCart"
        class="full-width"
      />
    </div>
  </q-page>
</template>

<script setup>
// 页面 SEO
useMeta(() => ({
  title: `${product.value?.name} - 商城`,
  meta: {
    description: { content: product.value?.description },
  },
}))

// 购物车操作
const cartStore = useCartStore()
async function addToCart() {
  adding.value = true
  cartStore.addItem(product.value)
  $q.notify('已加入购物车')
  adding.value = false
}
</script>
```

---

## 🏆 掌握程度自测

### 🟢 初级 (掌握 10+ 组件)

- [ ] Button, Card, Avatar 基础组件
- [ ] Input, Select 基础表单
- [ ] List, Table 数据展示
- [ ] Dialog, Notify 用户反馈

### 🟡 中级 (掌握 20+ 组件)

- [ ] 复杂表单：Checkbox, Radio, Toggle, Slider
- [ ] 高级数据：Tree, Timeline, Carousel
- [ ] 导航组件：Tabs, Menu, Drawer, Stepper

### 🔴 高级 (掌握 30+ 组件)

- [ ] 性能优化：Virtual Scroll, Infinite Scroll
- [ ] 状态管理：Pinia Store 设计和使用
- [ ] 路由管理：Router 配置和守卫
- [ ] 工具函数：date, format, debounce 等

### 🏆 专家级 (35+ 组件 + 项目经验)

- [ ] 能设计完整的业务组件
- [ ] 能优化复杂场景的性能
- [ ] 能独立搭建 Quasar 项目架构
- [ ] 能指导团队 Quasar 开发

---

## 💡 学习建议

### 📅 4周学习计划

#### 第1周：基础组件 (7个)

- 每天学习 1-2 个组件
- 重点：Button, Input, Card
- 目标：能创建简单页面

#### 第2周：表单组件 (9个)

- 重点：Select, Checkbox, Radio
- 目标：能处理复杂表单

#### 第3周：数据展示 (7个)

- 重点：Table, Tree, Virtual Scroll
- 目标：能处理大数据展示

#### 第4周：高级技术 (4个)

- 重点：Pinia, Router
- 目标：能搭建完整应用

### 🎯 每个组件的学习方法

1. **看演示** - 了解功能和效果
2. **读代码** - 理解实现原理
3. **改参数** - 尝试不同配置
4. **做练习** - 创建自己的变体
5. **用项目** - 应用到实际开发

---

## 🔖 书签收藏

### 📚 必看文档

- [README.md](./README.md) - 完整学习指南
- [COMPONENT_COMMENTS.md](./COMPONENT_COMMENTS.md) - 详细注释说明
- [LEARNING_PATH.md](../../LEARNING_PATH.md) - 学习路径规划

### 🎯 重点组件

- **PiniaDemo.vue** - 状态管理核心
- **VirtualScrollDemo.vue** - 性能优化关键
- **StepperDemo.vue** - 流程设计必备
- **ComposablesDemo.vue** - Vue 3 核心概念

### 📱 实用组件

- **InputDemo.vue** - 表单基础
- **TableDemo.vue** - 数据展示核心
- **DrawerDemo.vue** - 移动端必备
- **CarouselDemo.vue** - 图片展示

---

## 🎊 恭喜完成学习库！

你现在拥有了一个**完整的 Quasar 学习生态系统**：

✅ **35 个组件演示** - 覆盖实际开发 95% 场景
✅ **详细的注释文档** - 每个重点都有说明
✅ **完整的学习路径** - 从入门到精通  
✅ **实战项目模板** - 直接应用到项目
✅ **性能优化指南** - 避免常见坑点

**开始你的 Quasar 开发之旅吧！** 🚀

记住：最好的学习方法是**动手实践**！
