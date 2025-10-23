<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础卡片</div>
        <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">基础卡片</div>
                        <div class="text-subtitle2">这是一个简单的卡片</div>
                    </q-card-section>
                    <q-card-section>
                        卡片内容区域，可以放置任何内容。
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-12 col-md-4">
                <q-card class="bg-primary text-white">
                    <q-card-section>
                        <div class="text-h6">彩色卡片</div>
                        <div class="text-subtitle2">带背景色的卡片</div>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-12 col-md-4">
                <q-card flat bordered>
                    <q-card-section>
                        <div class="text-h6">扁平卡片</div>
                        <div class="text-subtitle2">无阴影有边框</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">带图片的卡片</div>
        <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
                <q-card>
                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                    <q-card-section>
                        <div class="text-h6">风景卡片</div>
                        <div class="text-subtitle2">带图片的卡片示例</div>
                    </q-card-section>
                    <q-card-section>
                        这是一张美丽的风景图片，展示了如何在卡片中使用图片。
                    </q-card-section>
                    <q-card-actions>
                        <q-btn flat>分享</q-btn>
                        <q-btn flat>收藏</q-btn>
                    </q-card-actions>
                </q-card>
            </div>

            <div class="col-12 col-md-6">
                <q-card>
                    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    <q-card-section>
                        <div class="text-h6">使用 q-img</div>
                        <div class="text-subtitle2">带懒加载和占位符</div>
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn flat color="primary">了解更多</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">交互式卡片</div>
        <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
                <q-card class="cursor-pointer" @click="$q.notify('卡片被点击了！')">
                    <q-card-section class="bg-purple text-white">
                        <div class="text-h6">可点击卡片</div>
                    </q-card-section>
                    <q-card-section>
                        点击这个卡片试试！
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-12 col-md-4">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">展开卡片</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-expansion-item label="点击展开" caption="查看更多内容">
                            <q-card>
                                <q-card-section>
                                    这是展开后的内容区域，可以放置更多详细信息。
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-12 col-md-4">
                <q-card>
                    <q-card-section>
                        <div class="row items-center no-wrap">
                            <div class="col">
                                <div class="text-h6">用户卡片</div>
                                <div class="text-subtitle2">@username</div>
                            </div>
                            <div class="col-auto">
                                <q-btn color="grey-7" round flat icon="more_vert">
                                    <q-menu>
                                        <q-list style="min-width: 100px">
                                            <q-item clickable v-close-popup>
                                                <q-item-section>编辑</q-item-section>
                                            </q-item>
                                            <q-item clickable v-close-popup>
                                                <q-item-section>删除</q-item-section>
                                            </q-item>
                                        </q-list>
                                    </q-menu>
                                </q-btn>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()
</script>
