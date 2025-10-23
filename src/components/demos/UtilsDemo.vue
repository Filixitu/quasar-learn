<template>
    <div class="q-gutter-md">
        <div class="text-h6">Quasar 工具函数详解</div>

        <!-- 时间工具 -->
        <q-card>
            <q-card-section>
                <div class="text-h6 text-primary">⏰ 时间工具 (date)</div>
                <div class="text-subtitle2 text-grey-7">处理日期时间的实用函数</div>
            </q-card-section>

            <q-expansion-item label="功能演示" icon="schedule" default-opened>
                <q-card>
                    <q-card-section class="q-gutter-md">
                        <div>
                            <div class="text-subtitle1 q-mb-sm">📅 formatDate - 格式化日期</div>
                            <q-list dense bordered class="rounded-borders">
                                <q-item>
                                    <q-item-section>当前时间</q-item-section>
                                    <q-item-section side>{{ formatDate(now, 'YYYY-MM-DD HH:mm:ss') }}</q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>日期格式</q-item-section>
                                    <q-item-section side>{{ formatDate(now, 'YYYY年MM月DD日') }}</q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>时间格式</q-item-section>
                                    <q-item-section side>{{ formatDate(now, 'HH:mm:ss') }}</q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>相对时间</q-item-section>
                                    <q-item-section side>{{ getDateDiff(now, pastTime) }} 天前</q-item-section>
                                </q-item>
                            </q-list>
                        </div>

                        <div>
                            <div class="text-subtitle1 q-mb-sm">🔧 日期计算</div>
                            <div class="q-gutter-sm">
                                <q-btn color="primary" label="获取明天" @click="showTomorrow" />
                                <q-btn color="secondary" label="获取下周" @click="showNextWeek" />
                                <q-btn color="positive" label="获取月初" @click="showMonthStart" />
                                <q-btn color="orange" label="获取年末" @click="showYearEnd" />
                            </div>
                            <div class="q-mt-md text-body2">
                                计算结果：{{ calculatedDate }}
                            </div>
                        </div>

                        <div>
                            <div class="text-subtitle1 q-mb-sm">📊 实际应用场景</div>
                            <q-list>
                                <q-item>
                                    <q-item-section avatar>
                                        <q-icon name="event" color="primary" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>任务截止时间</q-item-label>
                                        <q-item-label caption>
                                            创建时间：{{ formatDate(taskDate, 'YYYY-MM-DD') }} |
                                            剩余：{{ getDateDiff(taskDeadline, now) }} 天
                                        </q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-badge :color="getDateDiff(taskDeadline, now) < 3 ? 'negative' : 'positive'">
                                            {{ getDateDiff(taskDeadline, now) < 0 ? '已逾期' : '进行中' }} </q-badge>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>

            <!-- 代码示例 -->
            <q-expansion-item label="💻 代码示例" icon="code">
                <q-card flat bordered>
                    <q-card-section>
                        <div class="text-subtitle2 q-mb-sm">时间工具使用示例：</div>
                        <div class="code-block">{{ dateCodeExample }}</div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-card>

        <q-separator />

        <!-- 颜色工具 -->
        <q-card>
            <q-card-section>
                <div class="text-h6 text-secondary">🎨 颜色工具</div>
                <div class="text-subtitle2 text-grey-7">颜色转换和处理函数</div>
            </q-card-section>

            <q-expansion-item label="功能演示" icon="palette">
                <q-card>
                    <q-card-section class="q-gutter-md">
                        <div>
                            <div class="text-subtitle1 q-mb-sm">🌈 颜色选择和预览</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <q-color v-model="themeColor" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="text-body2 q-mb-sm">当前颜色信息：</div>
                                    <q-list dense>
                                        <q-item>
                                            <q-item-section>HEX 值</q-item-section>
                                            <q-item-section side>{{ themeColor }}</q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section>RGB 值</q-item-section>
                                            <q-item-section side>{{ convertedRgb }}</q-item-section>
                                        </q-item>
                                    </q-list>

                                    <div class="text-body2 q-mt-md q-mb-sm">生成的调色板：</div>
                                    <div class="q-gutter-xs">
                                        <q-chip v-for="(color, index) in themePalette" :key="index"
                                            :style="{ backgroundColor: color, color: '#white' }">
                                            {{ ['主色', '浅色', '深色', '强调色'][index] }}
                                        </q-chip>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="text-subtitle1 q-mb-sm">🎯 实际应用：动态主题</div>
                            <q-card flat bordered :style="{ borderColor: themeColor }">
                                <q-card-section :style="{ backgroundColor: themeColor + '10' }">
                                    <div class="row items-center">
                                        <q-avatar :color="themeColor" text-color="white" icon="palette" />
                                        <div class="q-ml-md">
                                            <div class="text-h6" :style="{ color: themeColor }">自定义主题</div>
                                            <div class="text-caption">主题色会影响整个卡片样式</div>
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-card>

        <q-separator />

        <!-- 格式化工具 -->
        <q-card>
            <q-card-section>
                <div class="text-h6 text-orange">📝 格式化工具</div>
                <div class="text-subtitle2 text-grey-7">数字、文本、文件大小等格式化</div>
            </q-card-section>

            <q-expansion-item label="功能演示" icon="text_format">
                <q-card>
                    <q-card-section class="q-gutter-md">
                        <div>
                            <div class="text-subtitle1 q-mb-sm">💰 数字格式化</div>
                            <q-list dense bordered class="rounded-borders">
                                <q-item>
                                    <q-item-section>原始数字</q-item-section>
                                    <q-item-section side>{{ originalNumber }}</q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>千分位格式</q-item-section>
                                    <q-item-section side>{{ formatNumber(originalNumber) }}</q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>货币格式</q-item-section>
                                    <q-item-section side>¥{{ formatNumber(originalNumber, 2) }}</q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section>百分比</q-item-section>
                                    <q-item-section side>{{ ((originalNumber / 10000) * 100).toFixed(1)
                                    }}%</q-item-section>
                                </q-item>
                            </q-list>
                        </div>

                        <div>
                            <div class="text-subtitle1 q-mb-sm">📦 文件大小格式化</div>
                            <q-list dense bordered class="rounded-borders">
                                <q-item v-for="fileSize in fileSizes" :key="fileSize.bytes">
                                    <q-item-section>{{ fileSize.name }}</q-item-section>
                                    <q-item-section side>{{ humanStorageSize(fileSize.bytes) }}</q-item-section>
                                </q-item>
                            </q-list>
                        </div>

                        <div>
                            <div class="text-subtitle1 q-mb-sm">🔡 文本处理</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <q-input v-model="textInput" label="输入文本" outlined type="textarea" rows="3" />
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-list dense>
                                        <q-item>
                                            <q-item-section>字符数</q-item-section>
                                            <q-item-section side>{{ textInput.length }}</q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section>单词数</q-item-section>
                                            <q-item-section side>{{ countWords(textInput) }}</q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section>首字母大写</q-item-section>
                                            <q-item-section side>{{ capitalize(textInput) }}</q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section>截取预览</q-item-section>
                                            <q-item-section side>{{ truncate(textInput, 20) }}</q-item-section>
                                        </q-item>
                                    </q-list>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-card>

        <q-separator />

        <!-- DOM 工具和变形工具 -->
        <q-card>
            <q-card-section>
                <div class="text-h6 text-info">🏗️ DOM 操作和变形工具</div>
                <div class="text-subtitle2 text-grey-7">DOM 元素操作、动画变形、位置计算等高级工具</div>
            </q-card-section>

            <q-expansion-item label="🎯 DOM 元素操作" icon="web" default-opened>
                <q-card>
                    <q-card-section class="q-gutter-md">
                        <!-- 元素信息获取 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">📐 元素信息获取</div>
                            <div ref="domTestElement"
                                class="dom-test-element bg-primary text-white q-pa-md rounded-borders cursor-pointer"
                                @mouseover="updateElementInfo" @click="highlightElement">
                                🎯 测试元素 - 点击高亮，鼠标悬停获取信息
                                <q-tooltip>
                                    <div>
                                        宽度: {{ elementInfo.width }}px<br>
                                        高度: {{ elementInfo.height }}px<br>
                                        距顶部: {{ elementInfo.top }}px<br>
                                        距左侧: {{ elementInfo.left }}px<br>
                                        在视口中: {{ elementInfo.inViewport ? '是' : '否' }}
                                    </div>
                                </q-tooltip>
                            </div>

                            <div class="q-mt-md">
                                <q-list dense bordered class="rounded-borders">
                                    <q-item>
                                        <q-item-section>元素宽度</q-item-section>
                                        <q-item-section side>{{ elementInfo.width }}px</q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>元素高度</q-item-section>
                                        <q-item-section side>{{ elementInfo.height }}px</q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>距离顶部</q-item-section>
                                        <q-item-section side>{{ elementInfo.top }}px</q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>距离左侧</q-item-section>
                                        <q-item-section side>{{ elementInfo.left }}px</q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>在视口中</q-item-section>
                                        <q-item-section side>
                                            <q-badge :color="elementInfo.inViewport ? 'positive' : 'grey'">
                                                {{ elementInfo.inViewport ? '是' : '否' }}
                                            </q-badge>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </div>

                        <q-separator />

                        <!-- 样式动态修改 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">🎨 样式动态修改</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <div ref="styleTestElement"
                                        class="style-test-element q-pa-md rounded-borders transition-all">
                                        样式测试元素
                                    </div>
                                    <div class="q-gutter-sm q-mt-md">
                                        <q-btn size="sm" color="primary" label="变大" @click="scaleElement(1.2)" />
                                        <q-btn size="sm" color="secondary" label="变小" @click="scaleElement(0.8)" />
                                        <q-btn size="sm" color="positive" label="旋转" @click="rotateElement" />
                                        <q-btn size="sm" color="orange" label="移动" @click="translateElement" />
                                        <q-btn size="sm" color="grey" label="重置" @click="resetElement" />
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="text-body2 q-mb-sm">样式控制面板：</div>
                                    <div class="q-gutter-md">
                                        <q-slider v-model="styleControls.scale" :min="0.5" :max="2" :step="0.1" label
                                            @update:model-value="applyTransforms">
                                            <template v-slot:label>
                                                缩放: {{ styleControls.scale }}
                                            </template>
                                        </q-slider>

                                        <q-slider v-model="styleControls.rotation" :min="0" :max="360" :step="15" label
                                            @update:model-value="applyTransforms">
                                            <template v-slot:label>
                                                旋转: {{ styleControls.rotation }}°
                                            </template>
                                        </q-slider>

                                        <q-slider v-model="styleControls.opacity" :min="0" :max="1" :step="0.1" label
                                            @update:model-value="applyTransforms">
                                            <template v-slot:label>
                                                透明度: {{ styleControls.opacity }}
                                            </template>
                                        </q-slider>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <q-separator />

                        <!-- 动画效果演示 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">✨ DOM 动画效果</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-8">
                                    <div class="animation-playground bg-grey-1 q-pa-lg rounded-borders"
                                        style="min-height: 200px; position: relative;">
                                        <div ref="animationElement"
                                            class="animation-target bg-secondary text-white q-pa-sm rounded-borders"
                                            style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                            动画元素
                                        </div>
                                    </div>
                                    <div class="q-mt-md text-center">
                                        <div class="q-gutter-sm">
                                            <q-btn size="sm" color="primary" label="淡入" @click="animateFadeIn" />
                                            <q-btn size="sm" color="secondary" label="缩放" @click="animateScale" />
                                            <q-btn size="sm" color="positive" label="滑动" @click="animateSlide" />
                                            <q-btn size="sm" color="orange" label="旋转" @click="animateRotate" />
                                            <q-btn size="sm" color="purple" label="弹跳" @click="animateBounce" />
                                            <q-btn size="sm" color="red" label="摇摆" @click="animateShake" />
                                            <q-btn size="sm" color="grey" label="重置" @click="resetAnimation" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-4">
                                    <div class="text-body2 q-mb-sm">动画参数控制：</div>
                                    <q-list dense>
                                        <q-item>
                                            <q-item-section>动画时长</q-item-section>
                                            <q-item-section side>
                                                <q-slider v-model="animationDuration" :min="200" :max="2000" :step="100"
                                                    style="width: 100px" dense />
                                            </q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section>缓动函数</q-item-section>
                                            <q-item-section side style="width: 120px">
                                                <q-select v-model="easingFunction" :options="easingOptions" dense
                                                    outlined />
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </div>
                            </div>
                        </div>

                        <q-separator />

                        <!-- 元素可见性检测 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">👁️ 元素可见性检测</div>
                            <div class="visibility-test-area"
                                style="height: 300px; overflow-y: auto; border: 2px dashed #ccc; border-radius: 8px;">
                                <div class="q-pa-md">
                                    <div v-for="i in 20" :key="i" :ref="el => visibilityElements[i] = el"
                                        class="visibility-item q-ma-md q-pa-md rounded-borders" :class="{
                                            'bg-positive text-white': visibleElements.includes(i),
                                            'bg-grey-3': !visibleElements.includes(i)
                                        }">
                                        元素 {{ i }} - {{ visibleElements.includes(i) ? '✅ 可见' : '❌ 不可见' }}
                                    </div>
                                </div>
                            </div>
                            <div class="q-mt-sm text-caption">
                                滚动查看可见性检测效果 - 绿色表示在视口中可见
                            </div>
                        </div>

                        <q-separator />

                        <!-- 元素位置和滚动控制 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">📍 位置控制和滚动</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <div class="scroll-control-demo bg-grey-1 q-pa-md"
                                        style="height: 250px; overflow: auto;" ref="scrollDemo"
                                        @scroll="updateScrollDemoInfo">
                                        <div ref="scrollTarget1"
                                            class="scroll-target bg-red-1 q-pa-md q-mb-md rounded-borders">
                                            🎯 滚动目标 1
                                        </div>
                                        <div v-for="i in 15" :key="i" class="q-mb-md">
                                            <q-card flat bordered>
                                                <q-card-section class="q-py-sm">
                                                    内容区块 {{ i }}
                                                </q-card-section>
                                            </q-card>
                                        </div>
                                        <div ref="scrollTarget2"
                                            class="scroll-target bg-blue-1 q-pa-md q-mb-md rounded-borders">
                                            🎯 滚动目标 2
                                        </div>
                                        <div v-for="i in 10" :key="`bottom-${i}`" class="q-mb-md">
                                            <q-card flat bordered>
                                                <q-card-section class="q-py-sm">
                                                    底部内容 {{ i }}
                                                </q-card-section>
                                            </q-card>
                                        </div>
                                        <div ref="scrollTarget3"
                                            class="scroll-target bg-green-1 q-pa-md rounded-borders">
                                            🎯 滚动目标 3 (底部)
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="text-body2 q-mb-sm">滚动控制：</div>
                                    <div class="q-gutter-sm q-mb-md">
                                        <q-btn size="sm" color="red" label="滚动到目标1" @click="scrollToTarget(1)" />
                                        <q-btn size="sm" color="blue" label="滚动到目标2" @click="scrollToTarget(2)" />
                                        <q-btn size="sm" color="green" label="滚动到目标3" @click="scrollToTarget(3)" />
                                    </div>

                                    <div class="text-body2 q-mb-sm">滚动信息：</div>
                                    <q-list dense>
                                        <q-item>
                                            <q-item-section>滚动位置</q-item-section>
                                            <q-item-section side>{{ scrollDemoInfo.scrollTop }}px</q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section>滚动进度</q-item-section>
                                            <q-item-section side>{{ Math.round(scrollDemoInfo.progress * 100)
                                            }}%</q-item-section>
                                        </q-item>
                                        <q-item>
                                            <q-item-section>可滚动高度</q-item-section>
                                            <q-item-section side>{{ scrollDemoInfo.scrollHeight }}px</q-item-section>
                                        </q-item>
                                    </q-list>
                                    <q-linear-progress :value="scrollDemoInfo.progress" color="primary"
                                        class="q-mt-sm" />
                                </div>
                            </div>
                        </div>

                        <q-separator />

                        <!-- CSS 类操作 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">🎭 CSS 类动态操作</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <div ref="cssTestElement"
                                        class="css-test-element q-pa-lg rounded-borders text-center transition-all"
                                        :class="cssClasses">
                                        <div class="text-h6">CSS 测试元素</div>
                                        <div class="text-caption">动态类名控制</div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="q-gutter-sm">
                                        <div class="text-body2 q-mb-sm">应用样式类：</div>
                                        <q-checkbox v-model="cssClassFlags" val="shadow-10" label="阴影效果" />
                                        <q-checkbox v-model="cssClassFlags" val="bg-gradient" label="渐变背景" />
                                        <q-checkbox v-model="cssClassFlags" val="text-bold" label="粗体文字" />
                                        <q-checkbox v-model="cssClassFlags" val="border-primary" label="主色边框" />
                                        <q-checkbox v-model="cssClassFlags" val="elevated-hover" label="悬浮效果" />
                                    </div>

                                    <div class="q-mt-md">
                                        <q-btn size="sm" color="primary" label="添加随机类" @click="addRandomClass" />
                                        <q-btn size="sm" color="negative" label="清除所有" @click="clearAllClasses" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <q-separator />

                        <!-- 元素创建和操作 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">🏗️ 动态元素创建</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <div ref="dynamicContainer"
                                        class="dynamic-container bg-grey-1 q-pa-md rounded-borders"
                                        style="min-height: 200px;">
                                        <div class="text-center text-grey-7" v-if="dynamicElements.length === 0">
                                            暂无动态元素
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="q-gutter-sm">
                                        <q-btn color="primary" label="创建按钮" @click="createButton" />
                                        <q-btn color="secondary" label="创建卡片" @click="createCard" />
                                        <q-btn color="positive" label="创建图标" @click="createIcon" />
                                        <q-btn color="orange" label="创建文本" @click="createText" />
                                        <q-btn color="purple" label="创建输入框" @click="createInput" />
                                        <q-btn color="negative" label="清空所有" @click="clearDynamicElements" />
                                    </div>

                                    <div class="q-mt-md text-caption">
                                        已创建元素: {{ dynamicElements.length }} 个
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>

            <q-expansion-item label="🎬 高级动画和变形" icon="animation">
                <q-card>
                    <q-card-section class="q-gutter-md">
                        <!-- 关键帧动画 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">🎭 关键帧动画演示</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <div class="keyframe-demo-area bg-grey-1 q-pa-lg rounded-borders"
                                        style="height: 200px; position: relative;">
                                        <div v-for="(ball, index) in animationBalls" :key="index" ref="ballElements"
                                            class="animation-ball" :class="ball.animationClass" :style="{
                                                backgroundColor: ball.color,
                                                left: ball.x + 'px',
                                                top: ball.y + 'px'
                                            }" @click="explodeBall(index)">
                                            {{ index + 1 }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="q-gutter-sm">
                                        <q-btn color="primary" label="创建弹球" @click="createBall" />
                                        <q-btn color="secondary" label="全部浮动" @click="floatAllBalls" />
                                        <q-btn color="positive" label="全部旋转" @click="rotateAllBalls" />
                                        <q-btn color="orange" label="随机移动" @click="randomMoveBalls" />
                                        <q-btn color="purple" label="彩虹效果" @click="rainbowEffect" />
                                        <q-btn color="negative" label="清空" @click="clearBalls" />
                                    </div>

                                    <div class="q-mt-md">
                                        <div class="text-body2 q-mb-sm">动画选项：</div>
                                        <q-option-group v-model="animationType" :options="[
                                            { label: '弹跳', value: 'bounce' },
                                            { label: '脉冲', value: 'pulse' },
                                            { label: '摇摆', value: 'swing' },
                                            { label: '闪烁', value: 'flash' }
                                        ]" color="primary" inline />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <q-separator />

                        <!-- 拖拽和触摸 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">👆 拖拽和触摸交互</div>
                            <div class="drag-demo-area bg-grey-1 q-pa-md rounded-borders"
                                style="height: 250px; position: relative;">
                                <div v-for="(item, index) in draggableItems" :key="index" class="draggable-item" :style="{
                                    left: item.x + 'px',
                                    top: item.y + 'px',
                                    backgroundColor: item.color,
                                    transform: `rotate(${item.rotation}deg)`
                                }" @mousedown="startDrag(index, $event)" @dblclick="rotateDraggable(index)">
                                    <div class="text-white text-center">
                                        <div class="text-weight-bold">{{ item.type }}</div>
                                        <div class="text-caption">{{ index + 1 }}</div>
                                    </div>
                                </div>

                                <div class="absolute-bottom-left q-pa-sm">
                                    <div class="text-caption text-grey-7">
                                        💡 拖拽移动，双击旋转
                                    </div>
                                </div>
                            </div>

                            <div class="q-mt-md q-gutter-sm">
                                <q-btn color="primary" label="添加方块" @click="addDraggableItem('方块')" />
                                <q-btn color="secondary" label="添加圆形" @click="addDraggableItem('圆形')" />
                                <q-btn color="positive" label="全部回中心" @click="centerAllItems" />
                                <q-btn color="orange" label="随机散布" @click="scatterItems" />
                                <q-btn color="negative" label="清空" @click="draggableItems = []" />
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>

            <q-expansion-item label="⚙️ 实用工具集合" icon="build">
                <q-card>
                    <q-card-section class="q-gutter-md">
                        <!-- 防抖演示 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">⏱️ debounce - 防抖功能</div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12 col-sm-6">
                                    <q-input v-model="searchQuery" label="搜索（防抖 500ms）" outlined
                                        @update:model-value="onSearchInput">
                                        <template v-slot:prepend>
                                            <q-icon name="search" />
                                        </template>
                                    </q-input>
                                    <div class="text-caption q-mt-sm">
                                        输入次数: {{ inputCount }} | 搜索次数: {{ searchCount }}
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-list dense v-if="searchResults.length > 0">
                                        <q-item-label header>搜索结果</q-item-label>
                                        <q-item v-for="result in searchResults" :key="result">
                                            <q-item-section>{{ result }}</q-item-section>
                                        </q-item>
                                    </q-list>
                                </div>
                            </div>
                        </div>

                        <q-separator />

                        <!-- 滚动操作 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">📜 滚动控制</div>
                            <div class="q-gutter-sm q-mb-md">
                                <q-btn color="primary" label="滚动到顶部" @click="scrollToTop" />
                                <q-btn color="secondary" label="滚动到底部" @click="scrollToBottom" />
                                <q-btn color="positive" label="平滑滚动" @click="smoothScroll" />
                            </div>

                            <div class="scroll-demo bg-grey-2 q-pa-md" style="height: 200px; overflow-y: auto;"
                                @scroll="onScroll">
                                <div class="bg-primary text-white q-pa-md q-mb-md rounded-borders">
                                    滚动目标区域 - 顶部
                                </div>
                                <div v-for="i in 10" :key="i" class="q-mb-sm">
                                    <q-card flat bordered>
                                        <q-card-section class="text-center">
                                            内容项 {{ i }}
                                        </q-card-section>
                                    </q-card>
                                </div>
                                <div class="bg-secondary text-white q-pa-md rounded-borders">
                                    滚动目标区域 - 底部
                                </div>
                            </div>

                            <div class="q-mt-sm">
                                <div class="text-caption">滚动进度: {{ Math.round(scrollProgress * 100) }}%</div>
                                <q-linear-progress :value="scrollProgress" color="primary" />
                            </div>
                        </div>

                        <q-separator />

                        <!-- 文件大小格式化 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">📦 文件大小格式化</div>
                            <q-list dense bordered class="rounded-borders">
                                <q-item v-for="fileSize in fileSizes" :key="fileSize.bytes">
                                    <q-item-section>{{ fileSize.name }}</q-item-section>
                                    <q-item-section side>{{ humanStorageSize(fileSize.bytes) }}</q-item-section>
                                </q-item>
                            </q-list>
                        </div>

                        <q-separator />

                        <!-- UID 生成 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">🆔 唯一 ID 生成</div>
                            <div class="q-gutter-sm q-mb-md">
                                <q-btn color="primary" label="生成单个 ID" @click="generateSingleId" />
                                <q-btn color="secondary" label="生成 5 个 ID" @click="generateMultipleIds" />
                                <q-btn flat label="清空" @click="generatedIds = []" />
                            </div>

                            <q-list v-if="generatedIds.length > 0" class="q-mt-md"
                                style="max-height: 200px; overflow-y: auto;">
                                <q-item-label header>生成的 ID 列表</q-item-label>
                                <q-item v-for="id in generatedIds" :key="id">
                                    <q-item-section>
                                        <q-item-label class="text-mono">{{ id }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-btn flat dense icon="content_copy" @click="copyId(id)" size="sm" />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>

                        <q-separator />

                        <!-- 剪贴板操作 -->
                        <div>
                            <div class="text-subtitle1 q-mb-sm">📋 剪贴板操作</div>
                            <div class="row q-col-gutter-sm">
                                <div class="col">
                                    <q-input v-model="copyText" label="要复制的文本" outlined />
                                </div>
                                <div class="col-auto">
                                    <q-btn color="primary" icon="content_copy" label="复制" @click="handleCopyText" />
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>

            <!-- 工具函数代码示例 -->
            <q-expansion-item label="💻 工具函数代码" icon="code">
                <q-card flat bordered>
                    <q-card-section>
                        <q-tabs v-model="utilsTab" align="left">
                            <q-tab name="debounce" label="防抖" />
                            <q-tab name="scroll" label="滚动" />
                            <q-tab name="format" label="格式化" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="utilsTab" animated>
                            <q-tab-panel name="debounce">
                                <div class="code-block">{{ debounceCodeExample }}</div>
                            </q-tab-panel>

                            <q-tab-panel name="scroll">
                                <div class="code-block">{{ scrollCodeExample }}</div>
                            </q-tab-panel>

                            <q-tab-panel name="format">
                                <div class="code-block">{{ formatCodeExample }}</div>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-card>

        <q-separator />

        <!-- 综合实战示例 -->
        <q-card class="bg-gradient-to-r">
            <q-card-section>
                <div class="text-h6">🚀 综合实战：聊天应用</div>
                <div class="text-subtitle2">结合多个工具函数的完整示例</div>
            </q-card-section>

            <q-expansion-item label="💬 聊天演示" icon="chat" default-opened>
                <q-card>
                    <q-card-section class="q-pa-none">
                        <div class="chat-demo">
                            <div class="chat-header bg-primary text-white q-pa-md">
                                <div class="row items-center justify-between">
                                    <div class="text-h6">聊天演示</div>
                                    <q-badge color="white" text-color="primary">{{ chatMessages.length }} 条消息</q-badge>
                                </div>
                            </div>

                            <div class="chat-messages q-pa-md" style="height: 300px; overflow-y: auto;"
                                ref="chatContainer">
                                <div v-for="message in chatMessages" :key="message.id" class="q-mb-md">
                                    <div :class="message.isMine ? 'row reverse' : 'row'">
                                        <q-chat-message :text="[message.text]" :sent="message.isMine"
                                            :stamp="formatDate(message.timestamp, 'HH:mm')"
                                            :bg-color="message.isMine ? 'primary' : 'grey-3'"
                                            :text-color="message.isMine ? 'white' : 'black'">
                                            <template v-slot:avatar>
                                                <q-avatar :color="message.isMine ? 'primary' : 'secondary'"
                                                    text-color="white">
                                                    {{ message.author[0] }}
                                                </q-avatar>
                                            </template>
                                        </q-chat-message>
                                    </div>
                                </div>
                            </div>

                            <div class="chat-input q-pa-md bg-grey-1">
                                <div class="row q-gutter-sm">
                                    <div class="col">
                                        <q-input v-model="newMessage" placeholder="输入消息... (按回车发送)" outlined dense
                                            @keyup.enter="sendMessage" />
                                    </div>
                                    <div class="col-auto">
                                        <q-btn color="primary" icon="send" @click="sendMessage"
                                            :disable="!newMessage.trim()" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-card>

        <q-separator />

        <!-- 学习总结 -->
        <q-card class="bg-grey-1">
            <q-card-section>
                <div class="text-h6">📋 工具函数学习总结</div>
            </q-card-section>
            <q-card-section>
                <q-list>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar color="primary" text-color="white" icon="schedule" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>时间工具 - 必备技能</q-item-label>
                            <q-item-label caption>formatDate, getDateDiff, addToDate 等</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar color="secondary" text-color="white" icon="palette" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>颜色工具 - 主题开发</q-item-label>
                            <q-item-label caption>颜色转换、调色板生成、对比度计算</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar color="orange" text-color="white" icon="text_format" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>格式化工具 - 数据展示</q-item-label>
                            <q-item-label caption>数字、文件大小、文本格式化</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar color="positive" text-color="white" icon="speed" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>性能工具 - 优化必备</q-item-label>
                            <q-item-label caption>debounce 防抖、throttle 节流</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useQuasar, date, format, copyToClipboard, debounce, throttle, uid } from 'quasar'

