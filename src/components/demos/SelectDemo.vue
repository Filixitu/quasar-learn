<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础选择框</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-select v-model="model1" :options="options1" label="标准选择框" outlined />
            <q-select v-model="model2" :options="options1" label="填充样式" filled />
            <q-select v-model="model3" :options="options1" label="独立标签" standout />
            <q-select v-model="model4" :options="options1" label="无边框" borderless />
        </div>

        <q-separator />

        <div class="text-h6">多选模式</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-select v-model="multiModel" :options="options1" label="多选" multiple outlined />
            <q-select v-model="multiModel" :options="options1" label="带计数器" multiple outlined counter />
            <q-select v-model="multiModel" :options="options1" label="使用芯片显示" multiple outlined use-chips />
        </div>

        <q-separator />

        <div class="text-h6">带搜索功能</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-select v-model="model5" :options="filteredOptions" label="搜索选择" outlined use-input input-debounce="300"
                @filter="filterFn">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-select>

            <q-select v-model="multiModel2" :options="cities" label="搜索多选城市" outlined multiple use-input use-chips
                input-debounce="300" @filter="filterCities">
                <template v-slot:prepend>
                    <q-icon name="place" />
                </template>
            </q-select>
        </div>

        <q-separator />

        <div class="text-h6">对象选项</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-select v-model="selectedUser" :options="users" label="选择用户" outlined option-value="id"
                option-label="name">
                <template v-slot:selected>
                    <div v-if="selectedUser" class="row items-center q-gutter-sm">
                        <q-avatar size="24px">
                            <img :src="selectedUser.avatar">
                        </q-avatar>
                        <div>{{ selectedUser.name }}</div>
                    </div>
                </template>
                <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                        <q-item-section avatar>
                            <q-avatar size="32px">
                                <img :src="scope.opt.avatar">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ scope.opt.name }}</q-item-label>
                            <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </div>

        <q-separator />

        <div class="text-h6">分组选项</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-select v-model="model6" :options="groupedOptions" label="分组选择" outlined />
        </div>

        <q-separator />

        <div class="text-h6">带图标和颜色</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-select v-model="selectedStatus" :options="statusOptions" label="选择状态" outlined option-value="value"
                option-label="label">
                <template v-slot:selected>
                    <div v-if="selectedStatus" class="row items-center q-gutter-sm">
                        <q-icon :name="selectedStatus.icon" :color="selectedStatus.color" />
                        <div>{{ selectedStatus.label }}</div>
                    </div>
                </template>
                <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                        <q-item-section avatar>
                            <q-icon :name="scope.opt.icon" :color="scope.opt.color" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </div>

        <q-separator />

        <div class="text-h6">验证状态</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-select v-model="model7" :options="options1" label="必选项 *" outlined
                :rules="[val => val != null || '请选择一个选项']" />
            <q-select v-model="model8" :options="options1" label="禁用状态" outlined disable />
            <q-select v-model="model9" :options="options1" label="只读状态" outlined readonly />
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <!-- 省市区三级联动 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">省市区三级联动</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-4">
                            <q-select v-model="selectedProvince" :options="provinces" label="省份" outlined
                                @update:model-value="onProvinceChange" />
                        </div>
                        <div class="col-12 col-sm-4">
                            <q-select v-model="selectedCity" :options="availableCities" label="城市" outlined
                                :disable="!selectedProvince" @update:model-value="onCityChange" />
                        </div>
                        <div class="col-12 col-sm-4">
                            <q-select v-model="selectedDistrict" :options="availableDistricts" label="区县" outlined
                                :disable="!selectedCity" />
                        </div>
                    </div>
                    <div class="q-mt-md text-caption text-grey-7">
                        已选择: {{ selectedProvince || '未选择' }} - {{ selectedCity || '未选择' }} - {{ selectedDistrict ||
                        '未选择' }}
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- 表单中的选择器 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">用户信息表单</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="q-gutter-md">
                        <q-input v-model="formData.name" label="姓名 *" outlined />
                        <q-select v-model="formData.gender" :options="['男', '女', '其他']" label="性别 *" outlined />
                        <q-select v-model="formData.education" :options="educationOptions" label="学历" outlined />
                        <q-select v-model="formData.skills" :options="skillOptions" label="技能" outlined multiple
                            use-chips />
                        <q-select v-model="formData.hobby" :options="hobbyOptions" label="爱好" outlined multiple
                            use-chips counter max-values="5" hint="最多选择5项" />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="重置" @click="resetForm" />
                    <q-btn color="primary" label="提交" @click="submitForm" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- 标签筛选器 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">商品筛选</div>
            <q-card style="max-width: 800px">
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-6">
                            <q-select v-model="filterData.category" :options="categoryOptions" label="分类" outlined
                                clearable />
                        </div>
                        <div class="col-12 col-sm-6">
                            <q-select v-model="filterData.brand" :options="brandOptions" label="品牌" outlined clearable
                                use-input @filter="filterBrands" />
                        </div>
                        <div class="col-12 col-sm-6">
                            <q-select v-model="filterData.priceRange" :options="priceRanges" label="价格区间" outlined
                                clearable />
                        </div>
                        <div class="col-12 col-sm-6">
                            <q-select v-model="filterData.sort" :options="sortOptions" label="排序方式" outlined />
                        </div>
                    </div>
                    <div class="q-mt-md">
                        <q-btn color="primary" label="应用筛选" @click="applyFilters" />
                        <q-btn flat label="清除筛选" @click="clearFilters" class="q-ml-sm" />
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

