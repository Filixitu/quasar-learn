<template>
  <div class="q-pa-md">
    <div class="text-h4 q-mb-md">
      <q-icon name="language" class="q-mr-sm" />
      多语言支持 (i18n) 演示
    </div>

    <!-- 语言切换器 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">🌐 语言切换</div>
        <div class="q-gutter-sm">
          <q-btn :color="currentLocale === 'zh-CN' ? 'primary' : 'grey'" :outline="currentLocale !== 'zh-CN'"
            @click="changeLocale('zh-CN')" label="中文" icon="flag" />
          <q-btn :color="currentLocale === 'en-US' ? 'primary' : 'grey'" :outline="currentLocale !== 'en-US'"
            @click="changeLocale('en-US')" label="English" icon="flag" />
        </div>
        <div class="text-caption text-grey-6 q-mt-sm">
          当前语言: {{ currentLocale }}
        </div>
      </q-card-section>
    </q-card>

    <!-- 基本文本翻译 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">📝 基本文本翻译</div>
        <div class="q-gutter-md">
          <q-chip color="positive" text-color="white" icon="check">
            {{ $t('success') }}
          </q-chip>
          <q-chip color="negative" text-color="white" icon="error">
            {{ $t('failed') }}
          </q-chip>
          <q-chip color="orange" text-color="white" icon="hourglass_empty">
            {{ $t('loading') }}
          </q-chip>
        </div>

        <q-separator class="q-my-md" />

        <div class="text-subtitle2 q-mb-sm">导航菜单:</div>
        <div class="q-gutter-sm">
          <q-btn outline color="primary" :label="$t('nav.home')" />
          <q-btn outline color="primary" :label="$t('nav.components')" />
          <q-btn outline color="primary" :label="$t('nav.about')" />
        </div>
      </q-card-section>
    </q-card>

    <!-- 参数插值 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">🔄 参数插值</div>
        <div class="q-mb-md">
          <q-input v-model="userName" :label="$t('form.name')" outlined dense style="max-width: 200px"
            class="q-mb-sm" />
          <div class="text-body1">
            {{ $t('user.welcome', { name: userName || '用户' }) }}
          </div>
        </div>

        <q-separator class="q-my-md" />

        <div class="q-mb-md">
          <q-input v-model.number="componentCount" type="number" :label="'组件数量'" outlined dense style="max-width: 150px"
            class="q-mb-sm" />
          <div class="text-body1">
            {{ $t('pages.home.description', { count: componentCount }) }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 复数处理 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">🔢 复数处理</div>
        <div class="q-mb-md">
          <q-slider v-model="itemCount" :min="0" :max="10" :step="1" label class="q-mb-md" />
          <div class="text-body1">
            购物车有 {{ itemCount }} {{ $t('cart.item', itemCount) }}
          </div>
        </div>

        <div class="q-mb-md">
          <q-slider v-model="timeValue" :min="1" :max="60" :step="1" label class="q-mb-md" />
          <div class="text-body1">
            {{ $t('time.minutesAgo', { n: timeValue }, timeValue) }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 嵌套对象翻译 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">🗂️ 嵌套对象翻译</div>
        <div class="q-gutter-md">
          <div>
            <div class="text-subtitle2">主题设置:</div>
            <q-btn-group>
              <q-btn outline :label="$t('user.theme.light')" icon="light_mode" />
              <q-btn outline :label="$t('user.theme.dark')" icon="dark_mode" />
              <q-btn outline :label="$t('user.theme.auto')" icon="brightness_auto" />
            </q-btn-group>
          </div>

          <div>
            <div class="text-subtitle2">表单字段:</div>
            <div class="column q-gutter-sm" style="max-width: 300px">
              <q-input outlined dense :label="$t('form.email')" type="email" />
              <q-input outlined dense :label="$t('form.password')" type="password" />
              <q-input outlined dense :label="$t('form.confirmPassword')" type="password" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 组合式 API 使用 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">⚙️ 组合式 API 使用</div>
        <div class="q-mb-md">
          <q-btn color="primary" :label="compositionApiText" @click="showMessage" class="q-mr-sm" />
          <q-btn color="secondary" :label="formatCurrency(199.99)" @click="toggleCurrency" />
        </div>
        <div class="text-caption text-grey-6">
          演示在 setup() 中使用 useI18n 钩子
        </div>
      </q-card-section>
    </q-card>

    <!-- 代码示例 -->
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-md">💻 代码示例</div>
        <q-tabs v-model="activeTab" dense class="text-grey" active-color="primary">
          <q-tab name="template" label="模板语法" />
          <q-tab name="script" label="脚本语法" />
          <q-tab name="config" label="配置文件" />
        </q-tabs>

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="template">
            <pre class="code-block"><code>{{ templateCode }}</code></pre>
          </q-tab-panel>
          <q-tab-panel name="script">
            <pre class="code-block"><code>{{ scriptCode }}</code></pre>
          </q-tab-panel>
          <q-tab-panel name="config">
            <pre class="code-block"><code>{{ configCode }}</code></pre>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export default {
  name: 'I18nDemo',
  setup() {
    const $q = useQuasar()
    const { t, locale } = useI18n()

    // 响应式数据
    const userName = ref('张三')
    const componentCount = ref(34)
    const itemCount = ref(3)
    const timeValue = ref(5)
    const activeTab = ref('template')
    const isCNY = ref(true)

    // 计算属性
    const currentLocale = computed(() => locale.value)
    const compositionApiText = computed(() => t('user.settings'))

    // 方法
    const changeLocale = (newLocale) => {
      locale.value = newLocale
      $q.notify({
        message: `语言已切换为: ${newLocale === 'zh-CN' ? '中文' : 'English'}`,
        color: 'positive',
        position: 'top'
      })
    }

    const showMessage = () => {
      $q.notify({
        message: t('success'),
        color: 'positive'
      })
    }

    const formatCurrency = (amount) => {
      const currency = isCNY.value ? '¥' : '$'
      return `${currency}${amount}`
    }

    const toggleCurrency = () => {
      isCNY.value = !isCNY.value
    }

    // 代码示例
    const templateCode = `<!-- 基本用法 -->
<template>
  <!-- 直接翻译 -->
  <div>{{ $t('success') }}</div>

  <!-- 带参数插值 -->
  <div>{{ $t('user.welcome', { name: userName }) }}</div>

  <!-- 复数处理 -->
  <div>{{ $t('cart.item', itemCount) }}</div>

  <!-- 嵌套对象 -->
  <div>{{ $t('user.theme.light') }}</div>
</template>`

    const scriptCode = `// 组合式 API
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t, locale } = useI18n()

    // 翻译文本
    const message = computed(() => t('success'))

    // 切换语言
    const changeLanguage = (lang) => {
      locale.value = lang
    }

    // 带参数翻译
    const welcomeText = computed(() =>
      t('user.welcome', { name: 'John' })
    )

    return {
      message,
      changeLanguage,
      welcomeText
    }
  }
}`

    const configCode = `// i18n/zh-CN/index.js
export default {
  success: '操作成功',
  user: {
    welcome: '欢迎回来，{name}！',
    theme: {
      light: '浅色主题',
      dark: '深色主题'
    }
  },
  cart: {
    item: '商品 | 商品' // 复数形式
  }
}

// boot/i18n.js
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

const i18n = createI18n({
  locale: 'zh-CN',
  globalInjection: true,
  messages
})`

    return {
      userName,
      componentCount,
      itemCount,
      timeValue,
      activeTab,
      currentLocale,
      compositionApiText,
      changeLocale,
      showMessage,
      formatCurrency,
      toggleCurrency,
      templateCode,
      scriptCode,
      configCode
    }
  }
}
</script>

<style scoped>
.code-block {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  color: #333;
}

.q-dark .code-block {
  background: #1e1e1e;
  border-color: #333;
}

.q-dark .code-block code {
  color: #e0e0e0;
}
</style>
