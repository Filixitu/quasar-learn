<template>
    <div class="q-gutter-md">
        <div class="text-h6">File Upload 文件上传</div>

        <!-- 基础文件上传 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">基础文件上传</div>
            <q-file v-model="file1" label="选择文件" outlined style="max-width: 400px" />
        </div>

        <q-separator />

        <!-- 多文件上传 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">多文件上传</div>
            <q-file v-model="files" label="选择多个文件" multiple outlined style="max-width: 400px">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
            </q-file>
            <div v-if="files && files.length > 0" class="q-mt-sm text-caption">
                已选择 {{ files.length }} 个文件
            </div>
        </div>

        <q-separator />

        <!-- 限制文件类型 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">限制文件类型</div>
            <div class="q-gutter-md" style="max-width: 400px">
                <q-file v-model="imageFile" label="只能上传图片" accept="image/*" outlined>
                    <template v-slot:prepend>
                        <q-icon name="image" />
                    </template>
                </q-file>

                <q-file v-model="docFile" label="只能上传文档" accept=".pdf,.doc,.docx" outlined>
                    <template v-slot:prepend>
                        <q-icon name="description" />
                    </template>
                </q-file>
            </div>
        </div>

        <q-separator />

        <!-- 文件大小限制 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">文件大小限制</div>
            <q-file v-model="limitedFile" label="最大 5MB" outlined max-file-size="5242880" @rejected="onRejected"
                style="max-width: 400px">
                <template v-slot:hint>
                    最大文件大小: 5MB
                </template>
            </q-file>
        </div>

        <q-separator />

        <!-- 拖拽上传 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">拖拽上传</div>
            <div class="drop-zone" @dragover.prevent @drop.prevent="handleDrop">
                <div class="text-center q-pa-xl">
                    <q-icon name="cloud_upload" size="64px" color="grey-5" />
                    <div class="text-h6 q-mt-md">拖拽文件到这里</div>
                    <div class="text-caption text-grey-7 q-mt-sm">或点击选择文件</div>
                    <q-file v-model="dropFile" class="q-mt-md" outlined multiple />
                </div>
                <div v-if="dropFile && dropFile.length > 0" class="q-pa-md">
                    <div class="text-subtitle2 q-mb-sm">已选择文件:</div>
                    <q-list>
                        <q-item v-for="(f, index) in dropFile" :key="index">
                            <q-item-section avatar>
                                <q-icon :name="getFileIcon(f.name)" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ f.name }}</q-item-label>
                                <q-item-label caption>{{ formatFileSize(f.size) }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-btn flat round dense icon="close" @click="removeFile(index)" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
        </div>

        <q-separator />

        <!-- 完整的上传示例 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">完整上传流程</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <q-file v-model="uploadFiles" label="选择要上传的文件" multiple outlined use-chips counter>
                        <template v-slot:prepend>
                            <q-icon name="cloud_upload" />
                        </template>
                    </q-file>
                </q-card-section>

                <q-card-section v-if="uploadFiles && uploadFiles.length > 0">
                    <div class="text-subtitle2 q-mb-md">文件列表:</div>
                    <q-list>
                        <q-item v-for="(file, index) in uploadFiles" :key="index">
                            <q-item-section avatar>
                                <q-avatar :icon="getFileIcon(file.name)" :color="getFileColor(file.name)"
                                    text-color="white" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ file.name }}</q-item-label>
                                <q-item-label caption>{{ formatFileSize(file.size) }}</q-item-label>
                            </q-item-section>
                            <q-item-section side v-if="uploadProgress[index] !== undefined">
                                <q-circular-progress :value="uploadProgress[index]" size="40px" :thickness="0.2"
                                    color="primary" track-color="grey-3">
                                    {{ uploadProgress[index] }}%
                                </q-circular-progress>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="清空" @click="uploadFiles = null"
                        :disable="!uploadFiles || uploadFiles.length === 0" />
                    <q-btn color="primary" label="开始上传" @click="startUpload"
                        :disable="!uploadFiles || uploadFiles.length === 0 || uploading" :loading="uploading" />
                </q-card-actions>
            </q-card>
        </div>

        <q-separator />

        <!-- 图片预览上传 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">图片预览上传</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <q-file v-model="previewImages" label="选择图片" multiple accept="image/*" outlined
                        @update:model-value="onImageSelected">
                        <template v-slot:prepend>
                            <q-icon name="add_photo_alternate" />
                        </template>
                    </q-file>

                    <div v-if="imagePreviews.length > 0" class="row q-col-gutter-sm q-mt-md">
                        <div v-for="(preview, index) in imagePreviews" :key="index" class="col-3">
                            <q-card flat bordered>
                                <q-img :src="preview.url" ratio="1">
                                    <div class="absolute-top-right q-pa-xs">
                                        <q-btn round dense flat icon="close" size="sm" color="white"
                                            @click="removePreview(index)" />
                                    </div>
                                </q-img>
                            </q-card>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const file1 = ref(null)
const files = ref(null)
const imageFile = ref(null)
const docFile = ref(null)
const limitedFile = ref(null)
const dropFile = ref(null)
const uploadFiles = ref(null)
const uploadProgress = ref({})
const uploading = ref(false)
const previewImages = ref(null)
const imagePreviews = ref([])

function onRejected() {
    $q.notify({
        message: '文件大小超过限制（最大 5MB）',
        color: 'negative'
    })
}

function handleDrop(e) {
    const files = Array.from(e.dataTransfer.files)
    dropFile.value = files
}

function removeFile(index) {
    const files = Array.from(dropFile.value)
    files.splice(index, 1)
    dropFile.value = files.length > 0 ? files : null
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase()
    const iconMap = {
        pdf: 'picture_as_pdf',
        doc: 'description',
        docx: 'description',
        xls: 'table_chart',
        xlsx: 'table_chart',
        jpg: 'image',
        jpeg: 'image',
        png: 'image',
        gif: 'image',
        mp4: 'video_library',
        mp3: 'audio_file',
        zip: 'folder_zip',
        rar: 'folder_zip',
    }
    return iconMap[ext] || 'insert_drive_file'
}

function getFileColor(filename) {
    const ext = filename.split('.').pop().toLowerCase()
    const colorMap = {
        pdf: 'red',
        doc: 'blue',
        docx: 'blue',
        xls: 'green',
        xlsx: 'green',
        jpg: 'orange',
        jpeg: 'orange',
        png: 'orange',
        gif: 'orange',
        mp4: 'purple',
        mp3: 'pink',
        zip: 'grey',
        rar: 'grey',
    }
    return colorMap[ext] || 'grey'
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

function startUpload() {
    uploading.value = true
    uploadProgress.value = {}

    uploadFiles.value.forEach((file, index) => {
        uploadProgress.value[index] = 0

        // 模拟上传进度
        const interval = setInterval(() => {
            uploadProgress.value[index] += 10
            if (uploadProgress.value[index] >= 100) {
                clearInterval(interval)

                // 检查是否所有文件都上传完成
                const allCompleted = Object.values(uploadProgress.value).every(v => v === 100)
                if (allCompleted) {
                    uploading.value = false
                    $q.notify({
                        message: '所有文件上传成功！',
                        color: 'positive'
                    })
                }
            }
        }, 300)
    })
}

function onImageSelected(files) {
    if (!files) {
        imagePreviews.value = []
        return
    }

    const fileArray = Array.isArray(files) ? files : [files]
    imagePreviews.value = []

    fileArray.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreviews.value.push({
                url: e.target.result,
                name: file.name
            })
        }
        reader.readAsDataURL(file)
    })
}

function removePreview(index) {
    imagePreviews.value.splice(index, 1)
    if (imagePreviews.value.length === 0) {
        previewImages.value = null
    }
}
</script>

<style scoped>
.drop-zone {
    border: 2px dashed #ccc;
    border-radius: 8px;
    background: #f5f5f5;
    max-width: 600px;
}

.drop-zone:hover {
    border-color: var(--q-primary);
    background: #f0f0f0;
}
</style>
