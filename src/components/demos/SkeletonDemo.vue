<template>
    <div class="q-gutter-md">
        <div class="text-h6">Skeleton 骨架屏</div>

        <div class="q-gutter-sm q-mb-md">
            <q-btn color="primary" label="显示内容" @click="loading = false" />
            <q-btn color="grey" label="显示骨架屏" @click="loading = true" />
        </div>

        <!-- 文章列表骨架屏 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">文章列表</div>
            <q-card style="max-width: 700px">
                <template v-if="loading">
                    <q-card-section v-for="i in 3" :key="i">
                        <div class="row q-gutter-md">
                            <q-skeleton width="150px" height="100px" />
                            <div class="col">
                                <q-skeleton type="text" width="80%" />
                                <q-skeleton type="text" width="60%" />
                                <q-skeleton type="text" width="90%" />
                                <div class="row q-gutter-sm q-mt-sm">
                                    <q-skeleton type="QChip" />
                                    <q-skeleton type="QChip" />
                                </div>
                            </div>
                        </div>
                        <q-separator class="q-my-md" v-if="i < 3" />
                    </q-card-section>
                </template>
                <template v-else>
                    <q-card-section v-for="i in 3" :key="i">
                        <div class="row q-gutter-md">
                            <q-img src="https://cdn.quasar.dev/img/mountains.jpg" width="150px" height="100px" />
                            <div class="col">
                                <div class="text-h6">文章标题 {{ i }}</div>
                                <div class="text-caption text-grey-7 q-mt-xs">2024-01-15</div>
                                <div class="q-mt-sm">这是文章的摘要内容...</div>
                                <div class="row q-gutter-sm q-mt-sm">
                                    <q-chip size="sm">技术</q-chip>
                                    <q-chip size="sm">Vue.js</q-chip>
                                </div>
                            </div>
                        </div>
                        <q-separator class="q-my-md" v-if="i < 3" />
                    </q-card-section>
                </template>
            </q-card>
        </div>

        <q-separator />

        <!-- 用户卡片骨架屏 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">用户卡片</div>
            <q-card style="max-width: 400px">
                <template v-if="loading">
                    <q-card-section class="text-center">
                        <q-skeleton type="QAvatar" size="100px" class="q-mx-auto" />
                        <q-skeleton type="text" width="150px" class="q-mx-auto q-mt-md" />
                        <q-skeleton type="text" width="200px" class="q-mx-auto q-mt-sm" />
                        <div class="row justify-center q-gutter-sm q-mt-md">
                            <q-skeleton type="QBtn" />
                            <q-skeleton type="QBtn" />
                        </div>
                    </q-card-section>
                </template>
                <template v-else>
                    <q-card-section class="text-center">
                        <q-avatar size="100px">
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                        <div class="text-h6 q-mt-md">张三</div>
                        <div class="text-caption text-grey-7">软件工程师</div>
                        <div class="row justify-center q-gutter-sm q-mt-md">
                            <q-btn color="primary" label="关注" />
                            <q-btn outline label="消息" />
                        </div>
                    </q-card-section>
                </template>
            </q-card>
        </div>

        <q-separator />

        <!-- 表格骨架屏 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">数据表格</div>
            <q-card style="max-width: 800px">
                <template v-if="loading">
                    <q-markup-table>
                        <thead>
                            <tr>
                                <th v-for="i in 4" :key="i">
                                    <q-skeleton type="text" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 5" :key="i">
                                <td v-for="j in 4" :key="j">
                                    <q-skeleton type="text" />
                                </td>
                            </tr>
                        </tbody>
                    </q-markup-table>
                </template>
                <template v-else>
                    <q-markup-table>
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>年龄</th>
                                <th>部门</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in 5" :key="i">
                                <td>用户 {{ i }}</td>
                                <td>{{ 20 + i }}</td>
                                <td>技术部</td>
                                <td>
                                    <q-badge color="positive">在职</q-badge>
                                </td>
                            </tr>
                        </tbody>
                    </q-markup-table>
                </template>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
