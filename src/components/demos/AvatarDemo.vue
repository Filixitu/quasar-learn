<template>
  <div class="q-gutter-md">
    <div class="text-h6">基础头像</div>
    <div class="q-gutter-sm row items-center">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
      <q-avatar color="primary" text-color="white">A</q-avatar>
      <q-avatar color="teal" text-color="white">李</q-avatar>
      <q-avatar color="red" text-color="white" icon="person" />
      <q-avatar color="orange" text-color="white" icon="directions_bike" />
    </div>

    <q-separator />

    <div class="text-h6">不同尺寸</div>
    <div class="q-gutter-sm row items-center">
      <q-avatar size="24px" color="primary" text-color="white">A</q-avatar>
      <q-avatar size="32px" color="primary" text-color="white">B</q-avatar>
      <q-avatar size="42px" color="primary" text-color="white">C</q-avatar>
      <q-avatar size="56px" color="primary" text-color="white">D</q-avatar>
      <q-avatar size="72px" color="primary" text-color="white">E</q-avatar>
      <q-avatar size="96px" color="primary" text-color="white">F</q-avatar>
    </div>

    <q-separator />

    <div class="text-h6">不同形状</div>
    <div class="q-gutter-sm row items-center">
      <q-avatar size="56px" color="primary" text-color="white">
        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
      </q-avatar>
      <q-avatar size="56px" color="primary" text-color="white" square>
        <img src="https://cdn.quasar.dev/img/avatar3.jpg">
      </q-avatar>
      <q-avatar size="56px" color="primary" text-color="white" rounded>
        <img src="https://cdn.quasar.dev/img/avatar4.jpg">
      </q-avatar>
    </div>

    <q-separator />

    <div class="text-h6">带徽章的头像</div>
    <div class="q-gutter-md row items-center">
      <q-avatar size="56px">
        <img src="https://cdn.quasar.dev/img/avatar.png">
        <q-badge color="red" floating>5</q-badge>
      </q-avatar>

      <q-avatar size="56px" color="primary" text-color="white">
        李四
        <q-badge color="green" floating rounded />
      </q-avatar>

      <q-avatar size="56px" color="teal" text-color="white" icon="person">
        <q-badge color="orange" floating>VIP</q-badge>
      </q-avatar>
    </div>

    <q-separator />

    <div class="text-h6">头像组</div>
    <div class="q-gutter-md">
      <q-avatar-group>
        <q-avatar size="48px">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <q-avatar size="48px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
        <q-avatar size="48px">
          <img src="https://cdn.quasar.dev/img/avatar3.jpg">
        </q-avatar>
        <q-avatar size="48px" color="primary" text-color="white">+3</q-avatar>
      </q-avatar-group>
    </div>

    <q-separator />

    <div class="text-h6">用户信息卡片</div>
    <q-card style="max-width: 300px">
      <q-card-section class="row items-center q-pb-none">
        <q-avatar size="72px">
          <img src="https://cdn.quasar.dev/img/avatar.png">
          <q-badge color="green" floating rounded />
        </q-avatar>
        <div class="q-ml-md">
          <div class="text-h6">张三</div>
          <div class="text-subtitle2 text-grey-7">在线</div>
        </div>
      </q-card-section>
      <q-card-section>
        这是一个演示用户信息卡片，展示如何结合头像和其他组件使用。
      </q-card-section>
      <q-card-actions>
        <q-btn flat color="primary">关注</q-btn>
        <q-btn flat>消息</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