const $q = useQuasar()

// 时间相关
const now = ref(Date.now())
const pastTime = Date.now() - 7 * 24 * 60 * 60 * 1000 // 7天前
const calculatedDate = ref('')
const taskDate = Date.now() - 3 * 24 * 60 * 60 * 1000
const taskDeadline = Date.now() + 2 * 24 * 60 * 60 * 1000

// 更新当前时间
setInterval(() => {
    now.value = Date.now()
}, 1000)

// 颜色相关
const themeColor = ref('#1976d2')

const convertedRgb = computed(() => {
    return hexToRgb(themeColor.value)
})

const themePalette = computed(() => [
    themeColor.value,
    lightenColor(themeColor.value),
    darkenColor(themeColor.value),
    getContrastColor(themeColor.value)
])

// 格式化相关
const originalNumber = ref(1234567.89)
const textInput = ref('hello world from quasar framework')

const fileSizes = [
    { name: '文档', bytes: 1024 },
    { name: '图片', bytes: 1024 * 1024 },
    { name: '视频', bytes: 1024 * 1024 * 50 },
    { name: '软件', bytes: 1024 * 1024 * 1024 }
]

// 搜索相关（防抖演示）
const searchQuery = ref('')
const inputCount = ref(0)
const searchCount = ref(0)
const searchResults = ref([])

