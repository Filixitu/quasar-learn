<!--
🎯 Input 输入框组件演示 - 表单的核心组件

📚 学习目标：
1. 掌握输入框的5种视觉样式
2. 理解表单验证规则的编写
3. 学会处理不同类型的输入
4. 掌握图标和清除功能的使用
5. 理解输入框状态管理

💡 核心样式：
- outlined: 轮廓样式（推荐，最清晰）
- filled: 填充样式（Material Design）
- standout: 独立样式（突出显示）
- borderless: 无边框样式（简洁）
- 默认: 底部线条样式

🎯 验证规则编写：
rules: [
  val => !!val || '必填验证',
  val => val.length >= 3 || '长度验证',
  val => /regex/.test(val) || '格式验证'
]

💼 实际应用价值：
- 用户注册登录表单
- 商品信息编辑
- 搜索和筛选输入
- 数据录入系统

🔑 最佳实践：
1. 必填项标记 * 号
2. 提供 hint 提示信息
3. 错误信息要友好清晰
4. 合理使用 clearable 清除功能
-->

<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础输入框</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="text1" label="标准输入框" />
            <q-input v-model="text2" label="填充样式" filled />
            <q-input v-model="text3" label="轮廓样式" outlined />
            <q-input v-model="text4" label="无边框" borderless />
            <q-input v-model="text5" label="独立标签" standout />
        </div>

        <q-separator />

        <div class="text-h6">带图标的输入框</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="search" label="搜索" outlined>
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>

            <q-input v-model="email" label="邮箱" outlined>
                <template v-slot:prepend>
                    <q-icon name="email" />
                </template>
                <template v-slot:append>
                    <q-icon name="close" @click="email = ''" class="cursor-pointer" />
                </template>
            </q-input>

            <q-input v-model="password1" :type="isPwd ? 'password' : 'text'" label="密码" outlined>
                <template v-slot:prepend>
                    <q-icon name="lock" />
                </template>
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
            </q-input>
        </div>

        <q-separator />

        <div class="text-h6">不同类型的输入</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="textInput" type="text" label="文本" outlined />
            <q-input v-model="numberInput" type="number" label="数字" outlined />
            <q-input v-model="emailInput" type="email" label="邮箱地址" outlined />
            <q-input v-model="urlInput" type="url" label="网址" outlined />
            <q-input v-model="telInput" type="tel" label="电话" outlined />
            <q-input v-model="dateInput" type="date" label="日期" outlined />
            <q-input v-model="timeInput" type="time" label="时间" outlined />
        </div>

        <q-separator />

        <div class="text-h6">文本域</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="textarea1" type="textarea" label="基础文本域" outlined />
            <q-input v-model="textarea2" type="textarea" label="自动增长" outlined autogrow />
            <q-input v-model="textarea3" type="textarea" label="限制 3-5 行" outlined
                :input-style="{ minHeight: '60px', maxHeight: '100px' }" />
        </div>

        <q-separator />

        <div class="text-h6">验证与提示</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="validationInput1" label="必填项 *" outlined
                :rules="[val => val && val.length > 0 || '请输入内容']" />

            <q-input v-model="validationInput2" label="邮箱验证" outlined :rules="[
                val => val && val.length > 0 || '请输入邮箱',
                val => /.+@.+\..+/.test(val) || '邮箱格式不正确'
            ]" />

            <q-input v-model="validationInput3" label="最小长度 5" outlined
                :rules="[val => val && val.length >= 5 || '至少需要 5 个字符']" hint="请输入至少 5 个字符" />

            <q-input v-model="validationInput4" label="带底部提示" outlined hint="这是一个提示信息" counter maxlength="20" />
        </div>

        <q-separator />

        <div class="text-h6">输入框状态</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="text6" label="正常状态" outlined />
            <q-input v-model="text7" label="禁用状态" outlined disable />
            <q-input v-model="text8" label="只读状态" outlined readonly />
            <q-input v-model="text9" label="加载状态" outlined loading />
        </div>

        <q-separator />

        <div class="text-h6">输入框尺寸</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="size1" label="密集" outlined dense />
            <q-input v-model="size2" label="正常" outlined />
        </div>

        <q-separator />

        <div class="text-h6">特殊功能</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="clearableInput" label="可清除" outlined clearable />

            <q-input v-model="maskInput" label="电话号码掩码" outlined mask="(###) ### - ####"
                hint="Mask: (###) ### - ####" />

            <q-input v-model="prefixInput" label="带前后缀" outlined prefix="$" suffix="USD" type="number" />

            <q-input v-model="autoCompleteInput" label="自动聚焦" outlined autofocus placeholder="自动获得焦点" />
        </div>

        <q-separator />

        <div class="text-h6">表单示例</div>
        <q-card style="max-width: 500px">
            <q-card-section>
                <div class="text-h6">用户注册</div>
            </q-card-section>
            <q-card-section class="q-gutter-md">
                <q-input v-model="formName" label="用户名 *" outlined />
                <q-input v-model="formEmail" type="email" label="邮箱 *" outlined />
                <q-input v-model="formPassword" type="password" label="密码 *" outlined />
                <q-input v-model="formPhone" label="电话" outlined mask="### #### ####" />
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="取消" />
                <q-btn color="primary" label="注册" @click="submitForm" />
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 基础输入框
const text1 = ref('')
const text2 = ref('')
const text3 = ref('')
const text4 = ref('')
const text5 = ref('')
const text6 = ref('正常状态')
const text7 = ref('禁用状态')
const text8 = ref('只读状态')
const text9 = ref('加载中...')

// 带图标
const search = ref('')
const email = ref('')
const password1 = ref('')
const isPwd = ref(true)

// 不同类型
const textInput = ref('')
const numberInput = ref(null)
const emailInput = ref('')
const urlInput = ref('')
const telInput = ref('')
const dateInput = ref('')
const timeInput = ref('')

// 文本域
const textarea1 = ref('')
const textarea2 = ref('')
const textarea3 = ref('')

// 验证
const validationInput1 = ref('')
const validationInput2 = ref('')
const validationInput3 = ref('')
const validationInput4 = ref('')

// 尺寸
const size1 = ref('')
const size2 = ref('')

// 特殊功能
const clearableInput = ref('')
const maskInput = ref('')
const prefixInput = ref('')
const autoCompleteInput = ref('')

// 表单
const formName = ref('')
const formEmail = ref('')
const formPassword = ref('')
const formPhone = ref('')

function submitForm() {
    $q.notify({
        message: '注册成功！',
        color: 'positive'
    })
}
</script>
