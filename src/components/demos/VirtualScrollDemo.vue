<!--
🚀 Virtual Scroll 虚拟滚动 - 性能优化的核心技术

📚 学习目标：
1. 理解虚拟滚动的工作原理和优势
2. 掌握 virtual-scroll-slice-size 的配置
3. 学会处理大数据量渲染问题
4. 了解性能优化的最佳实践

💡 技术原理：
虚拟滚动只渲染用户可见的元素：
- 普通列表：渲染 10,000 个 DOM 元素 → 页面卡顿
- 虚拟滚动：只渲染 30 个可见元素 → 流畅滚动

🎯 关键配置：
- :items="大数据数组" - 要显示的数据
- virtual-scroll-slice-size="30" - 每次渲染的元素数量
- virtual-scroll-item-size="48" - 每个元素的高度（可选）
- style="max-height: 400px" - 容器高度

⚡ 性能对比：
- 10,000 条数据普通渲染：首次加载 3-5 秒，滚动卡顿
- 10,000 条数据虚拟滚动：首次加载 0.1 秒，滚动流畅

💼 实际应用场景：
- 用户管理系统（5000+ 用户列表）
- 聊天记录展示（1000+ 消息历史）
- 商品列表（海量商品展示）
- 数据报表（大量数据行）
-->

<template>
    <div class="q-gutter-md">
        <div class="text-h6">Virtual Scroll 虚拟滚动</div>
        <div class="text-caption text-grey-7 q-mb-md">
            🚀 虚拟滚动技术可以高效渲染大量数据，只渲染可见区域的元素
        </div>

        <!-- 基础虚拟滚动 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">基础虚拟滚动列表 (10000项)</div>
            <q-card style="max-width: 600px">
                <q-virtual-scroll :items="largeList" virtual-scroll-slice-size="30" virtual-scroll-item-size="48"
                    style="max-height: 400px">
                    <template v-slot="{ item, index }">
                        <q-item :key="index">
                            <q-item-section>
                                <q-item-label>项目 #{{ item.id }}</q-item-label>
                                <q-item-label caption>{{ item.description }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                    </template>
                </q-virtual-scroll>
            </q-card>
        </div>

        <q-separator />

        <!-- 带头像的虚拟列表 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">用户列表 (5000个用户)</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <q-input v-model="searchQuery" placeholder="搜索用户..." outlined dense>
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-virtual-scroll :items="filteredUsers" virtual-scroll-slice-size="20" style="max-height: 400px">
                    <template v-slot="{ item, index }">
                        <q-item :key="index" clickable v-ripple>
                            <q-item-section avatar>
                                <q-avatar :color="item.color" text-color="white">
                                    {{ item.name[0] }}
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ item.name }}</q-item-label>
                                <q-item-label caption>{{ item.email }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-badge :color="item.status === 'online' ? 'positive' : 'grey'">
                                    {{ item.status === 'online' ? '在线' : '离线' }}
                                </q-badge>
                            </q-item-section>
                        </q-item>
                    </template>
                </q-virtual-scroll>
                <q-card-section class="text-caption text-grey-7">
                    共 {{ filteredUsers.length }} 个用户
                </q-card-section>
            </q-card>
        </div>

        <q-separator />

        <!-- 聊天消息列表 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">聊天消息 (1000条)</div>
            <q-card style="max-width: 500px">
                <q-bar class="bg-primary text-white">
                    <div>聊天室</div>
                    <q-space />
                    <div class="text-caption">{{ messages.length }} 条消息</div>
                </q-bar>
                <q-virtual-scroll :items="messages" style="height: 400px" class="q-pa-md">
                    <template v-slot="{ item, index }">
                        <div :key="index" class="q-mb-md">
                            <div :class="item.isMine ? 'row reverse' : 'row'">
                                <q-chat-message :text="[item.text]" :sent="item.isMine"
                                    :bg-color="item.isMine ? 'primary' : 'grey-3'"
                                    :text-color="item.isMine ? 'white' : 'black'">
                                    <template v-slot:avatar>
                                        <q-avatar>
                                            <img :src="item.avatar">
                                        </q-avatar>
                                    </template>
                                </q-chat-message>
                            </div>
                        </div>
                    </template>
                </q-virtual-scroll>
            </q-card>
        </div>

        <q-separator />

        <!-- 商品网格 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">商品网格 (1000个商品)</div>
            <q-card style="max-width: 800px">
                <q-virtual-scroll :items="products" virtual-scroll-slice-size="12" style="max-height: 600px">
                    <template v-slot="{ item, index }">
                        <div :key="index" class="q-pa-sm">
                            <div class="row q-col-gutter-sm">
                                <div v-for="product in item" :key="product.id" class="col-6 col-sm-3">
                                    <q-card flat bordered>
                                        <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" ratio="1" />
                                        <q-card-section>
                                            <div class="text-subtitle2">{{ product.name }}</div>
                                            <div class="text-h6 text-red">¥{{ product.price }}</div>
                                        </q-card-section>
                                    </q-card>
                                </div>
                            </div>
                        </div>
                    </template>
                </q-virtual-scroll>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 生成大量数据
const largeList = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    description: `这是第 ${i + 1} 个列表项`
}))

// 生成用户列表
const users = Array.from({ length: 5000 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: Math.random() > 0.3 ? 'online' : 'offline',
    color: ['primary', 'secondary', 'positive', 'orange', 'purple'][i % 5]
}))

const searchQuery = ref('')

const filteredUsers = computed(() => {
    if (!searchQuery.value) return users
    return users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

// 生成聊天消息
const messages = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    text: `消息内容 ${i + 1}`,
    isMine: i % 3 === 0,
    avatar: i % 3 === 0
        ? 'https://cdn.quasar.dev/img/avatar.png'
        : 'https://cdn.quasar.dev/img/avatar2.jpg'
}))

// 生成商品列表（每4个商品一行）
const allProducts = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `商品 ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 100
}))

// 将商品分组，每组4个
const products = []
for (let i = 0; i < allProducts.length; i += 4) {
    products.push(allProducts.slice(i, i + 4))
}
</script>
