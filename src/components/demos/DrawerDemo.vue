<!--
🎯 Drawer 抽屉/侧边栏演示 - 移动端导航的核心组件

📚 学习目标：
1. 理解抽屉组件必须在 QLayout 中使用的原理
2. 掌握四个方向抽屉的配置方法
3. 学会抽屉的覆盖模式和边框设置
4. 掌握抽屉内容的滚动处理
5. 实现移动端友好的导航设计

💡 重要概念：
- QDrawer 必须在 QLayout 内部使用
- side 属性控制抽屉出现的方向
- overlay 创建覆盖模式（带遮罩）
- show-if-above 在大屏幕时自动显示

🎯 实际应用场景：
- 移动端主导航菜单
- 商品筛选面板
- 购物车侧边栏
- 用户信息面板
- 通知和消息中心

🔑 最佳实践：
1. 移动端使用 overlay 模式
2. 桌面端可以使用 show-if-above
3. 抽屉内容使用 q-scroll-area
4. 合理设置抽屉宽度
-->

<template>
    <div class="q-gutter-md">
        <div class="text-h6">Drawer 抽屉/侧边栏演示</div>

        <!-- 使用说明 -->
        <q-banner class="bg-info text-white">
            <template v-slot:avatar>
                <q-icon name="info" />
            </template>
            💡 注意：真实的 q-drawer 必须在 q-layout 内使用。这里用对话框模拟抽屉效果以便学习。
        </q-banner>

        <!-- 基础抽屉演示 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">🧭 四个方向的抽屉</div>
            <div class="q-gutter-sm">
                <q-btn color="primary" label="左侧抽屉" @click="leftDrawer = true" />
                <q-btn color="secondary" label="右侧抽屉" @click="rightDrawer = true" />
                <q-btn color="positive" label="顶部抽屉" @click="topDrawer = true" />
                <q-btn color="warning" label="底部抽屉" @click="bottomDrawer = true" />
            </div>

            <!-- 左侧抽屉（用对话框模拟） -->
            <q-dialog v-model="leftDrawer" position="left" full-height>
                <q-card style="width: 300px" class="column">
                    <q-bar class="bg-primary text-white">
                        <div>左侧菜单</div>
                        <q-space />
                        <q-btn dense flat icon="close" v-close-popup />
                    </q-bar>
                    <q-scroll-area class="col">
                        <q-list>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="home" />
                                </q-item-section>
                                <q-item-section>首页</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="settings" />
                                </q-item-section>
                                <q-item-section>设置</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="help" />
                                </q-item-section>
                                <q-item-section>帮助</q-item-section>
                            </q-item>
                        </q-list>
                    </q-scroll-area>
                </q-card>
            </q-dialog>

            <!-- 右侧抽屉 -->
            <q-dialog v-model="rightDrawer" position="right" full-height>
                <q-card style="width: 350px" class="column">
                    <q-bar class="bg-secondary text-white">
                        <div>购物车</div>
                        <q-space />
                        <q-btn dense flat icon="close" v-close-popup />
                    </q-bar>
                    <q-scroll-area class="col">
                        <div class="q-pa-md">
                            <q-list>
                                <q-item v-for="i in 3" :key="i">
                                    <q-item-section avatar>
                                        <q-avatar>
                                            <img src="https://cdn.quasar.dev/img/avatar.png">
                                        </q-avatar>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>商品 {{ i }}</q-item-label>
                                        <q-item-label caption>¥{{ i * 100 }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-btn flat round dense icon="remove" size="sm" />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                    </q-scroll-area>
                    <q-separator />
                    <div class="q-pa-md">
                        <div class="row items-center justify-between q-mb-md">
                            <div class="text-h6">总计</div>
                            <div class="text-h6 text-primary">¥600</div>
                        </div>
                        <q-btn color="primary" label="去结算" class="full-width" />
                    </div>
                </q-card>
            </q-dialog>

            <!-- 顶部抽屉 -->
            <q-dialog v-model="topDrawer" position="top">
                <q-card style="width: 100vw">
                    <q-bar class="bg-positive text-white">
                        <q-icon name="notifications" />
                        <div>通知中心</div>
                        <q-space />
                        <q-btn dense flat icon="close" v-close-popup />
                    </q-bar>
                    <q-card-section>
                        <div class="text-body1">📢 这是从顶部滑出的抽屉，通常用于通知栏或快捷操作。</div>
                        <q-list class="q-mt-md">
                            <q-item>
                                <q-item-section avatar>
                                    <q-icon name="mail" color="primary" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>新邮件通知</q-item-label>
                                    <q-item-label caption>您有 3 条新邮件</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </q-dialog>

            <!-- 底部抽屉 -->
            <q-dialog v-model="bottomDrawer" position="bottom">
                <q-card style="width: 100vw">
                    <q-bar class="bg-warning text-white">
                        <q-icon name="more_horiz" />
                        <div>更多选项</div>
                        <q-space />
                        <q-btn dense flat icon="close" v-close-popup />
                    </q-bar>
                    <q-card-section>
                        <q-list>
                            <q-item clickable v-ripple v-close-popup>
                                <q-item-section avatar>
                                    <q-icon name="share" />
                                </q-item-section>
                                <q-item-section>分享</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple v-close-popup>
                                <q-item-section avatar>
                                    <q-icon name="bookmark" />
                                </q-item-section>
                                <q-item-section>收藏</q-item-section>
                            </q-item>
                            <q-item clickable v-ripple v-close-popup>
                                <q-item-section avatar>
                                    <q-icon name="delete" color="negative" />
                                </q-item-section>
                                <q-item-section>删除</q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </q-dialog>
        </div>

        <q-separator />

        <!-- 真实的布局演示 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">🏗️ 真实布局中的抽屉效果</div>
            <q-card style="max-width: 800px; height: 500px;">
                <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
                    <q-header elevated class="bg-primary">
                        <q-toolbar>
                            <q-btn flat dense round icon="menu" @click="demoLeftDrawer = !demoLeftDrawer" />
                            <q-toolbar-title>演示应用</q-toolbar-title>
                            <q-btn flat dense round icon="filter_list" @click="demoRightDrawer = !demoRightDrawer" />
                        </q-toolbar>
                    </q-header>

                    <q-drawer v-model="demoLeftDrawer" show-if-above bordered :width="200" :breakpoint="500">
                        <q-scroll-area
                            style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                            <q-list padding>
                                <q-item clickable v-ripple>
                                    <q-item-section avatar>
                                        <q-icon name="inbox" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>收件箱</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-badge color="red">5</q-badge>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-ripple>
                                    <q-item-section avatar>
                                        <q-icon name="star" />
                                    </q-item-section>
                                    <q-item-section>已加星标</q-item-section>
                                </q-item>

                                <q-item clickable v-ripple>
                                    <q-item-section avatar>
                                        <q-icon name="send" />
                                    </q-item-section>
                                    <q-item-section>已发送</q-item-section>
                                </q-item>

                                <q-item clickable v-ripple>
                                    <q-item-section avatar>
                                        <q-icon name="drafts" />
                                    </q-item-section>
                                    <q-item-section>草稿箱</q-item-section>
                                </q-item>
                            </q-list>
                        </q-scroll-area>

                        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/mountains.jpg"
                            style="height: 150px">
                            <div class="absolute-bottom bg-transparent">
                                <q-avatar size="56px" class="q-mb-sm">
                                    <img src="https://cdn.quasar.dev/img/avatar.png">
                                </q-avatar>
                                <div class="text-weight-bold">张三</div>
                                <div>@zhangsan</div>
                            </div>
                        </q-img>
                    </q-drawer>

                    <q-drawer v-model="demoRightDrawer" side="right" bordered :width="250" show-if-above>
                        <div class="q-pa-md">
                            <div class="text-h6 q-mb-md">筛选条件</div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">分类</div>
                                <q-option-group v-model="filterCategory" :options="[
                                    { label: '全部', value: 'all' },
                                    { label: '重要', value: 'important' },
                                    { label: '工作', value: 'work' },
                                    { label: '个人', value: 'personal' }
                                ]" color="primary" />
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">状态</div>
                                <q-checkbox v-model="filterStatus" val="read" label="已读" />
                                <q-checkbox v-model="filterStatus" val="unread" label="未读" />
                                <q-checkbox v-model="filterStatus" val="starred" label="已加星" />
                            </div>

                            <q-btn color="primary" label="应用筛选" class="full-width" />
                        </div>
                    </q-drawer>

                    <q-page-container>
                        <q-page class="flex flex-center">
                            <div class="text-center">
                                <div class="text-h5 q-mb-md">主内容区域</div>
                                <div class="text-body1 text-grey-7 q-mb-lg">
                                    点击左上角菜单图标打开左侧抽屉<br>
                                    点击右上角筛选图标打开右侧抽屉
                                </div>
                                <div class="q-gutter-sm">
                                    <q-btn color="primary" @click="demoLeftDrawer = !demoLeftDrawer">
                                        {{ demoLeftDrawer ? '关闭' : '打开' }}左侧抽屉
                                    </q-btn>
                                    <q-btn color="secondary" @click="demoRightDrawer = !demoRightDrawer">
                                        {{ demoRightDrawer ? '关闭' : '打开' }}右侧抽屉
                                    </q-btn>
                                </div>
                            </div>
                        </q-page>
                    </q-page-container>
                </q-layout>
            </q-card>
        </div>

        <q-separator />

        <!-- 实际应用示例 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">📱 移动端菜单抽屉</div>
            <q-card style="max-width: 400px; height: 600px;">
                <q-layout view="lHh Lpr lFf" container class="shadow-2 rounded-borders">
                    <q-header elevated class="bg-primary">
                        <q-toolbar>
                            <q-btn flat dense round icon="menu" @click="mobileDrawer = !mobileDrawer" />
                            <q-toolbar-title>移动应用</q-toolbar-title>
                            <q-btn flat dense round icon="more_vert" />
                        </q-toolbar>
                    </q-header>

                    <q-drawer v-model="mobileDrawer" :width="280" :breakpoint="700" overlay>
                        <div class="q-pa-md bg-primary text-white">
                            <q-avatar size="64px">
                                <img src="https://cdn.quasar.dev/img/avatar.png">
                            </q-avatar>
                            <div class="text-h6 q-mt-md">张三</div>
                            <div class="text-caption">zhangsan@example.com</div>
                        </div>

                        <q-scroll-area class="fit">
                            <q-list>
                                <q-item clickable v-ripple @click="mobileDrawer = false">
                                    <q-item-section avatar>
                                        <q-icon name="inbox" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>收件箱</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-badge color="red">3</q-badge>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-ripple @click="mobileDrawer = false">
                                    <q-item-section avatar>
                                        <q-icon name="send" />
                                    </q-item-section>
                                    <q-item-section>已发送</q-item-section>
                                </q-item>

                                <q-item clickable v-ripple @click="mobileDrawer = false">
                                    <q-item-section avatar>
                                        <q-icon name="drafts" />
                                    </q-item-section>
                                    <q-item-section>草稿箱</q-item-section>
                                </q-item>

                                <q-separator />

                                <q-item-label header>设置</q-item-label>

                                <q-item clickable v-ripple @click="mobileDrawer = false">
                                    <q-item-section avatar>
                                        <q-icon name="settings" />
                                    </q-item-section>
                                    <q-item-section>系统设置</q-item-section>
                                </q-item>

                                <q-item clickable v-ripple @click="mobileDrawer = false">
                                    <q-item-section avatar>
                                        <q-icon name="help" />
                                    </q-item-section>
                                    <q-item-section>帮助中心</q-item-section>
                                </q-item>

                                <q-separator />

                                <q-item clickable v-ripple @click="mobileDrawer = false">
                                    <q-item-section avatar>
                                        <q-icon name="logout" color="negative" />
                                    </q-item-section>
                                    <q-item-section>退出登录</q-item-section>
                                </q-item>
                            </q-list>
                        </q-scroll-area>
                    </q-drawer>

                    <q-page-container>
                        <q-page class="flex flex-center">
                            <div class="text-center q-pa-md">
                                <q-icon name="phone_android" size="64px" color="grey-5" />
                                <div class="text-h6 q-mt-md">移动端演示</div>
                                <div class="text-body2 text-grey-7 q-mt-sm">
                                    点击左上角菜单按钮
                                    <br>体验移动端抽屉菜单
                                </div>
                            </div>
                        </q-page>
                    </q-page-container>
                </q-layout>
            </q-card>
        </div>

        <q-separator />

        <!-- 购物车抽屉演示 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">🛒 购物车抽屉演示</div>

            <q-btn color="primary" @click="cartDrawer = true">
                <q-icon name="shopping_cart" />
                <q-badge color="red" floating>{{ cartItems.length }}</q-badge>
                <span class="q-ml-sm">查看购物车</span>
            </q-btn>

            <q-dialog v-model="cartDrawer" position="right" full-height>
                <q-card style="width: 400px" class="column">
                    <q-bar class="bg-orange text-white">
                        <q-icon name="shopping_cart" />
                        <div>购物车 ({{ cartItems.length }})</div>
                        <q-space />
                        <q-btn dense flat icon="close" v-close-popup />
                    </q-bar>

                    <q-scroll-area class="col">
                        <q-list v-if="cartItems.length > 0">
                            <q-item v-for="item in cartItems" :key="item.id">
                                <q-item-section avatar>
                                    <q-avatar square size="60px">
                                        <img :src="item.image">
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ item.name }}</q-item-label>
                                    <q-item-label caption>¥{{ item.price }}</q-item-label>
                                    <div class="row items-center q-gutter-sm q-mt-sm">
                                        <q-btn flat dense round icon="remove" size="xs"
                                            @click="decreaseQuantity(item)" />
                                        <span>{{ item.quantity }}</span>
                                        <q-btn flat dense round icon="add" size="xs" @click="increaseQuantity(item)" />
                                    </div>
                                </q-item-section>
                                <q-item-section side top>
                                    <q-btn flat round dense icon="close" size="sm" @click="removeItem(item)" />
                                    <div class="text-weight-bold q-mt-sm">¥{{ item.price * item.quantity }}</div>
                                </q-item-section>
                            </q-item>
                        </q-list>

                        <div v-else class="text-center q-pa-xl text-grey-7">
                            <q-icon name="shopping_cart" size="64px" />
                            <div class="q-mt-md">购物车是空的</div>
                            <q-btn flat color="primary" class="q-mt-md" @click="addSampleItems">
                                添加示例商品
                            </q-btn>
                        </div>
                    </q-scroll-area>

                    <q-separator />

                    <div class="q-pa-md">
                        <div class="row items-center justify-between q-mb-md">
                            <div class="text-h6">总计</div>
                            <div class="text-h6 text-primary">¥{{ cartTotal }}</div>
                        </div>
                        <q-btn color="primary" label="去结算" class="full-width" :disable="cartItems.length === 0"
                            v-close-popup @click="$q.notify('跳转到结算页面')" />
                    </div>
                </q-card>
            </q-dialog>
        </div>

        <q-separator />

        <!-- 代码示例 -->
        <q-card class="bg-grey-1">
            <q-card-section>
                <div class="text-h6">💻 真实项目中的抽屉代码</div>
            </q-card-section>

            <q-expansion-item label="查看完整布局代码" icon="code">
                <q-card>
                    <q-card-section>
                        <div class="code-block">
                            {{ drawerCodeExample }}
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-card>

        <q-separator />

        <!-- 学习总结 -->
        <q-card class="bg-info-1">
            <q-card-section>
                <div class="text-h6">📋 抽屉组件学习要点</div>
                <q-list>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="1" class="bg-primary text-white rounded" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>布局要求</q-item-label>
                            <q-item-label caption>q-drawer 必须在 q-layout 内部使用</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="2" class="bg-secondary text-white rounded" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>方向控制</q-item-label>
                            <q-item-label caption>side 属性：left, right, top, bottom</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="3" class="bg-positive text-white rounded" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>显示模式</q-item-label>
                            <q-item-label caption>overlay 覆盖模式，show-if-above 自适应显示</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="4" class="bg-orange text-white rounded" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>响应式设计</q-item-label>
                            <q-item-label caption>breakpoint 属性控制断点，适配不同屏幕</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </div>
