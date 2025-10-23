<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- 左侧导航 - 固定位置 -->
      <div class="col-12 col-md-3">
        <div class="fixed-left-nav">
          <q-card>
            <!-- 搜索框 -->
            <q-card-section class="q-pb-none">
              <q-input v-model="searchQuery" placeholder="搜索组件..." outlined dense clearable>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-card-section>

            <q-scroll-area :style="`height: ${scrollHeight}px`">
              <q-list>
                <q-item-label header class="text-h6">
                  组件分类
                  <q-badge color="primary" class="q-ml-sm">{{ totalComponents }}</q-badge>
                </q-item-label>

                <q-expansion-item v-for="category in filteredCategories" :key="category.label" :icon="category.icon"
                  :label="category.label" :caption="`${category.components.length} 个组件`" default-opened>
                  <q-list padding>
                    <q-item v-for="component in category.components" :key="component.id" clickable v-ripple
                      :active="selectedComponent === component.id" @click="selectComponent(component.id)"
                      class="q-ml-md">
                      <q-item-section>
                        <q-item-label>{{ component.name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-expansion-item>

                <!-- 无结果提示 -->
                <q-item v-if="filteredCategories.length === 0">
                  <q-item-section class="text-center text-grey-7">
                    <div class="q-pa-md">
                      <q-icon name="search_off" size="48px" />
                      <div class="q-mt-sm">未找到相关组件</div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-card>
        </div>
      </div>

      <!-- 右侧展示区域 -->
      <div class="col-12 col-md-9">
        <q-card>
          <q-card-section class="row items-center">
            <div class="col">
              <div class="text-h5">{{ getCurrentComponent?.name }}</div>
              <div class="text-subtitle2 text-grey-7">{{ getCurrentComponent?.description }}</div>
            </div>
            <div class="col-auto q-gutter-xs">
              <q-btn flat round dense :icon="showCode ? 'code_off' : 'code'" @click="showCode = !showCode">
                <q-tooltip>{{ showCode ? '隐藏代码路径' : '查看代码路径' }}</q-tooltip>
              </q-btn>
              <q-btn flat round dense icon="refresh" @click="refreshComponent">
                <q-tooltip>刷新组件</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator />

          <!-- 代码路径查看区域 -->
          <q-slide-transition>
            <q-card-section v-if="showCode" class="bg-grey-10 text-white">
              <div class="row items-center justify-between q-mb-md">
                <div class="text-subtitle1">
                  <q-icon name="code" class="q-mr-sm" />
                  组件文件路径
                </div>
                <q-btn flat dense icon="content_copy" label="复制路径" @click="copyPath" size="sm" />
              </div>
              <pre class="code-preview">{{ getComponentPath(selectedComponent) }}</pre>
            </q-card-section>
          </q-slide-transition>

          <q-separator v-if="showCode" />

          <q-card-section>
            <!-- 组件演示区域 -->
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
              <component :is="currentDemoComponent" :key="componentKey" v-if="currentDemoComponent" />
            </transition>
          </q-card-section>
        </q-card>

        <!-- 快捷操作 - 返回顶部 -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="arrow_upward" color="primary" @click="scrollToTop" v-show="showScrollTop">
            <q-tooltip>返回顶部</q-tooltip>
          </q-btn>
        </q-page-sticky>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQuasar, copyToClipboard } from 'quasar'

const $q = useQuasar()

// 组件演示
import ButtonDemo from '../components/demos/ButtonDemo.vue'
import CardDemo from '../components/demos/CardDemo.vue'
import AvatarDemo from '../components/demos/AvatarDemo.vue'
import BadgeDemo from '../components/demos/BadgeDemo.vue'
import BannerDemo from '../components/demos/BannerDemo.vue'
import ChipDemo from '../components/demos/ChipDemo.vue'
import DialogDemo from '../components/demos/DialogDemo.vue'
import InputDemo from '../components/demos/InputDemo.vue'
import TableDemo from '../components/demos/TableDemo.vue'
import TabsDemo from '../components/demos/TabsDemo.vue'
import ListDemo from '../components/demos/ListDemo.vue'
import MenuDemo from '../components/demos/MenuDemo.vue'
import TooltipDemo from '../components/demos/TooltipDemo.vue'
import SpinnerDemo from '../components/demos/SpinnerDemo.vue'
import ProgressDemo from '../components/demos/ProgressDemo.vue'
import RatingDemo from '../components/demos/RatingDemo.vue'
import CarouselDemo from '../components/demos/CarouselDemo.vue'
import TimelineDemo from '../components/demos/TimelineDemo.vue'
import SelectDemo from '../components/demos/SelectDemo.vue'
import CheckboxDemo from '../components/demos/CheckboxDemo.vue'
import RadioDemo from '../components/demos/RadioDemo.vue'
import ToggleDemo from '../components/demos/ToggleDemo.vue'
import DatePickerDemo from '../components/demos/DatePickerDemo.vue'
import StepperDemo from '../components/demos/StepperDemo.vue'
import PiniaDemo from '../components/demos/PiniaDemo.vue'
import RouterDemo from '../components/demos/RouterDemo.vue'
import DrawerDemo from '../components/demos/DrawerDemo.vue'
import ExpansionDemo from '../components/demos/ExpansionDemo.vue'
import TreeDemo from '../components/demos/TreeDemo.vue'
import FileUploadDemo from '../components/demos/FileUploadDemo.vue'
import SliderDemo from '../components/demos/SliderDemo.vue'
import SkeletonDemo from '../components/demos/SkeletonDemo.vue'
import VirtualScrollDemo from '../components/demos/VirtualScrollDemo.vue'
import InfiniteScrollDemo from '../components/demos/InfiniteScrollDemo.vue'
import ComposablesDemo from '../components/demos/ComposablesDemo.vue'
import UtilsDemo from '../components/demos/UtilsDemo.vue'
import I18nDemo from '../components/demos/I18nDemo.vue'

// 组件映射
const componentMap = {
  ButtonDemo,
  CardDemo,
  AvatarDemo,
  BadgeDemo,
  BannerDemo,
  ChipDemo,
  DialogDemo,
  InputDemo,
  TableDemo,
  TabsDemo,
  ListDemo,
  MenuDemo,
  TooltipDemo,
  SpinnerDemo,
  ProgressDemo,
  RatingDemo,
  CarouselDemo,
  TimelineDemo,
  SelectDemo,
  CheckboxDemo,
  RadioDemo,
  ToggleDemo,
  DatePickerDemo,
  StepperDemo,
  PiniaDemo,
  RouterDemo,
  DrawerDemo,
  ExpansionDemo,
  TreeDemo,
  FileUploadDemo,
  SliderDemo,
  SkeletonDemo,
  VirtualScrollDemo,
  InfiniteScrollDemo,
  ComposablesDemo,
  UtilsDemo,
  I18nDemo,
}

const selectedComponent = ref('ButtonDemo')
const currentDemoComponent = computed(() => componentMap[selectedComponent.value])
const searchQuery = ref('')
const showCode = ref(false)
const componentKey = ref(0)
const showScrollTop = ref(false)

const categories = [
  {
    label: '基础组件',
    icon: 'widgets',
    components: [
      { id: 'ButtonDemo', name: 'Button 按钮', description: '按钮组件的各种用法' },
      { id: 'CardDemo', name: 'Card 卡片', description: '卡片容器组件' },
      { id: 'AvatarDemo', name: 'Avatar 头像', description: '用于展示用户头像' },
      { id: 'BadgeDemo', name: 'Badge 徽标', description: '数字或状态标记' },
      { id: 'BannerDemo', name: 'Banner 横幅', description: '信息横幅提示' },
      { id: 'ChipDemo', name: 'Chip 气泡', description: '信息标签组件' },
      { id: 'SkeletonDemo', name: 'Skeleton 骨架屏', description: '内容加载占位' },
    ]
  },
  {
    label: '表单组件',
    icon: 'edit_note',
    components: [
      { id: 'InputDemo', name: 'Input 输入框', description: '文本输入组件' },
      { id: 'SelectDemo', name: 'Select 选择器', description: '下拉选择组件' },
      { id: 'CheckboxDemo', name: 'Checkbox 复选框', description: '复选框组件' },
      { id: 'RadioDemo', name: 'Radio 单选框', description: '单选框组件' },
      { id: 'ToggleDemo', name: 'Toggle 开关', description: '开关组件' },
      { id: 'SliderDemo', name: 'Slider 滑块', description: '滑块和范围选择' },
      { id: 'DatePickerDemo', name: 'DatePicker 日期选择', description: '日期时间选择组件' },
      { id: 'RatingDemo', name: 'Rating 评分', description: '评分组件' },
      { id: 'FileUploadDemo', name: 'File 文件上传', description: '文件上传组件' },
    ]
  },
  {
    label: '数据展示',
    icon: 'table_chart',
    components: [
      { id: 'TableDemo', name: 'Table 表格', description: '数据表格组件' },
      { id: 'ListDemo', name: 'List 列表', description: '列表组件' },
      { id: 'TreeDemo', name: 'Tree 树形结构', description: '树形数据展示' },
      { id: 'TimelineDemo', name: 'Timeline 时间线', description: '时间线组件' },
      { id: 'CarouselDemo', name: 'Carousel 轮播', description: '轮播图组件' },
      { id: 'VirtualScrollDemo', name: 'Virtual Scroll 虚拟滚动', description: '高效渲染大量数据' },
      { id: 'InfiniteScrollDemo', name: 'Infinite Scroll 无限滚动', description: '滚动加载更多' },
    ]
  },
  {
    label: '导航组件',
    icon: 'navigation',
    components: [
      { id: 'TabsDemo', name: 'Tabs 选项卡', description: '选项卡切换' },
      { id: 'MenuDemo', name: 'Menu 菜单', description: '下拉菜单' },
      { id: 'DrawerDemo', name: 'Drawer 抽屉', description: '侧边栏抽屉' },
      { id: 'StepperDemo', name: 'Stepper 步骤条', description: '步骤引导组件' },
      { id: 'ExpansionDemo', name: 'Expansion 展开项', description: '可展开折叠组件' },
    ]
  },
  {
    label: '反馈组件',
    icon: 'feedback',
    components: [
      { id: 'DialogDemo', name: 'Dialog 对话框', description: '模态对话框' },
      { id: 'TooltipDemo', name: 'Tooltip 提示', description: '文字提示气泡' },
      { id: 'SpinnerDemo', name: 'Spinner 加载', description: '加载动画' },
      { id: 'ProgressDemo', name: 'Progress 进度', description: '进度条组件' },
    ]
  },
  {
    label: '高级技术',
    icon: 'school',
    components: [
      { id: 'I18nDemo', name: 'I18n 多语言支持', description: '国际化和多语言切换功能' },
      { id: 'PiniaDemo', name: 'Pinia 状态管理', description: 'Vue 3 状态管理方案' },
      { id: 'RouterDemo', name: 'Router 路由管理', description: '路由配置和导航' },
      { id: 'ComposablesDemo', name: 'Composables 组合式函数', description: 'Vue 组合式函数详解' },
      { id: 'UtilsDemo', name: 'Utils 工具函数', description: 'Quasar 实用工具函数大全' },
    ]
  },
]

const getCurrentComponent = computed(() => {
  for (const category of categories) {
    const component = category.components.find(c => c.id === selectedComponent.value)
    if (component) return component
  }
  return null
})

// 搜索过滤
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories

  return categories
    .map(category => ({
      ...category,
      components: category.components.filter(comp =>
        comp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }))
    .filter(category => category.components.length > 0)
})

// 总组件数
const totalComponents = computed(() => {
  return categories.reduce((total, category) => total + category.components.length, 0)
})

// 响应式高度
const scrollHeight = computed(() => {
  return $q.screen.height - 250
})

// 选择组件
function selectComponent(componentId) {
  selectedComponent.value = componentId
  scrollToTop()
}

// 刷新组件
function refreshComponent() {
  componentKey.value++
  $q.notify({
    message: '组件已刷新',
    color: 'positive',
    position: 'top',
    timeout: 1000
  })
}

// 获取组件文件路径
function getComponentPath(componentId) {
  return `src/components/demos/${componentId}.vue`
}

// 复制路径
function copyPath() {
  const path = getComponentPath(selectedComponent.value)
  copyToClipboard(path)
    .then(() => {
      $q.notify({
        message: '路径已复制到剪贴板',
        color: 'positive',
        icon: 'done'
      })
    })
    .catch(() => {
      $q.notify({
        message: '复制失败',
        color: 'negative'
      })
    })
}

// 滚动到顶部
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听滚动
function handleScroll() {
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.code-preview {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.animated {
  animation-duration: 0.3s;
}

.fadeIn {
  animation-name: fadeIn;
}

.fadeOut {
  animation-name: fadeOut;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
