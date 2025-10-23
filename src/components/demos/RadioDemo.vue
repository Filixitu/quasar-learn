<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础单选框</div>
        <div class="q-gutter-sm">
            <q-radio v-model="shape" val="line" label="直线" />
            <q-radio v-model="shape" val="rectangle" label="矩形" />
            <q-radio v-model="shape" val="ellipse" label="椭圆" />
            <q-radio v-model="shape" val="polygon" label="多边形" />
        </div>
        <div class="text-caption text-grey-7">已选择: {{ shape }}</div>

        <q-separator />

        <div class="text-h6">不同颜色</div>
        <div class="q-gutter-sm">
            <q-radio v-model="color1" val="primary" label="主要色" color="primary" />
            <q-radio v-model="color1" val="secondary" label="次要色" color="secondary" />
            <q-radio v-model="color1" val="positive" label="成功" color="positive" />
            <q-radio v-model="color1" val="warning" label="警告" color="warning" />
            <q-radio v-model="color1" val="negative" label="错误" color="negative" />
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸</div>
        <div class="q-gutter-sm row items-center">
            <q-radio v-model="size" val="xs" label="超小" size="xs" />
            <q-radio v-model="size" val="sm" label="小" size="sm" />
            <q-radio v-model="size" val="md" label="中" size="md" />
            <q-radio v-model="size" val="lg" label="大" size="lg" />
            <q-radio v-model="size" val="xl" label="超大" size="xl" />
        </div>

        <q-separator />

        <div class="text-h6">单选框状态</div>
        <div class="q-gutter-sm">
            <q-radio v-model="status1" val="normal" label="正常状态" />
            <q-radio v-model="status2" val="disabled" label="禁用未选中" disable />
            <q-radio v-model="status3" val="disabled" label="禁用已选中" disable />
            <q-radio v-model="status4" val="dark" label="深色背景" dark class="bg-grey-8 q-pa-sm" />
        </div>

        <q-separator />

        <div class="text-h6">密集模式</div>
        <div>
            <q-radio v-model="dense" val="option1" label="密集选项 1" dense />
            <q-radio v-model="dense" val="option2" label="密集选项 2" dense />
            <q-radio v-model="dense" val="option3" label="密集选项 3" dense />
        </div>

        <q-separator />

        <div class="text-h6">左侧标签</div>
        <div class="q-gutter-sm">
            <q-radio v-model="leftLabel" val="left1" label="左侧标签 1" left-label />
            <q-radio v-model="leftLabel" val="left2" label="左侧标签 2" left-label />
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <!-- 支付方式选择 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">支付方式</div>
            <q-card style="max-width: 500px">
                <q-card-section>
                    <div class="text-h6 q-mb-md">选择支付方式</div>
                    <q-list>
                        <q-item tag="label">
                            <q-item-section side top>
                                <q-radio v-model="paymentMethod" val="alipay" />
                            </q-item-section>
                            <q-item-section avatar>
                                <q-avatar color="blue" text-color="white" icon="account_balance_wallet" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>支付宝</q-item-label>
                                <q-item-label caption>支持花呗分期</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator />

                        <q-item tag="label">
                            <q-item-section side top>
                                <q-radio v-model="paymentMethod" val="wechat" />
                            </q-item-section>
                            <q-item-section avatar>
                                <q-avatar color="green" text-color="white" icon="chat" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>微信支付</q-item-label>
                                <q-item-label caption>快速便捷</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator />

                        <q-item tag="label">
                            <q-item-section side top>
                                <q-radio v-model="paymentMethod" val="card" />
                            </q-item-section>
                            <q-item-section avatar>
                                <q-avatar color="orange" text-color="white" icon="credit_card" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>银行卡</q-item-label>
                                <q-item-label caption>储蓄卡或信用卡</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator />

                        <q-item tag="label">
                            <q-item-section side top>
                                <q-radio v-model="paymentMethod" val="balance" />
                            </q-item-section>
                            <q-item-section avatar>
                                <q-avatar color="purple" text-color="white" icon="account_balance" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>账户余额</q-item-label>
                                <q-item-label caption>当前余额: ¥1,234.56</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="取消" />
                    <q-btn color="primary" label="确认支付" @click="confirmPayment" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- 配送方式 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">配送方式</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <q-option-group v-model="deliveryMethod" :options="deliveryOptions" color="primary">
                        <template v-slot:label="opt">
                            <div class="row items-center full-width">
                                <div class="col">
                                    <div class="text-subtitle1">{{ opt.label }}</div>
                                    <div class="text-caption text-grey-7">{{ opt.description }}</div>
                                </div>
                                <div class="col-auto">
                                    <q-badge :color="opt.free ? 'positive' : 'grey'" :label="opt.price" />
                                </div>
                            </div>
                        </template>
                    </q-option-group>
                </q-card-section>
            </q-card>
        </div>

        <!-- 订阅计划 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">选择订阅计划</div>
            <q-card style="max-width: 800px">
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div v-for="plan in plans" :key="plan.id" class="col-12 col-sm-4">
                            <q-card flat bordered :class="selectedPlan === plan.id ? 'bg-blue-1 border-primary' : ''"
                                class="cursor-pointer full-height" @click="selectedPlan = plan.id">
                                <q-card-section>
                                    <div class="row items-center justify-between q-mb-md">
                                        <div class="text-h6">{{ plan.name }}</div>
                                        <q-radio v-model="selectedPlan" :val="plan.id" />
                                    </div>
                                    <div class="text-h4 text-primary">{{ plan.price }}</div>
                                    <div class="text-caption text-grey-7 q-mb-md">{{ plan.period }}</div>
                                    <q-separator />
                                    <div class="q-mt-md">
                                        <div v-for="(feature, index) in plan.features" :key="index" class="q-mb-xs">
                                            <q-icon name="check" color="positive" size="xs" />
                                            {{ feature }}
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn color="primary" label="订阅" @click="subscribe" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- 问卷调查 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">用户调查问卷</div>
            <q-card style="max-width: 700px">
                <q-card-section>
                    <div class="q-gutter-lg">
                        <div>
                            <div class="text-subtitle1 q-mb-md">1. 您的年龄段？</div>
                            <q-option-group v-model="survey.age" :options="ageOptions" color="primary" />
                        </div>

                        <q-separator />

                        <div>
                            <div class="text-subtitle1 q-mb-md">2. 您使用我们产品的频率？</div>
                            <q-option-group v-model="survey.frequency" :options="frequencyOptions" color="primary" />
                        </div>

                        <q-separator />

                        <div>
                            <div class="text-subtitle1 q-mb-md">3. 您对我们产品的满意度？</div>
                            <q-option-group v-model="survey.satisfaction" :options="satisfactionOptions" color="primary"
                                inline />
                        </div>

                        <q-separator />

                        <div>
                            <div class="text-subtitle1 q-mb-md">4. 您更喜欢哪种界面风格？</div>
                            <div class="row q-col-gutter-md">
                                <div v-for="theme in themes" :key="theme.value" class="col-6 col-sm-3">
                                    <q-card flat bordered
                                        :class="survey.theme === theme.value ? 'bg-primary text-white' : ''"
                                        class="cursor-pointer text-center" @click="survey.theme = theme.value">
                                        <q-card-section>
                                            <q-icon :name="theme.icon" size="48px" />
                                            <div class="q-mt-sm">{{ theme.label }}</div>
                                            <q-radio v-model="survey.theme" :val="theme.value"
                                                :color="survey.theme === theme.value ? 'white' : 'primary'"
                                                class="q-mt-sm" />
                                        </q-card-section>
                                    </q-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="清空" @click="resetSurvey" />
                    <q-btn color="primary" label="提交" @click="submitSurvey" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- 性别选择 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">个人信息</div>
            <q-card style="max-width: 500px">
                <q-card-section class="q-gutter-md">
                    <div>
                        <div class="text-subtitle2 q-mb-sm">性别</div>
                        <q-option-group v-model="gender" :options="genderOptions" color="primary" inline />
                    </div>

                    <div>
                        <div class="text-subtitle2 q-mb-sm">学历</div>
                        <q-option-group v-model="education" :options="educationOptions" color="primary" />
                    </div>

                    <div>
                        <div class="text-subtitle2 q-mb-sm">工作经验</div>
                        <q-option-group v-model="experience" :options="experienceOptions" color="primary" />
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

