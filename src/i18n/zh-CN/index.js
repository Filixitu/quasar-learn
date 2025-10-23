// 中文语言包
export default {
  // 通用消息
  failed: '操作失败',
  success: '操作成功',
  loading: '加载中...',
  confirm: '确认',
  cancel: '取消',

  // 导航菜单
  nav: {
    home: '首页',
    components: '组件',
    about: '关于',
  },

  // 页面标题
  pages: {
    home: {
      title: 'Quasar 组件学习库',
      subtitle: '一个完整的 Quasar Framework 组件学习平台',
      description: '包含 {count}+ 个组件演示，涵盖实际开发的各种场景',
      startLearning: '开始学习',
      features: {
        title: '✨ 特色功能',
        components: '组件演示',
        categories: '组件分类',
        scenarios: '实用场景',
        search: '搜索组件',
        responsive: '响应式设计',
        typescript: 'TypeScript 支持',
        pinia: 'Pinia 状态管理',
      },
    },
    components: {
      title: '组件演示',
      search: '搜索组件...',
      noResults: '未找到匹配的组件',
      categories: {
        all: '全部',
        basic: '基础组件',
        form: '表单组件',
        navigation: '导航组件',
        layout: '布局组件',
        feedback: '反馈组件',
        data: '数据展示',
      },
    },
  },

  // 表单
  form: {
    name: '姓名',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    submit: '提交',
    reset: '重置',
    required: '此字段为必填项',
    emailInvalid: '请输入有效的邮箱地址',
    passwordMismatch: '两次密码输入不匹配',
  },

  // 时间相关
  time: {
    now: '刚刚',
    minutesAgo: '{n} 分钟前',
    hoursAgo: '{n} 小时前',
    daysAgo: '{n} 天前',
    today: '今天',
    yesterday: '昨天',
    tomorrow: '明天',
  },

  // 购物车相关
  cart: {
    title: '购物车',
    empty: '购物车为空',
    addToCart: '加入购物车',
    removeFromCart: '移出购物车',
    quantity: '数量',
    total: '总计: ¥{amount}',
    checkout: '结算',
    item: '商品 | 商品', // 复数形式
  },

  // 用户相关
  user: {
    profile: '个人资料',
    settings: '设置',
    logout: '退出登录',
    welcome: '欢迎回来，{name}！',
    loginRequired: '请先登录',
    theme: {
      title: '主题设置',
      light: '浅色主题',
      dark: '深色主题',
      auto: '跟随系统',
    },
  },
}
