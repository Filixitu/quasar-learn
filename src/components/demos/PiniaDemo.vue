<!--
🎯 Pinia 状态管理演示 - Vue 3 推荐的状态管理库

📚 学习目标：
1. 理解全局状态管理的概念和作用
2. 掌握 Pinia Store 的创建和使用
3. 学会在组件中访问和修改状态
4. 实现用户登录状态管理
5. 实现购物车状态管理
6. 实现主题设置状态管理

💡 核心概念：
- Store: 状态仓库，存储全局数据
- State: 响应式状态数据
- Actions: 修改状态的方法
- Getters: 计算属性，派生状态

🎯 实际应用价值：
- 解决跨组件数据共享问题
- 避免 props 层层传递
- 统一的数据管理中心
- 便于调试和维护
-->

<template>
    <div class="q-gutter-md">
        <div class="text-h6">Pinia 状态管理示例</div>

        <!-- 用户状态展示 -->
        <q-card style="max-width: 600px">
            <q-card-section>
                <div class="text-h6">当前用户状态</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="q-gutter-md">
                    <div>
                        <strong>登录状态：</strong>
                        <q-badge :color="userStore.isLoggedIn ? 'positive' : 'grey'">
                            {{ userStore.isLoggedIn ? '已登录' : '未登录' }}
                        </q-badge>
                    </div>
                    <div v-if="userStore.isLoggedIn">
                        <strong>用户名：</strong>{{ userStore.userName }}
                    </div>
                    <div v-if="userStore.isLoggedIn">
                        <strong>权限：</strong>
                        <q-chip v-for="perm in userStore.permissions" :key="perm" color="primary" text-color="white"
                            size="sm">
                            {{ perm }}
                        </q-chip>
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <q-separator />

        <!-- 登录/登出操作 -->
        <div class="text-h6">操作</div>
        <div class="q-gutter-sm">
            <q-btn v-if="!userStore.isLoggedIn" color="primary" label="模拟登录" @click="handleLogin" />
            <q-btn v-else color="negative" label="退出登录" @click="handleLogout" />
        </div>

        <q-separator />

        <!-- 购物车示例 -->
        <div class="text-h6">购物车状态管理</div>
        <q-card style="max-width: 800px">
            <q-card-section>
                <div class="row items-center justify-between">
                    <div class="text-h6">购物车</div>
                    <q-badge color="red" floating v-if="cartStore.itemCount > 0">
                        {{ cartStore.itemCount }}
                    </q-badge>
                </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div v-if="cartStore.items.length === 0" class="text-center text-grey-7 q-pa-lg">
                    购物车是空的
                </div>
                <q-list v-else>
                    <q-item v-for="item in cartStore.items" :key="item.id">
                        <q-item-section avatar>
                            <q-avatar>
                                <img :src="item.image">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ item.name }}</q-item-label>
                            <q-item-label caption>¥{{ item.price }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <div class="row items-center q-gutter-sm">
                                <q-btn flat dense round icon="remove" size="sm"
                                    @click="cartStore.decreaseQuantity(item.id)" />
                                <div>{{ item.quantity }}</div>
                                <q-btn flat dense round icon="add" size="sm"
                                    @click="cartStore.increaseQuantity(item.id)" />
                            </div>
                        </q-item-section>
                        <q-item-section side>
                            <q-btn flat round dense icon="delete" color="negative"
                                @click="cartStore.removeItem(item.id)" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <div class="row items-center justify-between">
                    <div class="text-h6">总计</div>
                    <div class="text-h6 text-primary">¥{{ cartStore.totalPrice }}</div>
                </div>
            </q-card-section>
            <q-card-actions>
                <q-btn color="primary" label="添加测试商品" @click="addSampleProduct" />
                <q-btn flat color="negative" label="清空购物车" @click="cartStore.clearCart"
                    :disable="cartStore.items.length === 0" />
            </q-card-actions>
        </q-card>

        <q-separator />

        <!-- 主题设置示例 -->
        <div class="text-h6">主题设置</div>
        <q-card style="max-width: 600px">
            <q-card-section>
                <q-list>
                    <q-item tag="label">
                        <q-item-section avatar>
                            <q-icon name="dark_mode" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>深色模式</q-item-label>
                            <q-item-label caption>当前: {{ themeStore.isDark ? '开启' : '关闭' }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="themeStore.isDark" @update:model-value="themeStore.toggleDark" />
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="palette" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>主题色</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-select v-model="themeStore.primaryColor" :options="themeStore.colorOptions"
                                @update:model-value="themeStore.setPrimaryColor" dense outlined />
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="text_fields" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>字体大小</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-slider v-model="themeStore.fontSize" :min="12" :max="20" :step="1" label
                                @update:model-value="themeStore.setFontSize" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>

        <q-separator />

        <div class="text-subtitle2 text-grey-7">
            💡 提示：Pinia 是 Vue 3 推荐的状态管理库，用于管理全局状态、用户信息、购物车等跨组件数据
        </div>
    </div>
</template>

<!--
💻 Script 部分详解：

这里演示了如何在组件中使用 Pinia Store：
1. 导入需要的 Store
2. 在 setup() 中初始化 Store
3. 直接访问 Store 的状态和方法
4. 状态变化会自动响应到 UI

🔑 关键点：
- Store 是响应式的，状态改变会自动更新 UI
- 可以在任何组件中导入和使用同一个 Store
- Store 中的 actions 可以包含异步操作
- Store 数据会在页面刷新时丢失（除非持久化）
-->

<script setup>
// 🏪 导入 Pinia Stores - 全局状态管理仓库
import { useUserStore } from '../../stores/user-store'      // 用户相关状态
import { useCartStore } from '../../stores/cart-store'      // 购物车状态
import { useThemeStore } from '../../stores/theme-store'    // 主题设置状态
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 🎯 初始化 Store 实例 - 每个 Store 都是单例模式
const userStore = useUserStore()      // 用户状态：登录信息、权限等
const cartStore = useCartStore()      // 购物车状态：商品列表、总价等
const themeStore = useThemeStore()    // 主题状态：深色模式、主题色等

/**
 * 💡 重要概念：
 *
 * Store 是响应式的：
 * - userStore.isLoggedIn 变化时，UI 自动更新
 * - cartStore.itemCount 变化时，徽标自动更新
 * - themeStore.isDark 变化时，主题自动切换
 *
 * Store 是全局的：
 * - 在任何组件中导入的都是同一个实例
 * - 数据在组件间自动同步
 * - 避免了 props 和 emit 的复杂传递
 */

function handleLogin() {
    userStore.login({
        name: '张三',
        token: 'mock-token-' + Date.now(),
        permissions: ['read', 'write', 'admin']
    })
    $q.notify({
        message: '登录成功！',
        color: 'positive'
    })
}

function handleLogout() {
    userStore.logout()
    $q.notify({
        message: '已退出登录',
        color: 'info'
    })
}

function addSampleProduct() {
    const products = [
        { id: Date.now(), name: '商品A', price: 99, image: 'https://cdn.quasar.dev/img/avatar.png' },
        { id: Date.now() + 1, name: '商品B', price: 199, image: 'https://cdn.quasar.dev/img/avatar2.jpg' },
        { id: Date.now() + 2, name: '商品C', price: 299, image: 'https://cdn.quasar.dev/img/avatar3.jpg' },
    ]
    const product = products[Math.floor(Math.random() * products.length)]
    cartStore.addItem(product)
    $q.notify({
        message: '已添加到购物车',
        color: 'positive'
    })
}
</script>
