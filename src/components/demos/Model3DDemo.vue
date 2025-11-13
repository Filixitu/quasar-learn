<template>
  <div class="model-demo-container">
    <q-card class="model-card">
      <q-card-section>
        <div class="text-h6 flex items-center">
          <q-icon name="view_in_ar" class="q-mr-sm" />
          3D 模型加载演示
        </div>
        <div class="text-subtitle2 text-grey-7">
          支持 GLTF、FBX、OBJ 等多种格式
        </div>
      </q-card-section>

      <q-separator />

      <!-- 3D 渲染区域 -->
      <q-card-section class="q-pa-none">
        <div class="render-container-wrapper">
          <!-- 3D 渲染视图 -->
          <div ref="modelContainer" class="model-canvas-container" :style="{ height: canvasHeight + 'px' }">
            <div v-if="loading" class="loading-overlay">
              <q-spinner-cube size="50px" color="primary" />
              <div class="text-subtitle1 q-mt-md">正在加载 3D 模型...</div>
              <div class="text-caption">{{ loadingProgress }}%</div>
            </div>

            <div v-if="error" class="error-overlay">
              <q-icon name="error" size="48px" color="negative" />
              <div class="text-h6 q-mt-md">模型加载失败</div>
              <div class="text-body2 q-mt-sm text-grey-7">{{ error }}</div>
              <q-btn color="primary" outline @click="loadDefaultModel" class="q-mt-md">
                加载默认模型
              </q-btn>
            </div>

            <!-- 模型管理侧边栏 - 3D视图内覆盖层（左侧） -->
            <div v-if="showModelPanel" class="model-sidebar">
              <div class="sidebar-header">
                <div class="sidebar-title">
                  <q-icon name="inventory_2" class="q-mr-sm" />
                  模型管理
                </div>
                <q-btn flat round size="sm" icon="close" @click="showModelPanel = false" />
              </div>

              <div class="sidebar-content">
                <!-- 模型操作工具栏 -->
                <div class="sidebar-section compact">
                  <div class="section-header compact">
                    <q-icon name="build" size="sm" />
                    <span>操作工具</span>
                  </div>
                  <div class="model-toolbar">
                    <q-btn size="sm" outline color="primary" icon="add" label="添加模型" @click="openFileDialog" />
                    <q-btn size="sm" outline color="negative" icon="clear_all" label="清除全部" @click="clearAllModels"
                      :disable="loadedModels.length === 0" />
                    <q-btn size="sm" outline color="info" icon="center_focus_weak" label="查看全部"
                      @click="fitCameraToAllModels" :disable="loadedModels.length === 0" />
                    <q-btn size="sm" outline color="grey-8" icon="bug_report" label="调试场景" @click="debugScene"
                      title="查看场景对象信息" />
                  </div>
                </div>

                <!-- 模型列表 -->
                <div class="sidebar-section compact">
                  <div class="section-header compact">
                    <q-icon name="list" size="sm" />
                    <span>已加载模型 ({{ loadedModels.length }})</span>
                  </div>
                  <div class="model-list">
                    <div v-if="loadedModels.length === 0" class="no-models">
                      <q-icon name="inventory" size="48px" color="grey-5" />
                      <div class="text-caption text-grey-6">暂无模型</div>
                    </div>
                    <div v-for="modelData in loadedModels" :key="modelData.id" class="model-item"
                      :class="{ 'selected': selectedModelId === modelData.id }">
                      <div class="model-header" @click="selectModel(modelData.id)">
                        <div class="model-info">
                          <q-icon :name="modelData.visible ? 'visibility' : 'visibility_off'" size="sm"
                            :color="modelData.visible ? 'primary' : 'grey-5'"
                            @click.stop="toggleModelVisibility(modelData.id)" class="cursor-pointer" />
                          <span class="model-name">{{ modelData.name }}</span>
                        </div>
                        <div class="model-actions">
                          <q-btn flat round size="xs" icon="edit" color="primary"
                            @click.stop="renameModel(modelData.id)" title="重命名模型" />
                          <q-btn flat round size="xs" icon="delete" color="negative"
                            @click.stop="removeModel(modelData.id)" title="删除模型" />
                        </div>
                      </div>

                      <!-- 模型变换控制 -->
                      <div v-if="selectedModelId === modelData.id" class="model-transforms">
                        <div class="transform-section">
                          <div class="transform-title">位置控制</div>
                          <div class="transform-controls">
                            <div class="transform-control">
                              <span class="transform-label">X</span>
                              <q-slider v-model="modelData.position.x" :min="-10" :max="10" :step="0.1"
                                @update:model-value="updateModelTransform(modelData.id, { position: modelData.position })"
                                color="red" size="sm" />
                              <span class="transform-value">{{
                                modelData.position.x.toFixed(1) }}</span>
                            </div>
                            <div class="transform-control">
                              <span class="transform-label">Y</span>
                              <q-slider v-model="modelData.position.y" :min="-5" :max="10" :step="0.1"
                                @update:model-value="updateModelTransform(modelData.id, { position: modelData.position })"
                                color="green" size="sm" />
                              <span class="transform-value">{{
                                modelData.position.y.toFixed(1) }}</span>
                            </div>
                            <div class="transform-control">
                              <span class="transform-label">Z</span>
                              <q-slider v-model="modelData.position.z" :min="-10" :max="10" :step="0.1"
                                @update:model-value="updateModelTransform(modelData.id, { position: modelData.position })"
                                color="blue" size="sm" />
                              <span class="transform-value">{{
                                modelData.position.z.toFixed(1) }}</span>
                            </div>
                          </div>
                        </div>

                        <div class="transform-section">
                          <div class="transform-title">旋转控制</div>
                          <div class="transform-controls">
                            <div class="transform-control">
                              <span class="transform-label">X</span>
                              <q-slider v-model="modelData.rotation.x" :min="-3.14" :max="3.14" :step="0.1"
                                @update:model-value="updateModelTransform(modelData.id, { rotation: modelData.rotation })"
                                color="red" size="sm" />
                              <span class="transform-value">{{ (modelData.rotation.x * 180
                                / Math.PI).toFixed(0)
                                }}°</span>
                            </div>
                            <div class="transform-control">
                              <span class="transform-label">Y</span>
                              <q-slider v-model="modelData.rotation.y" :min="-3.14" :max="3.14" :step="0.1"
                                @update:model-value="updateModelTransform(modelData.id, { rotation: modelData.rotation })"
                                color="green" size="sm" />
                              <span class="transform-value">{{ (modelData.rotation.y * 180
                                / Math.PI).toFixed(0)
                                }}°</span>
                            </div>
                            <div class="transform-control">
                              <span class="transform-label">Z</span>
                              <q-slider v-model="modelData.rotation.z" :min="-3.14" :max="3.14" :step="0.1"
                                @update:model-value="updateModelTransform(modelData.id, { rotation: modelData.rotation })"
                                color="blue" size="sm" />
                              <span class="transform-value">{{ (modelData.rotation.z * 180
                                / Math.PI).toFixed(0)
                                }}°</span>
                            </div>
                          </div>
                        </div>

                        <div class="transform-section">
                          <div class="transform-title">缩放控制</div>
                          <div class="transform-controls">
                            <div class="transform-control">
                              <span class="transform-label">均匀</span>
                              <q-slider :model-value="modelData.scale.x" :min="0.01" :max="10" :step="0.05"
                                @update:model-value="(val) => {
                                  modelData.scale.x = val;
                                  modelData.scale.y = val;
                                  modelData.scale.z = val;
                                  updateModelTransform(modelData.id, { scale: modelData.scale });
                                }" color="purple" size="sm" />
                              <span class="transform-value">{{
                                modelData.scale.x.toFixed(2) }}</span>
                            </div>
                          </div>
                        </div>

                        <div class="model-reset">
                          <q-btn size="sm" outline color="warning" icon="refresh" label="重置位置"
                            @click="resetModelPosition(modelData.id)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 光照控制侧边栏 - 3D视图内覆盖层 -->
            <div v-if="showLightingPanel" class="lighting-sidebar">
              <div class="sidebar-header">
                <div class="sidebar-title">
                  <q-icon name="lightbulb" class="q-mr-sm" />
                  光照控制
                </div>
                <q-btn flat round size="sm" icon="close" @click="showLightingPanel = false" />
              </div>

              <div class="sidebar-content">
                <!-- 可视化选项 -->
                <div class="sidebar-section compact">
                  <div class="section-header compact">
                    <q-icon name="visibility" size="sm" />
                    <span>可视化选项</span>
                  </div>
                  <div class="visual-options">
                    <q-checkbox v-model="lightingControls.showLightHelpers" label="显示光源助手"
                      @update:model-value="toggleLightHelpers" size="sm" />
                    <q-checkbox v-model="showLightMarkers" label="显示光源标记" @update:model-value="toggleLightMarkers"
                      size="sm" />
                  </div>
                </div>

                <!-- 快速预设 -->
                <div class="sidebar-section compact">
                  <div class="section-header compact">
                    <q-icon name="palette" size="sm" />
                    <span>快速预设</span>
                  </div>
                  <div class="preset-grid">
                    <q-btn size="sm" outline color="primary" label="明亮" @click="setLightingPreset('bright')" />
                    <q-btn size="sm" outline color="secondary" label="柔和" @click="setLightingPreset('soft')" />
                    <q-btn size="sm" outline color="accent" label="戏剧" @click="setLightingPreset('dramatic')" />
                    <q-btn size="sm" outline color="warning" label="默认" @click="setLightingPreset('default')" />
                    <q-btn size="sm" outline color="deep-purple" label="摄影棚" @click="setLightingPreset('studio')" />
                    <q-btn size="sm" outline color="orange" label="夕阳光" @click="setLightingPreset('sunset')" />
                  </div>
                </div>

                <!-- 光照强度控制 -->
                <div class="sidebar-section compact">
                  <div class="section-header compact">
                    <q-icon name="tune" size="sm" />
                    <span>光照强度</span>
                  </div>

                  <!-- 环境光 -->
                  <div class="light-control-item">
                    <div class="light-header">
                      <div class="light-info">
                        <q-icon name="wb_sunny" size="sm" color="orange" />
                        <span class="light-name">环境光</span>
                      </div>
                      <div class="light-actions">
                        <span class="light-value">{{
                          lightingControls.ambientIntensity.toFixed(1) }}</span>
                      </div>
                    </div>
                    <q-slider v-model="lightingControls.ambientIntensity" :min="0" :max="3" :step="0.1"
                      @update:model-value="updateLighting" color="orange" />
                  </div>

                  <!-- 主光源 -->
                  <div class="light-control-item">
                    <div class="light-header">
                      <div class="light-info">
                        <q-icon name="flare" size="sm" color="red" />
                        <span class="light-name">主光源</span>
                      </div>
                      <div class="light-actions">
                        <span class="light-value">{{
                          lightingControls.directionalIntensity.toFixed(1) }}</span>
                        <q-btn flat round size="sm" icon="place" @click="toggleLightPosition('directional')"
                          :color="expandedLights.directional ? 'primary' : 'grey-6'"
                          :title="expandedLights.directional ? '收起位置控制' : '展开位置控制'" />
                      </div>
                    </div>
                    <q-slider v-model="lightingControls.directionalIntensity" :min="0" :max="3" :step="0.1"
                      @update:model-value="updateLighting" color="red" />

                    <!-- 位置控制展开区域 -->
                    <q-slide-transition>
                      <div v-if="expandedLights.directional" class="position-controls">
                        <div class="position-title">位置控制 (X, Y, Z)</div>
                        <div class="xyz-controls">
                          <div class="axis-control">
                            <span class="axis-label" style="color: #f44336;">X</span>
                            <q-slider v-model="lightingControls.directionalPosition.x" :min="-10" :max="10" :step="0.5"
                              @update:model-value="updateLightPositions" color="red" />
                            <span class="axis-value">{{
                              lightingControls.directionalPosition.x }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #4caf50;">Y</span>
                            <q-slider v-model="lightingControls.directionalPosition.y" :min="0" :max="15" :step="0.5"
                              @update:model-value="updateLightPositions" color="green" />
                            <span class="axis-value">{{
                              lightingControls.directionalPosition.y }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #2196f3;">Z</span>
                            <q-slider v-model="lightingControls.directionalPosition.z" :min="-10" :max="10" :step="0.5"
                              @update:model-value="updateLightPositions" color="blue" />
                            <span class="axis-value">{{
                              lightingControls.directionalPosition.z }}</span>
                          </div>
                        </div>
                      </div>
                    </q-slide-transition>
                  </div>

                  <!-- 室内灯1 -->
                  <div class="light-control-item">
                    <div class="light-header">
                      <div class="light-info">
                        <q-icon name="emoji_objects" size="sm" color="yellow-8" />
                        <span class="light-name">室内灯1</span>
                      </div>
                      <div class="light-actions">
                        <span class="light-value">{{
                          lightingControls.pointLight1Intensity.toFixed(1) }}</span>
                        <q-btn flat round size="sm" icon="place" @click="toggleLightPosition('point1')"
                          :color="expandedLights.point1 ? 'primary' : 'grey-6'"
                          :title="expandedLights.point1 ? '收起位置控制' : '展开位置控制'" />
                      </div>
                    </div>
                    <q-slider v-model="lightingControls.pointLight1Intensity" :min="0" :max="2" :step="0.1"
                      @update:model-value="updateLighting" color="yellow-8" />

                    <q-slide-transition>
                      <div v-if="expandedLights.point1" class="position-controls">
                        <div class="position-title">位置控制 (X, Y, Z)</div>
                        <div class="xyz-controls">
                          <div class="axis-control">
                            <span class="axis-label" style="color: #f44336;">X</span>
                            <q-slider v-model="lightingControls.pointLight1Position.x" :min="-8" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="red" />
                            <span class="axis-value">{{
                              lightingControls.pointLight1Position.x }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #4caf50;">Y</span>
                            <q-slider v-model="lightingControls.pointLight1Position.y" :min="0" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="green" />
                            <span class="axis-value">{{
                              lightingControls.pointLight1Position.y }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #2196f3;">Z</span>
                            <q-slider v-model="lightingControls.pointLight1Position.z" :min="-8" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="blue" />
                            <span class="axis-value">{{
                              lightingControls.pointLight1Position.z }}</span>
                          </div>
                        </div>
                      </div>
                    </q-slide-transition>
                  </div>

                  <!-- 室内灯2 -->
                  <div class="light-control-item">
                    <div class="light-header">
                      <div class="light-info">
                        <q-icon name="emoji_objects" size="sm" color="amber" />
                        <span class="light-name">室内灯2</span>
                      </div>
                      <div class="light-actions">
                        <span class="light-value">{{
                          lightingControls.pointLight2Intensity.toFixed(1) }}</span>
                        <q-btn flat round size="sm" icon="place" @click="toggleLightPosition('point2')"
                          :color="expandedLights.point2 ? 'primary' : 'grey-6'"
                          :title="expandedLights.point2 ? '收起位置控制' : '展开位置控制'" />
                      </div>
                    </div>
                    <q-slider v-model="lightingControls.pointLight2Intensity" :min="0" :max="2" :step="0.1"
                      @update:model-value="updateLighting" color="amber" />

                    <q-slide-transition>
                      <div v-if="expandedLights.point2" class="position-controls">
                        <div class="position-title">位置控制 (X, Y, Z)</div>
                        <div class="xyz-controls">
                          <div class="axis-control">
                            <span class="axis-label" style="color: #f44336;">X</span>
                            <q-slider v-model="lightingControls.pointLight2Position.x" :min="-8" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="red" />
                            <span class="axis-value">{{
                              lightingControls.pointLight2Position.x }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #4caf50;">Y</span>
                            <q-slider v-model="lightingControls.pointLight2Position.y" :min="0" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="green" />
                            <span class="axis-value">{{
                              lightingControls.pointLight2Position.y }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #2196f3;">Z</span>
                            <q-slider v-model="lightingControls.pointLight2Position.z" :min="-8" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="blue" />
                            <span class="axis-value">{{
                              lightingControls.pointLight2Position.z }}</span>
                          </div>
                        </div>
                      </div>
                    </q-slide-transition>
                  </div>

                  <!-- 填充光 -->
                  <div class="light-control-item">
                    <div class="light-header">
                      <div class="light-info">
                        <q-icon name="blur_on" size="sm" color="light-blue" />
                        <span class="light-name">填充光</span>
                      </div>
                      <div class="light-actions">
                        <span class="light-value">{{
                          lightingControls.pointLight3Intensity.toFixed(1) }}</span>
                        <q-btn flat round size="sm" icon="place" @click="toggleLightPosition('point3')"
                          :color="expandedLights.point3 ? 'primary' : 'grey-6'"
                          :title="expandedLights.point3 ? '收起位置控制' : '展开位置控制'" />
                      </div>
                    </div>
                    <q-slider v-model="lightingControls.pointLight3Intensity" :min="0" :max="1.5" :step="0.1"
                      @update:model-value="updateLighting" color="light-blue" />

                    <q-slide-transition>
                      <div v-if="expandedLights.point3" class="position-controls">
                        <div class="position-title">位置控制 (X, Y, Z)</div>
                        <div class="xyz-controls">
                          <div class="axis-control">
                            <span class="axis-label" style="color: #f44336;">X</span>
                            <q-slider v-model="lightingControls.pointLight3Position.x" :min="-8" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="red" />
                            <span class="axis-value">{{
                              lightingControls.pointLight3Position.x }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #4caf50;">Y</span>
                            <q-slider v-model="lightingControls.pointLight3Position.y" :min="0" :max="6" :step="0.5"
                              @update:model-value="updateLightPositions" color="green" />
                            <span class="axis-value">{{
                              lightingControls.pointLight3Position.y }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #2196f3;">Z</span>
                            <q-slider v-model="lightingControls.pointLight3Position.z" :min="-8" :max="8" :step="0.5"
                              @update:model-value="updateLightPositions" color="blue" />
                            <span class="axis-value">{{
                              lightingControls.pointLight3Position.z }}</span>
                          </div>
                        </div>
                      </div>
                    </q-slide-transition>
                  </div>

                  <!-- 天空光 -->
                  <div class="light-control-item">
                    <div class="light-header">
                      <div class="light-info">
                        <q-icon name="gradient" size="sm" color="indigo" />
                        <span class="light-name">天空光</span>
                      </div>
                      <div class="light-actions">
                        <span class="light-value">{{
                          lightingControls.hemisphereIntensity.toFixed(1) }}</span>
                        <q-btn flat round size="sm" icon="place" @click="toggleLightPosition('hemisphere')"
                          :color="expandedLights.hemisphere ? 'primary' : 'grey-6'"
                          :title="expandedLights.hemisphere ? '收起位置控制' : '展开位置控制'" />
                      </div>
                    </div>
                    <q-slider v-model="lightingControls.hemisphereIntensity" :min="0" :max="2" :step="0.1"
                      @update:model-value="updateLighting" color="indigo" />

                    <q-slide-transition>
                      <div v-if="expandedLights.hemisphere" class="position-controls">
                        <div class="position-title">位置控制 (X, Y, Z)</div>
                        <div class="xyz-controls">
                          <div class="axis-control">
                            <span class="axis-label" style="color: #f44336;">X</span>
                            <q-slider v-model="lightingControls.hemispherePosition.x" :min="-5" :max="5" :step="0.5"
                              @update:model-value="updateLightPositions" color="red" />
                            <span class="axis-value">{{
                              lightingControls.hemispherePosition.x }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #4caf50;">Y</span>
                            <q-slider v-model="lightingControls.hemispherePosition.y" :min="5" :max="20" :step="0.5"
                              @update:model-value="updateLightPositions" color="green" />
                            <span class="axis-value">{{
                              lightingControls.hemispherePosition.y }}</span>
                          </div>
                          <div class="axis-control">
                            <span class="axis-label" style="color: #2196f3;">Z</span>
                            <q-slider v-model="lightingControls.hemispherePosition.z" :min="-5" :max="5" :step="0.5"
                              @update:model-value="updateLightPositions" color="blue" />
                            <span class="axis-value">{{
                              lightingControls.hemispherePosition.z }}</span>
                          </div>
                        </div>
                      </div>
                    </q-slide-transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- 控制面板 -->
      <q-card-section>
        <div class="text-subtitle2 q-mb-md flex items-center">
          <q-icon name="settings" class="q-mr-sm" />
          模型控制
        </div>

        <div class="row q-gutter-md q-mb-md">
          <q-btn color="primary" icon="folder_open" label="批量选择文件" @click="openFileDialog" :disable="loading" />
          <q-btn color="info" icon="add_circle" label="分步添加文件" @click="showStepByStepDialog" :disable="loading" />
          <q-btn color="secondary" icon="cloud_download" label="加载示例模型" @click="loadOnlineModel" :disable="loading" />
          <q-btn color="accent" icon="refresh" label="重置视角" @click="resetCamera" :disable="!modelLoaded" />
        </div>

        <!-- 面板控制 -->
        <div class="row q-gutter-md">
          <q-btn color="primary" icon="inventory_2" :label="showModelPanel ? '关闭模型管理面板' : '开启模型管理面板'"
            @click="showModelPanel = !showModelPanel" />
          <q-btn color="orange" icon="lightbulb" :label="showLightingPanel ? '关闭光照控制面板' : '开启光照控制面板'"
            @click="toggleLightingSidebar" :disable="!modelLoaded" />
        </div>

        <!-- 文件选择（隐藏） -->
        <input ref="fileInput" type="file" accept=".gltf,.glb,.obj,.mtl,.jpg,.jpeg,.png,.bmp" @change="handleFileSelect"
          style="display: none" multiple />
        <input ref="objFileInput" type="file" accept=".obj" @change="handleObjFileSelect" style="display: none" />
        <input ref="mtlFileInput" type="file" accept=".mtl" @change="handleMtlFileSelect" style="display: none" />
        <input ref="textureFileInput" type="file" accept=".jpg,.jpeg,.png,.bmp" @change="handleTextureFileSelect"
          style="display: none" multiple />
      </q-card-section>

      <!-- 预设模型选择 -->
      <q-card-section>
        <div class="text-subtitle2 q-mb-md">预设模型</div>
        <div class="row q-gutter-sm">
          <q-btn v-for="model in presetModels" :key="model.name" size="sm"
            :color="currentModel === model.name ? 'primary' : 'grey-5'" :label="model.name"
            @click="loadPresetModel(model)" :loading="loading && currentModel === model.name" />
        </div>
      </q-card-section>

      <!-- 模型信息 -->
      <q-card-section v-if="modelInfo">
        <div class="text-subtitle2 q-mb-md">模型信息</div>
        <div class="model-info-grid">
          <div class="info-item">
            <div class="info-label">顶点数</div>
            <div class="info-value">{{ modelInfo.vertices }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">面数</div>
            <div class="info-value">{{ modelInfo.faces }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">动画</div>
            <div class="info-value">{{ modelInfo.animations }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">文件大小</div>
            <div class="info-value">{{ modelInfo.size }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- 动画控制 -->
      <q-card-section v-if="animations.length > 0">
        <div class="text-subtitle2 q-mb-md">动画控制</div>
        <div class="row q-gutter-md items-center">
          <q-select v-model="selectedAnimation" :options="animationOptions" label="选择动画" style="min-width: 150px"
            @update:model-value="playAnimation" />
          <q-btn :icon="isAnimationPlaying ? 'pause' : 'play_arrow'" :label="isAnimationPlaying ? '暂停' : '播放'"
            @click="toggleAnimation" :disable="!selectedAnimation" />
        </div>
      </q-card-section>


      <!-- 使用说明 -->
      <q-card-section>
        <q-expansion-item icon="help_outline" label="使用说明" caption="了解如何使用 3D 模型功能">
          <div class="q-pa-md bg-grey-1">
            <div class="text-subtitle2 q-mb-sm">支持的文件格式：</div>
            <ul class="q-pl-md">
              <li><strong>GLTF/GLB：</strong> 推荐格式，支持动画、材质和纹理</li>
              <li><strong>OBJ + MTL：</strong> 经典格式，支持完整纹理和材质</li>
              <li><strong>OBJ（单独）：</strong> 基础几何模型，使用默认材质</li>
            </ul>

            <div class="text-subtitle2 q-mt-md q-mb-sm">文件选择方式：</div>
            <ul class="q-pl-md">
              <li><strong>批量选择：</strong> 同时选择 OBJ + MTL + 纹理图片文件（适合文件在同一文件夹）</li>
              <li><strong>分步添加：</strong> 逐步选择 OBJ、MTL 和纹理文件（适合文件在不同文件夹）</li>
            </ul>

            <div class="text-subtitle2 q-mt-md q-mb-sm">OBJ纹理加载说明：</div>
            <ul class="q-pl-md">
              <li><strong>完整方式：</strong> OBJ + MTL + 纹理图片文件</li>
              <li><strong>简化方式：</strong> OBJ + 纹理图片（自动应用纹理）</li>
              <li><strong>文件命名：</strong> MTL文件名应与OBJ文件名相同</li>
              <li><strong>纹理命名：</strong> 包含 diffuse、albedo、color 等关键词的图片会优先作为主纹理</li>
              <li><strong>支持格式：</strong> JPG、PNG、BMP 等常见纹理格式</li>
              <li><strong>智能匹配：</strong> 系统会自动匹配纹理类型（主纹理、法线贴图、镜面贴图等）</li>
            </ul>

            <div class="text-subtitle2 q-mt-md q-mb-sm">格式建议：</div>
            <ul class="q-pl-md">
              <li><strong>完整纹理模型：</strong> 优先选择 GLTF/GLB 或 OBJ+MTL 组合</li>
              <li><strong>简单展示：</strong> 单独OBJ文件适合几何形状预览</li>
              <li><strong>在线转换工具：</strong> <a href="https://products.aspose.app/3d/conversion"
                  target="_blank">3D格式转换器</a></li>
            </ul>

            <div class="text-subtitle2 q-mt-md q-mb-sm">操作说明：</div>
            <ul class="q-pl-md">
              <li><strong>旋转视角：</strong> 鼠标左键拖拽旋转场景视角</li>
              <li><strong>滚轮缩放：</strong> 鼠标滚轮缩放场景</li>
              <li><strong>右键平移：</strong> 右键拖拽平移视角</li>
              <li><strong>模型位置调整：</strong> 打开"模型管理面板"，使用滑块精确控制模型位置、旋转和缩放</li>
              <li><strong>光照控制：</strong> 点击"光照控制面板"调整室内光照效果</li>
            </ul>

            <div class="text-subtitle2 q-mt-md q-mb-sm">室内光照优化：</div>
            <ul class="q-pl-md">
              <li><strong>室内明亮：</strong> 适合查看模型细节，光照充足</li>
              <li><strong>室内柔和：</strong> 自然舒适的光照效果</li>
              <li><strong>戏剧性：</strong> 强对比光照，突出模型轮廓</li>
              <li><strong>自定义调节：</strong> 使用滑块精确控制各光源强度</li>
            </ul>

            <div class="text-subtitle2 q-mt-md q-mb-sm">推荐模型网站：</div>
            <ul class="q-pl-md">
              <li><a href="https://sketchfab.com" target="_blank">Sketchfab</a> - 高质量模型</li>
              <li><a href="https://poly.pizza" target="_blank">Poly Pizza</a> - 简单模型</li>
              <li><a href="https://free3d.com" target="_blank">Free3D</a> - 免费模型</li>
            </ul>
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>

    <!-- 分步文件选择对话框 -->
    <q-dialog v-model="showStepDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">分步加载 OBJ 模型文件</div>
          <div class="text-subtitle2 text-grey-7">
            请按步骤选择 OBJ 模型文件、MTL 材质文件和纹理图片
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <!-- 步骤1: 选择OBJ文件 -->
          <div class="q-mb-lg">
            <div class="text-subtitle1 q-mb-md flex items-center">
              <q-icon name="looks_one" class="q-mr-sm" color="primary" />
              选择 OBJ 模型文件 <span class="text-red">*</span>
            </div>
            <div class="row q-gutter-md items-center">
              <q-btn outline color="primary" icon="description"
                :label="stepByStepFiles.obj ? stepByStepFiles.obj.name : '选择 .obj 文件'" @click="selectObjFile" />
              <q-chip v-if="stepByStepFiles.obj" removable @remove="stepByStepFiles.obj = null" color="positive"
                text-color="white" icon="check_circle">
                {{ formatFileSize(stepByStepFiles.obj.size) }}
              </q-chip>
            </div>
          </div>

          <!-- 步骤2: 选择MTL文件 -->
          <div class="q-mb-lg">
            <div class="text-subtitle1 q-mb-md flex items-center">
              <q-icon name="looks_two" class="q-mr-sm" color="secondary" />
              选择 MTL 材质文件（可选）
            </div>
            <div class="row q-gutter-md items-center">
              <q-btn outline color="secondary" icon="palette"
                :label="stepByStepFiles.mtl ? stepByStepFiles.mtl.name : '选择 .mtl 文件'" @click="selectMtlFile" />
              <q-chip v-if="stepByStepFiles.mtl" removable @remove="stepByStepFiles.mtl = null" color="secondary"
                text-color="white" icon="check_circle">
                {{ formatFileSize(stepByStepFiles.mtl.size) }}
              </q-chip>
            </div>
          </div>

          <!-- 步骤3: 选择纹理文件 -->
          <div class="q-mb-lg">
            <div class="text-subtitle1 q-mb-md flex items-center">
              <q-icon name="looks_3" class="q-mr-sm" color="accent" />
              选择纹理图片（可选）
            </div>
            <div class="q-mb-md">
              <q-btn outline color="accent" icon="image" label="添加纹理图片" @click="selectTextureFiles" />
            </div>
            <div v-if="stepByStepFiles.textures.length > 0" class="texture-list">
              <div class="text-caption q-mb-sm">已选择 {{ stepByStepFiles.textures.length }} 个纹理文件：</div>
              <div class="row q-gutter-xs">
                <q-chip v-for="(texture, index) in stepByStepFiles.textures" :key="index" removable
                  @remove="removeTexture(index)" color="accent" text-color="white" size="sm">
                  {{ texture.name }}
                </q-chip>
              </div>
            </div>
          </div>

          <!-- 纹理命名说明 -->
          <div class="bg-blue-1 q-pa-md rounded-borders q-mb-md">
            <div class="text-subtitle2 q-mb-sm">💡 纹理文件命名建议：</div>
            <div class="text-body2">
              <div>• <code>模型名_Albedo.png</code> - 主纹理/漫反射贴图</div>
              <div>• <code>模型名_Normal.png</code> - 法线贴图</div>
              <div>• <code>模型名_Specular.png</code> - 镜面反射贴图</div>
              <div>• 系统会自动识别并匹配这些纹理类型</div>
            </div>
          </div>

          <!-- 预览信息 -->
          <div v-if="stepByStepFiles.obj" class="bg-grey-1 q-pa-md rounded-borders">
            <div class="text-subtitle2 q-mb-sm">加载预览：</div>
            <div class="text-body2">
              <div>✅ 模型文件: {{ stepByStepFiles.obj.name }}</div>
              <div>{{ stepByStepFiles.mtl ? '✅' : '⚪' }} 材质文件: {{ stepByStepFiles.mtl ?
                stepByStepFiles.mtl.name :
                '未选择（将使用默认材质）' }}</div>
              <div>{{ stepByStepFiles.textures.length > 0 ? '✅' : '⚪' }} 纹理文件: {{
                stepByStepFiles.textures.length > 0 ?
                  `${stepByStepFiles.textures.length} 个文件` : '未选择' }}</div>
              <div v-if="stepByStepFiles.textures.length > 0" class="text-caption q-mt-sm">
                纹理列表: {{stepByStepFiles.textures.map(t => t.name).join(', ')}}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="取消" @click="cancelStepByStep" />
          <q-btn color="primary" label="加载模型" :disable="!stepByStepFiles.obj" @click="loadStepByStepModel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 响应式数据
const modelContainer = ref(null)
const fileInput = ref(null)
const objFileInput = ref(null)
const mtlFileInput = ref(null)
const textureFileInput = ref(null)
const canvasHeight = ref(500)
const loading = ref(false)
const loadingProgress = ref(0)
const error = ref('')
const modelLoaded = ref(false)
const currentModel = ref('')
const modelInfo = ref(null)
const selectedAnimation = ref('')
const isAnimationPlaying = ref(false)
const animations = ref([])

// 分步文件选择相关
const stepByStepFiles = ref({
  obj: null,
  mtl: null,
  textures: []
})
const showStepDialog = ref(false)

// 光照控制相关
const lightingControls = ref({
  ambientIntensity: 1.2,
  directionalIntensity: 1.5,
  pointLight1Intensity: 0.8,
  pointLight2Intensity: 0.6,
  pointLight3Intensity: 0.4,
  hemisphereIntensity: 0.8,
  showLightHelpers: false,

  // 光源位置控制
  directionalPosition: { x: 5, y: 8, z: 5 },
  hemispherePosition: { x: 0, y: 10, z: 0 },
  pointLight1Position: { x: 2, y: 3, z: 2 },
  pointLight2Position: { x: -2, y: 2.5, z: -1 },
  pointLight3Position: { x: 0, y: 1, z: -3 }
})
const showLightingPanel = ref(false)
const showLightMarkers = ref(false)

// 展开状态控制
const expandedLights = ref({
  directional: false,
  point1: false,
  point2: false,
  point3: false,
  hemisphere: false
})

// Three.js 对象
let THREE = null
let scene, camera, renderer, controls
let currentLoadedModel = null
let animationMixer = null
let animationActions = []
let animationId = null

// 多模型管理
const loadedModels = ref([])
const selectedModelId = ref(null)
const showModelPanel = ref(false)

// 模型计数器，用于生成唯一ID
let modelCounter = 0

// 性能优化相关
let renderRequested = false

// 创建模型数据结构
function createModelData(name, mesh, animations = []) {
  modelCounter++
  return {
    id: `model_${modelCounter}`,
    name: name || `模型${modelCounter}`,
    mesh: mesh,
    animations: animations,
    visible: true,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    boundingBox: null,
    originalPosition: { x: 0, y: 0, z: 0 },
    createdAt: new Date().toISOString()
  }
}

// 预设模型列表
const presetModels = ref([
  {
    name: '立方体',
    type: 'primitive',
    create: () => new THREE.BoxGeometry(1, 1, 1)
  },
  {
    name: '球体',
    type: 'primitive',
    create: () => new THREE.SphereGeometry(0.8, 32, 32)
  },
  {
    name: '圆环',
    type: 'primitive',
    create: () => new THREE.TorusGeometry(0.7, 0.3, 16, 100)
  },
  {
    name: '圆锥',
    type: 'primitive',
    create: () => new THREE.ConeGeometry(0.7, 1.5, 32)
  },
  {
    name: '示例模型',
    type: 'gltf',
    url: '/models/sample.gltf'
  }
])

// 动画选项
const animationOptions = computed(() => {
  return animations.value.map(anim => ({
    label: anim.name,
    value: anim.name
  }))
})

// 初始化 Three.js 场景
async function initThreeJS() {
  try {
    // 动态导入 Three.js
    THREE = await import('three')

    // 创建场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    // 创建相机
    const aspect = modelContainer.value.clientWidth / canvasHeight.value
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    camera.position.set(3, 3, 3)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(modelContainer.value.clientWidth, canvasHeight.value)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace

    modelContainer.value.appendChild(renderer.domElement)

    // 添加控制器（轨道控制）
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    
    // 监听控制器变化，触发渲染
    controls.addEventListener('change', requestRenderIfNotRequested)

    // 添加光照
    setupLighting()

    // 初始渲染
    requestRenderIfNotRequested()

    // 加载默认模型
    loadDefaultModel()

  } catch (err) {
    error.value = '3D 引擎初始化失败：' + err.message
    console.error('Three.js initialization failed:', err)
  }
}

// 光照对象存储
let lightObjects = {
  ambient: null,
  directional: null,
  point1: null,
  point2: null,
  point3: null,
  hemisphere: null
}

// 设置光照
function setupLighting() {
  // 清理现有光照
  clearLighting()

  // 1. 增强环境光 - 提供基础照明，避免过暗
  lightObjects.ambient = new THREE.AmbientLight(0x404040, lightingControls.value.ambientIntensity)
  scene.add(lightObjects.ambient)

  // 2. 半球光 - 模拟天空光照，为室内提供自然光感
  lightObjects.hemisphere = new THREE.HemisphereLight(0xffffbb, 0x080820, lightingControls.value.hemisphereIntensity)
  const hemiPos = lightingControls.value.hemispherePosition
  lightObjects.hemisphere.position.set(hemiPos.x, hemiPos.y, hemiPos.z)
  scene.add(lightObjects.hemisphere)

  // 3. 主方向光 - 模拟阳光
  lightObjects.directional = new THREE.DirectionalLight(0xffffff, lightingControls.value.directionalIntensity)
  const dirPos = lightingControls.value.directionalPosition
  lightObjects.directional.position.set(dirPos.x, dirPos.y, dirPos.z)
  lightObjects.directional.castShadow = true
  lightObjects.directional.shadow.mapSize.width = 2048
  lightObjects.directional.shadow.mapSize.height = 2048
  lightObjects.directional.shadow.camera.near = 0.5
  lightObjects.directional.shadow.camera.far = 50
  lightObjects.directional.shadow.camera.left = -20
  lightObjects.directional.shadow.camera.right = 20
  lightObjects.directional.shadow.camera.top = 20
  lightObjects.directional.shadow.camera.bottom = -20
  scene.add(lightObjects.directional)

  // 4. 室内点光源1 - 模拟室内灯具
  lightObjects.point1 = new THREE.PointLight(0xffffff, lightingControls.value.pointLight1Intensity, 15)
  const point1Pos = lightingControls.value.pointLight1Position
  lightObjects.point1.position.set(point1Pos.x, point1Pos.y, point1Pos.z)
  lightObjects.point1.castShadow = true
  lightObjects.point1.shadow.mapSize.width = 1024
  lightObjects.point1.shadow.mapSize.height = 1024
  scene.add(lightObjects.point1)

  // 5. 室内点光源2 - 提供额外照明
  lightObjects.point2 = new THREE.PointLight(0xfff8dc, lightingControls.value.pointLight2Intensity, 12)
  const point2Pos = lightingControls.value.pointLight2Position
  lightObjects.point2.position.set(point2Pos.x, point2Pos.y, point2Pos.z)
  scene.add(lightObjects.point2)

  // 6. 填充光源 - 减少阴影过深
  lightObjects.point3 = new THREE.PointLight(0xe6f3ff, lightingControls.value.pointLight3Intensity, 20)
  const point3Pos = lightingControls.value.pointLight3Position
  lightObjects.point3.position.set(point3Pos.x, point3Pos.y, point3Pos.z)
  scene.add(lightObjects.point3)

  console.log('室内光照系统已设置完成')
}

// 清理光照
function clearLighting() {
  Object.values(lightObjects).forEach(light => {
    if (light) {
      scene.remove(light)
      light.dispose && light.dispose()
    }
  })
  lightObjects = {
    ambient: null,
    directional: null,
    point1: null,
    point2: null,
    point3: null,
    hemisphere: null
  }
}

// 按需渲染机制
function requestRenderIfNotRequested() {
  if (!renderRequested) {
    renderRequested = true
    requestAnimationFrame(render)
  }
}

function render() {
  renderRequested = false

  if (controls) {
    controls.update()
  }

  if (animationMixer) {
    animationMixer.update(0.016) // 60fps
  }

  renderer.render(scene, camera)

  // 如果有动画，继续渲染
  if (animationMixer && isAnimationPlaying.value) {
    requestRenderIfNotRequested()
  }
}


// 加载 GLTF 模型
async function loadGLTFModel(url) {
  try {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
    const loader = new GLTFLoader()

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          resolve(gltf)
        },
        (progress) => {
          if (progress.total > 0) {
            const percent = Math.round((progress.loaded / progress.total) * 100)
            loadingProgress.value = percent
          }
        },
        (error) => {
          reject(error)
        }
      )
    })
  } catch (err) {
    throw new Error('GLTF 加载器初始化失败：' + err.message)
  }
}

// 将纹理应用到模型上（当没有MTL文件或MTL加载失败时使用）
function applyTextureToModel(model, textureMap) {
  if (!textureMap || textureMap.size === 0) return

  const textureLoader = new THREE.TextureLoader()
  const textureUrls = Array.from(textureMap.values())
  const textureNames = Array.from(textureMap.keys())

  console.log('开始应用纹理到模型:', textureNames)

  model.traverse((child) => {
    if (child.isMesh) {
      // 为每个网格创建新的材质
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 30
      })

      // 寻找最适合的纹理
      let selectedTexture = null
      let selectedName = ''

      // 优先选择包含关键词的纹理
      for (let i = 0; i < textureNames.length; i++) {
        const name = textureNames[i].toLowerCase()
        if (name.includes('diffuse') || name.includes('albedo') || name.includes('color') || name.includes('base')) {
          selectedTexture = textureUrls[i]
          selectedName = textureNames[i]
          break
        }
      }

      // 如果没找到特殊纹理，使用第一个
      if (!selectedTexture && textureUrls.length > 0) {
        selectedTexture = textureUrls[0]
        selectedName = textureNames[0]
      }

      if (selectedTexture) {
        material.map = textureLoader.load(selectedTexture, (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
          texture.generateMipmaps = true
          texture.minFilter = THREE.LinearMipmapLinearFilter
          texture.magFilter = THREE.LinearFilter
          material.needsUpdate = true
          console.log(`成功加载纹理: ${selectedName}`)
        }, undefined, (error) => {
          console.warn(`纹理加载失败: ${selectedName}`, error)
        })

        console.log(`应用纹理到网格: ${selectedName}`)
      }

      child.material = material
    }
  })
}

// 替换材质中的纹理
function replaceTextureInMaterial(material, textureMap, textureLoader, materialProperty, ...keywords) {
  // 检查材质是否已有此类型的纹理
  if (material[materialProperty]) {
    // 尝试从现有纹理URL中提取文件名
    const existingTexture = material[materialProperty]
    let existingFileName = ''

    if (existingTexture.image && existingTexture.image.src) {
      // 从完整路径中提取文件名
      existingFileName = existingTexture.image.src.split(/[/\\]/).pop().toLowerCase()
    }

    // 尝试在用户上传的文件中找到匹配的纹理
    let matchedTexture = null

    // 首先尝试精确匹配文件名
    if (existingFileName) {
      for (let [uploadedName, uploadedUrl] of textureMap) {
        if (uploadedName.toLowerCase() === existingFileName) {
          matchedTexture = { name: uploadedName, url: uploadedUrl }
          break
        }
      }
    }

    // 如果没有精确匹配，尝试关键词匹配
    if (!matchedTexture) {
      matchedTexture = findBestTextureMatch(material.name, textureMap, keywords)
    }

    // 替换纹理
    if (matchedTexture) {
      material[materialProperty] = textureLoader.load(matchedTexture.url, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.generateMipmaps = true
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
        material.needsUpdate = true
      })
      console.log(`替换${materialProperty}: ${matchedTexture.name} -> ${material.name}`)
      return true
    }
  }

  // 如果材质没有此属性，尝试添加
  if (!material[materialProperty]) {
    const matchedTexture = findBestTextureMatch(material.name, textureMap, keywords)
    if (matchedTexture) {
      material[materialProperty] = textureLoader.load(matchedTexture.url, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.generateMipmaps = true
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter
        material.needsUpdate = true
      })
      console.log(`添加${materialProperty}: ${matchedTexture.name} -> ${material.name}`)
      return true
    }
  }

  return false
}

// 智能匹配纹理文件
function findBestTextureMatch(materialName, textureMap, keywords) {
  const materialNameLower = materialName ? materialName.toLowerCase() : ''
  let bestMatch = null
  let bestScore = 0

  for (let [textureName, textureUrl] of textureMap) {
    const nameWithoutExt = textureName.split('.')[0].toLowerCase()
    let score = 0

    // 评分策略
    // 1. 文件名包含材质名称 (+10分)
    if (materialNameLower && nameWithoutExt.includes(materialNameLower)) {
      score += 10
    }

    // 2. 文件名包含关键词 (+5分每个关键词)
    keywords.forEach(keyword => {
      if (nameWithoutExt.includes(keyword.toLowerCase())) {
        score += 5
      }
    })

    // 3. 精确匹配关键词 (+3分额外)
    keywords.forEach(keyword => {
      if (nameWithoutExt.endsWith('_' + keyword.toLowerCase()) ||
        nameWithoutExt.endsWith(keyword.toLowerCase())) {
        score += 3
      }
    })

    // 4. 常见纹理命名约定匹配 (+8分)
    keywords.forEach(keyword => {
      const patterns = [
        `${materialNameLower}_${keyword.toLowerCase()}`,
        `${keyword.toLowerCase()}_${materialNameLower}`,
        `${materialNameLower}${keyword.toLowerCase()}`,
        `${keyword.toLowerCase()}${materialNameLower}`
      ]

      patterns.forEach(pattern => {
        if (nameWithoutExt.includes(pattern)) {
          score += 8
        }
      })
    })

    if (score > bestScore) {
      bestScore = score
      bestMatch = { name: textureName, url: textureUrl, score: score }
    }
  }

  console.log(`纹理匹配结果 - 材质: ${materialName}, 关键词: [${keywords.join(', ')}], 最佳匹配: ${bestMatch ? bestMatch.name + ' (得分: ' + bestMatch.score + ')' : '无'}`)

  return bestMatch
}

// 加载 OBJ 模型（带 MTL 材质支持）
async function loadOBJModel(objUrl, mtlUrl = null, textureMap = null) {
  try {
    const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js')
    const { MTLLoader } = await import('three/examples/jsm/loaders/MTLLoader.js')

    const objLoader = new OBJLoader()

    // 如果有 MTL 文件，先加载材质
    if (mtlUrl) {
      const mtlLoader = new MTLLoader()

      // 对于blob URL，设置一个基础路径
      if (mtlUrl.startsWith('blob:')) {
        // 对于用户上传的文件，使用空路径（纹理可能无法加载，但模型仍可显示）
        mtlLoader.setResourcePath('')
        mtlLoader.setPath('')
        console.warn('用户上传的MTL文件可能无法加载纹理图片，因为缺少对应的图片文件')
      } else {
        // 对于网络文件，设置正确的基础路径
        const basePath = mtlUrl.substring(0, mtlUrl.lastIndexOf('/') + 1)
        mtlLoader.setResourcePath(basePath)
        mtlLoader.setPath(basePath)
      }

      return new Promise((resolve, reject) => {
        // 先加载 MTL 材质文件
        mtlLoader.load(
          mtlUrl,
          (materials) => {
            materials.preload()

            // 如果有纹理映射，替换MTL中的纹理引用
            if (textureMap && textureMap.size > 0) {
              const textureLoader = new THREE.TextureLoader()

              // 遍历所有材质
              Object.values(materials.materials).forEach(material => {
                console.log(`处理材质: ${material.name}`, material)

                // 替换现有的纹理引用
                replaceTextureInMaterial(material, textureMap, textureLoader, 'map', 'diffuse', 'albedo', 'color')
                replaceTextureInMaterial(material, textureMap, textureLoader, 'normalMap', 'normal', 'norm')
                replaceTextureInMaterial(material, textureMap, textureLoader, 'bumpMap', 'bump', 'height', 'displacement')
                replaceTextureInMaterial(material, textureMap, textureLoader, 'specularMap', 'specular', 'spec', 'metallic')
                replaceTextureInMaterial(material, textureMap, textureLoader, 'roughnessMap', 'roughness', 'rough')
                replaceTextureInMaterial(material, textureMap, textureLoader, 'aoMap', 'ao', 'ambient', 'occlusion')

                // 如果仍然没有主纹理，尝试智能匹配
                if (!material.map && textureMap.size > 0) {
                  const bestMatch = findBestTextureMatch(material.name, textureMap, ['diffuse', 'albedo', 'color', 'base'])
                  if (bestMatch) {
                    material.map = textureLoader.load(bestMatch.url)
                    material.needsUpdate = true
                    console.log(`智能匹配主纹理: ${bestMatch.name} -> ${material.name}`)
                  } else {
                    // 使用第一个纹理作为默认
                    const firstTexture = Array.from(textureMap.values())[0]
                    const firstName = Array.from(textureMap.keys())[0]
                    material.map = textureLoader.load(firstTexture)
                    material.needsUpdate = true
                    console.log(`应用默认纹理到材质: ${firstName} -> ${material.name}`)
                  }
                }
              })
            }

            objLoader.setMaterials(materials)

            // 然后加载 OBJ 模型
            objLoader.load(
              objUrl,
              (obj) => {
                // 确保材质正确应用
                obj.traverse((child) => {
                  if (child.isMesh) {
                    // 如果材质有纹理但没有正确加载，应用默认材质
                    if (child.material && child.material.map === null && child.material.name) {
                      console.log(`材质 ${child.material.name} 的纹理可能未正确加载`)
                    }
                  }
                })
                resolve(obj)
              },
              (progress) => {
                if (progress.total > 0) {
                  const percent = Math.round((progress.loaded / progress.total) * 100)
                  loadingProgress.value = Math.min(50 + percent / 2, 100) // MTL占50%，OBJ占50%
                }
              },
              (error) => {
                reject(new Error(`OBJ模型加载失败: ${error.message}`))
              }
            )
          },
          (progress) => {
            if (progress.total > 0) {
              const percent = Math.round((progress.loaded / progress.total) * 100)
              loadingProgress.value = Math.min(percent / 2, 50) // MTL加载进度占前50%
            }
          },
          async (error) => {
            console.warn('MTL材质文件加载失败，将使用默认材质:', error.message)
            // MTL 加载失败时，仍然加载 OBJ（使用默认材质和用户纹理）
            try {
              const obj = await loadOBJModelWithoutMTL(objUrl)

              // 如果有用户上传的纹理，尝试应用到模型上
              if (textureMap && textureMap.size > 0) {
                applyTextureToModel(obj, textureMap)
              }

              resolve(obj)
            } catch (objError) {
              reject(new Error(`OBJ和MTL文件都无法加载: ${objError.message}`))
            }
          }
        )
      })
    } else {
      // 没有 MTL 文件时，直接加载 OBJ
      const obj = await loadOBJModelWithoutMTL(objUrl)

      // 如果有用户上传的纹理，尝试应用到模型上
      if (textureMap && textureMap.size > 0) {
        applyTextureToModel(obj, textureMap)
      }

      return obj
    }
  } catch (err) {
    throw new Error('OBJ/MTL 加载器初始化失败：' + err.message)
  }
}

// 不使用 MTL 的 OBJ 加载（回退方案）
async function loadOBJModelWithoutMTL(objUrl, existingResolve = null, existingReject = null) {
  try {
    // 正确导入 OBJLoader
    const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js')
    const loader = new OBJLoader()

    const promise = new Promise((resolve, reject) => {
      loader.load(
        objUrl,
        (obj) => {
          // 为没有材质的模型应用默认材质
          obj.traverse((child) => {
            if (child.isMesh) {
              if (!child.material) {
                child.material = new THREE.MeshPhongMaterial({
                  color: 0xcccccc,
                  shininess: 30
                })
              }
            }
          })
          resolve(obj)
        },
        (progress) => {
          if (progress.total > 0) {
            const percent = Math.round((progress.loaded / progress.total) * 100)
            loadingProgress.value = percent
          }
        },
        (error) => {
          reject(error)
        }
      )
    })

    if (existingResolve && existingReject) {
      promise.then(existingResolve).catch(existingReject)
    } else {
      return promise
    }
  } catch (err) {
    const error = new Error('OBJ 加载器初始化失败：' + err.message)
    if (existingReject) {
      existingReject(error)
    } else {
      throw error
    }
  }
}

// 清理当前模型
function clearCurrentModel() {
  if (currentLoadedModel) {
    scene.remove(currentLoadedModel)

    // 清理几何体和材质
    currentLoadedModel.traverse((child) => {
      if (child.geometry) {
        child.geometry.dispose()
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose())
        } else {
          child.material.dispose()
        }
      }
    })

    currentLoadedModel = null
  }

  // 清理动画
  if (animationMixer) {
    animationMixer.stopAllAction()
    animationMixer = null
  }
  animationActions = []
  animations.value = []
  selectedAnimation.value = ''
  isAnimationPlaying.value = false
}

// 更新光照强度
function updateLighting() {
  if (!lightObjects.ambient) return

  // 更新各光源强度
  if (lightObjects.ambient) {
    lightObjects.ambient.intensity = lightingControls.value.ambientIntensity
  }
  if (lightObjects.directional) {
    lightObjects.directional.intensity = lightingControls.value.directionalIntensity
  }
  if (lightObjects.point1) {
    lightObjects.point1.intensity = lightingControls.value.pointLight1Intensity
  }
  if (lightObjects.point2) {
    lightObjects.point2.intensity = lightingControls.value.pointLight2Intensity
  }
  if (lightObjects.point3) {
    lightObjects.point3.intensity = lightingControls.value.pointLight3Intensity
  }
  if (lightObjects.hemisphere) {
    lightObjects.hemisphere.intensity = lightingControls.value.hemisphereIntensity
  }
  
  // 触发渲染更新
  requestRenderIfNotRequested()
}

// 更新光源位置
function updateLightPositions() {
  if (!lightObjects.directional) return

  // 更新各光源位置
  if (lightObjects.directional) {
    const pos = lightingControls.value.directionalPosition
    lightObjects.directional.position.set(pos.x, pos.y, pos.z)
  }
  if (lightObjects.hemisphere) {
    const pos = lightingControls.value.hemispherePosition
    lightObjects.hemisphere.position.set(pos.x, pos.y, pos.z)
  }
  if (lightObjects.point1) {
    const pos = lightingControls.value.pointLight1Position
    lightObjects.point1.position.set(pos.x, pos.y, pos.z)
  }
  if (lightObjects.point2) {
    const pos = lightingControls.value.pointLight2Position
    lightObjects.point2.position.set(pos.x, pos.y, pos.z)
  }
  if (lightObjects.point3) {
    const pos = lightingControls.value.pointLight3Position
    lightObjects.point3.position.set(pos.x, pos.y, pos.z)
  }

  // 更新光源助手位置
  if (lightingControls.value.showLightHelpers) {
    updateLightHelpersPosition()
  }

  // 更新光源标记位置
  updateLightMarkers()
  
  // 触发渲染更新
  requestRenderIfNotRequested()

  console.log('光源位置已更新')
}

// 组合光照更新函数
function updateLightingAndPositions() {
  updateLighting()
  updateLightPositions()
}

// 设置光照预设
function setLightingPreset(preset) {
  const presets = {
    bright: {
      ambientIntensity: 2.0,
      directionalIntensity: 2.0,
      pointLight1Intensity: 1.5,
      pointLight2Intensity: 1.2,
      pointLight3Intensity: 0.8,
      hemisphereIntensity: 1.5,
      directionalPosition: { x: 5, y: 8, z: 5 },
      hemispherePosition: { x: 0, y: 10, z: 0 },
      pointLight1Position: { x: 2, y: 3, z: 2 },
      pointLight2Position: { x: -2, y: 2.5, z: -1 },
      pointLight3Position: { x: 0, y: 1, z: -3 }
    },
    soft: {
      ambientIntensity: 1.5,
      directionalIntensity: 1.0,
      pointLight1Intensity: 0.8,
      pointLight2Intensity: 0.6,
      pointLight3Intensity: 0.5,
      hemisphereIntensity: 1.0,
      directionalPosition: { x: 3, y: 6, z: 4 },
      hemispherePosition: { x: 0, y: 8, z: 0 },
      pointLight1Position: { x: 1.5, y: 2.5, z: 1.5 },
      pointLight2Position: { x: -1.5, y: 2, z: -0.8 },
      pointLight3Position: { x: 0, y: 0.8, z: -2.5 }
    },
    dramatic: {
      ambientIntensity: 0.3,
      directionalIntensity: 2.5,
      pointLight1Intensity: 1.8,
      pointLight2Intensity: 0.2,
      pointLight3Intensity: 0.1,
      hemisphereIntensity: 0.4,
      directionalPosition: { x: 8, y: 10, z: 3 },
      hemispherePosition: { x: 0, y: 15, z: 0 },
      pointLight1Position: { x: 3, y: 4, z: 1 },
      pointLight2Position: { x: -3, y: 1, z: -2 },
      pointLight3Position: { x: 1, y: 0.5, z: -4 }
    },
    default: {
      ambientIntensity: 1.2,
      directionalIntensity: 1.5,
      pointLight1Intensity: 0.8,
      pointLight2Intensity: 0.6,
      pointLight3Intensity: 0.4,
      hemisphereIntensity: 0.8,
      directionalPosition: { x: 5, y: 8, z: 5 },
      hemispherePosition: { x: 0, y: 10, z: 0 },
      pointLight1Position: { x: 2, y: 3, z: 2 },
      pointLight2Position: { x: -2, y: 2.5, z: -1 },
      pointLight3Position: { x: 0, y: 1, z: -3 }
    },
    studio: {
      ambientIntensity: 0.8,
      directionalIntensity: 1.8,
      pointLight1Intensity: 1.2,
      pointLight2Intensity: 0.8,
      pointLight3Intensity: 0.6,
      hemisphereIntensity: 0.6,
      directionalPosition: { x: 6, y: 8, z: 6 },
      hemispherePosition: { x: 0, y: 12, z: 0 },
      pointLight1Position: { x: -3, y: 4, z: 3 },
      pointLight2Position: { x: 3, y: 2, z: -2 },
      pointLight3Position: { x: 0, y: 1.5, z: 4 }
    },
    sunset: {
      ambientIntensity: 0.6,
      directionalIntensity: 1.2,
      pointLight1Intensity: 0.4,
      pointLight2Intensity: 0.3,
      pointLight3Intensity: 0.5,
      hemisphereIntensity: 1.2,
      directionalPosition: { x: -6, y: 3, z: 8 },
      hemispherePosition: { x: 0, y: 6, z: 0 },
      pointLight1Position: { x: 0, y: 2, z: 3 },
      pointLight2Position: { x: -1, y: 1.5, z: -1 },
      pointLight3Position: { x: 2, y: 0.8, z: -2 }
    }
  }

  const presetConfig = presets[preset]
  if (presetConfig) {
    Object.assign(lightingControls.value, presetConfig)
    updateLightingAndPositions()

    $q.notify({
      message: `光照预设"${getPresetName(preset)}"已应用`,
      type: 'positive',
      position: 'top',
      timeout: 2000
    })
  }
}

// 获取预设名称
function getPresetName(preset) {
  const names = {
    bright: '室内明亮',
    soft: '室内柔和',
    dramatic: '戏剧性',
    default: '默认',
    studio: '摄影棚',
    sunset: '夕阳光'
  }
  return names[preset] || preset
}

// 光源助手
let lightHelpers = []

// 切换光照助手显示
function toggleLightHelpers(show) {
  if (!THREE) return

  // 清理现有助手
  lightHelpers.forEach(helper => {
    scene.remove(helper)
  })
  lightHelpers = []

  if (show) {
    // 创建光源助手
    if (lightObjects.directional) {
      const dirHelper = new THREE.DirectionalLightHelper(lightObjects.directional, 1, 0xff0000)
      dirHelper.name = 'directionalHelper'
      scene.add(dirHelper)
      lightHelpers.push(dirHelper)
    }

    if (lightObjects.point1) {
      const pointHelper1 = new THREE.PointLightHelper(lightObjects.point1, 0.3, 0xffffff)
      pointHelper1.name = 'point1Helper'
      scene.add(pointHelper1)
      lightHelpers.push(pointHelper1)
    }

    if (lightObjects.point2) {
      const pointHelper2 = new THREE.PointLightHelper(lightObjects.point2, 0.3, 0xfff8dc)
      pointHelper2.name = 'point2Helper'
      scene.add(pointHelper2)
      lightHelpers.push(pointHelper2)
    }

    if (lightObjects.point3) {
      const pointHelper3 = new THREE.PointLightHelper(lightObjects.point3, 0.3, 0xe6f3ff)
      pointHelper3.name = 'point3Helper'
      scene.add(pointHelper3)
      lightHelpers.push(pointHelper3)
    }

    if (lightObjects.hemisphere) {
      const hemiHelper = new THREE.HemisphereLightHelper(lightObjects.hemisphere, 0.5)
      hemiHelper.name = 'hemisphereHelper'
      scene.add(hemiHelper)
      lightHelpers.push(hemiHelper)
    }

    // 添加坐标轴助手（显示当前光源的移动范围）
    const axesHelper = new THREE.AxesHelper(5)
    axesHelper.name = 'axesHelper'
    scene.add(axesHelper)
    lightHelpers.push(axesHelper)

    console.log('光源助手已显示，包含坐标轴参考')
  } else {
    console.log('光源助手已隐藏')
  }

  // 更新光源助手位置
  updateLightHelpersPosition()
  
  // 触发渲染更新
  requestRenderIfNotRequested()
}

// 更新光源助手位置
function updateLightHelpersPosition() {
  lightHelpers.forEach(helper => {
    if (helper.name === 'directionalHelper' && helper.light) {
      helper.update()
    } else if (helper.name.includes('pointHelper') && helper.light) {
      helper.update()
    } else if (helper.name === 'hemisphereHelper' && helper.light) {
      helper.update()
    }
  })
}

// 切换光照侧边栏
function toggleLightingSidebar() {
  showLightingPanel.value = !showLightingPanel.value

  if (showLightingPanel.value) {
    $q.notify({
      message: '光照控制面板已开启',
      type: 'info',
      position: 'top',
      timeout: 2000
    })
  }
}

// 切换光源位置控制展开/收起
function toggleLightPosition(lightType) {
  expandedLights.value[lightType] = !expandedLights.value[lightType]

  // 如果展开了位置控制，自动显示对应的光源标记
  if (expandedLights.value[lightType] && !showLightMarkers.value) {
    showLightMarkers.value = true
    toggleLightMarkers(true)
  }

  // 更新光源标记显示
  updateLightMarkers()
}

// 光源标记相关
let lightMarkers = []

// 切换光源标记显示
function toggleLightMarkers(show) {
  showLightMarkers.value = show

  // 清理现有标记
  lightMarkers.forEach(marker => {
    scene.remove(marker)
  })
  lightMarkers = []

  if (show && THREE) {
    createLightMarkers()
  }
  
  // 触发渲染更新
  requestRenderIfNotRequested()
}

// 创建光源标记
function createLightMarkers() {
  // 创建标记几何体和材质
  const markerGeometry = new THREE.SphereGeometry(0.1, 8, 6)

  // 主光源标记 - 红色
  if (lightObjects.directional) {
    const dirMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 })
    const dirMarker = new THREE.Mesh(markerGeometry, dirMarkerMaterial)
    const pos = lightingControls.value.directionalPosition
    dirMarker.position.set(pos.x, pos.y, pos.z)
    dirMarker.name = 'directionalMarker'
    scene.add(dirMarker)
    lightMarkers.push(dirMarker)
  }

  // 室内灯1标记 - 黄色
  if (lightObjects.point1) {
    const point1MarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 })
    const point1Marker = new THREE.Mesh(markerGeometry, point1MarkerMaterial)
    const pos = lightingControls.value.pointLight1Position
    point1Marker.position.set(pos.x, pos.y, pos.z)
    point1Marker.name = 'point1Marker'
    scene.add(point1Marker)
    lightMarkers.push(point1Marker)
  }

  // 室内灯2标记 - 橙色
  if (lightObjects.point2) {
    const point2MarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500, transparent: true, opacity: 0.8 })
    const point2Marker = new THREE.Mesh(markerGeometry, point2MarkerMaterial)
    const pos = lightingControls.value.pointLight2Position
    point2Marker.position.set(pos.x, pos.y, pos.z)
    point2Marker.name = 'point2Marker'
    scene.add(point2Marker)
    lightMarkers.push(point2Marker)
  }

  // 填充光标记 - 浅蓝色
  if (lightObjects.point3) {
    const point3MarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.8 })
    const point3Marker = new THREE.Mesh(markerGeometry, point3MarkerMaterial)
    const pos = lightingControls.value.pointLight3Position
    point3Marker.position.set(pos.x, pos.y, pos.z)
    point3Marker.name = 'point3Marker'
    scene.add(point3Marker)
    lightMarkers.push(point3Marker)
  }

  // 天空光标记 - 靛蓝色
  if (lightObjects.hemisphere) {
    const hemiMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x4b0082, transparent: true, opacity: 0.8 })
    const hemiMarker = new THREE.Mesh(markerGeometry, hemiMarkerMaterial)
    const pos = lightingControls.value.hemispherePosition
    hemiMarker.position.set(pos.x, pos.y, pos.z)
    hemiMarker.name = 'hemisphereMarker'
    scene.add(hemiMarker)
    lightMarkers.push(hemiMarker)
  }
}

