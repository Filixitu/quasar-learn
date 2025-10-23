<template>
    <div class="q-gutter-md">
        <div class="text-h6">Vue Router 路由管理</div>

        <!-- 基础路由导航 -->
        <q-card style="max-width: 800px">
            <q-card-section>
                <div class="text-subtitle1 q-mb-md">编程式导航</div>
                <div class="q-gutter-sm">
                    <q-btn color="primary" label="跳转到首页" @click="goToHome" />
                    <q-btn color="secondary" label="跳转到组件库" @click="goToComponents" />
                    <q-btn color="info" label="带查询参数跳转" @click="goWithQuery" />
                    <q-btn color="orange" label="替换当前路由" @click="replaceRoute" />
                    <q-btn color="grey" label="返回上一页" @click="goBack" />
                </div>
            </q-card-section>
        </q-card>

        <q-separator />

        <!-- 路由信息展示 -->
        <q-card style="max-width: 800px">
            <q-card-section>
                <div class="text-subtitle1 q-mb-md">当前路由信息</div>
                <q-list dense>
                    <q-item>
                        <q-item-section>
                            <q-item-label caption>路径 (path)</q-item-label>
                            <q-item-label>{{ route.path }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label caption>名称 (name)</q-item-label>
                            <q-item-label>{{ route.name }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label caption>查询参数 (query)</q-item-label>
                            <q-item-label>{{ JSON.stringify(route.query) }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label caption>路由参数 (params)</q-item-label>
                            <q-item-label>{{ JSON.stringify(route.params) }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>

        <q-separator />

        <!-- 路由守卫示例 -->
        <div class="text-h6">路由守卫（路由拦截）</div>
        <q-card style="max-width: 800px">
            <q-card-section>
                <div class="text-subtitle2 q-mb-md">常用路由守卫场景</div>
                <q-list>
                    <q-expansion-item icon="lock" label="1. 登录验证" caption="未登录用户访问受保护页面时跳转到登录页">
                        <q-card>
                            <q-card-section>
                                <pre class="code-block">// router/index.js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // 需要登录的页面
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})</pre>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-expansion-item icon="admin_panel_settings" label="2. 权限控制" caption="根据用户权限控制页面访问">
                        <q-card>
                            <q-card-section>
                                <pre class="code-block">// router/index.js
router.beforeEach((to, from, next) => {
  const userPermissions = store.state.user.permissions
  const requiredPermission = to.meta.permission

  if (requiredPermission && !userPermissions.includes(requiredPermission)) {
    next({ name: '403' }) // 无权限页面
  } else {
    next()
  }
})</pre>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-expansion-item icon="description" label="3. 页面标题" caption="动态设置页面标题">
                        <q-card>
                            <q-card-section>
                                <pre class="code-block">// router/index.js
router.afterEach((to) => {
  document.title = to.meta.title || '默认标题'
})</pre>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-expansion-item icon="hourglass_empty" label="4. 加载进度条" caption="页面切换时显示进度条">
                        <q-card>
                            <q-card-section>
                                <pre class="code-block">// router/index.js
import { LoadingBar } from 'quasar'

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})

router.afterEach(() => {
  LoadingBar.stop()
})</pre>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-list>
            </q-card-section>
        </q-card>

        <q-separator />

        <!-- 路由配置示例 -->
        <div class="text-h6">路由配置最佳实践</div>
        <q-card style="max-width: 800px">
            <q-card-section>
                <pre class="code-block">// router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          title: '首页',
          requiresAuth: false
        }
      },
      {
        path: 'components',
        name: 'components',
        component: () => import('pages/ComponentsPage.vue'),
        meta: {
          title: '组件库',
          requiresAuth: false
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          title: '控制台',
          requiresAuth: true,
          permission: 'admin'
        }
      },
      {
        path: 'user/:id',
        name: 'userDetail',
        component: () => import('pages/UserDetail.vue'),
        props: true, // 将路由参数作为 props 传递
        meta: { title: '用户详情' }
      }
    ]
  },

  // 404 页面
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes</pre>
            </q-card-section>
        </q-card>

        <q-separator />

        <!-- 实用技巧 -->
        <div class="text-h6">实用技巧</div>
        <q-list bordered class="rounded-borders" style="max-width: 800px">
            <q-item>
                <q-item-section avatar>
                    <q-icon name="lightbulb" color="orange" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>懒加载路由组件</q-item-label>
                    <q-item-label caption>使用 import() 动态导入，提升首屏加载速度</q-item-label>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section avatar>
                    <q-icon name="bookmark" color="primary" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>使用命名路由</q-item-label>
                    <q-item-label caption>router.push({ name: 'home' }) 比路径更可靠</q-item-label>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section avatar>
                    <q-icon name="settings" color="secondary" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>使用 meta 字段</q-item-label>
                    <q-item-label caption>存储路由的额外信息，如标题、权限要求等</q-item-label>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section avatar>
                    <q-icon name="code" color="positive" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>props 传参</q-item-label>
                    <q-item-label caption>设置 props: true 将路由参数作为组件 props</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

function goToHome() {
    router.push('/')
    $q.notify('跳转到首页')
}

function goToComponents() {
    router.push('/components')
    $q.notify('跳转到组件库')
}

function goWithQuery() {
    router.push({
        path: '/components',
        query: { tab: 'form', demo: 'input' }
    })
    $q.notify('带查询参数跳转')
}

function replaceRoute() {
    router.replace('/')
    $q.notify('替换当前路由（不会在历史记录中留下记录）')
}

function goBack() {
    router.go(-1)
    $q.notify('返回上一页')
}
</script>

<style scoped>
.code-block {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.5;
}
</style>
