<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础加载动画</div>
        <div class="q-gutter-md row items-center">
            <q-spinner color="primary" size="3em" />
            <q-spinner-audio color="primary" size="3em" />
            <q-spinner-ball color="primary" size="3em" />
            <q-spinner-bars color="primary" size="3em" />
            <q-spinner-box color="primary" size="3em" />
            <q-spinner-clock color="primary" size="3em" />
            <q-spinner-comment color="primary" size="3em" />
            <q-spinner-cube color="primary" size="3em" />
        </div>

        <q-separator />

        <div class="text-h6">更多加载样式</div>
        <div class="q-gutter-md row items-center">
            <q-spinner-dots color="primary" size="3em" />
            <q-spinner-facebook color="primary" size="3em" />
            <q-spinner-gears color="primary" size="3em" />
            <q-spinner-grid color="primary" size="3em" />
            <q-spinner-hearts color="primary" size="3em" />
            <q-spinner-hourglass color="primary" size="3em" />
            <q-spinner-infinity color="primary" size="3em" />
            <q-spinner-ios color="primary" size="3em" />
        </div>

        <q-separator />

        <div class="text-h6">其他加载样式</div>
        <div class="q-gutter-md row items-center">
            <q-spinner-orbit color="primary" size="3em" />
            <q-spinner-oval color="primary" size="3em" />
            <q-spinner-pie color="primary" size="3em" />
            <q-spinner-puff color="primary" size="3em" />
            <q-spinner-radio color="primary" size="3em" />
            <q-spinner-rings color="primary" size="3em" />
            <q-spinner-tail color="primary" size="3em" />
        </div>

        <q-separator />

        <div class="text-h6">不同颜色</div>
        <div class="q-gutter-md row items-center">
            <q-spinner-dots color="primary" size="3em" />
            <q-spinner-dots color="secondary" size="3em" />
            <q-spinner-dots color="positive" size="3em" />
            <q-spinner-dots color="negative" size="3em" />
            <q-spinner-dots color="warning" size="3em" />
            <q-spinner-dots color="info" size="3em" />
            <q-spinner-dots color="purple" size="3em" />
            <q-spinner-dots color="orange" size="3em" />
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸</div>
        <div class="q-gutter-md row items-center">
            <q-spinner-gears color="primary" size="1em" />
            <q-spinner-gears color="primary" size="2em" />
            <q-spinner-gears color="primary" size="3em" />
            <q-spinner-gears color="primary" size="4em" />
            <q-spinner-gears color="primary" size="5em" />
            <q-spinner-gears color="primary" size="6em" />
        </div>

        <q-separator />

        <div class="text-h6">像素尺寸</div>
        <div class="q-gutter-md row items-center">
            <q-spinner-hourglass color="primary" size="20px" />
            <q-spinner-hourglass color="primary" size="30px" />
            <q-spinner-hourglass color="primary" size="40px" />
            <q-spinner-hourglass color="primary" size="60px" />
            <q-spinner-hourglass color="primary" size="80px" />
            <q-spinner-hourglass color="primary" size="100px" />
        </div>

        <q-separator />

        <div class="text-h6">自定义粗细</div>
        <div class="q-gutter-md row items-center">
            <q-spinner color="primary" size="4em" :thickness="1" />
            <q-spinner color="primary" size="4em" :thickness="2" />
            <q-spinner color="primary" size="4em" :thickness="5" />
            <q-spinner color="primary" size="4em" :thickness="10" />
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <div class="q-gutter-md">
            <!-- 加载按钮 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">加载按钮</div>
                <q-btn color="primary" :loading="loading1" @click="simulateLoading1">
                    <template v-slot:loading>
                        <q-spinner-hourglass />
                    </template>
                    点击加载
                </q-btn>
            </div>

            <!-- 加载卡片 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">加载卡片</div>
                <q-card style="max-width: 300px">
                    <q-card-section v-if="!loading2">
                        <div class="text-h6">内容标题</div>
                        <p>这里是卡片内容...</p>
                    </q-card-section>
                    <q-card-section v-else class="flex flex-center" style="min-height: 150px">
                        <q-spinner-gears color="primary" size="3em" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn flat color="primary" @click="loading2 = !loading2">
                            {{ loading2 ? '停止加载' : '开始加载' }}
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>

            <!-- 全屏加载 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">全屏加载</div>
                <q-btn color="primary" label="显示全屏加载" @click="showFullscreenLoading" />
            </div>

            <!-- 内联加载 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">内联加载</div>
                <div class="row items-center q-gutter-sm">
                    <q-spinner-dots color="primary" />
                    <span>正在加载数据...</span>
                </div>
            </div>

            <!-- 列表加载 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">列表加载状态</div>
                <q-list bordered class="rounded-borders" style="max-width: 300px">
                    <q-item>
                        <q-item-section>项目 1</q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>项目 2</q-item-section>
                    </q-item>
                    <q-item v-if="loadingMore">
                        <q-item-section class="flex flex-center">
                            <q-spinner-dots color="primary" size="2em" />
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-btn flat color="primary" class="q-mt-sm" @click="loadingMore = !loadingMore">
                    {{ loadingMore ? '停止加载更多' : '加载更多' }}
                </q-btn>
            </div>

            <!-- 带文字的加载 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">带提示文字</div>
                <div class="text-center q-pa-md bg-grey-2 rounded-borders" style="max-width: 300px">
                    <q-spinner-orbit color="primary" size="4em" />
                    <div class="text-subtitle1 q-mt-md">正在处理...</div>
                    <div class="text-caption text-grey-7">请稍候，这可能需要几秒钟</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const loading1 = ref(false)
const loading2 = ref(false)
const loadingMore = ref(false)

function simulateLoading1() {
    loading1.value = true
    setTimeout(() => {
        loading1.value = false
        $q.notify({
            message: '加载完成！',
            color: 'positive'
        })
    }, 2000)
}

function showFullscreenLoading() {
    $q.loading.show({
        spinner: 'q-spinner-gears',
        spinnerColor: 'white',
        spinnerSize: 80,
        message: '正在加载，请稍候...',
        messageColor: 'white'
    })

    setTimeout(() => {
        $q.loading.hide()
        $q.notify({
            message: '加载完成！',
            color: 'positive'
        })
    }, 3000)
}
</script>
