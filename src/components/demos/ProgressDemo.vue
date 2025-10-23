<template>
    <div class="q-gutter-md">
        <div class="text-h6">线性进度条</div>
        <div class="q-gutter-md">
            <q-linear-progress :value="0.3" color="primary" />
            <q-linear-progress :value="0.5" color="secondary" />
            <q-linear-progress :value="0.7" color="positive" />
            <q-linear-progress :value="0.9" color="warning" />
        </div>

        <q-separator />

        <div class="text-h6">带标签的进度条</div>
        <div class="q-gutter-md">
            <q-linear-progress :value="progress1 / 100" color="primary">
                <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="primary" :label="`${progress1}%`" />
                </div>
            </q-linear-progress>

            <div class="row items-center q-gutter-sm">
                <q-btn size="sm" @click="progress1 = Math.max(0, progress1 - 10)">-10%</q-btn>
                <q-btn size="sm" @click="progress1 = Math.min(100, progress1 + 10)">+10%</q-btn>
                <span>{{ progress1 }}%</span>
            </div>
        </div>

        <q-separator />

        <div class="text-h6">不确定进度</div>
        <div class="q-gutter-md">
            <q-linear-progress indeterminate color="primary" />
            <q-linear-progress indeterminate color="secondary" />
            <q-linear-progress query color="positive" />
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸</div>
        <div class="q-gutter-md">
            <q-linear-progress :value="0.6" size="10px" color="primary" />
            <q-linear-progress :value="0.6" size="15px" color="primary" />
            <q-linear-progress :value="0.6" size="20px" color="primary" />
            <q-linear-progress :value="0.6" size="30px" color="primary" />
        </div>

        <q-separator />

        <div class="text-h6">条纹样式</div>
        <div class="q-gutter-md">
            <q-linear-progress :value="0.6" stripe color="primary" size="20px" />
            <q-linear-progress :value="0.6" stripe color="secondary" size="20px" />
            <q-linear-progress :value="0.6" stripe color="warning" size="20px" />
        </div>

        <q-separator />

        <div class="text-h6">动画条纹</div>
        <div class="q-gutter-md">
            <q-linear-progress :value="0.7" stripe animation-speed="100" color="primary" size="20px" />
            <q-linear-progress :value="0.7" stripe animation-speed="500" color="secondary" size="20px" />
        </div>

        <q-separator />

        <div class="text-h6">圆形进度条</div>
        <div class="q-gutter-md row items-center">
            <q-circular-progress :value="0.3" size="50px" color="primary" />
            <q-circular-progress :value="0.5" size="50px" color="secondary" />
            <q-circular-progress :value="0.7" size="50px" color="positive" />
            <q-circular-progress :value="0.9" size="50px" color="warning" />
        </div>

        <q-separator />

        <div class="text-h6">带文字的圆形进度</div>
        <div class="q-gutter-md row items-center">
            <q-circular-progress show-value :value="circularProgress / 100" size="80px" :thickness="0.2" color="primary"
                track-color="grey-3">
                {{ circularProgress }}%
            </q-circular-progress>

            <q-circular-progress show-value :value="0.75" size="80px" :thickness="0.15" color="teal"
                track-color="grey-3" class="text-white">
                75%
            </q-circular-progress>

            <q-circular-progress show-value :value="0.45" size="80px" :thickness="0.25" color="orange"
                center-color="orange-1" track-color="grey-3">
                45%
            </q-circular-progress>
        </div>

        <div class="row items-center q-gutter-sm q-mt-sm">
            <q-btn size="sm" @click="circularProgress = Math.max(0, circularProgress - 10)">-10%</q-btn>
            <q-btn size="sm" @click="circularProgress = Math.min(100, circularProgress + 10)">+10%</q-btn>
        </div>

        <q-separator />

        <div class="text-h6">不确定圆形进度</div>
        <div class="q-gutter-md row items-center">
            <q-circular-progress indeterminate size="50px" color="primary" />
            <q-circular-progress indeterminate size="50px" color="secondary" />
            <q-circular-progress indeterminate size="50px" color="orange" />
        </div>

        <q-separator />

        <div class="text-h6">不同尺寸圆形进度</div>
        <div class="q-gutter-md row items-center">
            <q-circular-progress :value="0.6" size="30px" color="primary" />
            <q-circular-progress :value="0.6" size="50px" color="primary" />
            <q-circular-progress :value="0.6" size="70px" color="primary" />
            <q-circular-progress :value="0.6" size="100px" color="primary" />
            <q-circular-progress :value="0.6" size="150px" color="primary" />
        </div>

        <q-separator />

        <div class="text-h6">自定义粗细</div>
        <div class="q-gutter-md row items-center">
            <q-circular-progress :value="0.6" size="80px" :thickness="0.05" color="primary" />
            <q-circular-progress :value="0.6" size="80px" :thickness="0.1" color="primary" />
            <q-circular-progress :value="0.6" size="80px" :thickness="0.2" color="primary" />
            <q-circular-progress :value="0.6" size="80px" :thickness="0.3" color="primary" />
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <div class="q-gutter-md">
            <!-- 文件上传进度 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">文件上传</div>
                <q-card style="max-width: 400px">
                    <q-card-section>
                        <div class="row items-center justify-between q-mb-md">
                            <div>文档.pdf</div>
                            <div class="text-caption">{{ uploadProgress }}%</div>
                        </div>
                        <q-linear-progress :value="uploadProgress / 100" color="primary" size="8px" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn flat color="primary" @click="startUpload" :disable="uploading">
                            {{ uploading ? '上传中...' : '开始上传' }}
                        </q-btn>
                        <q-btn flat @click="uploadProgress = 0" :disable="uploading">重置</q-btn>
                    </q-card-actions>
                </q-card>
            </div>

            <!-- 任务完成度 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">任务完成度</div>
                <div class="row q-gutter-md">
                    <q-circular-progress show-value :value="taskProgress / 100" size="120px" :thickness="0.2"
                        color="teal" track-color="grey-3">
                        <div class="text-h6">{{ taskProgress }}%</div>
                        <div class="text-caption">已完成</div>
                    </q-circular-progress>

                    <div class="column justify-center">
                        <div class="text-body1 q-mb-sm">项目进度</div>
                        <div class="text-caption text-grey-7">8/10 任务已完成</div>
                        <q-linear-progress :value="0.8" color="teal" class="q-mt-sm" />
                    </div>
                </div>
            </div>

            <!-- 多个步骤 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">多步骤进度</div>
                <q-card style="max-width: 400px">
                    <q-card-section>
                        <div class="q-mb-md">
                            <div class="text-caption text-grey-7 q-mb-xs">步骤 1: 信息收集</div>
                            <q-linear-progress :value="1" color="positive" size="4px" />
                        </div>
                        <div class="q-mb-md">
                            <div class="text-caption text-grey-7 q-mb-xs">步骤 2: 数据处理</div>
                            <q-linear-progress :value="0.6" color="primary" size="4px" />
                        </div>
                        <div class="q-mb-md">
                            <div class="text-caption text-grey-7 q-mb-xs">步骤 3: 生成报告</div>
                            <q-linear-progress :value="0" color="grey-3" size="4px" />
                        </div>
                    </q-card-section>
                </q-card>
            </div>

            <!-- 技能等级 -->
            <div>
                <div class="text-subtitle2 q-mb-sm">技能等级</div>
                <div class="q-gutter-sm">
                    <div class="row items-center">
                        <div style="width: 100px">Vue.js</div>
                        <q-linear-progress :value="0.9" color="green" class="col" />
                        <div class="q-ml-sm" style="width: 40px">90%</div>
                    </div>
                    <div class="row items-center">
                        <div style="width: 100px">JavaScript</div>
                        <q-linear-progress :value="0.85" color="yellow-8" class="col" />
                        <div class="q-ml-sm" style="width: 40px">85%</div>
                    </div>
                    <div class="row items-center">
                        <div style="width: 100px">CSS</div>
                        <q-linear-progress :value="0.75" color="blue" class="col" />
                        <div class="q-ml-sm" style="width: 40px">75%</div>
                    </div>
                    <div class="row items-center">
                        <div style="width: 100px">Node.js</div>
                        <q-linear-progress :value="0.7" color="green-8" class="col" />
                        <div class="q-ml-sm" style="width: 40px">70%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const progress1 = ref(50)
const circularProgress = ref(60)
const uploadProgress = ref(0)
const uploading = ref(false)
const taskProgress = ref(80)

function startUpload() {
    uploading.value = true
    uploadProgress.value = 0

    const interval = setInterval(() => {
        uploadProgress.value += 10
        if (uploadProgress.value >= 100) {
            clearInterval(interval)
            uploading.value = false
        }
    }, 300)
}
</script>
