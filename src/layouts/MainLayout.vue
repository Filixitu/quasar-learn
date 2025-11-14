<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-icon name="widgets" size="sm" class="q-mr-sm" />
          Quasar 组件学习库
        </q-toolbar-title>

        <q-btn flat dense round icon="dark_mode" @click="toggleDark">
          <q-tooltip>切换深色模式</q-tooltip>
        </q-btn>

        <q-btn flat dense round icon="help_outline" href="https://www.quasar-cn.cn/vue-components/" target="_blank">
          <q-tooltip>官方文档</q-tooltip>
        </q-btn>

        <div class="text-caption q-ml-md">Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <!-- 用户信息区域 -->
      <div class="q-pa-md bg-primary text-white">
        <div class="row items-center q-gutter-sm">
          <q-avatar size="48px" color="white" text-color="primary" icon="person" />
          <div>
            <div class="text-subtitle1">学习者</div>
            <div class="text-caption">开始你的 Quasar 之旅</div>
          </div>
        </div>
      </div>

      <q-scroll-area style="height: calc(100vh - 180px)">
        <q-list>
          <q-item-label header>快捷导航</q-item-label>

          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>

        <q-separator />

        <q-list>
          <q-item-label header>学习资源</q-item-label>
          <q-item clickable tag="a" href="https://www.quasar-cn.cn/" target="_blank">
            <q-item-section avatar>
              <q-icon name="school" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>中文文档</q-item-label>
              <q-item-label caption>Quasar 官方中文文档</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!-- 底部统计 -->
      <div class="absolute-bottom q-pa-md bg-grey-2">
        <div class="text-caption text-grey-7 text-center">
          <q-icon name="check_circle" color="positive" size="xs" />
          已学习 34+ 个组件
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'

const $q = useQuasar()

const linksList = [
  {
    title: '组件库',
    caption: '学习 Quasar 组件',
    icon: 'widgets',
    link: '/components',
  },
  {
    title: 'Cordova插件',
    caption: '移动端插件演示',
    icon: 'extension',
    link: '/cordova',
  },
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleDark() {
  $q.dark.toggle()
  $q.notify({
    message: $q.dark.isActive ? '已启用深色模式' : '已关闭深色模式',
    color: $q.dark.isActive ? 'grey-8' : 'primary',
    position: 'top',
    timeout: 1000
  })
}
</script>
