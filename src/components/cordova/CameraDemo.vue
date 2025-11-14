<template>
  <q-card class="camera-demo">
    <q-card-section>
      <div class="text-h6 q-mb-md">
        <q-icon name="camera_alt" class="q-mr-sm" />
        相机功能演示
      </div>
      
      <div class="row q-gutter-md">
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">拍照功能</div>
              
              <div class="camera-actions q-mb-md">
                <q-btn
                  color="primary"
                  icon="camera_alt"
                  label="拍照"
                  :loading="takingPhoto"
                  @click="takePicture"
                  class="q-mr-sm q-mb-sm"
                />
                
                <q-btn
                  color="secondary"
                  icon="photo_library"
                  label="选择图片"
                  :loading="selectingPhoto"
                  @click="selectFromLibrary"
                  class="q-mb-sm"
                />
              </div>
              
              <div class="camera-options">
                <q-expansion-item
                  icon="settings"
                  label="拍照设置"
                  class="q-mb-md"
                >
                  <div class="q-pa-md">
                    <div class="row q-gutter-md">
                      <div class="col-12">
                        <q-slider
                          v-model="cameraOptions.quality"
                          :min="10"
                          :max="100"
                          :step="10"
                          label
                          label-always
                          color="primary"
                        />
                        <div class="text-caption">图片质量: {{ cameraOptions.quality }}%</div>
                      </div>
                      
                      <div class="col-6">
                        <q-input
                          v-model.number="cameraOptions.targetWidth"
                          type="number"
                          label="目标宽度"
                          outlined
                          dense
                        />
                      </div>
                      
                      <div class="col-6">
                        <q-input
                          v-model.number="cameraOptions.targetHeight"
                          type="number"
                          label="目标高度"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <div class="col-12 col-md-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">图片预览</div>
              
              <div class="image-preview">
                <div v-if="currentImage" class="image-container">
                  <img 
                    :src="currentImage" 
                    alt="拍摄的图片"
                    class="preview-image"
                  />
                  
                  <div class="image-actions q-mt-sm">
                    <q-btn
                      flat
                      dense
                      icon="save"
                      label="保存"
                      color="positive"
                      @click="saveImage"
                      class="q-mr-sm"
                    />
                    
                    <q-btn
                      flat
                      dense
                      icon="delete"
                      label="删除"
                      color="negative"
                      @click="clearImage"
                    />
                  </div>
                </div>
                
                <div v-else class="no-image">
                  <q-icon name="image" size="64px" color="grey-5" />
                  <div class="text-grey-6 q-mt-sm">暂无图片</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      
      <div v-if="imageHistory.length > 0" class="q-mt-md">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">图片历史</div>
            
            <div class="image-gallery">
              <div 
                v-for="(image, index) in imageHistory" 
                :key="index"
                class="gallery-item"
                @click="viewImage(image)"
              >
                <img :src="image.data" alt="历史图片" />
                <div class="image-info">
                  <div class="text-caption">{{ formatTime(image.timestamp) }}</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
  
  <!-- 图片查看对话框 -->
  <q-dialog v-model="showImageDialog">
    <q-card style="max-width: 90vw; max-height: 90vh;">
      <q-card-section>
        <div class="text-h6">图片详情</div>
      </q-card-section>
      
      <q-card-section class="q-pt-none">
        <img 
          v-if="selectedImage"
          :src="selectedImage.data" 
          alt="查看图片"
          style="max-width: 100%; height: auto;"
        />
      </q-card-section>
      
      <q-card-actions align="right">
        <q-btn flat label="关闭" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, inject } from 'vue'
import { useQuasar } from 'quasar'
import pluginManager from 'src/services/cordova/PluginManager.js'

