<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础提示</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="悬停查看提示">
                <q-tooltip>这是一个基础提示</q-tooltip>
            </q-btn>

            <q-btn color="secondary" label="带延迟的提示">
                <q-tooltip :delay="500">延迟 500ms 显示</q-tooltip>
            </q-btn>

            <q-icon name="info" size="32px" color="primary" class="cursor-pointer">
                <q-tooltip>图标也可以有提示</q-tooltip>
            </q-icon>
        </div>

        <q-separator />

        <div class="text-h6">不同位置的提示</div>
        <div class="q-pa-lg row justify-center">
            <div class="column items-center q-gutter-md">
                <q-btn color="primary" label="顶部">
                    <q-tooltip anchor="top middle" self="bottom middle">顶部提示</q-tooltip>
                </q-btn>

                <div class="row q-gutter-xl">
                    <q-btn color="primary" label="左侧">
                        <q-tooltip anchor="center left" self="center right">左侧提示</q-tooltip>
                    </q-btn>
                    <q-btn color="primary" label="右侧">
                        <q-tooltip anchor="center right" self="center left">右侧提示</q-tooltip>
                    </q-btn>
                </div>

                <q-btn color="primary" label="底部">
                    <q-tooltip anchor="bottom middle" self="top middle">底部提示</q-tooltip>
                </q-btn>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">不同样式的提示</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="主要色">
                <q-tooltip class="bg-primary">主要色提示</q-tooltip>
            </q-btn>

            <q-btn color="secondary" label="次要色">
                <q-tooltip class="bg-secondary">次要色提示</q-tooltip>
            </q-btn>

            <q-btn color="positive" label="成功色">
                <q-tooltip class="bg-positive">成功提示</q-tooltip>
            </q-btn>

            <q-btn color="negative" label="错误色">
                <q-tooltip class="bg-negative">错误提示</q-tooltip>
            </q-btn>

            <q-btn color="warning" label="警告色">
                <q-tooltip class="bg-warning text-dark">警告提示</q-tooltip>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">自定义样式</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="大号字体">
                <q-tooltip class="text-h6">大号提示文字</q-tooltip>
            </q-btn>

            <q-btn color="primary" label="自定义颜色">
                <q-tooltip class="bg-purple text-white">紫色背景提示</q-tooltip>
            </q-btn>

            <q-btn color="primary" label="带阴影">
                <q-tooltip class="shadow-10">带阴影的提示</q-tooltip>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">富文本提示</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="多行提示">
                <q-tooltip>
                    <div>这是第一行</div>
                    <div>这是第二行</div>
                    <div>这是第三行</div>
                </q-tooltip>
            </q-btn>

            <q-btn color="primary" label="带图标提示">
                <q-tooltip>
                    <div class="row items-center q-gutter-sm">
                        <q-icon name="info" />
                        <div>带图标的提示信息</div>
                    </div>
                </q-tooltip>
            </q-btn>

            <q-btn color="primary" label="复杂内容">
                <q-tooltip max-width="300px">
                    <div class="text-subtitle2 q-mb-xs">重要提示</div>
                    <div class="text-caption">
                        这是一个包含更复杂内容的提示框，可以展示更多详细信息。
                    </div>
                </q-tooltip>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">手动控制显示</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="点击切换提示" @click="showTooltip1 = !showTooltip1">
                <q-tooltip v-model="showTooltip1" :offset="[0, 10]">
                    手动控制的提示
                </q-tooltip>
            </q-btn>

            <q-btn color="secondary" label="显示提示" @click="showTooltip2 = true" />
            <q-btn color="grey" label="隐藏提示" @click="showTooltip2 = false" />
            <q-btn color="primary" label="目标元素">
                <q-tooltip v-model="showTooltip2">受控的提示</q-tooltip>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">带偏移的提示</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="水平偏移">
                <q-tooltip :offset="[20, 0]">向右偏移 20px</q-tooltip>
            </q-btn>

            <q-btn color="primary" label="垂直偏移">
                <q-tooltip :offset="[0, 20]">向下偏移 20px</q-tooltip>
            </q-btn>

            <q-btn color="primary" label="双向偏移">
                <q-tooltip :offset="[10, 10]">双向偏移</q-tooltip>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>
        <div class="q-gutter-md">
            <!-- 帮助图标 -->
            <div class="row items-center q-gutter-sm">
                <span>用户名</span>
                <q-icon name="help_outline" size="20px" color="grey-7" class="cursor-pointer">
                    <q-tooltip max-width="200px">
                        用户名必须是 6-20 个字符，只能包含字母、数字和下划线
                    </q-tooltip>
                </q-icon>
            </div>

            <!-- 功能按钮提示 -->
            <div class="row q-gutter-sm">
                <q-btn flat round dense icon="save" color="primary">
                    <q-tooltip>保存 (Ctrl+S)</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="undo" color="primary">
                    <q-tooltip>撤销 (Ctrl+Z)</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="redo" color="primary">
                    <q-tooltip>重做 (Ctrl+Y)</q-tooltip>
                </q-btn>
                <q-btn flat round dense icon="delete" color="negative">
                    <q-tooltip class="bg-negative">删除 (Del)</q-tooltip>
                </q-btn>
            </div>

            <!-- 状态指示 -->
            <div class="row items-center q-gutter-sm">
                <q-badge color="green" rounded>
                    <q-tooltip>系统运行正常</q-tooltip>
                </q-badge>
                <span>系统状态</span>
            </div>

            <!-- 禁用元素提示 -->
            <div>
                <q-btn color="primary" label="禁用按钮" disable>
                    <q-tooltip>此功能当前不可用</q-tooltip>
                </q-btn>
            </div>

            <!-- 图片预览 -->
            <div>
                <q-avatar size="48px" class="cursor-pointer">
                    <img src="https://cdn.quasar.dev/img/avatar.png">
                    <q-tooltip>
                        <q-avatar size="128px">
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </q-tooltip>
                </q-avatar>
            </div>
        </div>

        <q-separator />

        <div class="text-subtitle2 text-grey-7">
            💡 提示：将鼠标悬停在元素上即可看到提示框
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showTooltip1 = ref(false)
const showTooltip2 = ref(false)
</script>