// 滚动相关
const scrollProgress = ref(0)

// DOM 操作相关
const domTestElement = ref(null)
const styleTestElement = ref(null)
const animationElement = ref(null)
const scrollDemo = ref(null)
const scrollTarget1 = ref(null)
const scrollTarget2 = ref(null)
const scrollTarget3 = ref(null)
const dynamicContainer = ref(null)
const cssTestElement = ref(null)

// 元素信息
const elementInfo = ref({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    inViewport: false
})

// 样式控制
const styleControls = ref({
    scale: 1,
    rotation: 0,
    opacity: 1
})

// CSS 类控制
const cssClassFlags = ref([])
const cssClasses = computed(() => cssClassFlags.value.join(' '))

// 滚动信息
const scrollDemoInfo = ref({
    scrollTop: 0,
    progress: 0,
    scrollHeight: 0
})

// 动画相关
const animationDuration = ref(1000)
const easingFunction = ref('ease-in-out')
const easingOptions = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)']
const animationType = ref('bounce')

// 动画球
const animationBalls = ref([])
const ballElements = ref([])

// 可见性检测
const visibilityElements = ref({})
const visibleElements = ref([])
const intersectionObserver = ref(null)

// 拖拽相关
const draggableItems = ref([])
const dragState = ref({
    isDragging: false,
    dragIndex: -1,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
})

