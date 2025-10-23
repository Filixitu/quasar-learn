<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础复选框</div>
        <div class="q-gutter-sm">
            <q-checkbox v-model="check1" label="选项 1" />
            <q-checkbox v-model="check2" label="选项 2" />
            <q-checkbox v-model="check3" label="选项 3" />
        </div>

        <q-separator />

        <div class="text-h6">不同颜色</div>
        <div class="q-gutter-sm">
            <q-checkbox v-model="check4" label="主要色" color="primary" />
            <q-checkbox v-model="check4" label="次要色" color="secondary" />
            <q-checkbox v-model="check4" label="成功" color="positive" />
            <q-checkbox v-model="check4" label="警告" color="warning" />
            <q-checkbox v-model="check4" label="错误" color="negative" />
            <q-checkbox v-model="check4" label="信息" color="info" />
            <q-checkbox v-model="check4" label="紫色" color="purple" />
            <q-checkbox v-model="check4" label="橙色" color="orange" />
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸</div>
        <div class="q-gutter-sm row items-center">
            <q-checkbox v-model="check5" label="超小" size="xs" />
            <q-checkbox v-model="check5" label="小" size="sm" />
            <q-checkbox v-model="check5" label="中" size="md" />
            <q-checkbox v-model="check5" label="大" size="lg" />
            <q-checkbox v-model="check5" label="超大" size="xl" />
        </div>

        <q-separator />

        <div class="text-h6">不确定状态</div>
        <div class="q-gutter-md">
            <div>
                <q-checkbox v-model="selectAll" :indeterminate-value="null" label="全选"
                    @update:model-value="onSelectAll" />
            </div>
            <div class="q-ml-lg">
                <q-checkbox v-model="items" val="item1" label="项目 1" @update:model-value="updateSelectAll" />
                <q-checkbox v-model="items" val="item2" label="项目 2" @update:model-value="updateSelectAll" />
                <q-checkbox v-model="items" val="item3" label="项目 3" @update:model-value="updateSelectAll" />
            </div>
        </div>

        <q-separator />

        <div class="text-h6">复选框状态</div>
        <div class="q-gutter-sm">
            <q-checkbox v-model="check6" label="正常状态" />
            <q-checkbox v-model="check7" label="禁用未选中" disable />
            <q-checkbox v-model="check8" label="禁用已选中" disable />
            <q-checkbox v-model="check9" label="深色背景" dark class="bg-grey-8 q-pa-sm" />
        </div>

        <q-separator />

        <div class="text-h6">密集模式</div>
        <div>
            <q-checkbox v-model="dense1" label="密集选项 1" dense />
            <q-checkbox v-model="dense2" label="密集选项 2" dense />
            <q-checkbox v-model="dense3" label="密集选项 3" dense />
        </div>

        <q-separator />

        <div class="text-h6">左侧标签</div>
        <div class="q-gutter-sm">
            <q-checkbox v-model="left1" label="左侧标签 1" left-label />
            <q-checkbox v-model="left2" label="左侧标签 2" left-label />
        </div>

        <q-separator />

        <div class="text-h6">自定义图标</div>
        <div class="q-gutter-sm">
            <q-checkbox v-model="icon1" label="自定义勾选" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" />
            <q-checkbox v-model="icon2" label="星星" checked-icon="star" unchecked-icon="star_border" color="orange" />
            <q-checkbox v-model="icon3" label="喜欢" checked-icon="favorite" unchecked-icon="favorite_border"
                color="red" />
            <q-checkbox v-model="icon4" label="拇指" checked-icon="thumb_up" unchecked-icon="thumb_up_off_alt"
                color="blue" />
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <!-- 权限管理 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">权限管理</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="text-subtitle1 q-mb-md">用户权限设置</div>

                    <div class="q-mb-md">
                        <div class="text-weight-medium q-mb-sm">基础权限</div>
                        <q-checkbox v-model="permissions" val="read" label="查看权限" />
                        <q-checkbox v-model="permissions" val="write" label="编辑权限" />
                        <q-checkbox v-model="permissions" val="delete" label="删除权限" />
                    </div>

                    <div class="q-mb-md">
                        <div class="text-weight-medium q-mb-sm">高级权限</div>
                        <q-checkbox v-model="permissions" val="admin" label="管理员权限" />
                        <q-checkbox v-model="permissions" val="export" label="导出权限" />
                        <q-checkbox v-model="permissions" val="import" label="导入权限" />
                    </div>

                    <div class="text-caption text-grey-7">
                        已选择权限: {{ permissions.length }} 项
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- 兴趣爱好选择 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">兴趣爱好</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-6 col-sm-4" v-for="hobby in hobbyList" :key="hobby.value">
                            <q-checkbox v-model="selectedHobbies" :val="hobby.value" :label="hobby.label" />
                        </div>
                    </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <div class="text-caption">
                        已选择: {{ selectedHobbies.join(', ') || '无' }}
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- 协议同意 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">用户协议</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="q-gutter-md">
                        <q-checkbox v-model="agreements.terms">
                            <template v-slot:default>
                                我已阅读并同意
                                <a href="#" class="text-primary">《用户服务协议》</a>
                            </template>
                        </q-checkbox>

                        <q-checkbox v-model="agreements.privacy">
                            <template v-slot:default>
                                我已阅读并同意
                                <a href="#" class="text-primary">《隐私政策》</a>
                            </template>
                        </q-checkbox>

                        <q-checkbox v-model="agreements.marketing">
                            接收营销和推广信息（可选）
                        </q-checkbox>
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-btn color="primary" label="注册" :disable="!agreements.terms || !agreements.privacy"
                        @click="register" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- 任务列表 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">待办事项</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="row justify-between items-center q-mb-md">
                        <div class="text-h6">今日任务</div>
                        <q-btn flat dense label="清除已完成" @click="clearCompleted" />
                    </div>

                    <q-list>
                        <q-item v-for="(task, index) in tasks" :key="index"
                            :class="task.completed ? 'text-strike text-grey-7' : ''">
                            <q-item-section side top>
                                <q-checkbox v-model="task.completed" color="positive" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ task.title }}</q-item-label>
                                <q-item-label caption>{{ task.description }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-badge
                                    :color="task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'grey'">
                                    {{ task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低' }}
                                </q-badge>
                            </q-item-section>
                        </q-item>
                    </q-list>

                    <q-separator class="q-my-md" />

                    <div class="text-caption text-grey-7">
                        进度: {{ completedTasksCount }} / {{ tasks.length }} 已完成
                    </div>
                    <q-linear-progress :value="completedTasksCount / tasks.length" color="positive" class="q-mt-sm" />
                </q-card-section>
            </q-card>
        </div>

        <!-- 筛选器 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">商品筛选</div>
            <q-card style="max-width: 800px">
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-6">
                            <div class="text-weight-medium q-mb-sm">品牌</div>
                            <div class="column">
                                <q-checkbox v-model="filters.brands" val="apple" label="苹果" dense />
                                <q-checkbox v-model="filters.brands" val="huawei" label="华为" dense />
                                <q-checkbox v-model="filters.brands" val="xiaomi" label="小米" dense />
                                <q-checkbox v-model="filters.brands" val="samsung" label="三星" dense />
                            </div>
                        </div>

                        <div class="col-12 col-sm-6">
                            <div class="text-weight-medium q-mb-sm">特性</div>
                            <div class="column">
                                <q-checkbox v-model="filters.features" val="5g" label="5G网络" dense />
                                <q-checkbox v-model="filters.features" val="fastcharge" label="快速充电" dense />
                                <q-checkbox v-model="filters.features" val="wireless" label="无线充电" dense />
                                <q-checkbox v-model="filters.features" val="waterproof" label="防水" dense />
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="text-weight-medium q-mb-sm">价格区间</div>
                            <div class="row q-gutter-sm">
                                <q-checkbox v-model="filters.prices" val="0-1000" label="0-1000" />
                                <q-checkbox v-model="filters.prices" val="1000-3000" label="1000-3000" />
                                <q-checkbox v-model="filters.prices" val="3000-5000" label="3000-5000" />
                                <q-checkbox v-model="filters.prices" val="5000+" label="5000+" />
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-btn color="primary" label="应用筛选" @click="applyFilters" />
                    <q-btn flat label="重置" @click="resetFilters" />
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const check1 = ref(true)
const check2 = ref(false)
const check3 = ref(false)
const check4 = ref(true)
const check5 = ref(true)
const check6 = ref(true)
const check7 = ref(false)
const check8 = ref(true)
const check9 = ref(true)

const dense1 = ref(false)
const dense2 = ref(true)
const dense3 = ref(false)

const left1 = ref(false)
const left2 = ref(true)

const icon1 = ref(true)
const icon2 = ref(false)
const icon3 = ref(true)
const icon4 = ref(false)

// 全选
const selectAll = ref(false)
const items = ref(['item1', 'item3'])

function onSelectAll(val) {
    if (val === true) {
        items.value = ['item1', 'item2', 'item3']
    } else if (val === false) {
        items.value = []
    }
}

function updateSelectAll() {
    if (items.value.length === 0) {
        selectAll.value = false
    } else if (items.value.length === 3) {
        selectAll.value = true
    } else {
        selectAll.value = null
    }
}

// 权限
const permissions = ref(['read', 'write'])

// 兴趣爱好
const hobbyList = [
    { value: '阅读', label: '阅读' },
    { value: '运动', label: '运动' },
    { value: '音乐', label: '音乐' },
    { value: '旅游', label: '旅游' },
    { value: '摄影', label: '摄影' },
    { value: '绘画', label: '绘画' },
    { value: '编程', label: '编程' },
    { value: '游戏', label: '游戏' },
    { value: '烹饪', label: '烹饪' },
]
const selectedHobbies = ref(['阅读', '音乐'])

// 协议
const agreements = ref({
    terms: false,
    privacy: false,
    marketing: false,
})

function register() {
    $q.notify({
        message: '注册成功！',
        color: 'positive'
    })
}

// 任务
const tasks = ref([
    { title: '完成项目文档', description: '编写技术文档', priority: 'high', completed: false },
    { title: '代码审查', description: '审查团队代码', priority: 'medium', completed: true },
    { title: '修复Bug #123', description: '修复登录问题', priority: 'high', completed: false },
    { title: '团队会议', description: '每周例会', priority: 'low', completed: false },
    { title: '学习新技术', description: '研究Vue 3新特性', priority: 'medium', completed: true },
])

const completedTasksCount = computed(() => {
    return tasks.value.filter(t => t.completed).length
})

function clearCompleted() {
    tasks.value = tasks.value.filter(t => !t.completed)
    $q.notify('已清除完成的任务')
}

// 筛选器
const filters = ref({
    brands: ['apple'],
    features: ['5g'],
    prices: [],
})

function applyFilters() {
    $q.notify({
        message: '筛选已应用',
        color: 'positive'
    })
}

function resetFilters() {
    filters.value = {
        brands: [],
        features: [],
        prices: [],
    }
}
</script>