</template>

<!--
💻 Script 部分 - 抽屉状态管理

这里演示了抽屉组件的状态控制：
1. 使用 ref() 管理抽屉的显示/隐藏状态
2. 购物车数据的增删改查操作
3. 响应式计算总价
4. 用户交互反馈

🔑 关键实现：
- v-model 双向绑定抽屉状态
- 计算属性实时更新总价
- 数组操作管理购物车商品
- 用户操作给予即时反馈
-->

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 🚪 抽屉状态管理 - 控制各个抽屉的显示隐藏
const leftDrawer = ref(false)           // 左侧菜单抽屉
const rightDrawer = ref(false)          // 右侧筛选抽屉
const topDrawer = ref(false)            // 顶部通知抽屉
const bottomDrawer = ref(false)         // 底部操作抽屉
const mobileDrawer = ref(false)         // 移动端菜单抽屉
const demoLeftDrawer = ref(true)        // 演示左侧抽屉（默认显示）
const demoRightDrawer = ref(false)      // 演示右侧抽屉
const cartDrawer = ref(false)           // 购物车抽屉

// 🎛️ 筛选状态
const filterCategory = ref('all')
const filterStatus = ref(['unread'])

// 🛒 购物车数据管理
const cartItems = ref([
    {
        id: 1,
        name: '高端智能手机',
        price: 4999,
        quantity: 1,
        image: 'https://cdn.quasar.dev/img/parallax1.jpg'
    },
    {
        id: 2,
        name: '无线蓝牙耳机',
        price: 299,
        quantity: 2,
        image: 'https://cdn.quasar.dev/img/parallax2.jpg'
    }
])