// 动态元素
const dynamicElements = ref([])

// 其他
const copyText = ref('这是要复制的文本内容')
const generatedIds = ref([])
const utilsTab = ref('debounce')

// 聊天演示
const chatMessages = ref([
    {
        id: uid(),
        text: '欢迎使用工具函数演示！',
        author: '系统',
        isMine: false,
        timestamp: Date.now() - 60000
    }
])
const newMessage = ref('')
const chatContainer = ref(null)

// 代码示例
const dateCodeExample = `import { date } from 'quasar'

// 格式化日期
const formatted = date.formatDate(Date.now(), 'YYYY-MM-DD')

// 日期差值
const diff = date.getDateDiff(date2, date1, 'days')

// 日期计算
const tomorrow = date.addToDate(new Date(), { days: 1 })
const monthStart = date.startOfDate(new Date(), 'month')`

const debounceCodeExample = `import { debounce } from 'quasar'

// 搜索防抖
const debouncedSearch = debounce((query) => {
  // 执行搜索
  searchAPI(query)
}, 500)

// 在输入框中使用
<q-input @input="debouncedSearch" />`

const scrollCodeExample = `import { scroll } from 'quasar'

// 滚动到顶部
scroll.setVerticalScrollPosition(window, 0, 300)

// 动画滚动
scroll.animateScrollTo(500, 300)

// 滚动到元素
element.scrollIntoView({ behavior: 'smooth' })`

