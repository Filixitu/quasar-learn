<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础对话框</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="基础对话框" @click="basicDialog = true" />
            <q-btn color="secondary" label="确认对话框" @click="showConfirm" />
            <q-btn color="positive" label="成功提示" @click="showSuccess" />
            <q-btn color="negative" label="错误提示" @click="showError" />
        </div>

        <!-- 基础对话框 -->
        <q-dialog v-model="basicDialog">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">基础对话框</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    这是一个简单的对话框示例，可以用来显示信息或收集用户输入。
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="取消" color="primary" v-close-popup />
                    <q-btn flat label="确定" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-separator />

        <div class="text-h6">表单对话框</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="登录对话框" @click="loginDialog = true" />
            <q-btn color="secondary" label="输入对话框" @click="promptDialog = true" />
        </div>

        <!-- 登录对话框 -->
        <q-dialog v-model="loginDialog">
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">用户登录</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input v-model="username" label="用户名" outlined dense />
                    <q-input v-model="password" label="密码" type="password" outlined dense class="q-mt-md" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="取消" color="grey" v-close-popup />
                    <q-btn flat label="登录" color="primary" @click="login" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- 输入对话框 -->
        <q-dialog v-model="promptDialog">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">请输入您的名字</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input v-model="inputName" label="名字" outlined autofocus />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="取消" color="grey" v-close-popup />
                    <q-btn flat label="确定" color="primary" @click="submitName" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-separator />

        <div class="text-h6">不同位置的对话框</div>
        <div class="q-gutter-sm">
            <q-btn label="顶部" @click="showPositionDialog('top')" />
            <q-btn label="右侧" @click="showPositionDialog('right')" />
            <q-btn label="底部" @click="showPositionDialog('bottom')" />
            <q-btn label="左侧" @click="showPositionDialog('left')" />
        </div>

        <q-dialog v-model="positionDialog" :position="dialogPosition">
            <q-card style="width: 350px">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{ dialogPosition }} 位置</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    这个对话框从{{ dialogPosition }}弹出。
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-separator />

        <div class="text-h6">全屏对话框</div>
        <q-btn color="purple" label="全屏对话框" @click="fullscreenDialog = true" />

        <q-dialog v-model="fullscreenDialog" full-width full-height>
            <q-card>
                <q-bar class="bg-primary text-white">
                    <q-icon name="image" />
                    <div>全屏对话框</div>
                    <q-space />
                    <q-btn dense flat icon="minimize" @click="fullscreenDialog = false">
                        <q-tooltip>最小化</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip>关闭</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h6">全屏内容</div>
                </q-card-section>

                <q-card-section>
                    这是一个全屏对话框，适合展示大量内容或复杂的交互界面。
                </q-card-section>

                <q-separator />

                <q-card-section style="min-height: 60vh">
                    <p v-for="i in 10" :key="i">
                        这是第 {{ i }} 段内容，用于演示滚动效果。
                    </p>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-separator />

        <div class="text-h6">自定义对话框</div>
        <div class="q-gutter-sm">
            <q-btn color="orange" label="无边框对话框" @click="seamlessDialog = true" />
            <q-btn color="teal" label="持久化对话框" @click="persistentDialog = true" />
        </div>

        <q-dialog v-model="seamlessDialog" seamless position="bottom">
            <q-card style="width: 350px">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">无缝对话框</div>
                </q-card-section>

                <q-card-section>
                    这个对话框没有背景遮罩。
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="关闭" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="persistentDialog" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">持久化对话框</div>
                </q-card-section>

                <q-card-section>
                    这个对话框不能通过点击外部关闭，必须点击按钮。
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="必须点这里关闭" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const basicDialog = ref(false)
const loginDialog = ref(false)
const promptDialog = ref(false)
const positionDialog = ref(false)
const fullscreenDialog = ref(false)
const seamlessDialog = ref(false)
const persistentDialog = ref(false)

const username = ref('')
const password = ref('')
const inputName = ref('')
const dialogPosition = ref('top')

function showConfirm() {
    $q.dialog({
        title: '确认',
        message: '您确定要执行此操作吗？',
        cancel: true,
        persistent: true
    }).onOk(() => {
        $q.notify('已确认')
    }).onCancel(() => {
        $q.notify('已取消')
    })
}

function showSuccess() {
    $q.dialog({
        title: '成功',
        message: '操作已成功完成！',
        color: 'positive'
    })
}

function showError() {
    $q.dialog({
        title: '错误',
        message: '发生了一个错误，请稍后重试。',
        color: 'negative'
    })
}

function login() {
    loginDialog.value = false
    $q.notify({
        message: `欢迎，${username.value}！`,
        color: 'positive'
    })
}

function submitName() {
    promptDialog.value = false
    $q.notify(`你好，${inputName.value}！`)
}

function showPositionDialog(position) {
    dialogPosition.value = position
    positionDialog.value = true
}
</script>