const shape = ref('line')
const color1 = ref('primary')
const size = ref('md')
const status1 = ref('normal')
const status2 = ref(null)
const status3 = ref('disabled')
const status4 = ref('dark')
const dense = ref('option1')
const leftLabel = ref('left1')

// 支付方式
const paymentMethod = ref('alipay')

function confirmPayment() {
    $q.notify({
        message: `使用${paymentMethod.value === 'alipay' ? '支付宝' : paymentMethod.value === 'wechat' ? '微信' : paymentMethod.value === 'card' ? '银行卡' : '余额'}支付`,
        color: 'positive'
    })
}

// 配送方式
const deliveryMethod = ref('standard')
const deliveryOptions = [
    {
        value: 'standard',
        label: '标准配送',
        description: '预计 3-5 个工作日送达',
        price: '免运费',
        free: true
    },
    {
        value: 'express',
        label: '快速配送',
        description: '预计 1-2 个工作日送达',
        price: '+¥10',
        free: false
    },
    {
        value: 'same-day',
        label: '当日送达',
        description: '今天下单，今天送达',
        price: '+¥25',
        free: false
    },
]

// 订阅计划
const selectedPlan = ref('basic')
const plans = [
    {
        id: 'basic',
        name: '基础版',
        price: '免费',
        period: '永久免费',
        features: ['基础功能', '5GB 存储', '邮件支持']
    },
    {
        id: 'pro',
        name: '专业版',
        price: '¥99/月',
        period: '按月付费',
        features: ['所有基础功能', '100GB 存储', '优先支持', '高级分析']
    },
    {
        id: 'enterprise',
        name: '企业版',
        price: '¥999/月',
        period: '按月付费',
        features: ['所有专业功能', '无限存储', '24/7 支持', '定制开发']
    },
]