const formatCodeExample = `import { format } from 'quasar'

// 文件大小
format.humanStorageSize(1536) // "1.5 KB"

// 数字格式化
number.toLocaleString('zh-CN', {
  minimumFractionDigits: 2
}) // "12,345.67"`

// 时间工具函数
const { formatDate, getDateDiff, addToDate, startOfDate, endOfDate } = date

function showTomorrow() {
    calculatedDate.value = formatDate(addToDate(now.value, { days: 1 }), 'YYYY-MM-DD')
    $q.notify('明天日期：' + calculatedDate.value)
}

function showNextWeek() {
    calculatedDate.value = formatDate(addToDate(now.value, { days: 7 }), 'YYYY-MM-DD')
    $q.notify('下周今天：' + calculatedDate.value)
}

function showMonthStart() {
    calculatedDate.value = formatDate(startOfDate(now.value, 'month'), 'YYYY-MM-DD')
    $q.notify('本月第一天：' + calculatedDate.value)
}

function showYearEnd() {
    calculatedDate.value = formatDate(endOfDate(now.value, 'year'), 'YYYY-MM-DD')
    $q.notify('今年最后一天：' + calculatedDate.value)
}

// 颜色工具函数
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ?
        `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` :
        'invalid color'
}

function lightenColor(color) {
    // 简化实现，在实际项目中使用 Quasar 的颜色工具
    return color.replace('#', '#B')
}