// 更新光源标记位置
function updateLightMarkers() {
  if (!showLightMarkers.value || lightMarkers.length === 0) return

  lightMarkers.forEach(marker => {
    let pos
    switch (marker.name) {
      case 'directionalMarker':
        pos = lightingControls.value.directionalPosition
        break
      case 'point1Marker':
        pos = lightingControls.value.pointLight1Position
        break
      case 'point2Marker':
        pos = lightingControls.value.pointLight2Position
        break
      case 'point3Marker':
        pos = lightingControls.value.pointLight3Position
        break
      case 'hemisphereMarker':
        pos = lightingControls.value.hemispherePosition
        break
    }
    if (pos) {
      marker.position.set(pos.x, pos.y, pos.z)
    }
  })
  
  // 触发渲染更新
  requestRenderIfNotRequested()
}

// 增强材质渲染效果
function enhanceMaterials(model) {
  model.traverse((child) => {
    if (child.isMesh && child.material) {
      const material = child.material

      // 如果是数组材质，逐个处理
      if (Array.isArray(material)) {
        material.forEach(mat => processSingleMaterial(mat))
      } else {
        processSingleMaterial(material)
      }
    }
  })
}

// 处理单个材质
function processSingleMaterial(material) {
  // 确保材质支持光照
  if (material.isMeshBasicMaterial) {
    // 将基础材质转换为Phong材质以支持光照
    const phongMaterial = new THREE.MeshPhongMaterial()
    phongMaterial.copy(material)
    phongMaterial.shininess = 30
    return phongMaterial
  }

  // 增强现有材质
  if (material.isMeshPhongMaterial || material.isMeshLambertMaterial) {
    // 启用纹理过滤
    if (material.map) {
      material.map.generateMipmaps = true
      material.map.minFilter = THREE.LinearMipmapLinearFilter
      material.map.magFilter = THREE.LinearFilter
      material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping
    }

    // 优化材质属性
    material.shininess = material.shininess || 30
    material.transparent = material.transparent || material.opacity < 1
  }

  return material
}

