<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础横幅</div>

        <q-banner class="bg-primary text-white">
            这是一条基础横幅消息，用于展示重要信息。
        </q-banner>

        <q-banner class="bg-orange text-white">
            <template v-slot:avatar>
                <q-icon name="warning" color="white" />
            </template>
            带图标的横幅消息，更加醒目。
        </q-banner>

        <q-separator />

        <div class="text-h6">带操作按钮的横幅</div>

        <q-banner class="bg-grey-3">
            <template v-slot:avatar>
                <q-icon name="signal_wifi_off" color="primary" />
            </template>
            您当前处于离线状态，某些功能可能无法使用。
            <template v-slot:action>
                <q-btn flat color="primary" label="重试" />
                <q-btn flat color="primary" label="忽略" />
            </template>
        </q-banner>

        <q-banner class="bg-primary text-white">
            我们使用 Cookie 来改善您的体验。
            <template v-slot:action>
                <q-btn flat color="white" label="接受" />
                <q-btn flat color="white" label="拒绝" />
            </template>
        </q-banner>

        <q-separator />

        <div class="text-h6">不同类型的横幅</div>

        <q-banner class="bg-positive text-white">
            <template v-slot:avatar>
                <q-icon name="check_circle" />
            </template>
            操作成功完成！
            <template v-slot:action>
                <q-btn flat color="white" label="关闭" @click="$q.notify('已关闭')" />
            </template>
        </q-banner>

        <q-banner class="bg-warning text-white">
            <template v-slot:avatar>
                <q-icon name="warning" />
            </template>
            请注意：您的试用期还剩 3 天。
            <template v-slot:action>
                <q-btn flat color="white" label="立即升级" />
            </template>
        </q-banner>

        <q-banner class="bg-negative text-white">
            <template v-slot:avatar>
                <q-icon name="error" />
            </template>
            发生错误，请稍后重试。
            <template v-slot:action>
                <q-btn flat color="white" label="详情" />
            </template>
        </q-banner>

        <q-banner class="bg-info text-white">
            <template v-slot:avatar>
                <q-icon name="info" />
            </template>
            系统将在今晚 22:00 进行维护，预计持续 2 小时。
            <template v-slot:action>
                <q-btn flat color="white" label="了解详情" />
            </template>
        </q-banner>

        <q-separator />

        <div class="text-h6">可关闭的横幅</div>

        <q-banner v-if="showBanner1" class="bg-primary text-white" dense>
            <template v-slot:avatar>
                <q-icon name="announcement" />
            </template>
            这是一条可以关闭的横幅消息。
            <template v-slot:action>
                <q-btn flat round dense icon="close" @click="showBanner1 = false" />
            </template>
        </q-banner>
        <q-btn v-else color="primary" label="重新显示横幅" @click="showBanner1 = true" />

        <q-separator />

        <div class="text-h6">内联横幅</div>

        <q-banner inline-actions class="bg-grey-3">
            <template v-slot:avatar>
                <q-icon name="cloud_upload" color="primary" />
            </template>
            有 3 个文件正在上传...
            <template v-slot:action>
                <q-btn flat color="primary" label="查看" />
                <q-btn flat color="primary" label="取消" />
            </template>
        </q-banner>

        <q-separator />

        <div class="text-h6">圆角横幅</div>

        <q-banner rounded class="bg-purple text-white">
            <template v-slot:avatar>
                <q-icon name="celebration" />
            </template>
            恭喜！您获得了一个新徽章。
            <template v-slot:action>
                <q-btn flat color="white" label="查看" />
            </template>
        </q-banner>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const showBanner1 = ref(true)
</script>
