<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础开关</div>
        <div class="q-gutter-sm">
            <q-toggle v-model="toggle1" label="开关 1" />
            <q-toggle v-model="toggle2" label="开关 2" />
            <q-toggle v-model="toggle3" label="开关 3" />
        </div>

        <q-separator />

        <div class="text-h6">不同颜色</div>
        <div class="q-gutter-sm">
            <q-toggle v-model="toggle4" label="主要色" color="primary" />
            <q-toggle v-model="toggle4" label="次要色" color="secondary" />
            <q-toggle v-model="toggle4" label="成功" color="positive" />
            <q-toggle v-model="toggle4" label="警告" color="warning" />
            <q-toggle v-model="toggle4" label="错误" color="negative" />
            <q-toggle v-model="toggle4" label="紫色" color="purple" />
            <q-toggle v-model="toggle4" label="橙色" color="orange" />
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸</div>
        <div class="q-gutter-sm row items-center">
            <q-toggle v-model="toggle5" label="超小" size="xs" />
            <q-toggle v-model="toggle5" label="小" size="sm" />
            <q-toggle v-model="toggle5" label="中" size="md" />
            <q-toggle v-model="toggle5" label="大" size="lg" />
            <q-toggle v-model="toggle5" label="超大" size="xl" />
        </div>

        <q-separator />

        <div class="text-h6">自定义图标</div>
        <div class="q-gutter-sm">
            <q-toggle v-model="icon1" label="勾选" icon="check" color="positive" />
            <q-toggle v-model="icon2" label="星星" checked-icon="star" unchecked-icon="star_border" color="orange" />
            <q-toggle v-model="icon3" label="喜欢" checked-icon="favorite" unchecked-icon="favorite_border" color="red" />
            <q-toggle v-model="icon4" label="可见" checked-icon="visibility" unchecked-icon="visibility_off"
                color="blue" />
            <q-toggle v-model="icon5" label="音量" checked-icon="volume_up" unchecked-icon="volume_off" color="purple" />
        </div>

        <q-separator />

        <div class="text-h6">开关状态</div>
        <div class="q-gutter-sm">
            <q-toggle v-model="status1" label="正常状态" />
            <q-toggle v-model="status2" label="禁用关闭" disable />
            <q-toggle v-model="status3" label="禁用开启" disable />
            <q-toggle v-model="status4" label="深色模式" dark class="bg-grey-8 q-pa-sm" />
        </div>

        <q-separator />

        <div class="text-h6">左侧标签</div>
        <div class="q-gutter-sm">
            <q-toggle v-model="left1" label="左侧标签 1" left-label />
            <q-toggle v-model="left2" label="左侧标签 2" left-label />
        </div>

        <q-separator />

        <div class="text-h6">密集模式</div>
        <div>
            <q-toggle v-model="dense1" label="密集选项 1" dense />
            <q-toggle v-model="dense2" label="密集选项 2" dense />
            <q-toggle v-model="dense3" label="密集选项 3" dense />
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <!-- 系统设置 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">系统设置</div>
            <q-card style="max-width: 600px">
                <q-list>
                    <q-item tag="label">
                        <q-item-section avatar>
                            <q-icon name="notifications" color="primary" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>推送通知</q-item-label>
                            <q-item-label caption>接收系统消息推送</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="settings.notifications" color="primary" />
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item tag="label">
                        <q-item-section avatar>
                            <q-icon name="email" color="blue" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>邮件提醒</q-item-label>
                            <q-item-label caption>接收邮件通知</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="settings.emailNotifications" color="blue" />
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item tag="label">
                        <q-item-section avatar>
                            <q-icon name="vibration" color="orange" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>震动反馈</q-item-label>
                            <q-item-label caption>触摸时震动</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="settings.vibration" color="orange" />
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item tag="label">
                        <q-item-section avatar>
                            <q-icon name="volume_up" color="purple" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>声音</q-item-label>
                            <q-item-label caption>开启提示音</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="settings.sound" color="purple" />
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item tag="label">
                        <q-item-section avatar>
                            <q-icon name="dark_mode" color="grey-8" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>深色模式</q-item-label>
                            <q-item-label caption>启用深色主题</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="settings.darkMode" color="grey-8" @update:model-value="toggleDarkMode" />
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item tag="label">
                        <q-item-section avatar>
                            <q-icon name="location_on" color="red" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>定位服务</q-item-label>
                            <q-item-label caption>允许访问位置信息</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-toggle v-model="settings.location" color="red" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
        </div>

        <!-- 隐私设置 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">隐私设置</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="text-h6 q-mb-md">账户隐私</div>
                    <div class="q-gutter-md">
                        <div class="row items-center justify-between">
                            <div>
                                <div class="text-subtitle1">个人资料公开</div>
                                <div class="text-caption text-grey-7">允许其他用户查看您的个人资料</div>
                            </div>
                            <q-toggle v-model="privacy.publicProfile" color="primary" />
                        </div>

                        <q-separator />

                        <div class="row items-center justify-between">
                            <div>
                                <div class="text-subtitle1">显示在线状态</div>
                                <div class="text-caption text-grey-7">让好友看到您的在线状态</div>
                            </div>
                            <q-toggle v-model="privacy.onlineStatus" color="positive" />
                        </div>

                        <q-separator />

                        <div class="row items-center justify-between">
                            <div>
                                <div class="text-subtitle1">允许陌生人消息</div>
                                <div class="text-caption text-grey-7">接收非好友的消息</div>
                            </div>
                            <q-toggle v-model="privacy.strangerMessages" color="warning" />
                        </div>

                        <q-separator />

                        <div class="row items-center justify-between">
                            <div>
                                <div class="text-subtitle1">数据同步</div>
                                <div class="text-caption text-grey-7">自动同步数据到云端</div>
                            </div>
                            <q-toggle v-model="privacy.dataSync" color="blue" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- 功能开关 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">功能开关</div>
            <q-card style="max-width: 800px">
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-6">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="row items-center justify-between">
                                        <div class="row items-center q-gutter-sm">
                                            <q-icon name="cloud_upload" size="32px" color="primary" />
                                            <div>
                                                <div class="text-subtitle1">自动上传</div>
                                                <div class="text-caption text-grey-7">自动备份照片</div>
                                            </div>
                                        </div>
                                        <q-toggle v-model="features.autoUpload" color="primary" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col-12 col-sm-6">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="row items-center justify-between">
                                        <div class="row items-center q-gutter-sm">
                                            <q-icon name="wifi" size="32px" color="blue" />
                                            <div>
                                                <div class="text-subtitle1">WiFi 同步</div>
                                                <div class="text-caption text-grey-7">仅在 WiFi 下同步</div>
                                            </div>
                                        </div>
                                        <q-toggle v-model="features.wifiSync" color="blue" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col-12 col-sm-6">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="row items-center justify-between">
                                        <div class="row items-center q-gutter-sm">
                                            <q-icon name="battery_saver" size="32px" color="green" />
                                            <div>
                                                <div class="text-subtitle1">省电模式</div>
                                                <div class="text-caption text-grey-7">降低性能节省电量</div>
                                            </div>
                                        </div>
                                        <q-toggle v-model="features.batterySaver" color="green" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <div class="col-12 col-sm-6">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="row items-center justify-between">
                                        <div class="row items-center q-gutter-sm">
                                            <q-icon name="update" size="32px" color="orange" />
                                            <div>
                                                <div class="text-subtitle1">自动更新</div>
                                                <div class="text-caption text-grey-7">自动检查更新</div>
                                            </div>
                                        </div>
                                        <q-toggle v-model="features.autoUpdate" color="orange" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- 权限管理 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">应用权限</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="text-subtitle2 q-mb-md text-grey-7">
                        管理应用可以访问的设备功能和数据
                    </div>
                    <q-list>
                        <q-item v-for="permission in permissions" :key="permission.id">
                            <q-item-section avatar>
                                <q-avatar :icon="permission.icon" :color="permission.granted ? 'positive' : 'grey-5'"
                                    text-color="white" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ permission.label }}</q-item-label>
                                <q-item-label caption>{{ permission.description }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-toggle v-model="permission.granted" :color="permission.granted ? 'positive' : 'grey'"
                                    @update:model-value="(val) => handlePermission(permission, val)" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
            </q-card>
        </div>

        <!-- 快捷设置面板 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">快捷设置</div>
            <q-card style="max-width: 400px" class="bg-grey-9 text-white">
                <q-card-section>
                    <div class="row q-col-gutter-sm">
                        <div class="col-6" v-for="quick in quickSettings" :key="quick.id">
                            <q-card flat :class="quick.enabled ? 'bg-primary' : 'bg-grey-7'" class="cursor-pointer"
                                @click="quick.enabled = !quick.enabled">
                                <q-card-section class="text-center q-pa-sm">
                                    <q-icon :name="quick.icon" size="32px" />
                                    <div class="text-caption q-mt-xs">{{ quick.label }}</div>
                                    <div class="absolute-top-right q-pa-xs">
                                        <q-toggle v-model="quick.enabled" size="xs" color="white" dark dense />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const toggle1 = ref(true)
const toggle2 = ref(false)
const toggle3 = ref(true)
const toggle4 = ref(true)
const toggle5 = ref(true)

const icon1 = ref(true)
const icon2 = ref(false)
const icon3 = ref(true)
const icon4 = ref(false)
const icon5 = ref(true)

const status1 = ref(true)
const status2 = ref(false)
const status3 = ref(true)
const status4 = ref(true)

const left1 = ref(false)
const left2 = ref(true)

const dense1 = ref(false)
const dense2 = ref(true)
const dense3 = ref(false)

// 系统设置
const settings = ref({
    notifications: true,
    emailNotifications: false,
    vibration: true,
    sound: true,
    darkMode: false,
    location: true,
})

function toggleDarkMode(val) {
    $q.dark.set(val)
    $q.notify({
        message: val ? '已启用深色模式' : '已关闭深色模式',
        color: val ? 'grey-8' : 'primary'
    })
}

// 隐私设置
const privacy = ref({
    publicProfile: true,
    onlineStatus: true,
    strangerMessages: false,
    dataSync: true,
})

// 功能开关
const features = ref({
    autoUpload: true,
    wifiSync: true,
    batterySaver: false,
    autoUpdate: true,
})

// 权限管理
const permissions = ref([
    { id: 1, label: '相机', description: '拍照和录制视频', icon: 'camera_alt', granted: true },
    { id: 2, label: '麦克风', description: '录制音频', icon: 'mic', granted: true },
    { id: 3, label: '位置', description: '访问精确位置', icon: 'location_on', granted: false },
    { id: 4, label: '通讯录', description: '读取联系人', icon: 'contacts', granted: false },
    { id: 5, label: '存储', description: '读写文件', icon: 'storage', granted: true },
    { id: 6, label: '通知', description: '显示通知', icon: 'notifications', granted: true },
])

function handlePermission(permission, granted) {
    $q.notify({
        message: `${permission.label}权限已${granted ? '开启' : '关闭'}`,
        color: granted ? 'positive' : 'grey'
    })
}

// 快捷设置
const quickSettings = ref([
    { id: 1, label: 'WiFi', icon: 'wifi', enabled: true },
    { id: 2, label: '蓝牙', icon: 'bluetooth', enabled: false },
    { id: 3, label: '飞行模式', icon: 'flight', enabled: false },
    { id: 4, label: '勿扰模式', icon: 'do_not_disturb', enabled: false },
    { id: 5, label: '自动旋转', icon: 'screen_rotation', enabled: true },
    { id: 6, label: '手电筒', icon: 'flashlight_on', enabled: false },
])
</script>