/**
 * 🧮 购物车总价计算 - 响应式计算属性
 *
 * computed() 的优势：
 * - 只有当 cartItems 变化时才重新计算
 * - 结果会被缓存，避免重复计算
 * - 自动响应数据变化，UI 实时更新
 */
const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)
})

// 🛒 购物车操作函数

/**
 * 增加商品数量
 * @param {Object} item - 购物车商品项
 */
function increaseQuantity(item) {
    item.quantity++
    $q.notify({
        message: `${item.name} 数量 +1`,
        color: 'positive',
        position: 'top',
        timeout: 1000
    })
}

/**
 * 减少商品数量
 * @param {Object} item - 购物车商品项
 */
function decreaseQuantity(item) {
    if (item.quantity > 1) {
        item.quantity--
        $q.notify({
            message: `${item.name} 数量 -1`,
            color: 'info',
            position: 'top',
            timeout: 1000
        })
    }
}

/**
 * 移除商品
 * @param {Object} item - 要移除的商品项
 */
function removeItem(item) {
    $q.dialog({
        title: '确认删除',
        message: `确定要从购物车中移除 ${item.name} 吗？`,
        cancel: true,
        persistent: true
    }).onOk(() => {
        const index = cartItems.value.findIndex(cartItem => cartItem.id === item.id)
        if (index > -1) {
            cartItems.value.splice(index, 1)
            $q.notify({
                message: '商品已移除',
                color: 'negative'
            })
        }
    })
}