export default {
  name: 'CameraDemo',
  setup() {
    const $q = useQuasar()
    const cordova = inject('cordova')
    
    const takingPhoto = ref(false)
    const selectingPhoto = ref(false)
    const currentImage = ref(null)
    const imageHistory = ref([])
    const showImageDialog = ref(false)
    const selectedImage = ref(null)
    
    const cameraOptions = reactive({
      quality: 75,
      targetWidth: 300,
      targetHeight: 300
    })

    const takePicture = () => {
      takingPhoto.value = true
      
      // 使用标准Cordova Camera API
      if (cordova.isCordova && navigator.camera) {
        navigator.camera.getPicture(
          (imageData) => {
            // 成功回调
            const imageSrc = `data:image/jpeg;base64,${imageData}`
            currentImage.value = imageSrc
            
            // 添加到历史记录
            imageHistory.value.unshift({
              data: imageSrc,
              timestamp: Date.now(),
              source: 'camera'
            })
            
            // 限制历史记录数量
            if (imageHistory.value.length > 10) {
              imageHistory.value = imageHistory.value.slice(0, 10)
            }
            
            $q.notify({
              type: 'positive',
              message: '拍照成功！',
              position: 'top'
            })
            takingPhoto.value = false
          },
          (error) => {
            // 失败回调
            console.error('拍照失败:', error)
            $q.notify({
              type: 'negative',
              message: '拍照失败: ' + (error.message || error),
              position: 'top'
            })
            takingPhoto.value = false
          },
          {
            // 相机选项
            quality: cameraOptions.quality,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: cameraOptions.targetWidth,
            targetHeight: cameraOptions.targetHeight
          }
        )
      } else {
        // Web环境回退到文件选择器
        pluginManager.camera.takePicture(cameraOptions)
          .then(imageData => {
            currentImage.value = imageData
            imageHistory.value.unshift({
              data: imageData,
              timestamp: Date.now(),
              source: 'camera'
            })
            if (imageHistory.value.length > 10) {
              imageHistory.value = imageHistory.value.slice(0, 10)
            }
            $q.notify({
              type: 'positive',
              message: '图片选择成功！',
              position: 'top'
            })
          })
          .catch(error => {
            $q.notify({
              type: 'negative',
              message: '操作失败: ' + (error.message || error),
              position: 'top'
            })
          })
          .finally(() => {
            takingPhoto.value = false
          })
      }
    }

    const selectFromLibrary = async () => {
      selectingPhoto.value = true
      try {
        const imageData = await pluginManager.camera.selectFromLibrary(cameraOptions)
        currentImage.value = imageData
        
        // 添加到历史记录
        imageHistory.value.unshift({
          data: imageData,
          timestamp: Date.now(),
          source: 'library'
        })
        
        // 限制历史记录数量
        if (imageHistory.value.length > 10) {
          imageHistory.value = imageHistory.value.slice(0, 10)
        }
        
        $q.notify({
          type: 'positive',
          message: '图片选择成功！',
          position: 'top'
        })
      } catch (error) {
        console.error('选择图片失败:', error)
        $q.notify({
          type: 'negative',
          message: '选择图片失败: ' + (error.message || error),
          position: 'top'
        })
      } finally {
        selectingPhoto.value = false
      }
    }

    const saveImage = () => {
      if (!currentImage.value) return
      
      // 创建下载链接
      const link = document.createElement('a')
      link.href = currentImage.value
      link.download = `photo_${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      $q.notify({
        type: 'positive',
        message: '图片保存成功！',
        position: 'top'
      })
    }

    const clearImage = () => {
      currentImage.value = null
      $q.notify({
        type: 'info',
        message: '图片已清除',
        position: 'top'
      })
    }

    const viewImage = (image) => {
      selectedImage.value = image
      showImageDialog.value = true
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleString()
    }

    return {
      takingPhoto,
      selectingPhoto,
      currentImage,
      imageHistory,
      showImageDialog,
      selectedImage,
      cameraOptions,
      takePicture,
      selectFromLibrary,
      saveImage,
      clearImage,
      viewImage,
      formatTime
    }
  }
}
</script>

<style scoped>
.camera-demo {
  max-width: 1000px;
  margin: 0 auto;
}

.camera-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.image-preview {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  text-align: center;
  width: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.no-image {
  text-align: center;
  padding: 40px;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.gallery-item {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  font-size: 10px;
}

@media (max-width: 600px) {
  .camera-actions {
    flex-direction: column;
  }
  
  .image-gallery {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
