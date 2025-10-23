<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础步骤条</div>
        <q-stepper v-model="step1" animated style="max-width: 700px">
            <q-step :name="1" title="选择活动设置" icon="settings" :done="step1 > 1">
                这是第一步的内容
            </q-step>

            <q-step :name="2" title="创建广告组" icon="create_new_folder" :done="step1 > 2">
                这是第二步的内容
            </q-step>

            <q-step :name="3" title="广告设置" icon="assignment">
                这是最后一步
            </q-step>

            <template v-slot:navigation>
                <q-stepper-navigation>
                    <q-btn v-if="step1 < 3" @click="step1++" color="primary" label="继续" />
                    <q-btn v-else @click="$q.notify('完成！')" color="primary" label="完成" />
                    <q-btn v-if="step1 > 1" flat @click="step1--" label="上一步" class="q-ml-sm" />
                </q-stepper-navigation>
            </template>
        </q-stepper>

        <q-separator />

        <div class="text-h6">垂直步骤条</div>
        <q-stepper v-model="step2" vertical animated style="max-width: 700px">
            <q-step :name="1" title="填写个人信息" icon="person" :done="step2 > 1">
                <div class="q-gutter-md">
                    <q-input v-model="userData.name" label="姓名" outlined dense />
                    <q-input v-model="userData.email" label="邮箱" outlined dense />
                </div>
            </q-step>

            <q-step :name="2" title="选择兴趣爱好" icon="favorite" :done="step2 > 2">
                <div class="q-gutter-sm">
                    <q-checkbox v-model="userData.interests" val="reading" label="阅读" />
                    <q-checkbox v-model="userData.interests" val="sports" label="运动" />
                    <q-checkbox v-model="userData.interests" val="music" label="音乐" />
                </div>
            </q-step>

            <q-step :name="3" title="确认信息" icon="done">
                <div class="text-subtitle2">请确认您的信息：</div>
                <div class="q-mt-md">
                    <div><strong>姓名：</strong>{{ userData.name }}</div>
                    <div><strong>邮箱：</strong>{{ userData.email }}</div>
                    <div><strong>兴趣：</strong>{{ userData.interests.join(', ') }}</div>
                </div>
            </q-step>

            <template v-slot:navigation>
                <q-stepper-navigation>
                    <q-btn v-if="step2 < 3" @click="step2++" color="primary" label="下一步" />
                    <q-btn v-else @click="submitUserData" color="primary" label="提交" />
                    <q-btn v-if="step2 > 1" flat @click="step2--" label="返回" class="q-ml-sm" />
                </q-stepper-navigation>
            </template>
        </q-stepper>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <!-- 商品购买流程 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">商品购买流程</div>
            <q-card style="max-width: 900px">
                <q-stepper v-model="orderStep" header-nav animated ref="stepper">
                    <q-step :name="1" title="购物车" icon="shopping_cart" :done="orderStep > 1">
                        <div class="q-gutter-md">
                            <q-list bordered>
                                <q-item v-for="item in cart" :key="item.id">
                                    <q-item-section avatar>
                                        <q-avatar>
                                            <img :src="item.image">
                                        </q-avatar>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{ item.name }}</q-item-label>
                                        <q-item-label caption>¥{{ item.price }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <div class="row items-center q-gutter-sm">
                                            <q-btn flat dense round icon="remove" size="sm" @click="item.quantity--"
                                                :disable="item.quantity <= 1" />
                                            <div>{{ item.quantity }}</div>
                                            <q-btn flat dense round icon="add" size="sm" @click="item.quantity++" />
                                        </div>
                                    </q-item-section>
                                    <q-item-section side>
                                        ¥{{ item.price * item.quantity }}
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            <div class="text-right text-h6">总计: ¥{{ cartTotal }}</div>
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="orderStep = 2" color="primary" label="去结算" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="2" title="填写订单信息" icon="description" :done="orderStep > 2">
                        <div class="q-gutter-md">
                            <q-input v-model="order.receiver" label="收货人 *" outlined />
                            <q-input v-model="order.phone" label="联系电话 *" outlined />
                            <q-input v-model="order.address" label="收货地址 *" outlined type="textarea" rows="2" />
                            <q-input v-model="order.remark" label="订单备注" outlined type="textarea" rows="2" />
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="orderStep = 3" color="primary" label="下一步" />
                            <q-btn flat @click="orderStep = 1" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="3" title="选择支付方式" icon="payment" :done="orderStep > 3">
                        <div class="q-gutter-md">
                            <q-option-group v-model="order.paymentMethod" :options="paymentOptions" color="primary" />
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="orderStep = 4" color="primary" label="确认订单" />
                            <q-btn flat @click="orderStep = 2" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="4" title="确认订单" icon="done_all">
                        <div class="q-gutter-md">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="text-h6 q-mb-md">订单详情</div>
                                    <div class="q-gutter-sm">
                                        <div><strong>收货人：</strong>{{ order.receiver }}</div>
                                        <div><strong>电话：</strong>{{ order.phone }}</div>
                                        <div><strong>地址：</strong>{{ order.address }}</div>
                                        <div><strong>支付方式：</strong>{{ getPaymentMethodLabel(order.paymentMethod) }}
                                        </div>
                                        <div><strong>商品总额：</strong>¥{{ cartTotal }}</div>
                                        <div><strong>运费：</strong>¥10</div>
                                        <div class="text-h6 text-primary"><strong>应付金额：</strong>¥{{ cartTotal + 10 }}
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="submitOrder" color="primary" label="提交订单" />
                            <q-btn flat @click="orderStep = 3" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>
                </q-stepper>
            </q-card>
        </div>

        <!-- 账户注册流程 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">账户注册流程</div>
            <q-card style="max-width: 700px">
                <q-stepper v-model="registerStep" vertical color="primary" animated>
                    <q-step :name="1" title="创建账户" icon="account_circle" :done="registerStep > 1" active-icon="edit">
                        <div class="q-gutter-md">
                            <q-input v-model="register.username" label="用户名 *" outlined
                                :rules="[val => val && val.length >= 3 || '至少3个字符']" />
                            <q-input v-model="register.email" label="邮箱 *" outlined type="email" />
                            <q-input v-model="register.password" label="密码 *" outlined type="password"
                                :rules="[val => val && val.length >= 6 || '至少6个字符']" />
                            <q-input v-model="register.confirmPassword" label="确认密码 *" outlined type="password" />
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="registerStep = 2" color="primary" label="继续" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="2" title="验证邮箱" icon="mail" :done="registerStep > 2" active-icon="mail_outline">
                        <div>
                            <div class="q-mb-md">我们已向 <strong>{{ register.email }}</strong> 发送验证码</div>
                            <q-input v-model="register.verificationCode" label="验证码" outlined mask="######" />
                            <div class="q-mt-md">
                                <q-btn flat color="primary" label="重新发送" />
                            </div>
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="registerStep = 3" color="primary" label="验证" />
                            <q-btn flat @click="registerStep = 1" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="3" title="完善资料" icon="person_add" :done="registerStep > 3" active-icon="person">
                        <div class="q-gutter-md">
                            <q-input v-model="register.fullName" label="真实姓名" outlined />
                            <q-select v-model="register.gender" :options="['男', '女', '其他']" label="性别" outlined />
                            <q-input v-model="register.phone" label="手机号码" outlined />
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="registerStep = 4" color="primary" label="下一步" />
                            <q-btn flat @click="registerStep = 2" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="4" title="完成" icon="done" active-icon="celebration">
                        <div class="text-center q-pa-lg">
                            <q-icon name="check_circle" size="64px" color="positive" />
                            <div class="text-h5 q-mt-md">注册成功！</div>
                            <div class="text-subtitle2 text-grey-7 q-mt-sm">欢迎加入我们</div>
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="completeRegistration" color="primary" label="开始使用" />
                        </q-stepper-navigation>
                    </q-step>
                </q-stepper>
            </q-card>
        </div>

        <!-- 项目创建向导 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">项目创建向导</div>
            <q-card style="max-width: 800px">
                <q-stepper v-model="projectStep" header-nav animated alternative-labels>
                    <q-step :name="1" title="基本信息" icon="info" :done="projectStep > 1">
                        <div class="q-gutter-md" style="max-width: 500px">
                            <q-input v-model="project.name" label="项目名称 *" outlined />
                            <q-input v-model="project.description" label="项目描述" outlined type="textarea" rows="3" />
                            <q-select v-model="project.category" :options="['Web应用', '移动应用', '桌面应用', '其他']" label="项目类型"
                                outlined />
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="projectStep = 2" color="primary" label="下一步" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="2" title="技术栈" icon="code" :done="projectStep > 2">
                        <div class="q-gutter-md">
                            <div class="text-subtitle1">选择前端框架</div>
                            <q-option-group v-model="project.frontend" :options="[
                                { label: 'Vue.js', value: 'vue' },
                                { label: 'React', value: 'react' },
                                { label: 'Angular', value: 'angular' }
                            ]" color="primary" />

                            <div class="text-subtitle1 q-mt-md">选择后端框架</div>
                            <q-option-group v-model="project.backend" :options="[
                                { label: 'Node.js', value: 'node' },
                                { label: 'Django', value: 'django' },
                                { label: 'Spring Boot', value: 'spring' }
                            ]" color="primary" />
                        </div>

                        <q-stepper-navigation>
                            <q-btn @click="projectStep = 3" color="primary" label="下一步" />
                            <q-btn flat @click="projectStep = 1" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="3" title="团队成员" icon="group" :done="projectStep > 3">
                        <div class="q-mb-md">
                            <q-btn color="primary" icon="add" label="添加成员" @click="addMember" />
                        </div>

                        <q-list bordered v-if="project.members.length > 0">
                            <q-item v-for="(member, index) in project.members" :key="index">
                                <q-item-section avatar>
                                    <q-avatar color="primary" text-color="white">{{ member.name[0] }}</q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ member.name }}</q-item-label>
                                    <q-item-label caption>{{ member.role }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn flat round dense icon="delete" color="negative"
                                        @click="project.members.splice(index, 1)" />
                                </q-item-section>
                            </q-item>
                        </q-list>

                        <q-stepper-navigation>
                            <q-btn @click="projectStep = 4" color="primary" label="下一步" />
                            <q-btn flat @click="projectStep = 2" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step :name="4" title="确认创建" icon="done_all">
                        <q-card flat bordered>
                            <q-card-section>
                                <div class="text-h6 q-mb-md">项目概览</div>
                                <div class="q-gutter-sm">
                                    <div><strong>项目名称：</strong>{{ project.name }}</div>
                                    <div><strong>项目类型：</strong>{{ project.category }}</div>
                                    <div><strong>前端框架：</strong>{{ project.frontend }}</div>
                                    <div><strong>后端框架：</strong>{{ project.backend }}</div>
                                    <div><strong>团队成员：</strong>{{ project.members.length }} 人</div>
                                </div>
                            </q-card-section>
                        </q-card>

                        <q-stepper-navigation>
                            <q-btn @click="createProject" color="primary" label="创建项目" />
                            <q-btn flat @click="projectStep = 3" label="返回" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </q-step>
                </q-stepper>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const step1 = ref(1)
const step2 = ref(1)

// 用户数据
const userData = ref({
    name: '',
    email: '',
    interests: []
})

function submitUserData() {
    $q.notify({
        message: '信息提交成功！',
        color: 'positive'
    })
}

// 购物车
const orderStep = ref(1)
const cart = ref([
    { id: 1, name: '商品A', price: 99, quantity: 1, image: 'https://cdn.quasar.dev/img/avatar.png' },
    { id: 2, name: '商品B', price: 199, quantity: 2, image: 'https://cdn.quasar.dev/img/avatar2.jpg' },
])

const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

const order = ref({
    receiver: '',
    phone: '',
    address: '',
    remark: '',
    paymentMethod: 'alipay'
})

const paymentOptions = [
    { label: '支付宝', value: 'alipay' },
    { label: '微信支付', value: 'wechat' },
    { label: '银行卡', value: 'card' },
]

function getPaymentMethodLabel(value) {
    return paymentOptions.find(opt => opt.value === value)?.label || ''
}

function submitOrder() {
    $q.notify({
        message: '订单提交成功！',
        color: 'positive',
        icon: 'check_circle'
    })
}

// 注册流程
const registerStep = ref(1)
const register = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    fullName: '',
    gender: null,
    phone: ''
})

function completeRegistration() {
    $q.notify({
        message: '注册完成，欢迎使用！',
        color: 'positive'
    })
}

// 项目创建
const projectStep = ref(1)
const project = ref({
    name: '',
    description: '',
    category: null,
    frontend: 'vue',
    backend: 'node',
    members: []
})

function addMember() {
    $q.dialog({
        title: '添加成员',
        message: '输入成员姓名：',
        prompt: {
            model: '',
            type: 'text'
        },
        cancel: true
    }).onOk(name => {
        if (name) {
            project.value.members.push({
                name: name,
                role: '开发者'
            })
        }
    })
}

function createProject() {
    $q.notify({
        message: '项目创建成功！',
        color: 'positive',
        icon: 'check_circle'
    })
}
</script>
