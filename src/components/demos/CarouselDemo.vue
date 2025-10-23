<template>
  <div class="q-gutter-md">
    <div class="text-h6">基础轮播</div>
    <q-carousel v-model="slide1" animated navigation infinite arrows height="300px" class="bg-grey-2 rounded-borders">
      <q-carousel-slide name="1" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h4">第一张</div>
          <div class="text-subtitle1">这是第一张轮播图</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h4">第二张</div>
          <div class="text-subtitle1">这是第二张轮播图</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="3" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="text-h4">第三张</div>
          <div class="text-subtitle1">这是第三张轮播图</div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-separator />

    <div class="text-h6">自动播放</div>
    <q-carousel v-model="slide2" animated navigation infinite :autoplay="3000" arrows transition-prev="slide-right"
      transition-next="slide-left" height="250px" class="bg-primary text-white rounded-borders">
      <q-carousel-slide name="1" class="column no-wrap flex-center">
        <q-icon name="star" size="56px" />
        <div class="q-mt-md text-center">每3秒自动切换</div>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <q-icon name="favorite" size="56px" />
        <div class="q-mt-md text-center">自动轮播 - 幻灯片 2</div>
      </q-carousel-slide>
      <q-carousel-slide name="3" class="column no-wrap flex-center">
        <q-icon name="thumb_up" size="56px" />
        <div class="q-mt-md text-center">自动轮播 - 幻灯片 3</div>
      </q-carousel-slide>
    </q-carousel>

    <q-separator />

    <div class="text-h6">图片预览（支持全屏）</div>
    <div class="q-mb-sm text-caption text-grey-7">
      点击图片可全屏查看，按 ESC 或点击右上角关闭按钮退出
    </div>
    <q-carousel v-model="slide3" animated navigation infinite arrows thumbnails height="400px" class="rounded-borders">
      <q-carousel-slide v-for="(image, index) in galleryImages" :key="index" :name="index + 1" :img-src="image.url"
        @click="openImageViewer(index)" class="cursor-pointer">
        <div class="absolute-bottom custom-caption">
          <div class="text-subtitle1">{{ image.title }}</div>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control position="top-right" :offset="[18, 18]">
          <q-btn push round dense color="white" text-color="primary" icon="fullscreen"
            @click="openImageViewer(slide3 - 1)">
            <q-tooltip>全屏查看</q-tooltip>
          </q-btn>
        </q-carousel-control>
      </template>
    </q-carousel>

    <!-- 图片全屏查看器 -->
    <q-dialog v-model="imageViewerOpen" maximized>
      <q-card class="bg-black">
        <q-bar class="bg-grey-9 text-white">
          <q-space />
          <div class="text-subtitle2">{{ currentImage + 1 }} / {{ galleryImages.length }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>关闭 (ESC)</q-tooltip>
          </q-btn>
        </q-bar>

        <q-carousel v-model="currentImage" animated navigation infinite arrows height="calc(100vh - 50px)"
          class="bg-black text-white">
          <q-carousel-slide v-for="(image, index) in galleryImages" :key="index" :name="index" class="q-pa-none">
            <div class="full-width full-height flex flex-center">
              <img :src="image.url" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
            </div>
            <div class="absolute-bottom text-center q-pa-md">
              <div class="text-h6">{{ image.title }}</div>
              <div class="text-caption">{{ image.description }}</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
    </q-dialog>

    <q-separator />

    <div class="text-h6">实际应用示例</div>

    <!-- 首页轮播广告 -->
    <div>
      <div class="text-subtitle2 q-mb-sm">首页轮播广告</div>
      <q-card style="max-width: 1000px">
        <q-carousel v-model="bannerSlide" animated infinite :autoplay="4000" arrows navigation height="400px"
          control-color="white">
          <q-carousel-slide v-for="(banner, index) in banners" :key="index" :name="index" :img-src="banner.image"
            class="cursor-pointer" @click="$q.notify(`点击了: ${banner.title}`)">
            <div class="absolute-full flex flex-center text-white" style="background: rgba(0,0,0,0.3)">
              <div class="text-center">
                <div class="text-h3 q-mb-md">{{ banner.title }}</div>
                <div class="text-h6 q-mb-lg">{{ banner.subtitle }}</div>
                <q-btn color="white" text-color="primary" label="立即了解" size="lg" unelevated
                  @click.stop="$q.notify('了解更多')" />
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
    </div>

    <!-- 商品详情轮播 -->
    <div class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">商品详情轮播</div>
      <q-card style="max-width: 800px">
        <div class="row">
          <div class="col-12 col-sm-7">
            <q-carousel v-model="productSlide" animated navigation infinite arrows height="400px">
              <q-carousel-slide v-for="(img, index) in productImages" :key="index" :name="index" :img-src="img" />
            </q-carousel>

            <!-- 缩略图导航 -->
            <div class="row q-pa-md q-gutter-sm">
              <div v-for="(img, index) in productImages" :key="index" class="cursor-pointer"
                @click="productSlide = index">
                <q-img :src="img" width="60px" height="60px"
                  :class="productSlide === index ? 'product-thumb-active' : 'product-thumb'" />
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-5 q-pa-md">
            <div class="text-h5 q-mb-md">高端智能手机</div>
            <div class="text-h4 text-red q-mb-md">¥4,999</div>
            <div class="text-body2 text-grey-7 q-mb-md">
              顶级配置，卓越性能，极致体验
            </div>
            <q-separator class="q-my-md" />
            <div class="q-gutter-sm">
              <q-btn color="primary" label="立即购买" unelevated class="full-width" />
              <q-btn color="orange" label="加入购物车" outline class="full-width" />
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <!-- 新闻资讯轮播 -->
    <div class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">新闻资讯卡片轮播</div>
      <q-carousel v-model="newsSlide" animated arrows padding height="300px" style="max-width: 1000px">
        <q-carousel-slide :name="index" v-for="(news, index) in newsList" :key="index" class="q-pa-none">
          <div class="row q-col-gutter-md full-height">
            <div class="col-4" v-for="item in news" :key="item.id">
              <q-card class="full-height cursor-pointer" @click="$q.notify(`查看: ${item.title}`)">
                <q-img :src="item.image" height="150px" />
                <q-card-section>
                  <div class="text-subtitle1">{{ item.title }}</div>
                  <div class="text-caption text-grey-7">{{ item.date }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- 用户评价轮播 -->
    <div class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">用户评价</div>
      <q-card style="max-width: 800px" class="bg-grey-1">
        <q-carousel v-model="reviewSlide" animated infinite :autoplay="5000" height="250px"
          transition-prev="slide-right" transition-next="slide-left">
          <q-carousel-slide v-for="(review, index) in reviews" :key="index" :name="index"
            class="column flex-center q-pa-lg">
            <div class="text-center">
              <q-icon name="format_quote" size="48px" color="grey-5" />
              <div class="text-h6 q-my-md">{{ review.content }}</div>
              <q-rating v-model="review.rating" readonly size="lg" color="orange" />
              <div class="q-mt-md">
                <q-avatar size="48px">
                  <img :src="review.avatar">
                </q-avatar>
                <div class="text-subtitle1 q-mt-sm">{{ review.name }}</div>
                <div class="text-caption text-grey-7">{{ review.title }}</div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
    </div>

    <!-- 团队成员展示 -->
    <div class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">团队成员</div>
      <q-carousel v-model="teamSlide" animated arrows navigation padding height="350px" style="max-width: 1000px">
        <q-carousel-slide :name="index" v-for="(group, index) in teamGroups" :key="index" class="q-pa-none">
          <div class="row q-col-gutter-md full-height">
            <div class="col-3" v-for="member in group" :key="member.id">
              <q-card class="full-height text-center">
                <q-card-section>
                  <q-avatar size="100px">
                    <img :src="member.avatar">
                  </q-avatar>
                  <div class="text-h6 q-mt-md">{{ member.name }}</div>
                  <div class="text-subtitle2 text-grey-7">{{ member.position }}</div>
                  <div class="text-caption q-mt-sm">{{ member.bio }}</div>
                </q-card-section>
                <q-card-actions class="justify-center">
                  <q-btn flat round icon="email" size="sm" />
                  <q-btn flat round icon="phone" size="sm" />
                  <q-btn flat round icon="chat" size="sm" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- 证书/荣誉展示 -->
    <div class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">荣誉证书</div>
      <q-card style="max-width: 600px">
        <q-carousel v-model="certificateSlide" animated navigation infinite arrows height="400px" class="bg-grey-9">
          <q-carousel-slide v-for="(cert, index) in certificates" :key="index" :name="index" class="q-pa-md">
            <div class="column flex-center full-height">
              <q-img :src="cert.image" style="max-width: 80%; max-height: 300px" class="rounded-borders" />
              <div class="text-white text-center q-mt-md">
                <div class="text-h6">{{ cert.title }}</div>
                <div class="text-caption">{{ cert.issuer }} • {{ cert.year }}</div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
    </div>

    <!-- 步骤引导轮播 -->
    <div class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">产品使用引导</div>
      <q-card style="max-width: 700px">
        <q-carousel v-model="guideSlide" animated arrows navigation height="350px">
          <q-carousel-slide v-for="(step, index) in guideSteps" :key="index" :name="index"
            class="column flex-center q-pa-lg">
            <q-icon :name="step.icon" size="80px" :color="step.color" />
            <div class="text-h5 q-mt-md">步骤 {{ index + 1 }}: {{ step.title }}</div>
            <div class="text-body1 text-center q-mt-md text-grey-7">{{ step.description }}</div>
            <div class="q-mt-lg">
              <q-btn v-if="index < guideSteps.length - 1" color="primary" label="下一步" @click="guideSlide = index + 1" />
              <q-btn v-else color="positive" label="开始使用" @click="$q.notify('欢迎使用！')" />
              <q-btn v-if="index > 0" flat label="上一步" class="q-ml-sm" @click="guideSlide = index - 1" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
    </div>

    <!-- 视频教程轮播 -->
    <div class="q-mt-md">
      <div class="text-subtitle2 q-mb-sm">视频教程</div>
      <q-card style="max-width: 800px">
        <q-carousel v-model="videoSlide" animated arrows navigation height="450px">
          <q-carousel-slide v-for="(video, index) in videos" :key="index" :name="index" class="q-pa-md">
            <div class="column full-height">
              <div class="bg-grey-9 rounded-borders flex flex-center" style="height: 300px">
                <q-icon name="play_circle" size="80px" color="white" class="cursor-pointer" />
              </div>
              <div class="q-mt-md">
                <div class="text-h6">{{ video.title }}</div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  <q-icon name="schedule" size="xs" /> {{ video.duration }} •
                  <q-icon name="visibility" size="xs" /> {{ video.views }} 次观看
                </div>
                <div class="text-body2 q-mt-sm">{{ video.description }}</div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const slide1 = ref('1')
const slide2 = ref('1')
const slide3 = ref(1)
const bannerSlide = ref(0)
const productSlide = ref(0)
const newsSlide = ref(0)
const reviewSlide = ref(0)
const teamSlide = ref(0)
const certificateSlide = ref(0)
const guideSlide = ref(0)
const videoSlide = ref(0)

// 图片查看器
const imageViewerOpen = ref(false)
const currentImage = ref(0)

const galleryImages = [
  { url: 'https://cdn.quasar.dev/img/mountains.jpg', title: '山脉风景', description: '壮丽的山川景色' },
  { url: 'https://cdn.quasar.dev/img/parallax1.jpg', title: '现代设计', description: '简约而不简单' },
  { url: 'https://cdn.quasar.dev/img/parallax2.jpg', title: '创意空间', description: '激发无限灵感' },
  { url: 'https://cdn.quasar.dev/img/quasar.jpg', title: 'Quasar Framework', description: '强大的Vue框架' },
]

function openImageViewer(index) {
  currentImage.value = index
  imageViewerOpen.value = true
}

// 轮播广告
const banners = [
  {
    title: '夏季大促销',
    subtitle: '全场5折起，惊喜不断',
    image: 'https://cdn.quasar.dev/img/mountains.jpg'
  },
  {
    title: '新品上市',
    subtitle: '最新科技，引领潮流',
    image: 'https://cdn.quasar.dev/img/parallax1.jpg'
  },
  {
    title: '会员专享',
    subtitle: '注册即送500积分',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg'
  },
]

// 商品图片
const productImages = [
  'https://cdn.quasar.dev/img/parallax1.jpg',
  'https://cdn.quasar.dev/img/parallax2.jpg',
  'https://cdn.quasar.dev/img/mountains.jpg',
  'https://cdn.quasar.dev/img/quasar.jpg',
]

// 新闻列表
const newsList = [
  [
    { id: 1, title: '公司发布2024年度报告', date: '2024-01-15', image: 'https://cdn.quasar.dev/img/mountains.jpg' },
    { id: 2, title: '新产品线即将上市', date: '2024-01-14', image: 'https://cdn.quasar.dev/img/parallax1.jpg' },
    { id: 3, title: '技术创新获得行业认可', date: '2024-01-13', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
  ],
  [
    { id: 4, title: '季度业绩创新高', date: '2024-01-12', image: 'https://cdn.quasar.dev/img/quasar.jpg' },
    { id: 5, title: '战略合作伙伴签约', date: '2024-01-11', image: 'https://cdn.quasar.dev/img/mountains.jpg' },
    { id: 6, title: '员工福利政策升级', date: '2024-01-10', image: 'https://cdn.quasar.dev/img/parallax1.jpg' },
  ],
]

// 用户评价
const reviews = [
  {
    content: '产品质量非常好，服务态度也很棒，五星好评！',
    rating: 5,
    name: '张三',
    title: '企业客户',
    avatar: 'https://cdn.quasar.dev/img/avatar.png'
  },
  {
    content: '使用体验超出预期，性价比很高，强烈推荐！',
    rating: 5,
    name: '李四',
    title: '个人用户',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
  },
  {
    content: '专业的团队，优质的产品，值得信赖的品牌。',
    rating: 5,
    name: '王五',
    title: 'VIP客户',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
  },
]

// 团队成员
const teamGroups = [
  [
    { id: 1, name: '张三', position: 'CEO', bio: '10年行业经验', avatar: 'https://cdn.quasar.dev/img/avatar.png' },
    { id: 2, name: '李四', position: 'CTO', bio: '技术专家', avatar: 'https://cdn.quasar.dev/img/avatar2.jpg' },
    { id: 3, name: '王五', position: 'CFO', bio: '财务总监', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' },
    { id: 4, name: '赵六', position: 'COO', bio: '运营负责人', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg' },
  ],
]

// 证书
const certificates = [
  { title: 'ISO 9001质量管理体系认证', issuer: '国际标准化组织', year: '2023', image: 'https://cdn.quasar.dev/img/parallax1.jpg' },
  { title: '高新技术企业证书', issuer: '科技部', year: '2023', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
  { title: '优秀企业奖', issuer: '行业协会', year: '2023', image: 'https://cdn.quasar.dev/img/mountains.jpg' },
]

// 引导步骤
const guideSteps = [
  { icon: 'download', color: 'primary', title: '下载安装', description: '从官网下载最新版本，按照提示完成安装' },
  { icon: 'person_add', color: 'secondary', title: '注册账号', description: '使用邮箱或手机号注册您的账号' },
  { icon: 'settings', color: 'orange', title: '个性化设置', description: '根据您的需求设置偏好和权限' },
  { icon: 'rocket_launch', color: 'positive', title: '开始使用', description: '一切就绪，开始您的精彩旅程！' },
]

// 视频教程
const videos = [
  { title: '快速入门指南', duration: '5:32', views: '1.2万', description: '从零开始，快速掌握基本功能' },
  { title: '高级功能详解', duration: '12:45', views: '8,500', description: '深入了解高级特性和使用技巧' },
  { title: '实战案例分享', duration: '18:20', views: '6,300', description: '真实项目案例，学以致用' },
]
</script>

<style scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.product-thumb {
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.3s;
}

.product-thumb:hover {
  border-color: var(--q-primary);
}

.product-thumb-active {
  border: 2px solid var(--q-primary);
  border-radius: 4px;
}
</style>