function darkenColor(color) {
    return color.replace('#1', '#0')
}

function getContrastColor(color) {
    return color === '#1976d2' ? '#ffc107' : '#1976d2'
}

// 格式化工具函数
const { humanStorageSize } = format

function formatNumber(num, decimals = 0) {
    return num.toLocaleString('zh-CN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

function truncate(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text
}

// 搜索相关（防抖）
const debouncedSearch = debounce((query) => {
    searchCount.value++
    if (query.trim()) {
        searchResults.value = [
            `搜索结果1: ${query}`,
            `搜索结果2: ${query} 相关`,
            `搜索结果3: ${query} 匹配项`
        ]
    } else {
        searchResults.value = []
    }
    $q.notify(`搜索: ${query}`)
}, 500)

function onSearchInput(value) {
    inputCount.value++
    debouncedSearch(value)
}

// 滚动相关
const throttledScrollHandler = throttle((event) => {
    const element = event.target
    const scrollTop = element.scrollTop
    const scrollHeight = element.scrollHeight
    const clientHeight = element.clientHeight
    scrollProgress.value = scrollTop / (scrollHeight - clientHeight)
}, 100)

function onScroll(event) {
    throttledScrollHandler(event)
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    $q.notify('已滚动到顶部')
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    $q.notify('已滚动到底部')
}

function smoothScroll() {
    const middle = document.body.scrollHeight / 2
    window.scrollTo({ top: middle, behavior: 'smooth' })
    $q.notify('已滚动到页面中间')
}

// 剪贴板操作
function handleCopyText() {
    copyToClipboard(copyText.value)
        .then(() => {
            $q.notify({
                message: '✅ 已复制到剪贴板',
                color: 'positive'
            })
        })
        .catch(() => {
            $q.notify({
                message: '❌ 复制失败',
                color: 'negative'
            })
        })
}

// UID 生成
function generateSingleId() {
    generatedIds.value.push(uid())
    $q.notify('已生成新 ID')
}

function generateMultipleIds() {
    for (let i = 0; i < 5; i++) {
        generatedIds.value.push(uid())
    }
    $q.notify('已生成 5 个 ID')
}

function copyId(id) {
    copyToClipboard(id).then(() => {
        $q.notify('ID 已复制')
    })
}

// 聊天功能
function sendMessage() {
    if (newMessage.value.trim()) {
        const message = {
            id: uid(),
            text: newMessage.value,
            author: '我',
            isMine: true,
            timestamp: Date.now()
        }
        chatMessages.value.push(message)
        newMessage.value = ''

        // 滚动到底部
        nextTick(() => {
            if (chatContainer.value) {
                chatContainer.value.scrollTop = chatContainer.value.scrollHeight
            }
        })

        // 模拟系统回复
        setTimeout(() => {
            const replies = [
                '收到你的消息！',
                '工具函数很有用吧？',
                '继续探索更多功能！',
                '学会了这些，开发效率翻倍！'
            ]
            const reply = {
                id: uid(),
                text: replies[Math.floor(Math.random() * replies.length)],
                author: '助手',
                isMine: false,
                timestamp: Date.now()
            }
            chatMessages.value.push(reply)

            nextTick(() => {
                if (chatContainer.value) {
                    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
                }
            })
        }, 1000)
    }
}

// DOM 工具函数

/**
 * 🎯 更新元素信息
 */
function updateElementInfo() {
    if (domTestElement.value) {
        const rect = domTestElement.value.getBoundingClientRect()
        elementInfo.value = {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            top: Math.round(rect.top + window.scrollY),
            left: Math.round(rect.left + window.scrollX),
            inViewport: rect.top >= 0 && rect.left >= 0 &&
                rect.bottom <= window.innerHeight &&
                rect.right <= window.innerWidth
        }
    }
}

/**
 * 🎯 高亮元素
 */
function highlightElement() {
    if (domTestElement.value) {
        // 添加高亮动画
        domTestElement.value.style.boxShadow = '0 0 20px #ff9800'
        domTestElement.value.style.transform = 'scale(1.05)'

        setTimeout(() => {
            domTestElement.value.style.boxShadow = ''
            domTestElement.value.style.transform = ''
        }, 1000)

        $q.notify('元素已高亮！')
    }
}

/**
 * 🎯 缩放元素
 */
function scaleElement(scale) {
    styleControls.value.scale = scale
    applyTransforms()
}

/**
 * 🎯 旋转元素
 */
function rotateElement() {
    styleControls.value.rotation += 45
    if (styleControls.value.rotation >= 360) {
        styleControls.value.rotation = 0
    }
    applyTransforms()
}

/**
 * 🎯 移动元素
 */
function translateElement() {
    if (styleTestElement.value) {
        const randomX = Math.random() * 100 - 50
        const randomY = Math.random() * 50 - 25
        styleTestElement.value.style.transform += ` translate(${randomX}px, ${randomY}px)`
    }
}

/**
 * 🎯 重置元素样式
 */
function resetElement() {
    styleControls.value = { scale: 1, rotation: 0, opacity: 1 }
    applyTransforms()
    if (styleTestElement.value) {
        styleTestElement.value.style.transform = ''
    }
}

/**
 * 🎯 应用变形效果
 */
function applyTransforms() {
    if (styleTestElement.value) {
        const { scale, rotation, opacity } = styleControls.value
        styleTestElement.value.style.transform = `scale(${scale}) rotate(${rotation}deg)`
        styleTestElement.value.style.opacity = opacity.toString()
    }
}

/**
 * 🎯 添加随机CSS类
 */
function addRandomClass() {
    const randomClasses = ['shadow-5', 'bg-orange', 'text-italic', 'rounded-borders', 'q-mt-md']
    const randomClass = randomClasses[Math.floor(Math.random() * randomClasses.length)]

    if (!cssClassFlags.value.includes(randomClass)) {
        cssClassFlags.value.push(randomClass)
        $q.notify(`添加了类: ${randomClass}`)
    }
}

/**
 * 🎯 清除所有CSS类
 */
function clearAllClasses() {
    cssClassFlags.value = []
    $q.notify('已清除所有样式类')
}

/**
 * 🎯 滚动到指定目标
 */
function scrollToTarget(targetNum) {
    const targets = [null, scrollTarget1.value, scrollTarget2.value, scrollTarget3.value]
    const target = targets[targetNum]

    if (target && scrollDemo.value) {
        const container = scrollDemo.value
        const targetTop = target.offsetTop - container.offsetTop - 50

        container.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        })

        $q.notify(`滚动到目标 ${targetNum}`)
    }
}

