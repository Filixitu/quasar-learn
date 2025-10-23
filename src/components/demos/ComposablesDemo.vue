<template>
  <div class="q-gutter-md">
    <div class="text-h6">Vue 组合式函数详解</div>

    <!-- useQuasar -->
    <q-card>
      <q-card-section>
        <div class="text-h6 text-primary">1. useQuasar()</div>
        <div class="text-subtitle2 text-grey-7">Quasar 的核心组合式函数，提供全局 API 访问</div>
      </q-card-section>

      <q-expansion-item label="功能演示" icon="code" default-opened>
        <q-card>
          <q-card-section class="q-gutter-md">
            <!-- 通知系统 -->
            <div>
              <div class="text-subtitle1 q-mb-sm">📢 $q.notify - 通知系统</div>
              <div class="q-gutter-sm">
                <q-btn color="positive" label="成功通知" @click="showSuccessNotify" />
                <q-btn color="negative" label="错误通知" @click="showErrorNotify" />
                <q-btn color="warning" label="警告通知" @click="showWarningNotify" />
                <q-btn color="info" label="信息通知" @click="showInfoNotify" />
                <q-btn color="purple" label="自定义通知" @click="showCustomNotify" />
              </div>
            </div>

            <q-separator />

            <!-- 对话框系统 -->
            <div>
              <div class="text-subtitle1 q-mb-sm">💬 $q.dialog - 对话框系统</div>
              <div class="q-gutter-sm">
                <q-btn color="primary" label="确认对话框" @click="showConfirmDialog" />
                <q-btn color="secondary" label="输入对话框" @click="showPromptDialog" />
                <q-btn color="orange" label="选择对话框" @click="showOptionDialog" />
              </div>
            </div>

            <q-separator />

            <!-- 全屏加载 -->
            <div>
              <div class="text-subtitle1 q-mb-sm">⏳ $q.loading - 全屏加载</div>
              <div class="q-gutter-sm">
                <q-btn color="primary" label="显示加载" @click="showLoading" />
                <q-btn color="secondary" label="自定义加载" @click="showCustomLoading" />
              </div>
            </div>

            <q-separator />

            <!-- 屏幕信息 -->
            <div>
              <div class="text-subtitle1 q-mb-sm">📱 $q.screen - 屏幕信息</div>
              <div class="q-gutter-sm">
                <q-chip>宽度: {{ $q.screen.width }}px</q-chip>
                <q-chip>高度: {{ $q.screen.height }}px</q-chip>
                <q-chip :color="$q.screen.xs ? 'red' : 'grey'">超小屏: {{ $q.screen.xs }}</q-chip>
                <q-chip :color="$q.screen.sm ? 'orange' : 'grey'">小屏: {{ $q.screen.sm }}</q-chip>
                <q-chip :color="$q.screen.md ? 'blue' : 'grey'">中屏: {{ $q.screen.md }}</q-chip>
                <q-chip :color="$q.screen.lg ? 'green' : 'grey'">大屏: {{ $q.screen.lg }}</q-chip>
              </div>
            </div>

            <q-separator />

            <!-- 平台检测 -->
            <div>
              <div class="text-subtitle1 q-mb-sm">🖥️ $q.platform - 平台检测</div>
              <div class="q-gutter-sm">
                <q-chip :color="$q.platform.is.mobile ? 'positive' : 'grey'">
                  <q-icon name="phone_android" />
                  移动设备: {{ $q.platform.is.mobile }}
                </q-chip>
                <q-chip :color="$q.platform.is.desktop ? 'positive' : 'grey'">
                  <q-icon name="desktop_windows" />
                  桌面设备: {{ $q.platform.is.desktop }}
                </q-chip>
              </div>
            </div>

            <q-separator />

            <!-- 深色模式 -->
            <div>
              <div class="text-subtitle1 q-mb-sm">🌙 $q.dark - 深色模式</div>
              <div class="row items-center q-gutter-sm">
                <q-toggle v-model="darkMode" @update:model-value="toggleDarkMode" />
                <span>深色模式: {{ $q.dark.isActive ? '开启' : '关闭' }}</span>
                <q-btn flat label="切换" @click="$q.dark.toggle()" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- 代码示例 -->
      <q-expansion-item label="💻 代码示例" icon="code">
        <q-card flat bordered>
          <q-card-section>
            <q-tabs v-model="codeTab" align="left">
              <q-tab name="basic" label="基础用法" />
              <q-tab name="advanced" label="高级用法" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="codeTab" animated>
              <q-tab-panel name="basic">
                <div class="code-example">
                  <div class="text-subtitle2 q-mb-sm">基础 API 使用</div>
                  <div class="code-block">
                    // 导入<br>
                    import { useQuasar } from 'quasar'<br>
                    <br>
                    // 在 setup 中使用<br>
                    const $q = useQuasar()<br>
                    <br>
                    // 通知<br>
                    $q.notify({<br>
                    &nbsp;&nbsp;message: '操作成功',<br>
                    &nbsp;&nbsp;color: 'positive',<br>
                    &nbsp;&nbsp;position: 'top'<br>
                    })<br>
                    <br>
                    // 对话框<br>
                    $q.dialog({<br>
                    &nbsp;&nbsp;title: '确认',<br>
                    &nbsp;&nbsp;message: '确定要删除吗？',<br>
                    &nbsp;&nbsp;cancel: true<br>
                    }).onOk(() => {<br>
                    &nbsp;&nbsp;console.log('用户确认')<br>
                    })
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="advanced">
                <div class="code-example">
                  <div class="text-subtitle2 q-mb-sm">响应式设计</div>
                  <div class="code-block">
                    // 响应式布局<br>
                    const isMobile = computed(() => $q.screen.lt.md)<br>
                    <br>
                    // 根据屏幕大小调整<br>
                    const columns = computed(() => {<br>
                    &nbsp;&nbsp;if ($q.screen.xs) return 1<br>
                    &nbsp;&nbsp;if ($q.screen.sm) return 2<br>
                    &nbsp;&nbsp;return 3<br>
                    })<br>
                    <br>
                    // 平台特定逻辑<br>
                    if ($q.platform.is.mobile) {<br>
                    &nbsp;&nbsp;// 移动端专用逻辑<br>
                    }
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>

    <q-separator />

    <!-- useMeta -->
    <q-card>
      <q-card-section>
        <div class="text-h6 text-positive">2. useMeta()</div>
        <div class="text-subtitle2 text-grey-7">动态设置页面 meta 信息（SEO 优化必备）</div>
      </q-card-section>

      <q-expansion-item label="功能演示" icon="web">
        <q-card>
          <q-card-section class="q-gutter-md">
            <div>
              <div class="text-subtitle1 q-mb-sm">🔧 动态设置页面信息</div>
              <div class="q-gutter-sm">
                <q-btn color="primary" label="设置首页信息" @click="setHomeMeta" />
                <q-btn color="secondary" label="设置产品页信息" @click="setProductMeta" />
                <q-btn color="positive" label="设置用户页信息" @click="setUserMeta" />
                <q-btn color="grey" label="重置页面信息" @click="resetMeta" />
              </div>
            </div>

            <q-separator />

            <div>
              <div class="text-subtitle1 q-mb-sm">📄 当前页面信息</div>
              <q-list dense bordered class="rounded-borders">
                <q-item>
                  <q-item-section>
                    <q-item-label caption>页面标题</q-item-label>
                    <q-item-label>{{ currentMeta.title }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>页面描述</q-item-label>
                    <q-item-label>{{ currentMeta.description }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>关键词</q-item-label>
                    <q-item-label>{{ currentMeta.keywords }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>

    <q-separator />

    <!-- useDialogPluginComponent -->
    <q-card>
      <q-card-section>
        <div class="text-h6 text-secondary">3. useDialogPluginComponent()</div>
        <div class="text-subtitle2 text-grey-7">创建可复用的对话框插件组件</div>
      </q-card-section>

      <q-expansion-item label="📖 使用说明" icon="info">
        <q-card>
          <q-card-section>
            <div class="text-body1 q-mb-md">
              useDialogPluginComponent 主要用于创建可复用的对话框组件，特别适合：
            </div>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="edit" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>用户信息编辑对话框</q-item-label>
                  <q-item-label caption>复杂的用户资料编辑表单</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="delete" color="negative" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>确认删除对话框</q-item-label>
                  <q-item-label caption>带详细信息的删除确认</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="shopping_cart" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>购物车对话框</q-item-label>
                  <q-item-label caption>商品选择和配置</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>

    <q-separator />

    <!-- useFormChild -->
    <q-card>
      <q-card-section>
        <div class="text-h6 text-orange">4. useFormChild()</div>
        <div class="text-subtitle2 text-grey-7">在 q-form 中注册自定义表单组件</div>
      </q-card-section>

      <q-expansion-item label="📝 表单演示" icon="edit_note">
        <q-card>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input v-model="formData.name" label="姓名" :rules="[val => !!val || '姓名必填']" outlined />

              <q-input v-model="formData.email" label="邮箱" type="email" :rules="[
                val => !!val || '邮箱必填',
                val => /.+@.+\..+/.test(val) || '邮箱格式错误'
              ]" outlined />

              <div>
                <q-btn label="提交表单" type="submit" color="primary" />
                <q-btn label="重置" type="reset" color="grey" flat class="q-ml-sm" />
              </div>
            </q-form>

            <div class="text-caption text-info q-mt-md">
              💡 这演示了基础表单验证，useFormChild 主要用于创建自定义表单组件
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item label="🛠️ 使用场景" icon="build">
        <q-card>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="input" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>自定义输入控件</q-item-label>
                  <q-item-label caption>带特殊验证逻辑的输入框</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="date_range" color="secondary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>复合组件</q-item-label>
                  <q-item-label caption>日期范围选择器等复杂组件</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="tune" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>可配置组件</q-item-label>
                  <q-item-label caption>根据配置生成不同行为的组件</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>

    <q-separator />

    <!-- 实际应用技巧 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">💡 实际应用技巧</div>
      </q-card-section>

      <q-expansion-item label="🎯 响应式设计最佳实践" icon="devices" default-opened>
        <q-card>
          <q-card-section>
            <div class="q-mb-md">
              <div class="text-subtitle1">当前屏幕信息</div>
              <q-list dense>
                <q-item>
                  <q-item-section>屏幕尺寸</q-item-section>
                  <q-item-section side>{{ $q.screen.width }} x {{ $q.screen.height }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>设备类型</q-item-section>
                  <q-item-section side>
                    <q-badge :color="$q.platform.is.mobile ? 'positive' : 'grey'">
                      {{ $q.platform.is.mobile ? '移动设备' : '桌面设备' }}
                    </q-badge>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>当前断点</q-item-section>
                  <q-item-section side>
                    <q-badge v-if="$q.screen.xs" color="red">XS</q-badge>
                    <q-badge v-else-if="$q.screen.sm" color="orange">SM</q-badge>
                    <q-badge v-else-if="$q.screen.md" color="blue">MD</q-badge>
                    <q-badge v-else-if="$q.screen.lg" color="green">LG</q-badge>
                    <q-badge v-else color="purple">XL</q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="text-body2 q-mb-sm">💡 根据屏幕大小调整布局：</div>
            <div class="row q-col-gutter-sm">
              <div :class="responsiveClass" v-for="i in 6" :key="i">
                <q-card flat bordered>
                  <q-card-section class="text-center">
                    卡片 {{ i }}
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item label="🔔 通知系统最佳实践" icon="notifications">
        <q-card>
          <q-card-section>
            <div class="text-body1 q-mb-md">建议封装通知函数：</div>
            <div class="code-block q-mb-md">
              // composables/useNotification.js<br>
              export function useNotification() {<br>
              &nbsp;&nbsp;const $q = useQuasar()<br>
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;const success = (msg) => $q.notify({<br>
              &nbsp;&nbsp;&nbsp;&nbsp;message: msg,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;color: 'positive',<br>
              &nbsp;&nbsp;&nbsp;&nbsp;icon: 'check_circle'<br>
              &nbsp;&nbsp;})<br>
              &nbsp;&nbsp;<br>
              &nbsp;&nbsp;return { success, error, warning }<br>
              }
            </div>
            <div class="q-gutter-sm">
              <q-btn color="positive" label="测试成功" @click="testNotifications('success')" />
              <q-btn color="negative" label="测试错误" @click="testNotifications('error')" />
              <q-btn color="warning" label="测试警告" @click="testNotifications('warning')" />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item label="🌍 SEO 和 Meta 优化" icon="public">
        <q-card>
          <q-card-section>
            <div class="text-body1 q-mb-md">useMeta 用于 SEO 优化：</div>

            <div class="q-gutter-sm q-mb-md">
              <q-btn color="primary" label="电商页面 SEO" @click="setEcommerceMeta" />
              <q-btn color="secondary" label="博客文章 SEO" @click="setBlogMeta" />
              <q-btn color="positive" label="用户中心 SEO" @click="setUserCenterMeta" />
            </div>

            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2">当前页面 Meta 设置：</div>
                <div class="q-mt-sm text-caption">
                  标题：{{ currentMeta.title }}<br>
                  描述：{{ currentMeta.description }}<br>
                  关键词：{{ currentMeta.keywords }}
                </div>
              </q-card-section>
            </q-card>

            <div class="code-block q-mt-md">
              // 动态 Meta 设置<br>
              useMeta(computed(() => ({<br>
              &nbsp;&nbsp;title: product.value?.name + ' - 商城',<br>
              &nbsp;&nbsp;meta: {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;description: { <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'description', <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content: product.value?.description <br>
              &nbsp;&nbsp;&nbsp;&nbsp;}<br>
              &nbsp;&nbsp;}<br>
              })))
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>

    <q-separator />

    <!-- 总结 -->
    <q-card class="bg-grey-1">
      <q-card-section>
        <div class="text-h6">📋 学习总结</div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="1" />
            </q-item-section>
            <q-item-section>
              <q-item-label>useQuasar() - 核心 API</q-item-label>
              <q-item-label caption>通知、对话框、加载、屏幕检测、平台检测</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar color="secondary" text-color="white" icon="2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>useMeta() - SEO 优化</q-item-label>
              <q-item-label caption>页面标题、描述、关键词、Open Graph</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar color="orange" text-color="white" icon="3" />
            </q-item-section>
            <q-item-section>
              <q-item-label>useDialogPluginComponent() - 对话框插件</q-item-label>
              <q-item-label caption>创建可复用的对话框组件</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar color="positive" text-color="white" icon="4" />
            </q-item-section>
            <q-item-section>
              <q-item-label>useFormChild() - 表单集成</q-item-label>
              <q-item-label caption>将自定义组件集成到 q-form 验证系统</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar, useMeta } from 'quasar'

const $q = useQuasar()

// 当前组件的 meta 信息
const currentMeta = ref({
  title: 'Quasar 组合式函数学习',
  description: '学习 useQuasar、useDialogPluginComponent、useFormChild、useMeta 的使用',
  keywords: 'Vue3, Quasar, Composables, 组合式函数'
})

// 设置页面 meta
useMeta(() => ({
  title: currentMeta.value.title,
  meta: {
    description: { name: 'description', content: currentMeta.value.description },
    keywords: { name: 'keywords', content: currentMeta.value.keywords }
  }
}))

const darkMode = ref($q.dark.isActive)
const formData = ref({
  name: '',
  email: ''
})
const codeTab = ref('basic')

// 响应式布局类
const responsiveClass = computed(() => {
  if ($q.screen.xs) return 'col-12'
  if ($q.screen.sm) return 'col-6'
  if ($q.screen.md) return 'col-4'
  return 'col-2'
})

// useQuasar 演示函数
function showSuccessNotify() {
  $q.notify({
    message: '✅ 操作成功！',
    color: 'positive',
    icon: 'check_circle',
    position: 'top-right'
  })
}

function showErrorNotify() {
  $q.notify({
    message: '❌ 操作失败，请重试',
    color: 'negative',
    icon: 'error',
    position: 'top-right'
  })
}

function showWarningNotify() {
  $q.notify({
    message: '⚠️ 请注意：数据将被覆盖',
    color: 'warning',
    icon: 'warning',
    textColor: 'dark',
    position: 'top-right'
  })
}

function showInfoNotify() {
  $q.notify({
    message: 'ℹ️ 新版本可用，请更新',
    color: 'info',
    icon: 'info',
    position: 'top-right'
  })
}

function showCustomNotify() {
  $q.notify({
    message: '⭐ 自定义通知样式',
    color: 'purple',
    icon: 'star',
    position: 'bottom',
    timeout: 5000,
    actions: [
      { label: '查看', color: 'yellow', handler: () => console.log('查看') },
      { label: '关闭', color: 'white' }
    ]
  })
}

function showConfirmDialog() {
  $q.dialog({
    title: '确认操作',
    message: '确定要执行此操作吗？此操作不可撤销。',
    cancel: true,
    persistent: true
  }).onOk(() => {
    $q.notify('用户确认了操作')
  }).onCancel(() => {
    $q.notify('用户取消了操作')
  })
}

function showPromptDialog() {
  $q.dialog({
    title: '输入信息',
    message: '请输入您的姓名：',
    prompt: {
      model: '',
      type: 'text',
      isValid: val => val.length > 0
    },
    cancel: true
  }).onOk(data => {
    $q.notify(`你好，${data}！`)
  })
}

function showOptionDialog() {
  $q.dialog({
    title: '选择操作',
    message: '请选择要执行的操作：',
    options: {
      type: 'radio',
      model: 'edit',
      items: [
        { label: '编辑', value: 'edit' },
        { label: '删除', value: 'delete' },
        { label: '复制', value: 'copy' }
      ]
    },
    cancel: true
  }).onOk(data => {
    $q.notify(`选择了：${data}`)
  })
}

function showLoading() {
  $q.loading.show({
    message: '请稍候...'
  })

  setTimeout(() => {
    $q.loading.hide()
    $q.notify('加载完成')
  }, 2000)
}

function showCustomLoading() {
  $q.loading.show({
    spinner: 'q-spinner-gears',
    spinnerColor: 'red',
    spinnerSize: 80,
    backgroundColor: 'purple',
    message: '正在处理数据...',
    messageColor: 'white'
  })

  setTimeout(() => {
    $q.loading.hide()
  }, 2000)
}

function toggleDarkMode(val) {
  $q.dark.set(val)
}

// useMeta 演示函数
function setHomeMeta() {
  currentMeta.value = {
    title: '首页 - 我的网站',
    description: '欢迎来到我的网站首页，这里有最新的产品和服务',
    keywords: '首页,产品,服务,公司'
  }
  $q.notify('✅ 已设置首页 meta 信息')
}

function setProductMeta() {
  currentMeta.value = {
    title: '高端智能手机 - 产品详情',
    description: '最新款智能手机，顶级配置，卓越性能，现在购买享受优惠',
    keywords: '智能手机,高端,科技,购买'
  }
  $q.notify('✅ 已设置产品页 meta 信息')
}

function setUserMeta() {
  currentMeta.value = {
    title: '张三的个人主页 - 用户中心',
    description: '查看张三的个人信息、动态和联系方式',
    keywords: '用户,个人主页,张三,联系方式'
  }
  $q.notify('✅ 已设置用户页 meta 信息')
}

function resetMeta() {
  currentMeta.value = {
    title: 'Quasar 组合式函数学习',
    description: '学习 useQuasar、useDialogPluginComponent、useFormChild、useMeta 的使用',
    keywords: 'Vue3, Quasar, Composables, 组合式函数'
  }
  $q.notify('🔄 已重置页面 meta 信息')
}

function setEcommerceMeta() {
  currentMeta.value = {
    title: '限时特惠 - iPhone 15 Pro Max - 科技商城',
    description: '全新 iPhone 15 Pro Max，A17 Pro 芯片，钛金属设计，现在购买享 8 折优惠',
    keywords: 'iPhone,手机,苹果,限时特惠,科技'
  }
  $q.notify('🛒 电商页面 SEO 已优化')
}

function setBlogMeta() {
  currentMeta.value = {
    title: 'Vue 3 + Quasar 开发实战指南 - 技术博客',
    description: '深入学习 Vue 3 Composition API 和 Quasar Framework，从入门到实战',
    keywords: 'Vue3,Quasar,前端开发,教程,实战'
  }
  $q.notify('📝 博客文章 SEO 已优化')
}

function setUserCenterMeta() {
  currentMeta.value = {
    title: '个人中心 - 设置与管理',
    description: '管理您的账户信息、偏好设置和隐私选项',
    keywords: '个人中心,账户设置,用户管理'
  }
  $q.notify('👤 用户中心 SEO 已优化')
}

function testNotifications(type) {
  const messages = {
    success: { message: '✅ 操作成功！', color: 'positive' },
    error: { message: '❌ 操作失败！', color: 'negative' },
    warning: { message: '⚠️ 请注意检查！', color: 'warning', textColor: 'dark' }
  }

  $q.notify(messages[type])
}

function onSubmit() {
  $q.notify({
    message: '📝 表单提交成功！',
    color: 'positive'
  })
}
</script>

<style scoped>
.code-block {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
  color: #333;
  border-left: 4px solid var(--q-primary);
}

.code-example {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}
</style>
