<template>
    <div class="q-gutter-md">
        <div class="text-h6">日期选择器</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="date1" label="选择日期" outlined>
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date1" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="关闭" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

            <q-input v-model="date2" label="带清除按钮" outlined clearable>
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="date2" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="确定" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>

        <q-separator />

        <div class="text-h6">时间选择器</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="time1" label="选择时间" outlined>
                <template v-slot:prepend>
                    <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="time1" mask="HH:mm">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="关闭" color="primary" flat />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

            <q-input v-model="time2" label="24小时格式" outlined>
                <template v-slot:prepend>
                    <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="time2" mask="HH:mm" format24h>
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="确定" color="primary" flat />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>

        <q-separator />

        <div class="text-h6">日期时间选择器</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="datetime1" label="日期和时间" outlined>
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="datetime1" mask="YYYY-MM-DD HH:mm">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="确定" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
                <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="datetime1" mask="YYYY-MM-DD HH:mm" format24h>
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="确定" color="primary" flat />
                                </div>
                            </q-time>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>

        <q-separator />

        <div class="text-h6">日期范围选择</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="dateRange" label="日期范围" outlined>
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="dateRange" range mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="确定" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>

        <q-separator />

        <div class="text-h6">多个日期选择</div>
        <div class="q-gutter-md" style="max-width: 500px">
            <q-input v-model="multipleDates" label="多个日期" outlined readonly
                :hint="`已选择 ${multipleDatesArray.length} 个日期`">
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="multipleDatesArray" multiple mask="YYYY-MM-DD">
                                <div class="row items-center justify-end q-gutter-sm">
                                    <q-btn label="清空" color="grey" flat @click="multipleDatesArray = []" />
                                    <q-btn v-close-popup label="确定" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>

        <q-separator />

        <div class="text-h6">实际应用示例</div>

        <!-- 预订表单 -->
        <div>
            <div class="text-subtitle2 q-mb-sm">酒店预订</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="text-h6 q-mb-md">选择入住时间</div>
                    <div class="q-gutter-md">
                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-sm-6">
                                <q-input v-model="booking.checkIn" label="入住日期 *" outlined>
                                    <template v-slot:prepend>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="booking.checkIn" mask="YYYY-MM-DD"
                                                    :options="checkInOptions">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="确定" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-sm-6">
                                <q-input v-model="booking.checkOut" label="退房日期 *" outlined>
                                    <template v-slot:prepend>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="booking.checkOut" mask="YYYY-MM-DD"
                                                    :options="checkOutOptions">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="确定" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>

                        <div class="text-caption text-grey-7" v-if="bookingDays > 0">
                            共 {{ bookingDays }} 晚
                        </div>

                        <q-select v-model="booking.guests" :options="[1, 2, 3, 4, 5, 6]" label="入住人数" outlined />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="取消" />
                    <q-btn color="primary" label="确认预订" @click="confirmBooking" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- 会议室预订 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">会议室预订</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="q-gutter-md">
                        <q-input v-model="meeting.date" label="会议日期" outlined>
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="meeting.date" mask="YYYY-MM-DD">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="确定" color="primary" flat />
                                            </div>
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <div class="row q-col-gutter-md">
                            <div class="col-6">
                                <q-input v-model="meeting.startTime" label="开始时间" outlined>
                                    <template v-slot:prepend>
                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="meeting.startTime" mask="HH:mm" format24h>
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="确定" color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-6">
                                <q-input v-model="meeting.endTime" label="结束时间" outlined>
                                    <template v-slot:prepend>
                                        <q-icon name="access_time" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-time v-model="meeting.endTime" mask="HH:mm" format24h>
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="确定" color="primary" flat />
                                                    </div>
                                                </q-time>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>

                        <q-input v-model="meeting.title" label="会议主题" outlined />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="取消" />
                    <q-btn color="primary" label="预订" @click="bookMeeting" />
                </q-card-actions>
            </q-card>
        </div>

        <!-- 生日选择 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">个人信息</div>
            <q-card style="max-width: 500px">
                <q-card-section>
                    <q-input v-model="profile.birthday" label="出生日期" outlined>
                        <template v-slot:prepend>
                            <q-icon name="cake" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="profile.birthday" mask="YYYY-MM-DD" default-year-month="2000/01"
                                        navigation-min-year-month="1950/01"
                                        :navigation-max-year-month="currentYearMonth">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="确定" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>

                    <div class="q-mt-md text-caption text-grey-7" v-if="profile.birthday">
                        年龄: {{ calculateAge(profile.birthday) }} 岁
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <!-- 任务截止日期 -->
        <div class="q-mt-md">
            <div class="text-subtitle2 q-mb-sm">任务管理</div>
            <q-card style="max-width: 600px">
                <q-card-section>
                    <div class="q-gutter-md">
                        <q-input v-model="task.title" label="任务标题" outlined />

                        <q-input v-model="task.dueDate" label="截止日期" outlined>
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="task.dueDate" mask="YYYY-MM-DD" today-btn>
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="确定" color="primary" flat />
                                            </div>
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                            <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-time v-model="task.dueDate" mask="YYYY-MM-DD HH:mm" format24h>
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="确定" color="primary" flat />
                                            </div>
                                        </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-select v-model="task.priority" :options="['低', '中', '高', '紧急']" label="优先级" outlined />

                        <div class="text-caption" :class="`text-${getTaskUrgency().color}`">
                            {{ getTaskUrgency().message }}
                        </div>
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="取消" />
                    <q-btn color="primary" label="创建任务" @click="createTask" />
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar, date as qdate } from 'quasar'