// 添加模型到场景
function addModelToScene(model, modelData = null, modelName = null) {
  // 计算模型边界并调整大小
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const maxSize = Math.max(size.x, size.y, size.z)
  const scale = 2 / maxSize // 标准化到2个单位大小

  model.scale.multiplyScalar(scale)

  // 居中模型
  const center = box.getCenter(new THREE.Vector3())
  model.position.sub(center.multiplyScalar(scale))

  // 增强材质效果
  enhanceMaterials(model)

  // 启用阴影
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  // 创建模型数据
  const newModelData = createModelData(
    modelName,
    model,
    modelData?.animations || []
  )

  // 保存边界盒和原始位置
  newModelData.boundingBox = box
  newModelData.originalPosition = {
    x: model.position.x,
    y: model.position.y,
    z: model.position.z
  }

  // 如果有多个模型，自动排列位置
  if (loadedModels.value.length > 0) {
    const spacing = 3
    const cols = Math.ceil(Math.sqrt(loadedModels.value.length + 1))
    const row = Math.floor(loadedModels.value.length / cols)
    const col = loadedModels.value.length % cols

    model.position.x += (col - cols / 2) * spacing
    model.position.z += (row - cols / 2) * spacing

    newModelData.position.x = model.position.x
    newModelData.position.z = model.position.z
  }

  scene.add(model)
  loadedModels.value.push(newModelData)

  // 设置第一个模型为当前模型（向后兼容）
  if (loadedModels.value.length === 1) {
    currentLoadedModel = model
    selectedModelId.value = newModelData.id

    // 处理动画
    if (modelData && modelData.animations && modelData.animations.length > 0) {
      animationMixer = new THREE.AnimationMixer(model)
      animations.value = modelData.animations.map(clip => ({
        name: clip.name,
        clip: clip
      }))

      // 创建动画动作
      modelData.animations.forEach(clip => {
        const action = animationMixer.clipAction(clip)
        animationActions.push(action)
      })
    }

    // 更新模型信息
    updateModelInfo(model)

    // 调整相机位置
    fitCameraToModel(model)
  }

  modelLoaded.value = true
  
  // 触发渲染更新
  requestRenderIfNotRequested()

  // 通知用户
  $q.notify({
    message: `模型 "${newModelData.name}" 已添加到场景`,
    type: 'positive',
    position: 'top',
    timeout: 2000
  })

  return newModelData
}

