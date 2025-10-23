<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础时间线</div>
        <q-timeline color="primary">
            <q-timeline-entry heading>时间线标题</q-timeline-entry>

            <q-timeline-entry title="事件 1" subtitle="2024年1月1日">
                <div>这是第一个事件的详细描述</div>
            </q-timeline-entry>

            <q-timeline-entry title="事件 2" subtitle="2024年1月5日">
                <div>这是第二个事件的详细描述</div>
            </q-timeline-entry>

            <q-timeline-entry title="事件 3" subtitle="2024年1月10日">
                <div>这是第三个事件的详细描述</div>
            </q-timeline-entry>
        </q-timeline>

        <q-separator />

        <div class="text-h6">带图标的时间线</div>
        <q-timeline color="secondary">
            <q-timeline-entry title="订单创建" subtitle="2024-01-15 10:00" icon="shopping_cart">
                <div>您的订单已成功创建</div>
            </q-timeline-entry>

            <q-timeline-entry title="付款确认" subtitle="2024-01-15 10:05" icon="payment" color="positive">
                <div>付款已确认，正在处理中</div>
            </q-timeline-entry>

            <q-timeline-entry title="商品发货" subtitle="2024-01-16 09:00" icon="local_shipping" color="orange">
                <div>您的商品已发货</div>
            </q-timeline-entry>

            <q-timeline-entry title="正在配送" subtitle="2024-01-17 14:30" icon="navigation" color="info">
                <div>商品正在配送中</div>
            </q-timeline-entry>

            <q-timeline-entry title="已送达" subtitle="2024-01-18 16:00" icon="done_all" color="positive">
                <div>商品已成功送达</div>
            </q-timeline-entry>
        </q-timeline>

        <q-separator />

        <div class="text-h6">带头像的时间线</div>
        <q-timeline layout="comfortable">
            <q-timeline-entry>
                <template v-slot:subtitle>
                    <div class="row items-center q-gutter-xs">
                        <q-avatar size="32px">
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                        <div>张三 - 2小时前</div>
                    </div>
                </template>
                <div>
                    <div class="text-subtitle1">发布了新动态</div>
                    <div class="text-caption text-grey-7">今天天气真不错！</div>
                </div>
            </q-timeline-entry>

            <q-timeline-entry>
                <template v-slot:subtitle>
                    <div class="row items-center q-gutter-xs">
                        <q-avatar size="32px">
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                        </q-avatar>
                        <div>李四 - 5小时前</div>
                    </div>
                </template>
                <div>
                    <div class="text-subtitle1">上传了照片</div>
                    <q-img src="https://cdn.quasar.dev/img/mountains.jpg" style="max-width: 200px"
                        class="rounded-borders q-mt-sm" />
                </div>
            </q-timeline-entry>

            <q-timeline-entry>
                <template v-slot:subtitle>
                    <div class="row items-center q-gutter-xs">
                        <q-avatar size="32px" color="primary" text-color="white">王</q-avatar>
                        <div>王五 - 昨天</div>
                    </div>
                </template>
                <div>
                    <div class="text-subtitle1">评论了一篇文章</div>
                    <div class="text-caption text-grey-7">这篇文章写得很好！</div>
                </div>
            </q-timeline-entry>
        </q-timeline>

        <q-separator />

        <div class="text-h6">密集布局</div>
        <q-timeline layout="dense" color="primary">
            <q-timeline-entry title="步骤 1" subtitle="完成" icon="done" color="positive" />
            <q-timeline-entry title="步骤 2" subtitle="完成" icon="done" color="positive" />
            <q-timeline-entry title="步骤 3" subtitle="进行中" icon="schedule" color="warning" />
            <q-timeline-entry title="步骤 4" subtitle="等待中" icon="radio_button_unchecked" color="grey" />
        </q-timeline>

        <q-separator />

        <div class="text-h6">舒适布局</div>
        <q-timeline layout="comfortable" color="primary">
            <q-timeline-entry title="项目启动" subtitle="2024-01-01" icon="flag">
                <div>项目正式启动，团队开始工作</div>
            </q-timeline-entry>

            <q-timeline-entry title="需求分析" subtitle="2024-01-05" icon="description">
                <div>完成需求文档编写</div>
                <div class="text-caption text-grey-7">参与人：张三、李四</div>
            </q-timeline-entry>

            <q-timeline-entry title="设计阶段" subtitle="2024-01-10" icon="brush">
                <div>UI/UX设计完成</div>
            </q-timeline-entry>

            <q-timeline-entry title="开发中" subtitle="2024-01-15" icon="code" color="orange">
                <div>正在进行功能开发</div>
            </q-timeline-entry>
        </q-timeline>

        <q-separator />

        <div class="text-h6">侧边时间线</div>
        <q-timeline layout="comfortable" side="right">
            <q-timeline-entry title="右侧时间线" subtitle="2024-01-01" icon="star" color="primary">
                <div>时间线在右侧显示</div>
            </q-timeline-entry>

            <q-timeline-entry title="事件 2" subtitle="2024-01-05" icon="favorite" color="red">
                <div>另一个事件</div>
            </q-timeline-entry>
        </q-timeline>

        <q-separator />

        <div class="text-h6">深色时间线</div>
        <div class="bg-grey-9 text-white q-pa-md rounded-borders">
            <q-timeline dark color="amber">
                <q-timeline-entry title="深色模式" subtitle="适合深色背景" icon="nights_stay">
                    <div>这是在深色背景下的时间线</div>
                </q-timeline-entry>

                <q-timeline-entry title="事件 2" subtitle="2024-01-05" icon="star">
                    <div>第二个事件</div>
                </q-timeline-entry>
            </q-timeline>
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <!-- 项目进度时间线 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">项目进度</div>
            <q-card>
                <q-card-section>
                    <q-timeline color="primary">
                        <q-timeline-entry heading>Web 应用开发项目</q-timeline-entry>

                        <q-timeline-entry title="项目规划" subtitle="2024-01-01 ~ 2024-01-07" icon="assignment"
                            color="positive">
                            <div class="text-body2">✓ 项目章程编写</div>
                            <div class="text-body2">✓ 团队组建</div>
                            <div class="text-body2">✓ 资源分配</div>
                        </q-timeline-entry>

                        <q-timeline-entry title="需求分析" subtitle="2024-01-08 ~ 2024-01-21" icon="description"
                            color="positive">
                            <div class="text-body2">✓ 用户调研</div>
                            <div class="text-body2">✓ 需求文档</div>
                            <div class="text-body2">✓ 原型设计</div>
                        </q-timeline-entry>

                        <q-timeline-entry title="系统设计" subtitle="2024-01-22 ~ 2024-02-05" icon="architecture"
                            color="warning">
                            <div class="text-body2">⏳ 架构设计 (80%)</div>
                            <div class="text-body2">⏳ 数据库设计 (60%)</div>
                            <div class="text-body2">⏳ API 设计 (40%)</div>
                            <q-linear-progress :value="0.6" color="warning" class="q-mt-sm" />
                        </q-timeline-entry>

                        <q-timeline-entry title="开发阶段" subtitle="2024-02-06 ~ 2024-03-31" icon="code" color="grey">
                            <div class="text-body2 text-grey-7">⏸ 待开始</div>
                        </q-timeline-entry>

                        <q-timeline-entry title="测试部署" subtitle="2024-04-01 ~ 2024-04-15" icon="verified" color="grey">
                            <div class="text-body2 text-grey-7">⏸ 待开始</div>
                        </q-timeline-entry>
                    </q-timeline>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
