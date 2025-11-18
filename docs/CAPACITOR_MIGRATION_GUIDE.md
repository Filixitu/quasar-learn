# Capacitor 迁移指南

从 Cordova 迁移到 Capacitor 的完整操作指南

## 目录

1. [概述](#概述)
2. [准备工作](#准备工作)
3. [安装 Capacitor](#安装-capacitor)
4. [项目配置](#项目配置)
5. [插件迁移](#插件迁移)
6. [权限配置](#权限配置)
7. [构建和发布](#构建和发布)
8. [常见问题](#常见问题)

## 概述

### 为什么选择 Capacitor？

- **现代化架构**：基于现代 Web 标准构建
- **更好的性能**：原生性能优化
- **TypeScript 支持**：完整的 TypeScript 类型定义
- **活跃维护**：Ionic 团队积极维护
- **插件生态**：丰富的官方和社区插件

### 迁移优势

- 更快的构建速度
- 更好的调试体验
- 原生 iOS/Android 项目完全可控
- 更简单的配置管理

## 准备工作

### 1. 备份当前项目

```bash
# 创建项目备份
git add .
git commit -m "备份：迁移到 Capacitor 前的状态"
git tag cordova-backup
```

### 2. 环境要求

- Node.js 18+ 
- npm 或 yarn
- Android Studio (Android 开发)
- Xcode (iOS 开发)

## 安装 Capacitor

### 1. 安装 Capacitor CLI 和核心包

```bash
npm install @capacitor/core @capacitor/cli
```

### 2. 初始化 Capacitor

```bash
npx cap init
```

按提示输入：
- **App name**: `Quasar App`
- **App ID**: `io.filixitu.quasarlearn`
- **Web assets directory**: `dist/spa`

### 3. 添加平台

```bash
# 添加 Android 平台
npx cap add android

# 添加 iOS 平台（如需要）
npx cap add ios
```

## 项目配置

### 1. 更新 package.json

在 `package.json` 中添加 Capacitor 相关脚本：

```json
{
  "scripts": {
    "cap:sync": "npx cap sync",
    "cap:open:android": "npx cap open android",
    "cap:open:ios": "npx cap open ios",
    "cap:run:android": "npx cap run android",
    "cap:run:ios": "npx cap run ios",
    "build:capacitor": "quasar build && npx cap sync",
    "dev:capacitor:android": "quasar build && npx cap sync && npx cap run android",
    "dev:capacitor:ios": "quasar build && npx cap sync && npx cap run ios"
  }
}
```

### 2. 更新 quasar.config.js

修改构建配置以支持 Capacitor：

```javascript
// quasar.config.js
export default defineConfig((ctx) => {
  return {
    // 移除 cordova boot 文件，添加 capacitor
    boot: ['i18n', 'axios', 'capacitor'],
    
    build: {
      // Capacitor 使用 hash 模式
      vueRouterMode: 'hash',
      // 确保正确的 publicPath
      publicPath: ctx.mode.capacitor ? './' : '/',
    },
    
    // Capacitor 配置
    capacitor: {
      hideSplashscreen: true,
    },
  }
})
```

### 3. 创建 capacitor.config.ts

在项目根目录创建 `capacitor.config.ts`：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.filixitu.quasarlearn',
  appName: 'Quasar App',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#1976d2",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;
```

## 插件迁移

### 当前 Cordova 插件对应的 Capacitor 插件

| Cordova 插件 | Capacitor 插件 | 安装命令 |
|-------------|---------------|----------|
| cordova-plugin-camera | @capacitor/camera | `npm install @capacitor/camera` |
| cordova-plugin-device | @capacitor/device | `npm install @capacitor/device` |
| cordova-plugin-geolocation | @capacitor/geolocation | `npm install @capacitor/geolocation` |
| cordova-plugin-network-information | @capacitor/network | `npm install @capacitor/network` |
| cordova-plugin-vibration | @capacitor/haptics | `npm install @capacitor/haptics` |
| cordova-plugin-statusbar | @capacitor/status-bar | `npm install @capacitor/status-bar` |
| cordova-plugin-splashscreen | @capacitor/splash-screen | `npm install @capacitor/splash-screen` |
| cordova-plugin-contacts | @capacitor-community/contacts | `npm install @capacitor-community/contacts` |
| cordova-plugin-media | @capacitor-community/media | `npm install @capacitor-community/media` |
| cordova-plugin-file | @capacitor/filesystem | `npm install @capacitor/filesystem` |

### 安装所需插件

```bash
# 核心插件
npm install @capacitor/camera @capacitor/device @capacitor/geolocation @capacitor/network @capacitor/haptics @capacitor/status-bar @capacitor/splash-screen @capacitor/filesystem

# 社区插件
npm install @capacitor-community/contacts @capacitor-community/media
```

### 创建 Capacitor Boot 文件

创建 `src/boot/capacitor.js`：

```javascript
import { boot } from 'quasar/wrappers'
import { Capacitor } from '@capacitor/core'

export default boot(async ({ app }) => {
  if (Capacitor.isNativePlatform()) {
    // 原生平台初始化逻辑
    console.log('Running on native platform:', Capacitor.getPlatform())
    
    // 状态栏配置
    const { StatusBar, Style } = await import('@capacitor/status-bar')
    await StatusBar.setStyle({ style: Style.Default })
    
    // 启动屏配置
    const { SplashScreen } = await import('@capacitor/splash-screen')
    await SplashScreen.hide()
  }
})
```

### 更新插件管理器

创建新的 `src/utils/CapacitorPluginManager.js`：

```javascript
import { Capacitor } from '@capacitor/core'

class CapacitorPluginManager {
  constructor() {
    this.isNative = Capacitor.isNativePlatform()
    this.platform = Capacitor.getPlatform()
  }

  // 相机功能
  async takePicture(options = {}) {
    if (!this.isNative) {
      throw new Error('Camera not available on web platform')
    }
    
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')
    
    const defaultOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    }
    
    return await Camera.getPhoto({ ...defaultOptions, ...options })
  }

  // 从相册选择图片
  async selectFromGallery(options = {}) {
    if (!this.isNative) {
      throw new Error('Gallery not available on web platform')
    }
    
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera')
    
    const defaultOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    }
    
    return await Camera.getPhoto({ ...defaultOptions, ...options })
  }

  // 获取设备信息
  async getDeviceInfo() {
    const { Device } = await import('@capacitor/device')
    return await Device.getInfo()
  }

  // 获取地理位置
  async getCurrentPosition(options = {}) {
    const { Geolocation } = await import('@capacitor/geolocation')
    
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
    }
    
    return await Geolocation.getCurrentPosition({ ...defaultOptions, ...options })
  }

  // 网络状态
  async getNetworkStatus() {
    const { Network } = await import('@capacitor/network')
    return await Network.getStatus()
  }

  // 振动
  async vibrate(options = {}) {
    if (!this.isNative) return
    
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics')
    
    const defaultOptions = {
      style: ImpactStyle.Medium,
    }
    
    return await Haptics.impact({ ...defaultOptions, ...options })
  }

  // 联系人
  async getContacts() {
    if (!this.isNative) {
      throw new Error('Contacts not available on web platform')
    }
    
    const { Contacts } = await import('@capacitor-community/contacts')
    return await Contacts.getContacts()
  }
}

export default new CapacitorPluginManager()
```

## 权限配置

### Android 权限 (android/app/src/main/AndroidManifest.xml)

Capacitor 会自动生成基本权限，但可能需要手动添加特殊权限：

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.WRITE_CONTACTS" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS 权限 (ios/App/App/Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to take photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to photo library to select images</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to location when open</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>This app needs access to location always</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to microphone to record audio</string>
<key>NSContactsUsageDescription</key>
<string>This app needs access to contacts</string>
```

## 构建和发布

### 开发模式

```bash
# 构建并同步到原生项目
npm run build:capacitor

# 在 Android Studio 中打开项目
npx cap open android

# 在 Xcode 中打开项目
npx cap open ios

# 直接运行到设备
npx cap run android
npx cap run ios
```

### 生产构建

```bash
# 1. 构建 Web 应用
quasar build

# 2. 同步到原生项目
npx cap sync

# 3. 在原生 IDE 中构建发布版本
npx cap open android  # 然后在 Android Studio 中构建 APK/AAB
npx cap open ios      # 然后在 Xcode 中构建 IPA
```

### Android 发布配置

在 `android/app/build.gradle` 中配置签名：

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('path/to/your/keystore.jks')
            storePassword 'your-store-password'
            keyAlias 'your-key-alias'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 自动化构建脚本

创建 `scripts/build-capacitor.js`：

```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function buildCapacitor(platform = 'android') {
  console.log(`开始构建 Capacitor ${platform} 应用...`);
  
  try {
    // 1. 清理旧构建
    console.log('清理旧构建文件...');
    if (fs.existsSync('dist')) {
      execSync('rm -rf dist', { stdio: 'inherit' });
    }
    
    // 2. 构建 Web 应用
    console.log('构建 Web 应用...');
    execSync('quasar build', { stdio: 'inherit' });
    
    // 3. 同步到原生项目
    console.log('同步到原生项目...');
    execSync('npx cap sync', { stdio: 'inherit' });
    
    // 4. 打开原生 IDE
    console.log(`打开 ${platform} 项目...`);
    execSync(`npx cap open ${platform}`, { stdio: 'inherit' });
    
    console.log('构建完成！请在原生 IDE 中进行最终构建和发布。');
    
  } catch (error) {
    console.error('构建失败:', error.message);
    process.exit(1);
  }
}

// 从命令行参数获取平台
const platform = process.argv[2] || 'android';
buildCapacitor(platform);
```

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "build:android": "node scripts/build-capacitor.js android",
    "build:ios": "node scripts/build-capacitor.js ios"
  }
}
```

## 常见问题

### 1. 插件不工作

**问题**: Capacitor 插件在 Web 环境下不工作  
**解决**: 使用 `Capacitor.isNativePlatform()` 检查环境

```javascript
import { Capacitor } from '@capacitor/core'

if (Capacitor.isNativePlatform()) {
  // 只在原生平台执行
  const { Camera } = await import('@capacitor/camera')
  // ...
}
```

### 2. 权限被拒绝

**问题**: Android/iOS 权限被拒绝  
**解决**: 确保在 AndroidManifest.xml 和 Info.plist 中正确配置权限

### 3. 构建失败

**问题**: 原生项目构建失败  
**解决**: 
- 确保 Android Studio 和 Xcode 版本兼容
- 检查 Gradle 和 CocoaPods 配置
- 清理项目缓存：`npx cap clean`

### 4. 热重载不工作

**问题**: 开发时热重载不工作  
**解决**: 使用 Capacitor Live Reload

```bash
# 启动开发服务器
quasar dev

# 在另一个终端配置 Live Reload
npx cap run android --livereload --external
```

### 5. 文件路径问题

**问题**: 资源文件路径错误  
**解决**: 确保 `capacitor.config.ts` 中 `webDir` 配置正确

## 迁移检查清单

- [ ] 安装 Capacitor CLI 和核心包
- [ ] 初始化 Capacitor 配置
- [ ] 添加目标平台 (Android/iOS)
- [ ] 更新 package.json 脚本
- [ ] 修改 quasar.config.js 配置
- [ ] 创建 capacitor.config.ts
- [ ] 安装所需插件
- [ ] 创建 Capacitor boot 文件
- [ ] 更新插件管理器
- [ ] 配置原生权限
- [ ] 测试所有功能
- [ ] 构建发布版本
- [ ] 删除旧的 Cordova 文件

## 清理 Cordova 文件

迁移完成并测试通过后，可以清理 Cordova 相关文件：

```bash
# 删除 Cordova 目录和文件
rm -rf src-cordova/
rm -f src/boot/cordova.js

# 从 package.json 中移除 Cordova 脚本
# 手动编辑 package.json，删除所有 cordova 相关的脚本
```

## 总结

Capacitor 提供了更现代、更灵活的混合应用开发体验。通过本指南，您可以顺利地从 Cordova 迁移到 Capacitor，享受更好的开发体验和性能。

如有问题，请参考：
- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [Quasar Capacitor 指南](https://quasar.dev/quasar-cli-webpack/developing-capacitor-apps/introduction)