/**
 * 添加示例商品 - 演示用
 */
function addSampleItems() {
    const sampleProducts = [
        { id: Date.now(), name: '笔记本电脑', price: 5999, quantity: 1, image: 'https://cdn.quasar.dev/img/mountains.jpg' },
        { id: Date.now() + 1, name: '机械键盘', price: 399, quantity: 1, image: 'https://cdn.quasar.dev/img/quasar.jpg' }
    ]

    cartItems.value.push(...sampleProducts)
    $q.notify({
        message: '已添加示例商品',
        color: 'positive'
    })
}

// 📝 代码示例文本
const drawerCodeExample = [
    '<!-- 完整的抽屉布局示例 -->',
    '<template>',
    '  <q-layout view="lHh Lpr lFf">',
    '    <q-header elevated>',
    '      <q-toolbar>',
    '        <q-btn flat dense round icon="menu" @click="leftDrawerOpen = true" />',
    '        <q-toolbar-title>应用标题</q-toolbar-title>',
    '      </q-toolbar>',
    '    </q-header>',
    '',
    '    <!-- 左侧抽屉 -->',
    '    <q-drawer',
    '      v-model="leftDrawerOpen"',
    '      show-if-above',
    '      bordered',
    '      :width="250"',
    '    >',
    '      <q-scroll-area class="fit">',
    '        <q-list>',
    '          <q-item clickable v-ripple>',
    '            <q-item-section>收件箱</q-item-section>',
    '          </q-item>',
    '        </q-list>',
    '      </q-scroll-area>',
    '    </q-drawer>',
    '',
    '    <q-page-container>',
    '      <router-view />',
    '    </q-page-container>',
    '  </q-layout>',
    '</template>',
    '',
    '<' + 'script setup>',
    'import { ref } from "vue"',
    'const leftDrawerOpen = ref(false)',
    '</' + 'script>'
].join('\n')
</script>

<!--
🎨 样式说明

.rounded 类用于图标背景：
- 创建圆形背景效果
- 配合背景色突出数字标识

container 属性：
- 让 q-layout 适应父容器尺寸
- 用于演示环境，真实项目中通常不需要
-->

<style scoped>
.rounded {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}

.code-block {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-line;
    color: #333;
    border-left: 4px solid var(--q-primary);
}
</style>