// 多模型管理函数
function selectModel(modelId) {
  selectedModelId.value = modelId
  const modelData = loadedModels.value.find(m => m.id === modelId)
  if (modelData) {
    currentLoadedModel = modelData.mesh
    updateModelInfo(modelData.mesh)
  }
}

function renameModel(modelId) {
  const modelData = loadedModels.value.find(m => m.id === modelId)
  if (modelData) {
    $q.dialog({
      title: '重命名模型',
      message: '输入新的模型名称:',
      prompt: {
        model: modelData.name,
        isValid: val => val && val.length > 0,
        type: 'text'
      },
      cancel: true,
      persistent: true
    }).onOk(data => {
      const newName = data.trim()
      if (newName && newName !== modelData.name) {
        const oldName = modelData.name
        modelData.name = newName

        console.log(`模型重命名: "${oldName}" -> "${newName}"`)

        $q.notify({
          message: `模型已重命名为 "${newName}"`,
          type: 'positive',
          position: 'top',
          timeout: 2000
        })
      }
    })
  }
}

function removeModel(modelId) {
  const index = loadedModels.value.findIndex(m => m.id === modelId)
  if (index !== -1) {
    const modelData = loadedModels.value[index]

    // 确保从场景中完全移除
    if (scene && modelData.mesh) {
      scene.remove(modelData.mesh)

      // 如果这个模型同时也是currentLoadedModel，清除它
      if (currentLoadedModel === modelData.mesh) {
        currentLoadedModel = null
      }
    }

    // 彻底清理材质和几何体
    if (modelData.mesh) {
      modelData.mesh.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose()
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => {
              if (material.map) material.map.dispose()
              if (material.normalMap) material.normalMap.dispose()
              if (material.roughnessMap) material.roughnessMap.dispose()
              if (material.metalnessMap) material.metalnessMap.dispose()
              material.dispose()
            })
          } else {
            if (child.material.map) child.material.map.dispose()
            if (child.material.normalMap) child.material.normalMap.dispose()
            if (child.material.roughnessMap) child.material.roughnessMap.dispose()
            if (child.material.metalnessMap) child.material.metalnessMap.dispose()
            child.material.dispose()
          }
        }
      })

      // 清除父子关系
      if (modelData.mesh.parent) {
        modelData.mesh.parent.remove(modelData.mesh)
      }

      // 清空对象引用
      modelData.mesh = null
    }

    // 从数组中移除
    loadedModels.value.splice(index, 1)

    // 如果删除的是当前选择的模型
    if (selectedModelId.value === modelId) {
      if (loadedModels.value.length > 0) {
        selectModel(loadedModels.value[0].id)
      } else {
        selectedModelId.value = null
        currentLoadedModel = null
        modelLoaded.value = false
      }
    }

    // 触发渲染更新
    requestRenderIfNotRequested()

    console.log(`模型 "${modelData.name}" (ID: ${modelId}) 已从场景中删除`)

    $q.notify({
      message: `模型 "${modelData.name}" 已删除`,
      type: 'positive',
      position: 'top',
      timeout: 2000
    })
  } else {
    console.warn(`尝试删除不存在的模型: ${modelId}`)
    $q.notify({
      message: '模型删除失败：模型不存在',
      type: 'negative',
      position: 'top',
      timeout: 2000
    })
  }
}

