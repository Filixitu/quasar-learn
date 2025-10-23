<template>
    <div class="q-gutter-md">
        <div class="text-h6">基础评分</div>
        <div class="q-gutter-md">
            <div class="row items-center q-gutter-sm">
                <q-rating v-model="rating1" :max="5" size="2em" color="primary" />
                <span>{{ rating1 }} / 5</span>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">不同颜色</div>
        <div class="q-gutter-md">
            <q-rating v-model="rating2" :max="5" size="2em" color="primary" />
            <q-rating v-model="rating2" :max="5" size="2em" color="secondary" />
            <q-rating v-model="rating2" :max="5" size="2em" color="orange" />
            <q-rating v-model="rating2" :max="5" size="2em" color="red" />
            <q-rating v-model="rating2" :max="5" size="2em" color="purple" />
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸</div>
        <div class="q-gutter-md">
            <q-rating v-model="rating3" :max="5" size="1em" color="orange" />
            <q-rating v-model="rating3" :max="5" size="1.5em" color="orange" />
            <q-rating v-model="rating3" :max="5" size="2em" color="orange" />
            <q-rating v-model="rating3" :max="5" size="3em" color="orange" />
            <q-rating v-model="rating3" :max="5" size="4em" color="orange" />
        </div>

        <q-separator />

        <div class="text-h6">不同最大值</div>
        <div class="q-gutter-md">
            <div class="row items-center q-gutter-sm">
                <q-rating v-model="rating4" :max="3" size="2em" color="primary" />
                <span>最大 3 星</span>
            </div>
            <div class="row items-center q-gutter-sm">
                <q-rating v-model="rating5" :max="5" size="2em" color="primary" />
                <span>最大 5 星</span>
            </div>
            <div class="row items-center q-gutter-sm">
                <q-rating v-model="rating6" :max="10" size="2em" color="primary" />
                <span>最大 10 星</span>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">自定义图标</div>
        <div class="q-gutter-md">
            <q-rating v-model="rating7" :max="5" size="2.5em" color="red" icon="favorite" />
            <q-rating v-model="rating8" :max="5" size="2.5em" color="orange" icon="thumb_up" />
            <q-rating v-model="rating9" :max="5" size="2.5em" color="blue" icon="mood" />
            <q-rating v-model="rating10" :max="5" size="2.5em" color="green" icon="grade" />
        </div>

        <q-separator />

        <div class="text-h6">只读状态</div>
        <div class="q-gutter-md">
            <div class="row items-center q-gutter-sm">
                <q-rating v-model="rating11" :max="5" size="2em" color="orange" readonly />
                <span>只读评分: {{ rating11 }}</span>
            </div>
            <div class="row items-center q-gutter-sm">
                <q-rating :model-value="4.5" :max="5" size="2em" color="orange" readonly />
                <span>平均评分: 4.5</span>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">无选中图标</div>
        <div class="q-gutter-md">
            <q-rating v-model="rating12" :max="5" size="2.5em" color="orange" no-dimming />
            <q-rating v-model="rating12" :max="5" size="2.5em" color="orange" />
        </div>

        <q-separator />

        <div class="text-h6">半星评分</div>
        <div class="q-gutter-md">
            <div class="row items-center q-gutter-sm">
                <q-rating v-model="rating13" :max="5" size="2.5em" color="orange" icon="star_half"
                    icon-half="star_half" />
                <span>{{ rating13 }}</span>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <div class="q-gutter-md">
            <!-- 商品评价 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">商品评价</div>
                <q-card style="max-width: 400px">
                    <q-card-section class="row items-center">
                        <q-avatar size="64px" class="q-mr-md">
                            <img src="https://cdn.quasar.dev/img/avatar.png">
                        </q-avatar>
                        <div>
                            <div class="text-subtitle1">张三</div>
                            <div class="row items-center q-gutter-sm">
                                <q-rating :model-value="5" :max="5" size="1.2em" color="orange" readonly />
                                <span class="text-caption text-grey-7">2024-01-15</span>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        非常好的产品，质量很棒，值得购买！
                    </q-card-section>
                </q-card>
            </div>

            <!-- 评分统计 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">用户评分统计</div>
                <q-card style="max-width: 400px">
                    <q-card-section>
                        <div class="row items-center">
                            <div class="col-auto text-center q-mr-lg">
                                <div class="text-h3 text-orange">4.5</div>
                                <q-rating :model-value="4.5" :max="5" size="1.5em" color="orange" readonly />
                                <div class="text-caption text-grey-7">共 1,234 个评分</div>
                            </div>
                            <div class="col">
                                <div class="row items-center q-mb-xs">
                                    <div style="width: 30px">5星</div>
                                    <q-linear-progress :value="0.7" color="orange" class="col q-mx-sm" size="8px" />
                                    <div style="width: 50px" class="text-right">864</div>
                                </div>
                                <div class="row items-center q-mb-xs">
                                    <div style="width: 30px">4星</div>
                                    <q-linear-progress :value="0.2" color="orange" class="col q-mx-sm" size="8px" />
                                    <div style="width: 50px" class="text-right">247</div>
                                </div>
                                <div class="row items-center q-mb-xs">
                                    <div style="width: 30px">3星</div>
                                    <q-linear-progress :value="0.05" color="orange" class="col q-mx-sm" size="8px" />
                                    <div style="width: 50px" class="text-right">62</div>
                                </div>
                                <div class="row items-center q-mb-xs">
                                    <div style="width: 30px">2星</div>
                                    <q-linear-progress :value="0.03" color="orange" class="col q-mx-sm" size="8px" />
                                    <div style="width: 50px" class="text-right">37</div>
                                </div>
                                <div class="row items-center">
                                    <div style="width: 30px">1星</div>
                                    <q-linear-progress :value="0.02" color="orange" class="col q-mx-sm" size="8px" />
                                    <div style="width: 50px" class="text-right">24</div>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>

            <!-- 评价表单 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">发表评价</div>
                <q-card style="max-width: 400px">
                    <q-card-section>
                        <div class="text-h6 q-mb-md">给这个产品打分</div>
                        <div class="text-center q-mb-md">
                            <q-rating v-model="userRating" :max="5" size="3em" color="orange" />
                            <div class="q-mt-sm text-subtitle1">
                                {{ ratingText[userRating - 1] || '请选择评分' }}
                            </div>
                        </div>
                        <q-input v-model="reviewText" type="textarea" label="分享您的使用体验" outlined rows="4" />
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn flat label="取消" />
                        <q-btn color="primary" label="提交评价" :disable="!userRating" />
                    </q-card-actions>
                </q-card>
            </div>

            <!-- 服务质量评分 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">服务质量评分</div>
                <q-card style="max-width: 500px">
                    <q-card-section>
                        <div class="q-gutter-md">
                            <div class="row items-center justify-between">
                                <div>产品质量</div>
                                <q-rating v-model="serviceRating1" :max="5" size="1.5em" color="orange" />
                            </div>
                            <div class="row items-center justify-between">
                                <div>配送速度</div>
                                <q-rating v-model="serviceRating2" :max="5" size="1.5em" color="orange" />
                            </div>
                            <div class="row items-center justify-between">
                                <div>客服态度</div>
                                <q-rating v-model="serviceRating3" :max="5" size="1.5em" color="orange" />
                            </div>
                            <div class="row items-center justify-between">
                                <div>包装质量</div>
                                <q-rating v-model="serviceRating4" :max="5" size="1.5em" color="orange" />
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="bg-grey-2">
                        <div class="row items-center justify-between">
                            <div class="text-subtitle1">综合评分</div>
                            <div class="row items-center q-gutter-sm">
                                <q-rating :model-value="averageRating" :max="5" size="1.8em" color="orange" readonly />
                                <span class="text-h6">{{ averageRating.toFixed(1) }}</span>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const rating1 = ref(3)
const rating2 = ref(4)
const rating3 = ref(3)
const rating4 = ref(2)
const rating5 = ref(4)
const rating6 = ref(7)
const rating7 = ref(3)
const rating8 = ref(4)
const rating9 = ref(3)
const rating10 = ref(5)
const rating11 = ref(4)
const rating12 = ref(3)
const rating13 = ref(3.5)

const userRating = ref(0)
const reviewText = ref('')

const ratingText = ['很差', '一般', '还行', '不错', '非常好']

const serviceRating1 = ref(5)
const serviceRating2 = ref(4)
const serviceRating3 = ref(5)
const serviceRating4 = ref(4)

const averageRating = computed(() => {
    return (serviceRating1.value + serviceRating2.value + serviceRating3.value + serviceRating4.value) / 4
})
</script>
