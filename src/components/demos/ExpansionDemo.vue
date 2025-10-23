<template>
    <div class="q-gutter-md">
        <div class="text-h6">Expansion Item 可展开项</div>

        <!-- 基础展开项 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">基础展开项</div>
            <q-list bordered class="rounded-borders">
                <q-expansion-item label="展开项 1" icon="info">
                    <q-card>
                        <q-card-section>
                            这是展开后的内容区域。可以放置任何内容。
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item label="展开项 2" icon="help">
                    <q-card>
                        <q-card-section>
                            另一个展开项的内容。
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item label="展开项 3" icon="settings" default-opened>
                    <q-card>
                        <q-card-section>
                            这个展开项默认是打开的（default-opened）。
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>

        <q-separator />

        <!-- FAQ示例 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">常见问题 (FAQ)</div>
            <q-list bordered class="rounded-borders" style="max-width: 700px">
                <q-expansion-item v-for="(faq, index) in faqs" :key="index" :label="faq.question"
                    :caption="faq.category" :icon="faq.icon" :header-class="'bg-' + faq.color + '-1'">
                    <q-card>
                        <q-card-section>
                            {{ faq.answer }}
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>

        <q-separator />

        <!-- 嵌套展开项 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">嵌套展开项</div>
            <q-list bordered class="rounded-borders" style="max-width: 700px">
                <q-expansion-item label="一级菜单 1" icon="folder">
                    <q-list>
                        <q-expansion-item label="二级菜单 1-1" icon="folder_open">
                            <q-card>
                                <q-card-section>
                                    三级内容 1-1
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <q-expansion-item label="二级菜单 1-2" icon="folder_open">
                            <q-card>
                                <q-card-section>
                                    三级内容 1-2
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-list>
                </q-expansion-item>

                <q-expansion-item label="一级菜单 2" icon="folder">
                    <q-card>
                        <q-card-section>
                            一级内容 2
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>

        <q-separator />

        <!-- 带操作按钮的展开项 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">带操作按钮</div>
            <q-list bordered class="rounded-borders" style="max-width: 700px">
                <q-expansion-item v-for="order in orders" :key="order.id" :label="`订单 #${order.id}`"
                    :caption="`${order.date} - ${order.status}`">
                    <template v-slot:header>
                        <q-item-section avatar>
                            <q-avatar :color="order.statusColor" text-color="white" icon="shopping_bag" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>订单 #{{ order.id }}</q-item-label>
                            <q-item-label caption>{{ order.date }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-badge :color="order.statusColor">{{ order.status }}</q-badge>
                        </q-item-section>
                    </template>

                    <q-card>
                        <q-card-section>
                            <div class="q-gutter-sm">
                                <div v-for="item in order.items" :key="item.name">
                                    <strong>{{ item.name }}</strong> x {{ item.quantity }} - ¥{{ item.price }}
                                </div>
                                <q-separator class="q-my-md" />
                                <div class="text-h6">总计: ¥{{ order.total }}</div>
                            </div>
                        </q-card-section>
                        <q-card-actions>
                            <q-btn flat color="primary" label="查看详情" />
                            <q-btn flat color="grey" label="联系客服" />
                            <q-space />
                            <q-btn color="negative" label="取消订单" v-if="order.status === '待付款'" />
                        </q-card-actions>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>

        <q-separator />

        <!-- 设置面板 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">设置面板</div>
            <q-list bordered class="rounded-borders" style="max-width: 700px">
                <q-expansion-item label="通知设置" icon="notifications" default-opened>
                    <q-card>
                        <q-card-section>
                            <q-list>
                                <q-item tag="label">
                                    <q-item-section>
                                        <q-item-label>推送通知</q-item-label>
                                        <q-item-label caption>接收应用推送消息</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-toggle v-model="settings.push" color="primary" />
                                    </q-item-section>
                                </q-item>

                                <q-item tag="label">
                                    <q-item-section>
                                        <q-item-label>邮件通知</q-item-label>
                                        <q-item-label caption>接收邮件提醒</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-toggle v-model="settings.email" color="primary" />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item label="隐私设置" icon="lock">
                    <q-card>
                        <q-card-section>
                            <q-list>
                                <q-item tag="label">
                                    <q-item-section>
                                        <q-item-label>个人资料公开</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-toggle v-model="settings.publicProfile" color="primary" />
                                    </q-item-section>
                                </q-item>

                                <q-item tag="label">
                                    <q-item-section>
                                        <q-item-label>显示在线状态</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-toggle v-model="settings.onlineStatus" color="primary" />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item label="账户设置" icon="account_circle">
                    <q-card>
                        <q-card-section class="q-gutter-md">
                            <q-input v-model="settings.username" label="用户名" outlined />
                            <q-input v-model="settings.email2" label="邮箱" outlined type="email" />
                            <q-btn color="primary" label="保存修改" />
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>

        <q-separator />

        <!-- 文件列表 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">文件管理器</div>
            <q-list bordered class="rounded-borders" style="max-width: 700px">
                <q-expansion-item v-for="folder in folders" :key="folder.name" :icon="folder.icon" :label="folder.name"
                    :caption="`${folder.files.length} 个文件`">
                    <q-list>
                        <q-item v-for="file in folder.files" :key="file.name" clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon :name="file.icon" :color="file.color" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ file.name }}</q-item-label>
                                <q-item-label caption>{{ file.size }} - {{ file.date }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-btn flat round dense icon="more_vert" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-expansion-item>
            </q-list>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = [
    {
        question: '如何注册账号？',
        answer: '点击右上角的"注册"按钮，填写必要信息即可完成注册。',
        category: '账户相关',
        icon: 'account_circle',
        color: 'primary'
    },
    {
        question: '忘记密码怎么办？',
        answer: '点击登录页面的"忘记密码"链接，通过邮箱或手机号重置密码。',
        category: '账户相关',
        icon: 'lock',
        color: 'orange'
    },
    {
        question: '如何联系客服？',
        answer: '您可以通过页面右下角的客服图标，或发送邮件至 support@example.com 联系我们。',
        category: '客服支持',
        icon: 'support_agent',
        color: 'positive'
    },
    {
        question: '支持哪些支付方式？',
        answer: '我们支持支付宝、微信支付、银行卡等多种支付方式。',
        category: '支付相关',
        icon: 'payment',
        color: 'info'
    },
]

const orders = [
    {
        id: '20240101',
        date: '2024-01-15',
        status: '已完成',
        statusColor: 'positive',
        total: 298,
        items: [
            { name: '商品 A', quantity: 1, price: 99 },
            { name: '商品 B', quantity: 1, price: 199 },
        ]
    },
    {
        id: '20240102',
        date: '2024-01-16',
        status: '配送中',
        statusColor: 'info',
        total: 499,
        items: [
            { name: '商品 C', quantity: 1, price: 499 },
        ]
    },
    {
        id: '20240103',
        date: '2024-01-17',
        status: '待付款',
        statusColor: 'warning',
        total: 159,
        items: [
            { name: '商品 D', quantity: 1, price: 159 },
        ]
    },
]

const settings = ref({
    push: true,
    email: false,
    publicProfile: true,
    onlineStatus: true,
    username: 'zhangsan',
    email2: 'zhangsan@example.com'
})

const folders = [
    {
        name: '文档',
        icon: 'folder',
        files: [
            { name: '项目方案.docx', icon: 'description', color: 'blue', size: '2.3 MB', date: '2024-01-15' },
            { name: '会议记录.pdf', icon: 'picture_as_pdf', color: 'red', size: '1.5 MB', date: '2024-01-14' },
        ]
    },
    {
        name: '图片',
        icon: 'folder',
        files: [
            { name: 'photo1.jpg', icon: 'image', color: 'orange', size: '3.2 MB', date: '2024-01-13' },
            { name: 'photo2.png', icon: 'image', color: 'orange', size: '2.8 MB', date: '2024-01-12' },
        ]
    },
    {
        name: '视频',
        icon: 'folder',
        files: [
            { name: 'tutorial.mp4', icon: 'video_library', color: 'purple', size: '45 MB', date: '2024-01-11' },
        ]
    },
]
</script>
