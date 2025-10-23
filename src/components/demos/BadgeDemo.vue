<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础徽章</div>
        <div class="q-gutter-lg row items-center">
            <q-badge color="primary">Primary</q-badge>
            <q-badge color="secondary">Secondary</q-badge>
            <q-badge color="positive">Success</q-badge>
            <q-badge color="negative">Error</q-badge>
            <q-badge color="warning">Warning</q-badge>
            <q-badge color="info">Info</q-badge>
        </div>

        <q-separator />

        <div class="text-h6">数字徽章</div>
        <div class="q-gutter-lg row items-center">
            <q-badge color="red">1</q-badge>
            <q-badge color="red">99</q-badge>
            <q-badge color="red">999+</q-badge>
            <q-badge color="primary" rounded>NEW</q-badge>
            <q-badge color="orange" rounded>HOT</q-badge>
        </div>

        <q-separator />

        <div class="text-h6">浮动徽章</div>
        <div class="q-gutter-xl row items-center">
            <q-btn color="primary" label="消息">
                <q-badge color="red" floating>5</q-badge>
            </q-btn>

            <q-icon name="notifications" size="36px" color="grey-7">
                <q-badge color="red" floating>12</q-badge>
            </q-icon>

            <q-icon name="mail" size="36px" color="grey-7">
                <q-badge color="red" floating rounded />
            </q-icon>

            <q-chip color="primary" text-color="white" icon="bookmark">
                收藏
                <q-badge color="red" floating>99+</q-badge>
            </q-chip>
        </div>

        <q-separator />

        <div class="text-h6">不同位置的徽章</div>
        <div class="q-gutter-xl row items-center">
            <q-avatar size="64px">
                <img src="https://cdn.quasar.dev/img/avatar.png">
                <q-badge floating color="red">3</q-badge>
            </q-avatar>

            <q-avatar size="64px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                <q-badge floating color="green" rounded />
            </q-avatar>

            <div style="position: relative; width: 100px; height: 100px;" class="bg-grey-3 flex flex-center">
                <div>内容区域</div>
                <q-badge floating color="red" style="top: -8px; right: -8px">NEW</q-badge>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">徽章样式</div>
        <div class="q-gutter-lg row items-center">
            <q-badge color="primary">默认</q-badge>
            <q-badge color="primary" outline>轮廓</q-badge>
            <q-badge color="primary" rounded>圆角</q-badge>
            <q-badge color="primary" multi-line style="max-width: 100px">
                多行文本徽章示例
            </q-badge>
            <q-badge color="primary" transparent>透明</q-badge>
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>
        <div class="q-gutter-md">
            <q-list bordered class="rounded-borders" style="max-width: 350px">
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white" icon="inbox">
                            <q-badge floating color="red">5</q-badge>
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>收件箱</q-item-label>
                        <q-item-label caption>5 条新消息</q-item-label>
                    </q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-avatar color="purple" text-color="white" icon="star">
                            <q-badge floating color="orange">NEW</q-badge>
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>收藏夹</q-item-label>
                        <q-item-label caption>有新内容</q-item-label>
                    </q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-avatar color="teal" text-color="white" icon="send">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>已发送</q-item-label>
                        <q-item-label caption>无新消息</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </div>
</template>
