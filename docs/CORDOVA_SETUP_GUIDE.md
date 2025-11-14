# Cordova环境配置指南 (iOS优先)

本指南将帮助你在Quasar项目中配置Cordova环境并安装必要的插件，**重点针对iOS平台开发**。

## 前置要求

### 1. 开发环境 (iOS必需)

- **macOS系统** (iOS开发必需)
- **Xcode** (最新版本，从App Store安装)
- **Xcode Command Line Tools**: `xcode-select --install`
- Node.js (推荐 v18+)
- Quasar CLI (`npm install -g @quasar/cli`)
- iOS Simulator (随Xcode安装)

### 2. 移动端开发工具

```bash
# 安装Cordova CLI
npm install -g cordova

# 检查环境
cordova requirements
```

## 配置步骤

### 1. 添加Cordova模式

```bash
# 在项目根目录执行
cd e:\Code\Quasracode\test1\quasar-project-code
quasar mode add cordova
```

### 2. 安装Cordova插件

```bash
# 进入src-cordova目录
cd src-cordova

# 安装所有必需插件
cordova plugin add cordova-plugin-battery-status
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-device-motion
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-media
cordova plugin add cordova-plugin-media-capture
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-statusbar

# 验证插件安装
cordova plugin list
```

### 3. 添加平台 (iOS优先)

```bash
# 首先添加iOS平台
cordova platform add ios

# 可选：添加Android平台
cordova platform add android

# 检查平台状态
cordova platform list

# 验证iOS开发环境
cordova requirements ios
```

### 4. 配置权限

编辑 `src-cordova/config.xml` 文件，添加必要权限：

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.example.quasarapp" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Quasar App</name>
    <description>A sample Apache Cordova application</description>
    <author email="dev@cordova.apache.org" href="http://cordova.io">Apache Cordova Team</author>

    <content src="index.html" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />

    <!-- Android权限 -->
    <platform name="android">
        <allow-intent href="market:*" />

        <!-- 相机权限 -->
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

        <!-- 联系人权限 -->
        <uses-permission android:name="android.permission.READ_CONTACTS" />
        <uses-permission android:name="android.permission.WRITE_CONTACTS" />
        <uses-permission android:name="android.permission.GET_ACCOUNTS" />

        <!-- 位置权限 -->
        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-feature android:name="android.hardware.location" android:required="true" />
        <uses-feature android:name="android.hardware.location.gps" android:required="false" />
        <uses-feature android:name="android.hardware.location.network" android:required="false" />

        <!-- 录音权限 -->
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

        <!-- 振动权限 -->
        <uses-permission android:name="android.permission.VIBRATE" />

        <!-- 网络权限 -->
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    </platform>

    <!-- iOS权限 -->
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />

        <!-- 相机权限 -->
        <edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
            <string>This app needs access to camera to take photos</string>
        </edit-config>
        <edit-config target="NSPhotoLibraryUsageDescription" file="*-Info.plist" mode="merge">
            <string>This app needs access to photo library to select images</string>
        </edit-config>

        <!-- 位置权限 -->
        <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
            <string>This app needs access to location when open</string>
        </edit-config>
        <edit-config target="NSLocationAlwaysUsageDescription" file="*-Info.plist" mode="merge">
            <string>This app needs access to location always</string>
        </edit-config>

        <!-- 麦克风权限 -->
        <edit-config target="NSMicrophoneUsageDescription" file="*-Info.plist" mode="merge">
            <string>This app needs access to microphone to record audio</string>
        </edit-config>

        <!-- 联系人权限 -->
        <edit-config target="NSContactsUsageDescription" file="*-Info.plist" mode="merge">
            <string>This app needs access to contacts</string>
        </edit-config>
    </platform>
</widget>
```

## 开发和调试

### 1. Web端开发

```bash
# 普通Web开发模式
quasar dev

# 访问 http://localhost:9000/cordova 查看插件演示
```

### 2. iOS设备调试 (主要方式)

```bash
# iOS模拟器调试
quasar dev -m cordova -T ios

# iOS真机调试 (需要Apple开发者账号)
quasar dev -m cordova -T ios --device

# 可选：Android调试
quasar dev -m cordova -T android
```

### 3. 构建发布版本

```bash
# 构建iOS应用 (主要目标)
quasar build -m cordova -T ios

# iOS真机构建
quasar build -m cordova -T ios --device

# 可选：构建Android APK
quasar build -m cordova -T android
```

### 4. iOS特定调试技巧

```bash
# 在Xcode中打开项目进行高级调试
open src-cordova/platforms/ios/*.xcworkspace

# 查看iOS设备日志
xcrun simctl spawn booted log stream --predicate 'process == "YourApp"'

# 重置iOS模拟器
xcrun simctl erase all
```

## 常见问题解决

### 1. 插件安装失败

```bash
# 清理并重新安装
cd src-cordova
cordova platform remove android
cordova platform add android
cordova plugin remove [plugin-name]
cordova plugin add [plugin-name]
```

### 2. 权限被拒绝

- 确保在config.xml中正确配置了权限
- 在真实设备上测试时，手动检查应用权限设置
- 某些权限需要在运行时请求用户授权

### 3. 插件不工作

- 确保在deviceready事件后调用插件API
- 检查插件是否在当前平台支持
- 查看浏览器/设备控制台的错误信息

### 4. 构建错误

```bash
# 清理构建缓存
quasar clean

# 重新构建
quasar build -m cordova -T android
```

## 测试清单

### Web环境测试

- [ ] 页面正常加载
- [ ] 模拟数据显示正确
- [ ] 错误处理正常工作
- [ ] 响应式布局适配

### Android设备测试

- [ ] 应用正常安装启动
- [ ] 相机拍照和选择图片
- [ ] 地理位置获取
- [ ] 设备信息显示
- [ ] 振动功能
- [ ] 电池状态监控
- [ ] 网络状态检测

### iOS设备测试

- [ ] 应用正常安装启动
- [ ] 权限请求流程
- [ ] 各项功能正常工作
- [ ] 界面适配正确

## 部署注意事项

### 1. 应用商店发布

- 确保所有权限都有合理的使用说明
- 测试所有功能在不同设备上的兼容性
- 准备应用图标和启动画面

### 2. 性能优化

- 只加载必要的插件
- 优化图片和资源大小
- 使用懒加载减少初始加载时间

### 3. 安全考虑

- 不要在客户端存储敏感信息
- 使用HTTPS进行网络通信
- 验证用户输入数据

---

_配置完成后，你就可以开始测试各种Cordova插件功能了！_