function subscribe() {
    const plan = plans.find(p => p.id === selectedPlan.value)
    $q.notify({
        message: `已订阅${plan.name}`,
        color: 'positive'
    })
}

// 问卷
const survey = ref({
    age: null,
    frequency: null,
    satisfaction: null,
    theme: null,
})

const ageOptions = [
    { label: '18岁以下', value: 'under18' },
    { label: '18-25岁', value: '18-25' },
    { label: '26-35岁', value: '26-35' },
    { label: '36-45岁', value: '36-45' },
    { label: '46岁以上', value: 'over46' },
]

const frequencyOptions = [
    { label: '每天', value: 'daily' },
    { label: '每周几次', value: 'weekly' },
    { label: '每月几次', value: 'monthly' },
    { label: '很少使用', value: 'rarely' },
]

const satisfactionOptions = [
    { label: '非常满意', value: '5' },
    { label: '满意', value: '4' },
    { label: '一般', value: '3' },
    { label: '不满意', value: '2' },
    { label: '非常不满意', value: '1' },
]

const themes = [
    { label: '现代', value: 'modern', icon: 'brush' },
    { label: '经典', value: 'classic', icon: 'palette' },
    { label: '简约', value: 'minimal', icon: 'grid_on' },
    { label: '深色', value: 'dark', icon: 'dark_mode' },
]

function resetSurvey() {
    survey.value = {
        age: null,
        frequency: null,
        satisfaction: null,
        theme: null,
    }
}

function submitSurvey() {
    $q.notify({
        message: '问卷提交成功，感谢您的参与！',
        color: 'positive'
    })
}

// 个人信息
const gender = ref('male')
const education = ref('bachelor')
const experience = ref('3-5')

const genderOptions = [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
    { label: '其他', value: 'other' },
]

const educationOptions = [
    { label: '高中及以下', value: 'high-school' },
    { label: '大专', value: 'associate' },
    { label: '本科', value: 'bachelor' },
    { label: '硕士', value: 'master' },
    { label: '博士', value: 'phd' },
]

const experienceOptions = [
    { label: '应届生', value: 'fresh' },
    { label: '1-3年', value: '1-3' },
    { label: '3-5年', value: '3-5' },
    { label: '5-10年', value: '5-10' },
    { label: '10年以上', value: '10+' },
]
</script>

<style scoped>
.border-primary {
    border: 2px solid var(--q-primary) !important;
}
</style>
