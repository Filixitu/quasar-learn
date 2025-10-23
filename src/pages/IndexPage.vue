<template>
  <q-page class="flex flex-center bg-gradient">
    <div class="text-center q-pa-md">
      <div class="animated-logo q-mb-md">
        <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />
      </div>

      <div class="text-h3 q-mb-md text-weight-bold">
        Quasar 组件学习库
      </div>

      <div class="text-h6 text-grey-7 q-mb-xl" style="max-width: 600px; margin: 0 auto">
        一个完整的 Quasar Framework 组件学习平台
        <br>
        包含 34+ 个组件演示，涵盖实际开发的各种场景
      </div>

      <div class="row justify-center q-gutter-md q-mb-xl">
        <q-card flat bordered style="width: 200px" class="hover-card">
          <q-card-section class="text-center">
            <q-icon name="widgets" size="48px" color="primary" />
            <div class="text-h4 text-primary q-mt-sm">34+</div>
            <div class="text-caption text-grey-7">组件演示</div>
          </q-card-section>
        </q-card>

        <q-card flat bordered style="width: 200px" class="hover-card">
          <q-card-section class="text-center">
            <q-icon name="category" size="48px" color="secondary" />
            <div class="text-h4 text-secondary q-mt-sm">6</div>
            <div class="text-caption text-grey-7">组件分类</div>
          </q-card-section>
        </q-card>

        <q-card flat bordered style="width: 200px" class="hover-card">
          <q-card-section class="text-center">
            <q-icon name="code" size="48px" color="positive" />
            <div class="text-h4 text-positive q-mt-sm">100%</div>
            <div class="text-caption text-grey-7">实用场景</div>
          </q-card-section>
        </q-card>
      </div>

      <q-btn to="/components" color="primary" size="xl" label="开始学习" icon="play_arrow" unelevated
        class="q-px-xl btn-pulse" />

      <div class="q-mt-xl">
        <div class="text-subtitle2 text-grey-7 q-mb-md">✨ 特色功能</div>
        <div class="row justify-center q-gutter-sm">
          <q-chip icon="search" color="primary" text-color="white">搜索组件</q-chip>
          <q-chip icon="code" color="secondary" text-color="white">查看代码</q-chip>
          <q-chip icon="refresh" color="positive" text-color="white">实时预览</q-chip>
          <q-chip icon="school" color="info" text-color="white">学习指南</q-chip>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
//
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(to bottom, rgba(103, 58, 183, 0.05), rgba(103, 58, 183, 0.02));
}

.animated-logo {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

.hover-card {
  transition: all 0.3s;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.btn-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }

  50% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
}
</style>
