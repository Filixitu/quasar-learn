<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础选项卡</div>
        <q-tabs v-model="tab1" class="text-grey" active-color="primary" indicator-color="primary">
            <q-tab name="home" label="首页" />
            <q-tab name="photos" label="照片" />
            <q-tab name="videos" label="视频" />
            <q-tab name="articles" label="文章" />
        </q-tabs>

        <q-tab-panels v-model="tab1" animated>
            <q-tab-panel name="home">
                <div class="text-h6">首页内容</div>
                <p>欢迎来到首页！</p>
            </q-tab-panel>

            <q-tab-panel name="photos">
                <div class="text-h6">照片内容</div>
                <p>这里显示照片相关内容。</p>
            </q-tab-panel>

            <q-tab-panel name="videos">
                <div class="text-h6">视频内容</div>
                <p>这里显示视频相关内容。</p>
            </q-tab-panel>

            <q-tab-panel name="articles">
                <div class="text-h6">文章内容</div>
                <p>这里显示文章相关内容。</p>
            </q-tab-panel>
        </q-tab-panels>

        <q-separator />

        <div class="text-h6">带图标的选项卡</div>
        <q-tabs v-model="tab2" active-color="primary">
            <q-tab name="home" icon="home" label="首页" />
            <q-tab name="favorite" icon="favorite" label="收藏" />
            <q-tab name="person" icon="person" label="个人" />
            <q-tab name="settings" icon="settings" label="设置" />
        </q-tabs>

        <q-separator />

        <div class="text-h6">仅图标选项卡</div>
        <q-tabs v-model="tab3" active-color="secondary">
            <q-tab name="home" icon="home" />
            <q-tab name="favorite" icon="favorite" />
            <q-tab name="person" icon="person" />
            <q-tab name="alarm" icon="alarm" />
            <q-tab name="help" icon="help" />
        </q-tabs>

        <q-separator />

        <div class="text-h6">垂直选项卡</div>
        <div class="row">
            <q-tabs v-model="tab4" vertical active-color="primary" class="col-3">
                <q-tab name="tab1" icon="mail" label="邮件" />
                <q-tab name="tab2" icon="alarm" label="闹钟" />
                <q-tab name="tab3" icon="movie" label="电影" />
                <q-tab name="tab4" icon="directions" label="导航" />
            </q-tabs>

            <q-tab-panels v-model="tab4" animated vertical class="col bg-grey-1">
                <q-tab-panel name="tab1">
                    <div class="text-h6">邮件</div>
                    邮件相关内容
                </q-tab-panel>
                <q-tab-panel name="tab2">
                    <div class="text-h6">闹钟</div>
                    闹钟相关内容
                </q-tab-panel>
                <q-tab-panel name="tab3">
                    <div class="text-h6">电影</div>
                    电影相关内容
                </q-tab-panel>
                <q-tab-panel name="tab4">
                    <div class="text-h6">导航</div>
                    导航相关内容
                </q-tab-panel>
            </q-tab-panels>
        </div>

        <q-separator />

        <div class="text-h6">不同样式的选项卡</div>

        <div class="q-gutter-md">
            <div>
                <div class="text-subtitle2">对齐方式</div>
                <q-tabs v-model="tab5" align="left">
                    <q-tab name="left" label="左对齐" />
                    <q-tab name="center" label="中间" />
                    <q-tab name="right" label="右对齐" />
                </q-tabs>
            </div>

            <div>
                <div class="text-subtitle2">居中对齐</div>
                <q-tabs v-model="tab6" align="center">
                    <q-tab name="tab1" label="选项1" />
                    <q-tab name="tab2" label="选项2" />
                    <q-tab name="tab3" label="选项3" />
                </q-tabs>
            </div>

            <div>
                <div class="text-subtitle2">铺满宽度</div>
                <q-tabs v-model="tab7" stretch>
                    <q-tab name="tab1" label="选项1" />
                    <q-tab name="tab2" label="选项2" />
                    <q-tab name="tab3" label="选项3" />
                </q-tabs>
            </div>

            <div>
                <div class="text-subtitle2">窄边距</div>
                <q-tabs v-model="tab8" narrow-indicator>
                    <q-tab name="tab1" label="选项1" />
                    <q-tab name="tab2" label="选项2" />
                    <q-tab name="tab3" label="选项3" />
                </q-tabs>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">带徽章的选项卡</div>
        <q-tabs v-model="tab9" active-color="primary">
            <q-tab name="messages">
                <div class="row items-center no-wrap">
                    <q-icon name="message" class="q-mr-sm" />
                    <div>消息</div>
                    <q-badge color="red" floating>5</q-badge>
                </div>
            </q-tab>
            <q-tab name="notifications">
                <div class="row items-center no-wrap">
                    <q-icon name="notifications" class="q-mr-sm" />
                    <div>通知</div>
                    <q-badge color="red" floating>12</q-badge>
                </div>
            </q-tab>
            <q-tab name="updates">
                <div class="row items-center no-wrap">
                    <q-icon name="update" class="q-mr-sm" />
                    <div>更新</div>
                    <q-badge color="orange" floating>NEW</q-badge>
                </div>
            </q-tab>
        </q-tabs>

        <q-separator />

        <div class="text-h6">密集选项卡</div>
        <q-tabs v-model="tab10" dense active-color="primary">
            <q-tab name="tab1" label="选项1" />
            <q-tab name="tab2" label="选项2" />
            <q-tab name="tab3" label="选项3" />
            <q-tab name="tab4" label="选项4" />
            <q-tab name="tab5" label="选项5" />
        </q-tabs>

        <q-separator />

        <div class="text-h6">卡片中的选项卡</div>
        <q-card>
            <q-tabs v-model="tab11" class="bg-primary text-white" active-color="white" indicator-color="white">
                <q-tab name="overview" icon="dashboard" label="概览" />
                <q-tab name="analytics" icon="analytics" label="分析" />
                <q-tab name="settings" icon="settings" label="设置" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab11" animated>
                <q-tab-panel name="overview">
                    <div class="text-h6">概览</div>
                    这里显示系统概览信息
                </q-tab-panel>

                <q-tab-panel name="analytics">
                    <div class="text-h6">分析</div>
                    这里显示数据分析内容
                </q-tab-panel>

                <q-tab-panel name="settings">
                    <div class="text-h6">设置</div>
                    这里显示系统设置选项
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const tab1 = ref('home')
const tab2 = ref('home')
const tab3 = ref('home')
const tab4 = ref('tab1')
const tab5 = ref('left')
const tab6 = ref('tab1')
const tab7 = ref('tab1')
const tab8 = ref('tab1')
const tab9 = ref('messages')
const tab10 = ref('tab1')
const tab11 = ref('overview')
</script>
