<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础气泡</div>
        <div class="q-gutter-sm">
            <q-chip>默认气泡</q-chip>
            <q-chip color="primary" text-color="white">主要</q-chip>
            <q-chip color="secondary" text-color="white">次要</q-chip>
            <q-chip color="positive" text-color="white">成功</q-chip>
            <q-chip color="negative" text-color="white">错误</q-chip>
            <q-chip color="warning" text-color="white">警告</q-chip>
            <q-chip color="info" text-color="white">信息</q-chip>
        </div>

        <q-separator />

        <div class="text-h6">带图标的气泡</div>
        <div class="q-gutter-sm">
            <q-chip icon="event" color="primary" text-color="white">日历</q-chip>
            <q-chip icon="place" color="teal" text-color="white">位置</q-chip>
            <q-chip icon="alarm" color="orange" text-color="white">闹钟</q-chip>
            <q-chip icon-right="send" color="purple" text-color="white">发送</q-chip>
        </div>

        <q-separator />

        <div class="text-h6">可关闭的气泡</div>
        <div class="q-gutter-sm">
            <q-chip v-for="tag in tags" :key="tag" removable @remove="removeTag(tag)" color="primary"
                text-color="white">
                {{ tag }}
            </q-chip>
            <q-chip clickable @click="addTag" color="grey-3" text-color="grey-8" icon="add">
                添加标签
            </q-chip>
        </div>

        <q-separator />

        <div class="text-h6">带头像的气泡</div>
        <div class="q-gutter-sm">
            <q-chip color="primary" text-color="white">
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
                张三
            </q-chip>
            <q-chip color="teal" text-color="white">
                <q-avatar color="red" text-color="white">李</q-avatar>
                李四
            </q-chip>
            <q-chip color="orange" text-color="white">
                <q-avatar icon="person" color="white" text-color="orange" />
                王五
            </q-chip>
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸</div>
        <div class="q-gutter-sm items-center row">
            <q-chip size="sm" color="primary" text-color="white">小号</q-chip>
            <q-chip size="md" color="primary" text-color="white">中号</q-chip>
            <q-chip size="lg" color="primary" text-color="white">大号</q-chip>
            <q-chip size="xl" color="primary" text-color="white">超大</q-chip>
        </div>

        <q-separator />

        <div class="text-h6">气泡样式</div>
        <div class="q-gutter-sm">
            <q-chip color="primary" text-color="white">填充</q-chip>
            <q-chip outline color="primary">轮廓</q-chip>
            <q-chip square color="primary" text-color="white">方形</q-chip>
            <q-chip dense color="primary" text-color="white">密集</q-chip>
        </div>

        <q-separator />

        <div class="text-h6">可点击的气泡</div>
        <div class="q-gutter-sm">
            <q-chip clickable @click="$q.notify('气泡被点击了！')" color="primary" text-color="white" icon="thumb_up">
                点击我
            </q-chip>
            <q-chip clickable v-model:selected="selected1" color="teal" @update:selected="onSelected">
                可选择 ({{ selected1 ? '已选' : '未选' }})
            </q-chip>
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">技能标签</div>
            <q-chip v-for="skill in skills" :key="skill.name" :color="skill.color" text-color="white"
                :icon="skill.icon">
                {{ skill.name }}
            </q-chip>
        </div>

        <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">筛选条件</div>
            <q-chip v-for="filter in filters" :key="filter" removable @remove="removeFilter(filter)" color="primary"
                text-color="white">
                {{ filter }}
            </q-chip>
        </div>

        <div>
            <div class="text-subtitle2 q-mb-sm">联系人列表</div>
            <q-chip v-for="contact in contacts" :key="contact.name" clickable @click="$q.notify(`联系 ${contact.name}`)"
                color="grey-3" text-color="grey-8">
                <q-avatar>
                    <img :src="contact.avatar">
                </q-avatar>
                {{ contact.name }}
                <q-tooltip>点击查看详情</q-tooltip>
            </q-chip>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const tags = ref(['前端', '后端', 'Vue.js', 'Quasar'])
const selected1 = ref(false)

const skills = [
    { name: 'Vue.js', color: 'green', icon: 'code' },
    { name: 'JavaScript', color: 'yellow-8', icon: 'javascript' },
    { name: 'CSS', color: 'blue', icon: 'palette' },
    { name: 'Node.js', color: 'green-8', icon: 'storage' },
]

const filters = ref(['价格: ¥100-500', '评分: 4星以上', '地区: 北京'])

const contacts = [
    { name: '张三', avatar: 'https://cdn.quasar.dev/img/avatar.png' },
    { name: '李四', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
    { name: '王五', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' },
]

function removeTag(tag) {
    const index = tags.value.indexOf(tag)
    if (index > -1) {
        tags.value.splice(index, 1)
    }
}

function addTag() {
    const newTag = `标签${tags.value.length + 1}`
    tags.value.push(newTag)
}

function removeFilter(filter) {
    const index = filters.value.indexOf(filter)
    if (index > -1) {
        filters.value.splice(index, 1)
    }
}

function onSelected(val) {
    $q.notify(val ? '已选择' : '已取消选择')
}
</script>
