<template>
    <div class="q-gutter-md">
        <div class="text-h6">Infinite Scroll 无限滚动</div>
        <div class="text-caption text-grey-7 q-mb-md">
            滚动到底部时自动加载更多数据，适合社交媒体、新闻列表等场景
        </div>

        <!-- 基础无限滚动 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">基础无限滚动</div>
            <q-card style="max-width: 600px">
                <q-scroll-area style="height: 400px">
                    <q-infinite-scroll @load="onLoad" :offset="250">
                        <div v-for="(item, index) in items" :key="index" class="q-pa-md">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="text-h6">项目 {{ item }}</div>
                                    <div class="text-caption text-grey-7">这是第 {{ item }} 个项目</div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-dots color="primary" size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </q-scroll-area>
            </q-card>
        </div>

        <q-separator />

        <!-- 新闻列表 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">新闻动态</div>
            <q-card style="max-width: 700px">
                <q-bar class="bg-primary text-white">
                    <div>最新新闻</div>
                    <q-space />
                    <div class="text-caption">{{ newsList.length }} 条</div>
                </q-bar>
                <q-scroll-area style="height: 500px">
                    <q-infinite-scroll @load="loadNews" :offset="200">
                        <div v-for="news in newsList" :key="news.id" class="q-pa-md">
                            <div class="row q-gutter-md">
                                <q-img src="https://cdn.quasar.dev/img/mountains.jpg" width="120px" height="80px"
                                    class="rounded-borders" />
                                <div class="col">
                                    <div class="text-subtitle1">{{ news.title }}</div>
                                    <div class="text-caption text-grey-7 q-mt-xs">
                                        <q-icon name="schedule" size="xs" /> {{ news.time }}
                                        <q-icon name="visibility" size="xs" class="q-ml-sm" /> {{ news.views }} 次浏览
                                    </div>
                                    <div class="text-body2 q-mt-sm">{{ news.summary }}</div>
                                    <div class="row q-gutter-xs q-mt-sm">
                                        <q-chip v-for="tag in news.tags" :key="tag" size="sm">{{ tag }}</q-chip>
                                    </div>
                                </div>
                            </div>
                            <q-separator class="q-mt-md" />
                        </div>

                        <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-dots color="primary" size="40px" />
                                <div class="q-ml-sm text-grey-7">加载更多...</div>
                            </div>
                        </template>
                    </q-infinite-scroll>
                </q-scroll-area>
            </q-card>
        </div>

        <q-separator />

        <!-- 社交媒体动态 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">社交动态</div>
            <q-card style="max-width: 600px">
                <q-scroll-area style="height: 600px">
                    <q-infinite-scroll @load="loadPosts" :offset="250">
                        <div v-for="post in posts" :key="post.id" class="q-pa-md">
                            <q-card flat bordered>
                                <q-card-section>
                                    <div class="row items-center q-gutter-sm">
                                        <q-avatar size="40px">
                                            <img :src="post.avatar">
                                        </q-avatar>
                                        <div>
                                            <div class="text-subtitle2">{{ post.author }}</div>
                                            <div class="text-caption text-grey-7">{{ post.time }}</div>
                                        </div>
                                    </div>
                                </q-card-section>
                                <q-card-section class="q-pt-none">
                                    <div class="text-body1">{{ post.content }}</div>
                                    <q-img v-if="post.image" :src="post.image" class="rounded-borders q-mt-md" />
                                </q-card-section>
                                <q-separator />
                                <q-card-actions>
                                    <q-btn flat icon="thumb_up" :label="post.likes" />
                                    <q-btn flat icon="comment" :label="post.comments" />
                                    <q-btn flat icon="share" />
                                </q-card-actions>
                            </q-card>
                        </div>

                        <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-facebook color="primary" size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </q-scroll-area>
            </q-card>
        </div>

        <q-separator />

        <!-- 商品瀑布流 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">商品列表</div>
            <q-card style="max-width: 800px">
                <q-card-section>
                    <div class="row items-center justify-between">
                        <div class="text-h6">热门商品</div>
                        <q-badge color="grey-5">{{ productList.length }} 个商品</q-badge>
                    </div>
                </q-card-section>
                <q-scroll-area style="height: 500px">
                    <q-infinite-scroll @load="loadProducts" :offset="250">
                        <div class="row q-col-gutter-md q-pa-md">
                            <div v-for="product in productList" :key="product.id" class="col-6 col-sm-4 col-md-3">
                                <q-card flat bordered>
                                    <q-img src="https://cdn.quasar.dev/img/parallax1.jpg" ratio="1">
                                        <div class="absolute-top-right q-pa-xs">
                                            <q-badge color="red" v-if="product.hot">HOT</q-badge>
                                        </div>
                                    </q-img>
                                    <q-card-section>
                                        <div class="text-subtitle2">{{ product.name }}</div>
                                        <div class="text-h6 text-red">¥{{ product.price }}</div>
                                        <div class="text-caption text-grey-7">
                                            销量: {{ product.sales }}
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </div>

                        <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-gears color="primary" size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </q-scroll-area>
            </q-card>
        </div>

        <q-separator />

        <!-- 评论列表 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">评论区</div>
            <q-card style="max-width: 700px">
                <q-card-section>
                    <div class="text-h6">用户评论</div>
                </q-card-section>
                <q-scroll-area style="height: 400px">
                    <q-infinite-scroll @load="loadComments">
                        <div v-for="comment in commentList" :key="comment.id" class="q-pa-md">
                            <div class="row q-gutter-md">
                                <q-avatar size="48px">
                                    <img :src="comment.avatar">
                                </q-avatar>
                                <div class="col">
                                    <div class="row items-center q-gutter-sm">
                                        <div class="text-subtitle2">{{ comment.author }}</div>
                                        <q-rating :model-value="comment.rating" size="sm" color="orange" readonly />
                                    </div>
                                    <div class="text-caption text-grey-7">{{ comment.time }}</div>
                                    <div class="text-body2 q-mt-sm">{{ comment.content }}</div>
                                    <div class="row q-gutter-sm q-mt-sm">
                                        <q-btn flat dense size="sm" icon="thumb_up" :label="comment.likes" />
                                        <q-btn flat dense size="sm" label="回复" />
                                    </div>
                                </div>
                            </div>
                            <q-separator class="q-mt-md" />
                        </div>

                        <template v-slot:loading>
                            <div class="row justify-center q-my-md">
                                <q-spinner-oval color="primary" size="40px" />
                            </div>
                        </template>
                    </q-infinite-scroll>
                </q-scroll-area>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 无限滚动数据