const options1 = ['选项 1', '选项 2', '选项 3', '选项 4', '选项 5']

const model1 = ref(null)
const model2 = ref(null)
const model3 = ref(null)
const model4 = ref(null)
const model5 = ref(null)
const model6 = ref(null)
const model7 = ref(null)
const model8 = ref('选项 1')
const model9 = ref('选项 2')
const multiModel = ref([])
const multiModel2 = ref([])

// 搜索过滤
const filteredOptions = ref(options1)
const cities = ref(['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安', '重庆', '南京'])
const filteredCities = ref(cities.value)

function filterFn(val, update) {
    update(() => {
        if (val === '') {
            filteredOptions.value = options1
        } else {
            const needle = val.toLowerCase()
            filteredOptions.value = options1.filter(v => v.toLowerCase().includes(needle))
        }
    })
}

function filterCities(val, update) {
    update(() => {
        if (val === '') {
            filteredCities.value = cities.value
        } else {
            const needle = val.toLowerCase()
            filteredCities.value = cities.value.filter(v => v.toLowerCase().includes(needle))
        }
    })
}

// 用户选项
const users = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: 'https://cdn.quasar.dev/img/avatar.png' },
    { id: 2, name: '李四', email: 'lisi@example.com', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
    { id: 3, name: '王五', email: 'wangwu@example.com', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' },
]
const selectedUser = ref(null)

// 分组选项
const groupedOptions = [
    { label: '水果类', disable: true },
    '苹果',
    '香蕉',
    '橙子',
    { label: '蔬菜类', disable: true },
    '白菜',
    '萝卜',
    '番茄',
]

// 状态选项
const statusOptions = [
    { value: 'active', label: '活跃', icon: 'check_circle', color: 'positive' },
    { value: 'pending', label: '待处理', icon: 'schedule', color: 'warning' },
    { value: 'inactive', label: '未激活', icon: 'cancel', color: 'negative' },
    { value: 'archived', label: '已归档', icon: 'archive', color: 'grey' },
]
const selectedStatus = ref(null)

// 省市区数据
const selectedProvince = ref(null)
const selectedCity = ref(null)
const selectedDistrict = ref(null)

const provinces = ['北京市', '上海市', '广东省', '浙江省', '江苏省']
const cityMap = {
    '北京市': ['东城区', '西城区', '朝阳区', '海淀区'],
    '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区'],
    '广东省': ['广州市', '深圳市', '珠海市', '东莞市'],
    '浙江省': ['杭州市', '宁波市', '温州市', '绍兴市'],
    '江苏省': ['南京市', '苏州市', '无锡市', '常州市'],
}
const districtMap = {
    '广州市': ['天河区', '越秀区', '海珠区', '番禺区'],
    '深圳市': ['福田区', '南山区', '罗湖区', '宝安区'],
    '杭州市': ['西湖区', '拱墅区', '江干区', '滨江区'],
    '南京市': ['鼓楼区', '玄武区', '秦淮区', '建邺区'],
}

const availableCities = ref([])
const availableDistricts = ref([])

function onProvinceChange() {
    selectedCity.value = null
    selectedDistrict.value = null
    availableCities.value = cityMap[selectedProvince.value] || []
    availableDistricts.value = []
}

function onCityChange() {
    selectedDistrict.value = null
    availableDistricts.value = districtMap[selectedCity.value] || []
}

// 表单数据
const formData = ref({
    name: '',
    gender: null,
    education: null,
    skills: [],
    hobby: []
})

const educationOptions = ['高中', '大专', '本科', '硕士', '博士']
const skillOptions = ['Vue.js', 'React', 'Angular', 'Node.js', 'Python', 'Java', 'Go', 'Rust']
const hobbyOptions = ['阅读', '运动', '音乐', '旅游', '摄影', '绘画', '编程', '游戏', '烹饪', '园艺']

function resetForm() {
    formData.value = {
        name: '',
        gender: null,
        education: null,
        skills: [],
        hobby: []
    }
}

function submitForm() {
    $q.notify({
        message: '表单提交成功！',
        color: 'positive'
    })
}

// 筛选数据
const filterData = ref({
    category: null,
    brand: null,
    priceRange: null,
    sort: '综合排序'
})

const categoryOptions = ['电子产品', '服装鞋包', '食品饮料', '家居用品', '运动户外']
const brandOptions = ref(['苹果', '华为', '小米', '三星', 'OPPO', 'VIVO', '联想', '戴尔'])
const filteredBrandOptions = ref(brandOptions.value)
const priceRanges = ['0-100', '100-500', '500-1000', '1000-5000', '5000以上']
const sortOptions = ['综合排序', '价格从低到高', '价格从高到低', '销量优先', '评分优先']

function filterBrands(val, update) {
    update(() => {
        if (val === '') {
            filteredBrandOptions.value = brandOptions.value
        } else {
            const needle = val.toLowerCase()
            filteredBrandOptions.value = brandOptions.value.filter(v => v.toLowerCase().includes(needle))
        }
    })
}

function applyFilters() {
    $q.notify({
        message: '筛选条件已应用',
        color: 'positive'
    })
}

function clearFilters() {
    filterData.value = {
        category: null,
        brand: null,
        priceRange: null,
        sort: '综合排序'
    }
}
</script>
