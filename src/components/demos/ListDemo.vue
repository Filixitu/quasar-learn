<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础列表</div>
        <q-list bordered class="rounded-borders">
            <q-item clickable v-ripple>
                <q-item-section>列表项 1</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section>列表项 2</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section>列表项 3</q-item-section>
            </q-item>
        </q-list>

        <q-separator />

        <div class="text-h6">带图标的列表</div>
        <q-list bordered class="rounded-borders">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon color="primary" name="home" />
                </q-item-section>
                <q-item-section>首页</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon color="teal" name="favorite" />
                </q-item-section>
                <q-item-section>收藏</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon color="orange" name="settings" />
                </q-item-section>
                <q-item-section>设置</q-item-section>
            </q-item>
        </q-list>

        <q-separator />

        <div class="text-h6">带头像和描述的列表</div>
        <q-list bordered class="rounded-borders">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>张三</q-item-label>
                    <q-item-label caption lines="1">软件工程师</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-icon name="chat_bubble" color="green" />
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>李四</q-item-label>
                    <q-item-label caption lines="1">产品经理</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-icon name="star" color="yellow-8" />
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">王</q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>王五</q-item-label>
                    <q-item-label caption lines="1">UI设计师</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-badge color="red">3</q-badge>
                </q-item-section>
            </q-item>
        </q-list>

        <q-separator />

        <div class="text-h6">多行内容列表</div>
        <q-list bordered class="rounded-borders">
            <q-item>
                <q-item-section avatar top>
                    <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>项目文档</q-item-label>
                    <q-item-label caption lines="2">
                        包含所有项目相关文档、设计稿、需求文档等重要文件。
                    </q-item-label>
                </q-item-section>
                <q-item-section side top>
                    <q-item-label caption>5分钟前</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
                <q-item-section avatar top>
                    <q-avatar icon="image" color="purple" text-color="white" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>图片素材</q-item-label>
                    <q-item-label caption lines="2">
                        用于网站和应用的所有图片资源文件。
                    </q-item-label>
                </q-item-section>
                <q-item-section side top>
                    <q-item-label caption>1小时前</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>

        <q-separator />

        <div class="text-h6">带标题的列表</div>
        <q-list bordered class="rounded-borders">
            <q-item-label header>最近联系</q-item-label>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">张</q-avatar>
                </q-item-section>
                <q-item-section>张三</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar color="teal" text-color="white">李</q-avatar>
                </q-item-section>
                <q-item-section>李四</q-item-section>
            </q-item>

            <q-separator />
            <q-item-label header>其他联系人</q-item-label>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar color="orange" text-color="white">王</q-avatar>
                </q-item-section>
                <q-item-section>王五</q-item-section>
            </q-item>
        </q-list>

        <q-separator />

        <div class="text-h6">可展开的列表</div>
        <q-list bordered class="rounded-borders">
            <q-expansion-item icon="inbox" label="收件箱" default-opened>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="mail" />
                    </q-item-section>
                    <q-item-section>邮件 1</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon name="mail" />
                    </q-item-section>
                    <q-item-section>邮件 2</q-item-section>
                </q-item>
            </q-expansion-item>

            <q-expansion-item icon="send" label="已发送">
                <q-item clickable v-ripple>
                    <q-item-section>发送的邮件 1</q-item-section>
                </q-item>
            </q-expansion-item>

            <q-expansion-item icon="drafts" label="草稿箱">
                <q-item clickable v-ripple>
                    <q-item-section>草稿 1</q-item-section>
                </q-item>
            </q-expansion-item>
        </q-list>

        <q-separator />

        <div class="text-h6">密集列表</div>
        <q-list bordered dense class="rounded-borders">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="home" />
                </q-item-section>
                <q-item-section>首页</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="favorite" />
                </q-item-section>
                <q-item-section>收藏</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="settings" />
                </q-item-section>
                <q-item-section>设置</q-item-section>
            </q-item>
        </q-list>

        <q-separator />

        <div class="text-h6">带操作按钮的列表</div>
        <q-list bordered class="rounded-borders">
            <q-item>
                <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">张</q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>张三</q-item-label>
                    <q-item-label caption>刚刚上线</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <div class="row">
                        <q-btn flat round dense icon="message" color="primary" />
                        <q-btn flat round dense icon="more_vert" color="grey">
                            <q-menu>
                                <q-list dense>
                                    <q-item clickable v-close-popup>
                                        <q-item-section>查看资料</q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup>
                                        <q-item-section>删除</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </div>
                </q-item-section>
            </q-item>
        </q-list>

        <q-separator />

        <div class="text-h6">聊天列表示例</div>
        <q-list bordered class="rounded-borders" style="max-width: 400px">
            <q-item v-for="chat in chats" :key="chat.id" clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar>
                        <img :src="chat.avatar">
                        <q-badge v-if="chat.online" color="green" floating rounded />
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ chat.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ chat.lastMessage }}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                    <q-item-label caption>{{ chat.time }}</q-item-label>
                    <q-badge v-if="chat.unread" color="red" :label="chat.unread" />
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const chats = ref([
    {
        id: 1,
        name: '张三',
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
        lastMessage: '你好，最近怎么样？',
        time: '10:30',
        unread: 3,
        online: true
    },
    {
        id: 2,
        name: '李四',
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
        lastMessage: '会议改到明天下午',
        time: '昨天',
        unread: 0,
        online: false
    },
    {
        id: 3,
        name: '王五',
        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
        lastMessage: '文档已经发给你了',
        time: '周三',
        unread: 1,
        online: true
    },
])
</script>