function toggleModelVisibility(modelId) {
  const modelData = loadedModels.value.find(m => m.id === modelId)
  if (modelData) {
    modelData.visible = !modelData.visible
    modelData.mesh.visible = modelData.visible
    
    // 触发渲染更新
    requestRenderIfNotRequested()
  }
}

function updateModelTransform(modelId, transform) {
  const modelData = loadedModels.value.find(m => m.id === modelId)
  if (modelData) {
    if (transform.position) {
      Object.assign(modelData.position, transform.position)
      modelData.mesh.position.set(
        modelData.position.x,
        modelData.position.y,
        modelData.position.z
      )
    }
    if (transform.rotation) {
      Object.assign(modelData.rotation, transform.rotation)
      modelData.mesh.rotation.set(
        modelData.rotation.x,
        modelData.rotation.y,
        modelData.rotation.z
      )
    }
    if (transform.scale) {
      Object.assign(modelData.scale, transform.scale)
      modelData.mesh.scale.set(
        modelData.scale.x,
        modelData.scale.y,
        modelData.scale.z
      )
    }
    
    // 触发渲染更新
    requestRenderIfNotRequested()
  }
}

function resetModelPosition(modelId) {
  const modelData = loadedModels.value.find(m => m.id === modelId)
  if (modelData) {
    modelData.position = { ...modelData.originalPosition }
    modelData.rotation = { x: 0, y: 0, z: 0 }
    modelData.scale = { x: 1, y: 1, z: 1 }

    modelData.mesh.position.set(
      modelData.position.x,
      modelData.position.y,
      modelData.position.z
    )
    modelData.mesh.rotation.set(0, 0, 0)
    modelData.mesh.scale.set(1, 1, 1)
    
    // 触发渲染更新
    requestRenderIfNotRequested()
  }
}

