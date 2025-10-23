<!--
🎯 Button 按钮组件演示 - Quasar 最基础的交互组件

📚 学习目标：
1. 掌握按钮的7种颜色主题使用
2. 理解按钮的5种尺寸适配原理
3. 学会按钮状态管理（加载、禁用）
4. 掌握图标按钮的使用方法
5. 理解按钮组的组合使用

💡 核心属性：
- color: 主题颜色 (primary, secondary, positive, negative, warning, info)
- size: 尺寸 (xs, sm, md, lg, xl)
- loading: 加载状态，防止重复提交
- disable: 禁用状态，条件控制
- icon/icon-right: 图标位置控制

🎯 实际应用价值：
- 表单提交按钮：防止重复提交，提供用户反馈
- 操作按钮：编辑、删除、保存等业务操作
- 导航按钮：页面跳转和功能导航
- 状态按钮：根据条件显示不同状态

💼 最佳实践：
1. 主要操作使用 primary 色
2. 危险操作使用 negative 色
3. 异步操作必须显示 loading 状态
4. 根据业务逻辑合理禁用按钮
-->

<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础按钮</div>
        <div class="q-gutter-sm">
            <q-btn label="默认按钮" />
            <q-btn color="primary" label="主要按钮" />
            <q-btn color="secondary" label="次要按钮" />
            <q-btn color="positive" label="成功按钮" />
            <q-btn color="negative" label="危险按钮" />
            <q-btn color="warning" label="警告按钮" />
            <q-btn color="info" label="信息按钮" />
        </div>

        <q-separator />

        <div class="text-h6">按钮样式</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="填充" />
            <q-btn color="primary" label="扁平" flat />
            <q-btn color="primary" label="轮廓" outline />
            <q-btn color="primary" label="无边" unelevated />
            <q-btn color="primary" label="圆角" rounded />
            <q-btn color="primary" label="光泽" glossy />
        </div>

        <q-separator />

        <div class="text-h6">按钮尺寸</div>
        <div class="q-gutter-sm items-center row">
            <q-btn color="primary" label="超小" size="xs" />
            <q-btn color="primary" label="小" size="sm" />
            <q-btn color="primary" label="中" size="md" />
            <q-btn color="primary" label="大" size="lg" />
            <q-btn color="primary" label="超大" size="xl" />
        </div>

        <q-separator />

        <div class="text-h6">图标按钮</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" icon="home" label="带图标" />
            <q-btn color="secondary" icon-right="send" label="右侧图标" />
            <q-btn color="primary" icon="home" round />
            <q-btn color="secondary" icon="edit" fab />
            <q-btn color="positive" icon="add" fab-mini />
        </div>

        <q-separator />

        <div class="text-h6">按钮状态</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="正常" />
            <q-btn color="primary" label="禁用" disable />
            <q-btn color="primary" label="加载中" loading />
            <q-btn color="primary" :label="loading ? '加载中...' : '点击加载'" :loading="loading" @click="simulateLoading" />
        </div>

        <q-separator />

        <div class="text-h6">按钮组</div>
        <div class="q-gutter-sm">
            <q-btn-group>
                <q-btn color="primary" label="左" />
                <q-btn color="primary" label="中" />
                <q-btn color="primary" label="右" />
            </q-btn-group>

            <q-btn-group outline>
                <q-btn color="primary" icon="format_bold" />
                <q-btn color="primary" icon="format_italic" />
                <q-btn color="primary" icon="format_underlined" />
            </q-btn-group>
        </div>

        <q-separator />

        <div class="text-subtitle1 text-grey-7">
            💡 提示：可以组合使用颜色、尺寸、样式等属性来创建各种按钮效果
        </div>
    </div>
</template>

<!--
💻 Script 部分 - 按钮状态控制

这里演示了按钮最重要的功能：状态管理
1. loading 状态：防止用户重复点击
2. 异步操作的用户体验优化
3. 响应式数据绑定

🔑 关键实现：
- ref(false) 创建响应式的加载状态
- 点击时设置 loading = true
- 异步操作完成后设置 loading = false
- 按钮自动显示加载动画并禁用点击
-->

<script setup>
import { ref } from 'vue'

// 🔄 响应式的加载状态 - 控制按钮的加载效果
const loading = ref(false)

/**
 * 🎯 模拟异步操作函数
 *
 * 这是实际项目中的标准模式：
 * 1. 开始操作时设置 loading = true
 * 2. 执行异步操作（API 调用、数据处理等）
 * 3. 操作完成后设置 loading = false
 *
 * 💡 用户体验优化：
 * - 按钮显示转圈动画，用户知道系统在处理
 * - 按钮自动禁用，防止重复点击
 * - 2秒后恢复正常，模拟真实的网络请求
 */
function simulateLoading() {
    loading.value = true  // 🔄 开始加载

    // 模拟网络请求或数据处理
    setTimeout(() => {
        loading.value = false  // ✅ 加载完成
    }, 2000)
}
</script>