/**
 * 🎯 更新滚动信息
 */
function updateScrollDemoInfo(event) {
    const element = event.target
    scrollDemoInfo.value = {
        scrollTop: Math.round(element.scrollTop),
        progress: element.scrollTop / (element.scrollHeight - element.clientHeight),
        scrollHeight: element.scrollHeight
    }
}

/**
 * 🎯 创建动态元素
 */
function createButton() {
    createDynamicElement('button', '动态按钮', 'btn btn-primary', () => {
        $q.notify('点击了动态按钮！')
    })
}

function createCard() {
    createDynamicElement('div', `卡片 ${dynamicElements.value.length + 1}`, 'q-card q-pa-md q-mb-md bg-white')
}

function createIcon() {
    createDynamicElement('i', 'star', 'material-icons text-orange', null, 'star')
}

function createText() {
    createDynamicElement('p', `动态文本 ${Date.now()}`, 'text-body1 q-mb-md')
}

function createInput() {
    createDynamicElement('input', '', 'q-input-target q-mb-md', null, null, {
        placeholder: '动态输入框',
        style: 'padding: 8px; border: 1px solid #ccc; border-radius: 4px;'
    })
}

/**
 * 🎯 通用动态元素创建函数
 */
function createDynamicElement(tag, content, className, clickHandler, iconName, attrs = {}) {
    if (dynamicContainer.value) {
        const element = document.createElement(tag)

        if (iconName) {
            element.textContent = iconName
        } else {
            element.textContent = content
        }

        element.className = className

        // 设置属性
        Object.keys(attrs).forEach(key => {
            if (key === 'style') {
                element.style.cssText = attrs[key]
            } else {
                element.setAttribute(key, attrs[key])
            }
        })

        if (clickHandler) {
            element.addEventListener('click', clickHandler)
        }

        // 添加删除按钮
        if (tag !== 'input') {
            const deleteBtn = document.createElement('button')
            deleteBtn.innerHTML = '×'
            deleteBtn.style.cssText = 'position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 12px;'
            deleteBtn.onclick = (e) => {
                e.stopPropagation()
                element.remove()
                const index = dynamicElements.value.indexOf(element)
                if (index > -1) dynamicElements.value.splice(index, 1)
            }
            element.style.position = 'relative'
            element.appendChild(deleteBtn)
        }

        dynamicContainer.value.appendChild(element)
        dynamicElements.value.push(element)

        $q.notify(`创建了 ${tag} 元素`)
    }
}

/**
 * 🎯 清空动态元素
 */
function clearDynamicElements() {
    if (dynamicContainer.value) {
        dynamicContainer.value.innerHTML = '<div class="text-center text-grey-7">暂无动态元素</div>'
        dynamicElements.value = []
        $q.notify('已清空所有动态元素')
    }
}

/**
 * 🎯 动画函数
 */
function animateFadeIn() {
    if (animationElement.value) {
        animationElement.value.style.opacity = '0'
        animationElement.value.style.transition = `opacity ${animationDuration.value}ms ${easingFunction.value}`

        setTimeout(() => {
            animationElement.value.style.opacity = '1'
        }, 50)
    }
}

function animateScale() {
    if (animationElement.value) {
        animationElement.value.style.transition = `transform ${animationDuration.value}ms ${easingFunction.value}`
        animationElement.value.style.transform = 'translate(-50%, -50%) scale(1.5)'

        setTimeout(() => {
            animationElement.value.style.transform = 'translate(-50%, -50%) scale(1)'
        }, animationDuration.value)
    }
}

function animateSlide() {
    if (animationElement.value) {
        const directions = [
            'translate(-30%, -50%)',
            'translate(-70%, -50%)',
            'translate(-50%, -30%)',
            'translate(-50%, -70%)'
        ]
        const randomDir = directions[Math.floor(Math.random() * directions.length)]

        animationElement.value.style.transition = `transform ${animationDuration.value}ms ${easingFunction.value}`
        animationElement.value.style.transform = randomDir

        setTimeout(() => {
            animationElement.value.style.transform = 'translate(-50%, -50%)'
        }, animationDuration.value)
    }
}

function animateRotate() {
    if (animationElement.value) {
        animationElement.value.style.transition = `transform ${animationDuration.value}ms ${easingFunction.value}`
        animationElement.value.style.transform = 'translate(-50%, -50%) rotate(360deg)'

        setTimeout(() => {
            animationElement.value.style.transform = 'translate(-50%, -50%) rotate(0deg)'
        }, animationDuration.value)
    }
}

function animateBounce() {
    if (animationElement.value) {
        animationElement.value.style.animation = `bounce ${animationDuration.value}ms ${easingFunction.value}`

        setTimeout(() => {
            animationElement.value.style.animation = ''
        }, animationDuration.value)
    }
}

function animateShake() {
    if (animationElement.value) {
        animationElement.value.style.animation = `shake ${animationDuration.value}ms ${easingFunction.value}`

        setTimeout(() => {
            animationElement.value.style.animation = ''
        }, animationDuration.value)
    }
}

function resetAnimation() {
    if (animationElement.value) {
        animationElement.value.style.transition = ''
        animationElement.value.style.transform = 'translate(-50%, -50%)'
        animationElement.value.style.animation = ''
        animationElement.value.style.opacity = '1'
    }
}

/**
 * 🎯 动画球相关函数
 */
function createBall() {
    const colors = ['#ff9800', '#2196f3', '#4caf50', '#f44336', '#9c27b0', '#ffeb3b']
    const ball = {
        x: Math.random() * 200 + 50,
        y: Math.random() * 100 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationClass: ''
    }
    animationBalls.value.push(ball)
}

function floatAllBalls() {
    animationBalls.value.forEach((ball) => {
        ball.animationClass = 'ball-float'
        setTimeout(() => {
            ball.animationClass = ''
        }, 2000)
    })
}

function rotateAllBalls() {
    animationBalls.value.forEach(ball => {
        ball.animationClass = 'ball-rotate'
        setTimeout(() => {
            ball.animationClass = ''
        }, 2000)
    })
}

function randomMoveBalls() {
    animationBalls.value.forEach(ball => {
        ball.x = Math.random() * 250
        ball.y = Math.random() * 120
    })
}

function rainbowEffect() {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
    animationBalls.value.forEach((ball, index) => {
        ball.color = colors[index % colors.length]
        ball.animationClass = 'ball-pulse'
    })

    setTimeout(() => {
        animationBalls.value.forEach(ball => {
            ball.animationClass = ''
        })
    }, 3000)
}

function explodeBall(index) {
    const ball = animationBalls.value[index]
    ball.animationClass = 'ball-explode'

    setTimeout(() => {
        animationBalls.value.splice(index, 1)
    }, 500)
}

