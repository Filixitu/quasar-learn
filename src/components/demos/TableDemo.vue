<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础表格</div>
        <q-table :rows="rows" :columns="columns" row-key="name" />

        <q-separator />

        <div class="text-h6">带标题和描述</div>
        <q-table title="用户列表" :rows="rows" :columns="columns" row-key="name">
            <template v-slot:top>
                <div class="col-2 q-table__title">用户列表</div>
                <q-space />
                <q-btn color="primary" icon="add" label="添加用户" />
            </template>
        </q-table>

        <q-separator />

        <div class="text-h6">可选择行</div>
        <q-table :rows="rows" :columns="columns" row-key="name" selection="multiple" v-model:selected="selected">
            <template v-slot:top>
                <div>已选择: {{ selected.length }} 行</div>
            </template>
        </q-table>

        <q-separator />

        <div class="text-h6">分页表格</div>
        <q-table :rows="paginatedRows" :columns="columns" row-key="name" v-model:pagination="pagination" />

        <q-separator />

        <div class="text-h6">可排序表格</div>
        <q-table :rows="rows" :columns="sortableColumns" row-key="name" />

        <q-separator />

        <div class="text-h6">带过滤的表格</div>
        <q-table :rows="rows" :columns="columns" row-key="name" :filter="filter">
            <template v-slot:top-right>
                <q-input dense debounce="300" v-model="filter" placeholder="搜索">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>

        <q-separator />

        <div class="text-h6">自定义单元格</div>
        <q-table :rows="rows" :columns="columns" row-key="name">
            <template v-slot:body-cell-name="props">
                <q-td :props="props">
                    <q-avatar size="32px" class="q-mr-sm">
                        <img src="https://cdn.quasar.dev/img/avatar.png">
                    </q-avatar>
                    {{ props.row.name }}
                </q-td>
            </template>

            <template v-slot:body-cell-status="props">
                <q-td :props="props">
                    <q-badge :color="props.row.status === '在线' ? 'positive' : 'grey'">
                        {{ props.row.status }}
                    </q-badge>
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn flat round dense icon="edit" color="primary" size="sm">
                        <q-tooltip>编辑</q-tooltip>
                    </q-btn>
                    <q-btn flat round dense icon="delete" color="negative" size="sm">
                        <q-tooltip>删除</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>

        <q-separator />

        <div class="text-h6">密集表格</div>
        <q-table :rows="rows" :columns="columns" row-key="name" dense />

        <q-separator />

        <div class="text-h6">网格模式（移动端友好）</div>
        <q-table :rows="rows" :columns="columns" row-key="name" grid hide-header>
            <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                    <q-card>
                        <q-card-section>
                            <div class="text-h6">{{ props.row.name }}</div>
                            <div class="text-subtitle2">{{ props.row.email }}</div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                            <div>年龄: {{ props.row.age }}</div>
                            <div>部门: {{ props.row.department }}</div>
                            <q-badge :color="props.row.status === '在线' ? 'positive' : 'grey'" class="q-mt-sm">
                                {{ props.row.status }}
                            </q-badge>
                        </q-card-section>
                    </q-card>
                </div>
            </template>
        </q-table>

        <q-separator />

        <div class="text-h6">加载状态</div>
        <q-table :rows="rows" :columns="columns" row-key="name" :loading="loading">
            <template v-slot:top>
                <q-btn color="primary" label="切换加载状态" @click="loading = !loading" />
            </template>
        </q-table>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
    {
        name: 'name',
        required: true,
        label: '姓名',
        align: 'left',
        field: 'name',
    },
    { name: 'age', label: '年龄', field: 'age', align: 'center' },
    { name: 'email', label: '邮箱', field: 'email', align: 'left' },
    { name: 'department', label: '部门', field: 'department' },
    { name: 'status', label: '状态', field: 'status', align: 'center' },
    { name: 'actions', label: '操作', field: 'actions', align: 'center' },
]

const sortableColumns = [
    {
        name: 'name',
        required: true,
        label: '姓名',
        align: 'left',
        field: 'name',
        sortable: true
    },
    { name: 'age', label: '年龄', field: 'age', sortable: true, align: 'center' },
    { name: 'email', label: '邮箱', field: 'email', sortable: true },
    { name: 'department', label: '部门', field: 'department', sortable: true },
    { name: 'status', label: '状态', field: 'status', sortable: true },
]

const rows = [
    { name: '张三', age: 28, email: 'zhangsan@example.com', department: '技术部', status: '在线' },
    { name: '李四', age: 32, email: 'lisi@example.com', department: '市场部', status: '离线' },
    { name: '王五', age: 25, email: 'wangwu@example.com', department: '设计部', status: '在线' },
    { name: '赵六', age: 35, email: 'zhaoliu@example.com', department: '技术部', status: '在线' },
    { name: '孙七', age: 29, email: 'sunqi@example.com', department: '人事部', status: '离线' },
]

const paginatedRows = Array.from({ length: 50 }, (_, i) => ({
    name: `用户${i + 1}`,
    age: 20 + Math.floor(Math.random() * 20),
    email: `user${i + 1}@example.com`,
    department: ['技术部', '市场部', '设计部', '人事部'][Math.floor(Math.random() * 4)],
    status: Math.random() > 0.5 ? '在线' : '离线'
}))

const selected = ref([])
const filter = ref('')
const loading = ref(false)
const pagination = ref({
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 5
})
</script>
