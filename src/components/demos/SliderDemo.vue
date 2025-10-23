<template>
    <div class="q-gutter-md">
        <div class="text-h6">Slider / Range 滑块</div>

        <!-- 基础滑块 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">基础滑块</div>
            <div style="max-width: 400px">
                <q-slider v-model="slider1" :min="0" :max="100" />
                <div class="text-center q-mt-sm">值: {{ slider1 }}</div>
            </div>
        </div>

        <q-separator />

        <!-- 带标签的滑块 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">带标签的滑块</div>
            <div style="max-width: 400px">
                <q-slider v-model="slider2" :min="0" :max="100" label color="primary" />
                <q-slider v-model="slider3" :min="0" :max="100" label always color="secondary" class="q-mt-md" />
            </div>
        </div>

        <q-separator />

        <!-- 步进滑块 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">步进滑块</div>
            <div style="max-width: 400px">
                <q-slider v-model="slider4" :min="0" :max="100" :step="10" snap label markers color="orange" />
                <div class="text-center q-mt-sm">值: {{ slider4 }} (每次步进 10)</div>
            </div>
        </div>

        <q-separator />

        <!-- 范围滑块 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">范围滑块 (Range)</div>
            <div style="max-width: 400px">
                <q-range v-model="range1" :min="0" :max="100" label color="purple" />
                <div class="text-center q-mt-sm">
                    范围: {{ range1.min }} - {{ range1.max }}
                </div>
            </div>
        </div>

        <q-separator />

        <!-- 价格范围筛选 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">价格范围筛选</div>
            <q-card style="max-width: 500px">
                <q-card-section>
                    <div class="text-h6 q-mb-md">筛选价格</div>
                    <q-range v-model="priceRange" :min="0" :max="10000" :step="100" label label-always
                        color="primary" />
                    <div class="row justify-between q-mt-md">
                        <q-chip>¥{{ priceRange.min }}</q-chip>
                        <q-chip>¥{{ priceRange.max }}</q-chip>
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-btn color="primary" label="应用筛选" />
                </q-card-actions>
            </q-card>
        </div>

        <q-separator />

        <!-- 音量控制 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">音量控制</div>
            <q-card style="max-width: 400px">
                <q-card-section>
                    <div class="row items-center q-gutter-md">
                        <q-icon :name="volume === 0 ? 'volume_off' : volume < 50 ? 'volume_down' : 'volume_up'"
                            size="md" />
                        <q-slider v-model="volume" :min="0" :max="100" color="blue" class="col" />
                        <div style="width: 50px">{{ volume }}%</div>
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <q-separator />

        <!-- 亮度调节 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">亮度调节</div>
            <q-card style="max-width: 400px">
                <q-card-section>
                    <div class="row items-center q-gutter-md">
                        <q-icon name="brightness_low" />
                        <q-slider v-model="brightness" :min="0" :max="100" color="amber" class="col" />
                        <q-icon name="brightness_high" />
                    </div>
                    <div class="q-mt-md" :style="{ opacity: brightness / 100 }">
                        <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <q-separator />

        <!-- 垂直滑块 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">垂直滑块</div>
            <div class="row q-gutter-xl">
                <div>
                    <q-slider v-model="vertical1" :min="0" :max="100" vertical label color="red"
                        style="height: 200px" />
                    <div class="text-center q-mt-sm">{{ vertical1 }}</div>
                </div>
                <div>
                    <q-slider v-model="vertical2" :min="0" :max="100" vertical label markers :step="10" color="green"
                        style="height: 200px" />
                    <div class="text-center q-mt-sm">{{ vertical2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const slider1 = ref(50)
const slider2 = ref(30)
const slider3 = ref(70)
const slider4 = ref(50)
const range1 = ref({ min: 20, max: 80 })
const priceRange = ref({ min: 1000, max: 5000 })
const volume = ref(50)
const brightness = ref(80)
const vertical1 = ref(60)
const vertical2 = ref(40)
</script>