const items = ref([])
const currentIndex = ref(0)

function onLoad(index, done) {
    setTimeout(() => {
        const nextItems = Array.from({ length: 10 }, (_, i) => currentIndex.value + i + 1)
        items.value.push(...nextItems)
        currentIndex.value += 10
        done()
    }, 500)
}

// 新闻数据
const newsList = ref([])
let newsIndex = 0

function loadNews(index, done) {
    setTimeout(() => {
        const newNews = Array.from({ length: 5 }, (_, i) => ({
            id: newsIndex + i + 1,
            title: `新闻标题 ${newsIndex + i + 1}`,
            summary: '这是新闻摘要内容，简要描述新闻的主要信息...',
            time: `${Math.floor(Math.random() * 24)}小时前`,
            views: Math.floor(Math.random() * 10000),
            tags: ['科技', 'Vue.js', 'Quasar'].slice(0, Math.floor(Math.random() * 3) + 1)
        }))
        newsList.value.push(...newNews)
        newsIndex += 5
        done()
    }, 800)
}

// 社交动态
const posts = ref([])
let postIndex = 0

function loadPosts(index, done) {
    setTimeout(() => {
        const newPosts = Array.from({ length: 3 }, (_, i) => ({
            id: postIndex + i + 1,
            author: `用户${Math.floor(Math.random() * 100) + 1}`,
            avatar: ['https://cdn.quasar.dev/img/avatar.png', 'https://cdn.quasar.dev/img/avatar2.jpg'][i % 2],
            content: `这是第 ${postIndex + i + 1} 条动态内容。分享一些有趣的事情...`,
            image: i % 2 === 0 ? 'https://cdn.quasar.dev/img/mountains.jpg' : null,
            time: `${Math.floor(Math.random() * 60)}分钟前`,
            likes: Math.floor(Math.random() * 100),
            comments: Math.floor(Math.random() * 50)
        }))
        posts.value.push(...newPosts)
        postIndex += 3
        done()
    }, 1000)
}

// 商品列表
const productList = ref([])
let productIndex = 0

function loadProducts(index, done) {
    setTimeout(() => {
        const newProducts = Array.from({ length: 12 }, (_, i) => ({
            id: productIndex + i + 1,
            name: `商品 ${productIndex + i + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            sales: Math.floor(Math.random() * 1000),
            hot: Math.random() > 0.7
        }))
        productList.value.push(...newProducts)
        productIndex += 12
        done()
    }, 600)
}

// 评论列表
const commentList = ref([])
let commentIndex = 0

function loadComments(index, done) {
    setTimeout(() => {
        const newComments = Array.from({ length: 5 }, (_, i) => ({
            id: commentIndex + i + 1,
            author: `用户${Math.floor(Math.random() * 100) + 1}`,
            avatar: ['https://cdn.quasar.dev/img/avatar.png', 'https://cdn.quasar.dev/img/avatar2.jpg', 'https://cdn.quasar.dev/img/avatar3.jpg'][i % 3],
            content: `这是第 ${commentIndex + i + 1} 条评论。产品质量很好，值得推荐！`,
            rating: Math.floor(Math.random() * 2) + 4,
            time: `${Math.floor(Math.random() * 30)}天前`,
            likes: Math.floor(Math.random() * 50)
        }))
        commentList.value.push(...newComments)
        commentIndex += 5
        done()
    }, 700)
}
</script>
