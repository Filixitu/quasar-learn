<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础菜单</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="基础菜单">
                <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>选项 1</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>选项 2</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>选项 3</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

            <q-btn color="secondary" label="带图标菜单">
                <q-menu>
                    <q-list style="min-width: 150px">
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="home" />
                            </q-item-section>
                            <q-item-section>首页</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="settings" />
                            </q-item-section>
                            <q-item-section>设置</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="logout" />
                            </q-item-section>
                            <q-item-section>退出</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">带分隔符的菜单</div>
        <q-btn color="primary" label="文件菜单">
            <q-menu>
                <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup>
                        <q-item-section avatar>
                            <q-icon name="create_new_folder" />
                        </q-item-section>
                        <q-item-section>新建</q-item-section>
                        <q-item-section side>
                            <q-item-label caption>Ctrl+N</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-section avatar>
                            <q-icon name="folder_open" />
                        </q-item-section>
                        <q-item-section>打开</q-item-section>
                        <q-item-section side>
                            <q-item-label caption>Ctrl+O</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item clickable v-close-popup>
                        <q-item-section avatar>
                            <q-icon name="save" />
                        </q-item-section>
                        <q-item-section>保存</q-item-section>
                        <q-item-section side>
                            <q-item-label caption>Ctrl+S</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item clickable v-close-popup>
                        <q-item-section avatar>
                            <q-icon name="close" color="negative" />
                        </q-item-section>
                        <q-item-section>关闭</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>

        <q-separator />

        <div class="text-h6">嵌套菜单</div>
        <q-btn color="purple" label="多级菜单">
            <q-menu>
                <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup>
                        <q-item-section>选项 1</q-item-section>
                    </q-item>

                    <q-item clickable>
                        <q-item-section>更多选项</q-item-section>
                        <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                        </q-item-section>

                        <q-menu anchor="top end" self="top start">
                            <q-list>
                                <q-item clickable v-close-popup>
                                    <q-item-section>子选项 1</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section>子选项 2</q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>更多</q-item-section>
                                    <q-item-section side>
                                        <q-icon name="keyboard_arrow_right" />
                                    </q-item-section>

                                    <q-menu anchor="top end" self="top start">
                                        <q-list>
                                            <q-item clickable v-close-popup>
                                                <q-item-section>深层选项 1</q-item-section>
                                            </q-item>
                                            <q-item clickable v-close-popup>
                                                <q-item-section>深层选项 2</q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-item>

                    <q-separator />

                    <q-item clickable v-close-popup>
                        <q-item-section>选项 3</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>

        <q-separator />

        <div class="text-h6">不同触发方式</div>
        <div class="q-gutter-sm">
            <q-btn color="primary" label="点击触发 (默认)">
                <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>选项 1</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

            <q-btn color="secondary" label="右键触发">
                <q-menu context-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>复制</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>粘贴</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>删除</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">不同位置的菜单</div>
        <div class="q-gutter-sm">
            <q-btn label="顶部">
                <q-menu anchor="top middle" self="bottom middle">
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>顶部菜单</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

            <q-btn label="左侧">
                <q-menu anchor="center left" self="center right">
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>左侧菜单</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

            <q-btn label="右侧">
                <q-menu anchor="center right" self="center left">
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>右侧菜单</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </div>

        <q-separator />

        <div class="text-h6">自定义内容菜单</div>
        <q-btn color="teal" label="自定义菜单">
            <q-menu>
                <div class="q-pa-md" style="min-width: 200px">
                    <div class="text-h6 q-mb-md">用户信息</div>
                    <div class="q-mb-sm">
                        <q-avatar size="64px">
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                    </div>
                    <div class="text-subtitle1">张三</div>
                    <div class="text-caption text-grey-7">zhangsan@example.com</div>
                    <q-separator class="q-my-md" />
                    <q-btn color="primary" label="查看资料" flat dense class="full-width" />
                    <q-btn color="grey-7" label="退出登录" flat dense class="full-width" />
                </div>
            </q-menu>
        </q-btn>

        <q-separator />

        <div class="text-h6">实际应用示例</div>
        <div class="q-gutter-sm">
            <!-- 用户菜单 -->
            <q-btn flat round dense icon="account_circle" size="lg">
                <q-menu>
                    <q-list style="min-width: 200px">
                        <q-item>
                            <q-item-section avatar>
                                <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/avatar.png">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>张三</q-item-label>
                                <q-item-label caption>admin@example.com</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator />

                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="person" />
                            </q-item-section>
                            <q-item-section>个人资料</q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="settings" />
                            </q-item-section>
                            <q-item-section>设置</q-item-section>
                        </q-item>

                        <q-separator />

                        <q-item clickable v-close-popup @click="$q.notify('已退出登录')">
                            <q-item-section avatar>
                                <q-icon name="logout" color="negative" />
                            </q-item-section>
                            <q-item-section>退出登录</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

            <!-- 通知菜单 -->
            <q-btn flat round dense icon="notifications" size="lg">
                <q-badge color="red" floating>3</q-badge>
                <q-menu style="width: 300px">
                    <q-list>
                        <q-item-label header>通知</q-item-label>
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-avatar color="primary" text-color="white" icon="message" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>新消息</q-item-label>
                                <q-item-label caption>您有 3 条新消息</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-avatar color="orange" text-color="white" icon="update" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>系统更新</q-item-label>
                                <q-item-label caption>有新版本可用</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup>
                            <q-item-section class="text-center text-primary">
                                查看全部
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

            <!-- 更多操作菜单 -->
            <q-btn flat round dense icon="more_vert" size="lg">
                <q-menu>
                    <q-list>
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="edit" />
                            </q-item-section>
                            <q-item-section>编辑</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="share" />
                            </q-item-section>
                            <q-item-section>分享</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="delete" color="negative" />
                            </q-item-section>
                            <q-item-section>删除</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </div>
    </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()
</script>
