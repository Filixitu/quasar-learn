<template>
    <div class="q-gutter-md">
        <div class="text-h6">Tree 树形结构</div>

        <!-- 基础树形 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">基础树形结构</div>
            <q-tree :nodes="basicTree" node-key="label" style="max-width: 500px" />
        </div>

        <q-separator />

        <!-- 可选择的树 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">可选择节点</div>
            <q-tree :nodes="selectableTree" node-key="id" tick-strategy="leaf" v-model:ticked="ticked"
                style="max-width: 500px" />
            <div class="q-mt-md text-caption">
                已选择: {{ ticked.join(', ') }}
            </div>
        </div>

        <q-separator />

        <!-- 文件目录树 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">文件目录树</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <q-tree :nodes="fileTree" node-key="id" v-model:selected="selected" selected-color="primary"
                        default-expand-all>
                        <template v-slot:default-header="prop">
                            <div class="row items-center">
                                <q-icon :name="prop.node.icon" :color="prop.node.iconColor" size="24px"
                                    class="q-mr-sm" />
                                <div>{{ prop.node.label }}</div>
                                <div v-if="prop.node.size" class="q-ml-sm text-caption text-grey">
                                    {{ prop.node.size }}
                                </div>
                            </div>
                        </template>
                    </q-tree>
                </q-card-section>
            </q-card>
        </div>

        <q-separator />

        <!-- 组织架构树 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">组织架构</div>
            <q-card style="max-width: 700px">
                <q-card-section>
                    <q-tree :nodes="orgTree" node-key="id" default-expand-all>
                        <template v-slot:default-header="prop">
                            <div class="row items-center full-width">
                                <q-avatar size="32px" class="q-mr-sm">
                                    <img :src="prop.node.avatar">
                                </q-avatar>
                                <div>
                                    <div class="text-subtitle2">{{ prop.node.label }}</div>
                                    <div class="text-caption text-grey">{{ prop.node.position }}</div>
                                </div>
                                <q-space />
                                <q-badge v-if="prop.node.team" color="primary">
                                    {{ prop.node.team }} 人
                                </q-badge>
                            </div>
                        </template>
                    </q-tree>
                </q-card-section>
            </q-card>
        </div>

        <q-separator />

        <!-- 带操作按钮的树 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">可编辑的树</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <q-tree :nodes="editableTree" node-key="id" v-model:selected="selectedEdit">
                        <template v-slot:default-header="prop">
                            <div class="row items-center full-width">
                                <q-icon :name="prop.node.icon" class="q-mr-sm" />
                                <div>{{ prop.node.label }}</div>
                                <q-space />
                                <q-btn flat dense round icon="add" size="sm" @click.stop="addNode(prop.node)">
                                    <q-tooltip>添加子节点</q-tooltip>
                                </q-btn>
                                <q-btn flat dense round icon="edit" size="sm" @click.stop="editNode(prop.node)">
                                    <q-tooltip>编辑</q-tooltip>
                                </q-btn>
                                <q-btn flat dense round icon="delete" size="sm" color="negative"
                                    @click.stop="deleteNode(prop.node)">
                                    <q-tooltip>删除</q-tooltip>
                                </q-btn>
                            </div>
                        </template>
                    </q-tree>
                </q-card-section>
            </q-card>
        </div>

        <q-separator />

        <!-- 权限树 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">权限管理</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="text-h6 q-mb-md">分配权限</div>
                    <q-tree :nodes="permissionTree" node-key="id" tick-strategy="leaf-filtered"
                        v-model:ticked="tickedPermissions">
                        <template v-slot:default-header="prop">
                            <div class="row items-center">
                                <q-icon :name="prop.node.icon" class="q-mr-sm" :color="prop.node.color" />
                                <div>
                                    <div>{{ prop.node.label }}</div>
                                    <div v-if="prop.node.description" class="text-caption text-grey">
                                        {{ prop.node.description }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </q-tree>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <div class="text-caption text-grey-7">
                        已选择权限: {{ tickedPermissions.length }} 项
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="取消" />
                    <q-btn color="primary" label="保存" @click="savePermissions" />
                </q-card-actions>
            </q-card>
        </div>

        <q-separator />

        <!-- 分类树 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">商品分类</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <q-tree :nodes="categoryTree" node-key="id" v-model:selected="selectedCategory"
                        selected-color="primary">
                        <template v-slot:default-header="prop">
                            <div class="row items-center full-width">
                                <q-icon name="category" class="q-mr-sm" />
                                <div>{{ prop.node.label }}</div>
                                <q-space />
                                <q-badge v-if="prop.node.count" color="grey-5">
                                    {{ prop.node.count }}
                                </q-badge>
                            </div>
                        </template>
                    </q-tree>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const ticked = ref([])
const selected = ref(null)
const selectedEdit = ref(null)
const tickedPermissions = ref([])
const selectedCategory = ref(null)

const basicTree = [
    {
        label: '根节点',
        children: [
            {
                label: '子节点 1',
                children: [
                    { label: '孙节点 1-1' },
                    { label: '孙节点 1-2' }
                ]
            },
            {
                label: '子节点 2',
                children: [
                    { label: '孙节点 2-1' }
                ]
            }
        ]
    }
]

const selectableTree = [
    {
        id: 'node1',
        label: '水果',
        children: [
            { id: 'node1-1', label: '苹果' },
            { id: 'node1-2', label: '香蕉' },
            { id: 'node1-3', label: '橙子' },
        ]
    },
    {
        id: 'node2',
        label: '蔬菜',
        children: [
            { id: 'node2-1', label: '白菜' },
            { id: 'node2-2', label: '萝卜' },
        ]
    }
]

const fileTree = [
    {
        id: 'root',
        label: '项目根目录',
        icon: 'folder',
        iconColor: 'orange',
        children: [
            {
                id: 'src',
                label: 'src',
                icon: 'folder',
                iconColor: 'orange',
                children: [
                    {
                        id: 'components',
                        label: 'components',
                        icon: 'folder',
                        iconColor: 'orange',
                        children: [
                            { id: 'button', label: 'Button.vue', icon: 'description', iconColor: 'green', size: '2.3 KB' },
                            { id: 'card', label: 'Card.vue', icon: 'description', iconColor: 'green', size: '1.8 KB' },
                        ]
                    },
                    { id: 'app', label: 'App.vue', icon: 'description', iconColor: 'green', size: '3.2 KB' },
                    { id: 'main', label: 'main.js', icon: 'code', iconColor: 'yellow', size: '0.5 KB' },
                ]
            },
            {
                id: 'public',
                label: 'public',
                icon: 'folder',
                iconColor: 'orange',
                children: [
                    { id: 'index', label: 'index.html', icon: 'html', iconColor: 'red', size: '1.2 KB' },
                ]
            },
            { id: 'readme', label: 'README.md', icon: 'description', iconColor: 'blue', size: '2.1 KB' },
        ]
    }
]

const orgTree = [
    {
        id: 'ceo',
        label: '张三',
        position: 'CEO',
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
        team: 50,
        children: [
            {
                id: 'cto',
                label: '李四',
                position: 'CTO',
                avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
                team: 20,
                children: [
                    {
                        id: 'dev1',
                        label: '王五',
                        position: '前端主管',
                        avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
                        team: 10
                    },
                    {
                        id: 'dev2',
                        label: '赵六',
                        position: '后端主管',
                        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
                        team: 10
                    }
                ]
            },
            {
                id: 'coo',
                label: '孙七',
                position: 'COO',
                avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
                team: 30
            }
        ]
    }
]

const editableTree = ref([
    {
        id: 'root1',
        label: '根节点',
        icon: 'folder',
        children: [
            { id: 'child1', label: '子节点 1', icon: 'description' },
            { id: 'child2', label: '子节点 2', icon: 'description' }
        ]
    }
])

function addNode(node) {
    $q.notify({
        message: `添加子节点到: ${node.label}`,
        color: 'positive'
    })
}

function editNode(node) {
    $q.notify({
        message: `编辑节点: ${node.label}`,
        color: 'info'
    })
}

function deleteNode(node) {
    $q.notify({
        message: `删除节点: ${node.label}`,
        color: 'negative'
    })
}

const permissionTree = [
    {
        id: 'user',
        label: '用户管理',
        icon: 'group',
        color: 'primary',
        children: [
            { id: 'user-view', label: '查看用户', description: '可以查看用户列表', icon: 'visibility' },
            { id: 'user-create', label: '创建用户', description: '可以添加新用户', icon: 'person_add' },
            { id: 'user-edit', label: '编辑用户', description: '可以修改用户信息', icon: 'edit' },
            { id: 'user-delete', label: '删除用户', description: '可以删除用户', icon: 'delete' },
        ]
    },
    {
        id: 'content',
        label: '内容管理',
        icon: 'article',
        color: 'secondary',
        children: [
            { id: 'content-view', label: '查看内容', icon: 'visibility' },
            { id: 'content-create', label: '创建内容', icon: 'add' },
            { id: 'content-edit', label: '编辑内容', icon: 'edit' },
            { id: 'content-publish', label: '发布内容', icon: 'publish' },
        ]
    },
    {
        id: 'system',
        label: '系统设置',
        icon: 'settings',
        color: 'orange',
        children: [
            { id: 'system-config', label: '系统配置', icon: 'tune' },
            { id: 'system-logs', label: '查看日志', icon: 'history' },
        ]
    }
]

function savePermissions() {
    $q.notify({
        message: `已保存 ${tickedPermissions.value.length} 项权限`,
        color: 'positive'
    })
}

const categoryTree = [
    {
        id: 'electronics',
        label: '电子产品',
        count: 1250,
        children: [
            {
                id: 'phones',
                label: '手机',
                count: 450,
                children: [
                    { id: 'iphone', label: 'iPhone', count: 200 },
                    { id: 'android', label: 'Android', count: 250 }
                ]
            },
            { id: 'computers', label: '电脑', count: 300 },
            { id: 'accessories', label: '配件', count: 500 }
        ]
    },
    {
        id: 'clothing',
        label: '服装',
        count: 3200,
        children: [
            { id: 'mens', label: '男装', count: 1500 },
            { id: 'womens', label: '女装', count: 1700 }
        ]
    }
]
</script>