function clearAllModels() {
  if (loadedModels.value.length === 0) {
    $q.notify({
      message: '没有模型需要清除',
      type: 'info',
      position: 'top',
      timeout: 2000
    })
    return
  }

  const modelCount = loadedModels.value.length

  loadedModels.value.forEach(modelData => {
    if (scene && modelData.mesh) {
      scene.remove(modelData.mesh)
    }

    // 彻底清理材质和几何体
    if (modelData.mesh) {
      modelData.mesh.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose()
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => {
              if (material.map) material.map.dispose()
              if (material.normalMap) material.normalMap.dispose()
              if (material.roughnessMap) material.roughnessMap.dispose()
              if (material.metalnessMap) material.metalnessMap.dispose()
              material.dispose()
            })
          } else {
            if (child.material.map) child.material.map.dispose()
            if (child.material.normalMap) child.material.normalMap.dispose()
            if (child.material.roughnessMap) child.material.roughnessMap.dispose()
            if (child.material.metalnessMap) child.material.metalnessMap.dispose()
            child.material.dispose()
          }
        }
      })

      // 清除父子关系
      if (modelData.mesh.parent) {
        modelData.mesh.parent.remove(modelData.mesh)
      }

      modelData.mesh = null
    }
  })

  loadedModels.value = []
  selectedModelId.value = null
  currentLoadedModel = null
  modelLoaded.value = false

  // 触发渲染更新
  requestRenderIfNotRequested()

  console.log(`已清除 ${modelCount} 个模型`)

  $q.notify({
    message: `已清除 ${modelCount} 个模型`,
    type: 'positive',
    position: 'top',
    timeout: 2000
  })
}