function clearBalls() {
    animationBalls.value = []
}

/**
 * 🎯 拖拽相关函数
 */
function addDraggableItem(type) {
    const colors = ['#ff5722', '#3f51b5', '#009688', '#ff9800', '#e91e63']
    const item = {
        type,
        x: Math.random() * 200 + 20,
        y: Math.random() * 150 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0
    }
    draggableItems.value.push(item)
}

function startDrag(index, event) {
    dragState.value = {
        isDragging: true,
        dragIndex: index,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: event.clientX - draggableItems.value[index].x,
        offsetY: event.clientY - draggableItems.value[index].y
    }

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', endDrag)
    event.preventDefault()
}

function handleDrag(event) {
    if (dragState.value.isDragging) {
        const item = draggableItems.value[dragState.value.dragIndex]
        item.x = event.clientX - dragState.value.offsetX
        item.y = event.clientY - dragState.value.offsetY
    }
}

function endDrag() {
    dragState.value.isDragging = false
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', endDrag)
}

function rotateDraggable(index) {
    draggableItems.value[index].rotation += 45
}

function centerAllItems() {
    draggableItems.value.forEach(item => {
        item.x = 100
        item.y = 75
        item.rotation = 0
    })
}

function scatterItems() {
    draggableItems.value.forEach(item => {
        item.x = Math.random() * 250
        item.y = Math.random() * 180
        item.rotation = Math.random() * 360
    })
}

/**
 * 🎯 可见性检测设置
 */
function setupIntersectionObserver() {
    if (intersectionObserver.value) {
        intersectionObserver.value.disconnect()
    }

    intersectionObserver.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = parseInt(entry.target.textContent.match(/\d+/)?.[0])
            if (entry.isIntersecting) {
                if (!visibleElements.value.includes(index)) {
                    visibleElements.value.push(index)
                }
            } else {
                const idx = visibleElements.value.indexOf(index)
                if (idx > -1) {
                    visibleElements.value.splice(idx, 1)
                }
            }
        })
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    })

    // 观察所有可见性测试元素
    Object.values(visibilityElements.value).forEach(el => {
        if (el) {
            intersectionObserver.value.observe(el)
        }
    })
}

// 生命周期
onMounted(() => {
    // 延迟执行 notify，确保插件已初始化
    setTimeout(() => {
        $q.notify({
            message: '🎉 欢迎学习 Quasar DOM 工具函数！',
            color: 'positive',
            position: 'top'
        })
    }, 500)

    // 初始化元素信息
    updateElementInfo()

    // 设置可见性观察器
    setTimeout(() => {
        setupIntersectionObserver()
    }, 1000)

    // 监听窗口大小变化
    window.addEventListener('resize', updateElementInfo)
    window.addEventListener('scroll', updateElementInfo)
})

onUnmounted(() => {
    // 清理事件监听器
    window.removeEventListener('resize', updateElementInfo)
    window.removeEventListener('scroll', updateElementInfo)
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', endDrag)

    // 清理观察器
    if (intersectionObserver.value) {
        intersectionObserver.value.disconnect()
    }
})
</script>

<style scoped>
.code-block {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #333;
    white-space: pre-line;
    border-left: 4px solid var(--q-primary);
}

.chat-demo {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
}

.chat-messages {
    background: #fafafa;
}

.text-mono {
    font-family: 'Courier New', monospace;
    font-size: 12px;
}

.bg-gradient-to-r {
    background: linear-gradient(to right, rgba(25, 118, 210, 0.05), rgba(156, 39, 176, 0.05));
}

.scroll-demo {
    border: 2px dashed #ccc;
    border-radius: 8px;
}

/* DOM 工具样式 */
.dom-test-element {
    transition: all 0.3s ease;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dom-test-element:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.style-test-element {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.transition-all {
    transition: all 0.3s ease;
}

/* CSS 类动态样式 */
.css-test-element {
    background: #e3f2fd;
    color: #1976d2;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.bg-gradient {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4) !important;
    color: white !important;
}

.text-bold {
    font-weight: bold !important;
}

.border-primary {
    border: 3px solid var(--q-primary) !important;
}

.elevated-hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 动画球样式 */
.animation-ball {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}

.animation-ball:hover {
    transform: scale(1.1);
}

/* 拖拽元素样式 */
.draggable-item {
    width: 60px;
    height: 60px;
    position: absolute;
    border-radius: 8px;
    cursor: move;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.draggable-item:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.draggable-item:active {
    transform: scale(0.95);
    cursor: grabbing;
}

/* 可见性测试样式 */
.visibility-item {
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.visibility-item.bg-positive {
    border-color: #21ba45;
    box-shadow: 0 0 10px rgba(33, 186, 69, 0.3);
}

/* 滚动目标样式 */
.scroll-target {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.scroll-target:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

/* 动画关键帧定义 */
@keyframes bounce {

    0%,
    20%,
    53%,
    80%,
    100% {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate(-50%, -50%) translateZ(0);
    }

    40%,
    43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate(-50%, -50%) translate3d(0, -30px, 0);
    }

    70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate(-50%, -50%) translate3d(0, -15px, 0);
    }

    90% {
        transform: translate(-50%, -50%) translate3d(0, -4px, 0);
    }
}

@keyframes shake {

    10%,
    90% {
        transform: translate(-50%, -50%) translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate(-50%, -50%) translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate(-50%, -50%) translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate(-50%, -50%) translate3d(4px, 0, 0);
    }
}

/* 球动画 */
.ball-float {
    animation: ballFloat 2s ease-in-out infinite;
}

.ball-rotate {
    animation: ballRotate 2s linear infinite;
}

.ball-pulse {
    animation: ballPulse 1s ease-in-out infinite;
}

.ball-explode {
    animation: ballExplode 0.5s ease-out forwards;
}

@keyframes ballFloat {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes ballRotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes ballPulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
}

@keyframes ballExplode {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}

/* 动态容器样式 */
.dynamic-container {
    min-height: 200px;
    position: relative;
}

.dynamic-container .q-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    margin-bottom: 8px;
    position: relative;
}

.dynamic-container .material-icons {
    font-size: 24px;
    margin: 8px;
}

.dynamic-container button {
    padding: 8px 16px;
    margin: 4px;
    border: none;
    border-radius: 4px;
    background: #1976d2;
    color: white;
    cursor: pointer;
    position: relative;
}

.dynamic-container button:hover {
    background: #1565c0;
}

/* 响应式适配 */
@media (max-width: 600px) {
    .animation-playground {
        height: 150px !important;
    }

    .drag-demo-area {
        height: 200px !important;
    }

    .draggable-item {
        width: 50px;
        height: 50px;
    }

    .animation-ball {
        width: 35px;
        height: 35px;
        font-size: 12px;
    }
}
</style>