const $q = useQuasar()

const date1 = ref(qdate.formatDate(Date.now(), 'YYYY-MM-DD'))
const date2 = ref('')
const time1 = ref('09:00')
const time2 = ref('14:30')
const datetime1 = ref('')
const dateRange = ref({ from: '', to: '' })
const multipleDatesArray = ref([])

const multipleDates = computed(() => {
    if (multipleDatesArray.value.length === 0) return ''
    return multipleDatesArray.value.join(', ')
})

// 酒店预订
const booking = ref({
    checkIn: '',
    checkOut: '',
    guests: 2,
})

const today = qdate.formatDate(Date.now(), 'YYYY/MM/DD')

function checkInOptions(date) {
    return date >= today
}

function checkOutOptions(date) {
    if (!booking.value.checkIn) return date >= today
    return date > booking.value.checkIn.replace(/-/g, '/')
}

const bookingDays = computed(() => {
    if (!booking.value.checkIn || !booking.value.checkOut) return 0
    const start = new Date(booking.value.checkIn)
    const end = new Date(booking.value.checkOut)
    const diff = end - start
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

function confirmBooking() {
    $q.notify({
        message: `预订成功！入住${bookingDays.value}晚`,
        color: 'positive'
    })
}

// 会议预订
const meeting = ref({
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    title: ''
})

function bookMeeting() {
    $q.notify({
        message: '会议室预订成功！',
        color: 'positive'
    })
}

// 个人信息
const profile = ref({
    birthday: ''
})

const currentYearMonth = qdate.formatDate(Date.now(), 'YYYY/MM')

function calculateAge(birthday) {
    const birth = new Date(birthday)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
}

// 任务管理
const task = ref({
    title: '',
    dueDate: '',
    priority: '中'
})

function getTaskUrgency() {
    if (!task.value.dueDate) {
        return { message: '', color: 'grey' }
    }

    const due = new Date(task.value.dueDate)
    const now = new Date()
    const diff = due - now
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

    if (days < 0) {
        return { message: '任务已逾期！', color: 'negative' }
    } else if (days === 0) {
        return { message: '今天到期', color: 'warning' }
    } else if (days === 1) {
        return { message: '明天到期', color: 'warning' }
    } else if (days <= 3) {
        return { message: `还有 ${days} 天`, color: 'orange' }
    } else if (days <= 7) {
        return { message: `还有 ${days} 天`, color: 'info' }
    } else {
        return { message: `还有 ${days} 天`, color: 'positive' }
    }
}

function createTask() {
    $q.notify({
        message: '任务创建成功！',
        color: 'positive'
    })
}
</script>