// 调整相机以查看所有模型
function fitCameraToAllModels() {
  if (loadedModels.value.length === 0) return

  const box = new THREE.Box3()
  loadedModels.value.forEach(modelData => {
    if (modelData.visible) {
      box.expandByObject(modelData.mesh)
    }
  })

  const size = box.getSize(new THREE.Vector3())
  const maxSize = Math.max(size.x, size.y, size.z)
  const distance = maxSize * 2

  const center = box.getCenter(new THREE.Vector3())
  camera.position.set(
    center.x + distance,
    center.y + distance * 0.8,
    center.z + distance
  )
  camera.lookAt(center)

  if (controls) {
    controls.target.copy(center)
    controls.update()
  }
  
  // 触发渲染更新
  requestRenderIfNotRequested()
}

// 调试场景状态
function debugScene() {
  if (!scene) {
    console.warn('场景未初始化')
    return
  }

  const sceneChildren = []
  scene.traverse((object) => {
    sceneChildren.push({
      type: object.type,
      name: object.name || '未命名',
      uuid: object.uuid,
      visible: object.visible,
      position: { x: object.position.x, y: object.position.y, z: object.position.z }
    })
  })

  const debugInfo = {
    场景对象总数: scene.children.length,
    详细对象: sceneChildren,
    已加载模型数量: loadedModels.value.length,
    已加载模型列表: loadedModels.value.map(model => ({
      id: model.id,
      name: model.name,
      visible: model.visible,
      meshExists: !!model.mesh,
      meshInScene: model.mesh ? scene.children.includes(model.mesh) : false
    })),
    当前选择模型ID: selectedModelId.value,
    currentLoadedModel存在: !!currentLoadedModel,
    场景渲染状态: !!renderer
  }

  console.log('=== 场景调试信息 ===')
  console.table(debugInfo.已加载模型列表)
  console.log('完整调试信息:', debugInfo)

  $q.notify({
    message: `场景包含 ${debugInfo.场景对象总数} 个对象，已加载 ${debugInfo.已加载模型数量} 个模型`,
    type: 'info',
    position: 'top',
    timeout: 3000,
    caption: '详细信息请查看控制台'
  })

  // 检查是否有孤立的模型对象
  const sceneModels = scene.children.filter(child =>
    child.type === 'Mesh' || child.type === 'Group' || child.type === 'Object3D'
  )
  const trackedModels = loadedModels.value.filter(model => !!model.mesh)

  if (sceneModels.length !== trackedModels.length) {
    console.warn(`警告：场景中模型数量 (${sceneModels.length}) 与管理的模型数量 (${trackedModels.length}) 不匹配`)
    console.log('场景中的模型:', sceneModels)
    console.log('管理中的模型:', trackedModels)

    $q.notify({
      message: '发现场景状态不一致，请查看控制台',
      type: 'warning',
      position: 'top',
      timeout: 5000
    })
  }
}

// 更新模型信息
function updateModelInfo(model) {
  let vertices = 0
  let faces = 0

  model.traverse((child) => {
    if (child.geometry) {
      if (child.geometry.attributes.position) {
        vertices += child.geometry.attributes.position.count
      }
      if (child.geometry.index) {
        faces += child.geometry.index.count / 3
      } else if (child.geometry.attributes.position) {
        faces += child.geometry.attributes.position.count / 3
      }
    }
  })

  modelInfo.value = {
    vertices: vertices.toLocaleString(),
    faces: Math.round(faces).toLocaleString(),
    animations: animations.value.length,
    size: currentModel.value === '立方体' || currentModel.value === '球体' || currentModel.value === '圆环' ? '内置模型' : '计算中...'
  }
}

// 调整相机以适应模型
function fitCameraToModel(model) {
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const maxSize = Math.max(size.x, size.y, size.z)

  const distance = maxSize * 2
  camera.position.set(distance, distance * 0.8, distance)
  camera.lookAt(0, 0, 0)

  if (controls) {
    controls.reset()
  }
}

// 加载预设模型
async function loadPresetModel(model) {
  loading.value = true
  error.value = ''
  currentModel.value = model.name
  loadingProgress.value = 0

  try {
    if (model.type === 'primitive') {
      // 创建基础几何体
      const geometry = model.create()
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        shininess: 100
      })
      const mesh = new THREE.Mesh(geometry, material)
      addModelToScene(mesh, null, model.name)
    } else if (model.type === 'gltf') {
      // 加载 GLTF 模型
      const gltf = await loadGLTFModel(model.url)
      addModelToScene(gltf.scene, gltf, model.name)
    }

    $q.notify({
      message: `${model.name} 加载成功！`,
      type: 'positive',
      position: 'top'
    })

  } catch (err) {
    error.value = `模型加载失败: ${err.message}`
    console.error('Model loading failed:', err)

    $q.notify({
      message: `${model.name} 加载失败`,
      type: 'negative',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

// 加载默认模型
function loadDefaultModel() {
  loadPresetModel(presetModels.value[0])
}

// 加载示例模型
function loadOnlineModel() {
  loadPresetModel(presetModels.value[4]) // 加载示例GLTF模型
}

// 打开文件选择对话框
function openFileDialog() {
  fileInput.value.click()
}

// 显示分步选择对话框
function showStepByStepDialog() {
  // 重置分步文件状态
  stepByStepFiles.value = {
    obj: null,
    mtl: null,
    textures: []
  }
  showStepDialog.value = true
}

// 选择OBJ文件
function selectObjFile() {
  objFileInput.value.click()
}

// 选择MTL文件
function selectMtlFile() {
  mtlFileInput.value.click()
}

// 选择纹理文件
function selectTextureFiles() {
  textureFileInput.value.click()
}

// 处理OBJ文件选择
function handleObjFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    stepByStepFiles.value.obj = file
  }
  event.target.value = '' // 清理输入，允许重新选择
}

// 处理MTL文件选择
function handleMtlFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    stepByStepFiles.value.mtl = file
  }
  event.target.value = '' // 清理输入，允许重新选择
}

// 处理纹理文件选择
function handleTextureFileSelect(event) {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    // 添加新纹理文件，避免重复
    files.forEach(file => {
      const exists = stepByStepFiles.value.textures.some(existing =>
        existing.name === file.name && existing.size === file.size
      )
      if (!exists) {
        stepByStepFiles.value.textures.push(file)
      }
    })
  }
  event.target.value = '' // 清理输入，允许重新选择
}

// 移除纹理文件
function removeTexture(index) {
  stepByStepFiles.value.textures.splice(index, 1)
}

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 取消分步选择
function cancelStepByStep() {
  showStepDialog.value = false
  stepByStepFiles.value = {
    obj: null,
    mtl: null,
    textures: []
  }
}

// 加载分步选择的模型
async function loadStepByStepModel() {
  if (!stepByStepFiles.value.obj) {
    $q.notify({
      message: '请先选择 OBJ 文件',
      type: 'warning',
      position: 'top'
    })
    return
  }

  showStepDialog.value = false
  loading.value = true
  error.value = ''
  loadingProgress.value = 0

  try {
    currentModel.value = stepByStepFiles.value.obj.name

    // 创建文件 URLs
    const objUrl = URL.createObjectURL(stepByStepFiles.value.obj)
    let mtlUrl = null
    let textureMap = null

    if (stepByStepFiles.value.mtl) {
      mtlUrl = URL.createObjectURL(stepByStepFiles.value.mtl)
    }

    if (stepByStepFiles.value.textures.length > 0) {
      textureMap = new Map()
      stepByStepFiles.value.textures.forEach(textureFile => {
        const textureUrl = URL.createObjectURL(textureFile)
        textureMap.set(textureFile.name, textureUrl)
      })
      console.log('用户上传的纹理文件:', Array.from(textureMap.keys()))
    }

    // 显示加载信息
    const loadingMsg = `加载模型: ${stepByStepFiles.value.obj.name}${stepByStepFiles.value.mtl ? ` + ${stepByStepFiles.value.mtl.name}` : ''}${stepByStepFiles.value.textures.length > 0 ? ` + ${stepByStepFiles.value.textures.length}个纹理` : ''}`

    $q.notify({
      message: loadingMsg,
      type: 'info',
      position: 'top'
    })

    // 加载模型
    const modelData = await loadOBJModel(objUrl, mtlUrl, textureMap)
    addModelToScene(modelData)

    // 清理 URLs
    URL.revokeObjectURL(objUrl)
    if (mtlUrl) URL.revokeObjectURL(mtlUrl)
    if (textureMap) {
      textureMap.forEach((textureUrl) => {
        URL.revokeObjectURL(textureUrl)
      })
    }

    $q.notify({
      message: '模型加载成功！',
      type: 'positive',
      position: 'top'
    })

    // 清理分步文件状态
    stepByStepFiles.value = {
      obj: null,
      mtl: null,
      textures: []
    }

  } catch (err) {
    error.value = `模型加载失败: ${err.message}`
    console.error('Step-by-step loading failed:', err)

    $q.notify({
      message: '模型加载失败: ' + err.message,
      type: 'negative',
      position: 'top',
      timeout: 5000
    })
  } finally {
    loading.value = false
  }
}

// 处理文件选择（支持多文件上传，自动配对OBJ+MTL）
async function handleFileSelect(event) {
  const files = Array.from(event.target.files)
  if (files.length === 0) return

  loading.value = true
  error.value = ''
  loadingProgress.value = 0

  try {
    // 分类文件
    const objFiles = files.filter(f => f.name.toLowerCase().endsWith('.obj'))
    const mtlFiles = files.filter(f => f.name.toLowerCase().endsWith('.mtl'))
    const gltfFiles = files.filter(f => f.name.toLowerCase().endsWith('.gltf') || f.name.toLowerCase().endsWith('.glb'))
    const textureFiles = files.filter(f => {
      const ext = f.name.toLowerCase()
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || ext.endsWith('.bmp')
    })

    if (gltfFiles.length > 0) {
      // 处理 GLTF 文件
      const file = gltfFiles[0]
      currentModel.value = file.name
      const url = URL.createObjectURL(file)

      const modelData = await loadGLTFModel(url)
      addModelToScene(modelData.scene, modelData, file.name)
      URL.revokeObjectURL(url)

    } else if (objFiles.length > 0) {
      // 处理 OBJ 文件
      const objFile = objFiles[0]
      currentModel.value = objFile.name

      // 尝试找到匹配的 MTL 文件
      const objBaseName = objFile.name.replace(/\.obj$/i, '')
      const matchingMtl = mtlFiles.find(mtl => {
        const mtlBaseName = mtl.name.replace(/\.mtl$/i, '')
        return mtlBaseName === objBaseName
      })

      const objUrl = URL.createObjectURL(objFile)
      let mtlUrl = null
      let textureMap = null

      // 如果有纹理文件，创建纹理映射
      if (textureFiles.length > 0) {
        textureMap = new Map()
        textureFiles.forEach(textureFile => {
          const textureUrl = URL.createObjectURL(textureFile)
          textureMap.set(textureFile.name, textureUrl)
        })
        console.log(`找到 ${textureFiles.length} 个纹理文件:`, Array.from(textureMap.keys()))
      }

      if (matchingMtl) {
        mtlUrl = URL.createObjectURL(matchingMtl)
        console.log(`找到匹配的材质文件: ${matchingMtl.name}`)

        $q.notify({
          message: `加载模型和材质: ${objFile.name} + ${matchingMtl.name}${textureFiles.length > 0 ? ` + ${textureFiles.length}个纹理` : ''}`,
          type: 'info',
          position: 'top'
        })
      } else if (mtlFiles.length > 0) {
        // 如果有MTL文件但名称不匹配，询问用户是否使用
        const result = await new Promise(resolve => {
          $q.dialog({
            title: '材质文件选择',
            message: `找到 ${mtlFiles.length} 个MTL文件，但名称与OBJ文件不匹配。是否使用第一个MTL文件？`,
            options: {
              type: 'radio',
              model: 'use',
              items: [
                { label: `使用 ${mtlFiles[0].name}`, value: 'use' },
                { label: '仅加载OBJ（无纹理）', value: 'skip' }
              ]
            },
            cancel: true,
            persistent: true
          }).onOk(resolve).onCancel(() => resolve('skip'))
        })

        if (result === 'use') {
          mtlUrl = URL.createObjectURL(mtlFiles[0])
        }
      } else {
        const message = textureFiles.length > 0
          ? `未找到MTL材质文件，将直接应用${textureFiles.length}个纹理到模型`
          : '未找到MTL材质文件，将使用默认材质'

        $q.notify({
          message: message,
          type: textureFiles.length > 0 ? 'info' : 'warning',
          position: 'top'
        })
      }

      // 加载 OBJ 模型
      const modelData = await loadOBJModel(objUrl, mtlUrl, textureMap)
      addModelToScene(modelData, null, objFile.name)

      // 清理 URLs
      URL.revokeObjectURL(objUrl)
      if (mtlUrl) URL.revokeObjectURL(mtlUrl)
      if (textureMap) {
        textureMap.forEach((textureUrl) => {
          URL.revokeObjectURL(textureUrl)
        })
      }

    } else if (textureFiles.length > 0) {
      // 只选择了纹理文件，没有模型文件
      $q.notify({
        message: '只检测到纹理文件，请同时选择OBJ或GLTF模型文件',
        type: 'warning',
        position: 'top',
        timeout: 4000
      })
      throw new Error('缺少模型文件。请选择 .obj、.gltf 或 .glb 格式的模型文件')
    } else {
      throw new Error('请选择支持的文件格式: .gltf、.glb、.obj 或 .obj + .mtl + 纹理图片 组合')
    }

    $q.notify({
      message: '模型加载成功！',
      type: 'positive',
      position: 'top'
    })

  } catch (err) {
    error.value = `文件加载失败: ${err.message}`
    console.error('File loading failed:', err)

    $q.notify({
      message: '文件加载失败: ' + err.message,
      type: 'negative',
      position: 'top',
      timeout: 5000
    })
  } finally {
    loading.value = false
    // 清理文件输入，允许重新选择相同文件
    event.target.value = ''
  }
}

// 重置相机
function resetCamera() {
  if (currentLoadedModel) {
    fitCameraToModel(currentLoadedModel)
  }
}

// 播放动画
function playAnimation(animationName) {
  if (!animationMixer || !animationName) return

  // 停止所有动画
  animationActions.forEach(action => {
    action.stop()
  })

  // 找到并播放选中的动画
  const animation = animations.value.find(anim => anim.name === animationName)
  if (animation) {
    const action = animationMixer.clipAction(animation.clip)
    action.reset()
    action.play()
    isAnimationPlaying.value = true
  }
}

// 切换动画播放状态
function toggleAnimation() {
  if (!animationMixer) return

  if (isAnimationPlaying.value) {
    animationMixer.timeScale = 0
    isAnimationPlaying.value = false
  } else {
    animationMixer.timeScale = 1
    isAnimationPlaying.value = true
  }
}

// 窗口大小调整
function onWindowResize() {
  if (!camera || !renderer || !modelContainer.value) return

  // 3D视图现在占据整个容器宽度
  const width = modelContainer.value.clientWidth
  const height = canvasHeight.value

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// 防抖处理
let resizeTimeout = null
function handleResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(onWindowResize, 100)
}

// 清理光源标记
function clearLightMarkers() {
  lightMarkers.forEach(marker => {
    scene.remove(marker)
    if (marker.geometry) marker.geometry.dispose()
    if (marker.material) marker.material.dispose()
  })
  lightMarkers = []
}

// 组件生命周期
onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)

  // 清理 Three.js 资源
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  clearCurrentModel()
  clearLighting()
  clearLightMarkers()

  // 清理光源助手
  lightHelpers.forEach(helper => {
    scene.remove(helper)
  })
  lightHelpers = []

  if (renderer) {
    renderer.dispose()
    if (modelContainer.value && renderer.domElement) {
      modelContainer.value.removeChild(renderer.domElement)
    }
  }

  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }
})
</script>

<style scoped>
.model-demo-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.model-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 渲染容器布局 */
.render-container-wrapper {
  position: relative;
  border-radius: 8px;
}

.model-canvas-container {
  position: relative;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  width: 100%;
  user-select: none;
  /* 防止拖拽时选中文本 */
}

/* 3D画布样式 */
.model-canvas-container canvas {
  display: block;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.model-canvas-container canvas:focus {
  outline: none;
}

/* 光照控制侧边栏 - 作为3D视图内的覆盖层 */
.lighting-sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: linear-gradient(135deg, rgba(250, 250, 250, 0.98) 0%, rgba(255, 255, 255, 0.98) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-left: 2px solid rgba(224, 224, 224, 0.8);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border-radius: 0 6px 6px 0;
}

/* 模型管理侧边栏 - 作为3D视图内的覆盖层（左侧） */
.model-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 100%;
  background: linear-gradient(135deg, rgba(240, 248, 255, 0.98) 0%, rgba(255, 255, 255, 0.98) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-right: 2px solid rgba(25, 118, 210, 0.3);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border-radius: 6px 0 0 6px;
}

/* 侧边栏头部 */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  border-radius: 0 6px 0 0;
}

.sidebar-title {
  display: flex;
  align-items: center;
  font-size: 1.1em;
  font-weight: 600;
}

/* 侧边栏内容 */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

/* 侧边栏滚动条 */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: #1976d2;
  border-radius: 3px;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
  background: #1565c0;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(245, 245, 245, 0.95);
  z-index: 10;
}

.model-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.info-item {
  text-align: center;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 8px;
  border-left: 3px solid #1976d2;
}

.info-label {
  font-size: 0.85em;
  opacity: 0.7;
  margin-bottom: 4px;
}

.info-value {
  font-size: 1.1em;
  font-weight: 600;
  color: #1976d2;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .model-demo-container {
    padding: 0.5rem;
  }

  .model-canvas-container {
    height: 350px !important;
  }

  .model-info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 动画效果 */
.model-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.model-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.info-item {
  transition: transform 0.2s ease;
}

.info-item:hover {
  transform: scale(1.02);
}

/* 分步文件选择对话框样式 */
.texture-list {
  max-height: 120px;
  overflow-y: auto;
}

.texture-list .row {
  flex-wrap: wrap;
}

/* 步骤指示器样式 */
.q-icon[name="looks_one"],
.q-icon[name="looks_two"],
.q-icon[name="looks_3"] {
  font-size: 1.5em;
  background: currentColor;
  border-radius: 50%;
  color: white !important;
  padding: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 预览信息样式 */
.bg-grey-1 {
  border-left: 4px solid #1976d2;
}

/* 文件按钮悬停效果 */
.q-btn[color="primary"]:hover,
.q-btn[color="secondary"]:hover,
.q-btn[color="accent"]:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}

/* 侧边栏区块 */
.sidebar-section {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 12px;
}

.sidebar-section.compact {
  margin-bottom: 16px;
  padding-bottom: 10px;
}

.sidebar-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 16px;
}

/* 区块头部 */
.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px 10px;
  font-size: 0.9em;
  font-weight: 600;
  color: #424242;
  background: rgba(25, 118, 210, 0.03);
  border-left: 4px solid #1976d2;
  margin-bottom: 14px;
}

.section-header.compact {
  padding: 10px 16px 8px;
  font-size: 0.85em;
  margin-bottom: 10px;
}

/* 预设按钮网格 */
.preset-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  padding: 0 16px;
}

.preset-grid .q-btn {
  border-radius: 4px;
  font-size: 0.75em;
  padding: 6px 8px;
  min-height: 28px;
  transition: all 0.2s ease;
}

.preset-grid .q-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 光源控制项 */
.light-control-item {
  margin: 0 16px 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.light-control-item:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(25, 118, 210, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 光源头部 */
.light-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.light-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.light-name {
  font-size: 0.9em;
  font-weight: 600;
  color: #424242;
}

.light-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.light-value {
  font-size: 0.85em;
  font-weight: bold;
  color: #1976d2;
  min-width: 24px;
  text-align: right;
}

/* 位置控制区域 */
.position-controls {
  margin-top: 8px;
  padding: 8px;
  background: rgba(25, 118, 210, 0.03);
  border-radius: 4px;
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.position-title {
  font-size: 0.75em;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 6px;
  text-align: center;
}

.xyz-controls {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.axis-control {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.axis-label {
  font-size: 0.75em;
  font-weight: bold;
  min-width: 14px;
  text-align: center;
}

.axis-value {
  font-size: 0.75em;
  font-weight: bold;
  color: #666;
  min-width: 24px;
  text-align: right;
}

.axis-control .q-slider {
  flex: 1;
  margin: 0 4px;
}

/* 可视化选项 */
.visual-options {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
}

.visual-options .q-checkbox {
  font-size: 0.85em;
}

/* 光照滑块样式 */
.q-slider .q-slider__track {
  background: linear-gradient(90deg, #e0e0e0 0%, #ff9800 100%);
}

.q-slider .q-slider__thumb {
  border: 2px solid #ff9800;
  background: #ffffff;
}

/* 快速预设按钮样式 */
.lighting-controls .q-btn {
  transition: all 0.2s ease;
}

.lighting-controls .q-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* 响应式光照控制 */
@media (max-width: 600px) {
  .lighting-controls {
    padding: 0.75rem;
  }

  .light-control-item {
    padding: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .light-label {
    font-size: 0.85em;
  }
}

/* 滑块样式优化 */
.light-control-item .q-slider .q-slider__track {
  border-radius: 3px;
}

.light-control-item .q-slider .q-slider__thumb {
  border: 2px solid currentColor;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 模型管理面板样式 */
.model-toolbar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 16px;
}

.model-toolbar .q-btn {
  border-radius: 4px;
  font-size: 0.75em;
  min-height: 32px;
}

.model-list {
  padding: 0 16px;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}

.no-models {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.model-item {
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(25, 118, 210, 0.1);
  border-radius: 8px;
  transition: all 0.2s ease;
  overflow: hidden;
}

.model-item:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(25, 118, 210, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.model-item.selected {
  border-color: #1976d2;
  box-shadow: 0 0 0 1px rgba(25, 118, 210, 0.3);
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  background: rgba(25, 118, 210, 0.02);
}

.model-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.model-name {
  font-size: 0.9em;
  font-weight: 600;
  color: #333;
}

.model-actions {
  display: flex;
  gap: 4px;
}

.model-transforms {
  padding: 12px;
  border-top: 1px solid rgba(25, 118, 210, 0.1);
  background: rgba(25, 118, 210, 0.02);
}

.transform-section {
  margin-bottom: 16px;
}

.transform-title {
  font-size: 0.8em;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(25, 118, 210, 0.2);
}

.transform-controls {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.transform-control {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
}

.transform-label {
  font-size: 0.75em;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
  color: #666;
}

.transform-value {
  font-size: 0.75em;
  font-weight: bold;
  color: #1976d2;
  min-width: 35px;
  text-align: right;
}

.transform-control .q-slider {
  flex: 1;
  margin: 0 4px;
}

.model-reset {
  text-align: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(25, 118, 210, 0.1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .model-demo-container {
    max-width: 100%;
    margin: 0;
  }

  .lighting-sidebar {
    position: absolute;
    top: auto;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
    border-left: none;
    border-top: 2px solid rgba(224, 224, 224, 0.8);
    border-radius: 8px 8px 0 0;
    background: linear-gradient(135deg, rgba(250, 250, 250, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%);
  }

  .preset-grid {
    grid-template-columns: 1fr 1fr;
  }

  .light-control-item {
    margin: 0 16px 12px;
    padding: 12px;
  }

  .section-header {
    padding: 12px 16px 8px;
  }

  .visual-options {
    padding: 0 16px;
  }

  .position-controls {
    padding: 10px;
  }

  .axis-control {
    padding: 4px;
    gap: 6px;
  }

  .axis-label,
  .axis-value {
    font-size: 0.7em;
  }
}
</style>
