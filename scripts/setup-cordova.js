#!/usr/bin/env node

/**
 * Cordova自动配置脚本
 * 自动添加Cordova模式并安装所需插件
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 插件列表
const PLUGINS = [
  'cordova-plugin-battery-status',
  'cordova-plugin-camera',
  'cordova-plugin-contacts', 
  'cordova-plugin-device',
  'cordova-plugin-device-motion',
  'cordova-plugin-geolocation',
  'cordova-plugin-media',
  'cordova-plugin-media-capture',
  'cordova-plugin-network-information',
  'cordova-plugin-splashscreen',
  'cordova-plugin-vibration',
  'cordova-plugin-statusbar'
]

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function execCommand(command, options = {}) {
  try {
    log(`执行命令: ${command}`, 'cyan')
    const result = execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      ...options 
    })
    return result
  } catch (error) {
    log(`命令执行失败: ${error.message}`, 'red')
    throw error
  }
}

function checkPrerequisites() {
  log('检查前置条件 (iOS开发)...', 'yellow')
  
  // 检查操作系统
  if (process.platform !== 'darwin') {
    log('⚠️  警告: iOS开发需要macOS系统', 'yellow')
    log('   当前系统: ' + process.platform, 'yellow')
    log('   将跳过iOS平台配置', 'yellow')
  } else {
    log('✓ macOS系统检测通过', 'green')
    
    // 检查Xcode
    try {
      execCommand('xcode-select -p', { stdio: 'pipe' })
      log('✓ Xcode Command Line Tools 已安装', 'green')
    } catch (error) {
      log('✗ Xcode Command Line Tools 未安装', 'red')
      log('   请运行: xcode-select --install', 'red')
      process.exit(1)
    }
  }
  
  try {
    execCommand('quasar --version', { stdio: 'pipe' })
    log('✓ Quasar CLI 已安装', 'green')
  } catch (error) {
    log('✗ Quasar CLI 未安装，请先安装: npm install -g @quasar/cli', 'red')
    process.exit(1)
  }
  
  try {
    execCommand('cordova --version', { stdio: 'pipe' })
    log('✓ Cordova CLI 已安装', 'green')
  } catch (error) {
    log('✗ Cordova CLI 未安装，请先安装: npm install -g cordova', 'red')
    process.exit(1)
  }
}

function addCordovaMode() {
  log('添加Cordova模式...', 'yellow')
  
  const srcCordovaPath = path.join(process.cwd(), 'src-cordova')
  
  if (fs.existsSync(srcCordovaPath)) {
    log('✓ Cordova模式已存在', 'green')
    return
  }
  
  try {
    execCommand('quasar mode add cordova')
    log('✓ Cordova模式添加成功', 'green')
  } catch (error) {
    log('✗ 添加Cordova模式失败', 'red')
    throw error
  }
}

function installPlugins() {
  log('安装Cordova插件...', 'yellow')
  
  const srcCordovaPath = path.join(process.cwd(), 'src-cordova')
  
  if (!fs.existsSync(srcCordovaPath)) {
    log('✗ src-cordova目录不存在，请先添加Cordova模式', 'red')
    return
  }
  
  process.chdir(srcCordovaPath)
  
  for (const plugin of PLUGINS) {
    try {
      log(`安装插件: ${plugin}`, 'cyan')
      execCommand(`cordova plugin add ${plugin}`)
      log(`✓ ${plugin} 安装成功`, 'green')
    } catch (error) {
      log(`✗ ${plugin} 安装失败`, 'red')
      // 继续安装其他插件
    }
  }
  
  // 返回原目录
  process.chdir('..')
}

function addPlatforms() {
  log('添加平台 (iOS优先)...', 'yellow')
  
  const srcCordovaPath = path.join(process.cwd(), 'src-cordova')
  process.chdir(srcCordovaPath)
  
  // 优先添加iOS平台
  if (process.platform === 'darwin') {
    try {
      log('添加iOS平台...', 'cyan')
      execCommand('cordova platform add ios')
      log('✓ iOS平台添加成功', 'green')
      
      // 验证iOS环境
      try {
        log('验证iOS开发环境...', 'cyan')
        execCommand('cordova requirements ios')
        log('✓ iOS开发环境验证通过', 'green')
      } catch (error) {
        log('⚠️  iOS环境验证失败，请检查Xcode配置', 'yellow')
      }
    } catch (error) {
      log('✗ iOS平台添加失败，可能已存在或Xcode未安装', 'yellow')
    }
  } else {
    log('⚠️  跳过iOS平台 (需要macOS系统)', 'yellow')
  }
  
  // 可选添加Android平台
  try {
    log('添加Android平台...', 'cyan')
    execCommand('cordova platform add android')
    log('✓ Android平台添加成功', 'green')
  } catch (error) {
    log('✗ Android平台添加失败，可能已存在或环境未配置', 'yellow')
  }
  
  // 返回原目录
  process.chdir('..')
}

function createConfigXml() {
  log('创建config.xml配置...', 'yellow')
  
  const configPath = path.join(process.cwd(), 'src-cordova', 'config.xml')
  
  if (!fs.existsSync(configPath)) {
    log('✗ config.xml文件不存在', 'red')
    return
  }
  
  // 读取现有配置
  let configContent = fs.readFileSync(configPath, 'utf8')
  
  // 检查是否已经包含权限配置
  if (configContent.includes('android.permission.CAMERA')) {
    log('✓ 权限配置已存在', 'green')
    return
  }
  
  // 添加权限配置 (iOS优先)
  const iosPermissions = `
    <!-- iOS权限配置 -->
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
        
        <!-- 相机权限 -->
        <edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问相机以拍摄照片</string>
        </edit-config>
        <edit-config target="NSPhotoLibraryUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问相册以选择图片</string>
        </edit-config>
        <edit-config target="NSPhotoLibraryAddUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问相册以保存图片</string>
        </edit-config>
        
        <!-- 位置权限 -->
        <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问位置信息以提供定位服务</string>
        </edit-config>
        <edit-config target="NSLocationAlwaysAndWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问位置信息以提供定位服务</string>
        </edit-config>
        
        <!-- 麦克风权限 -->
        <edit-config target="NSMicrophoneUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问麦克风以录制音频</string>
        </edit-config>
        
        <!-- 联系人权限 -->
        <edit-config target="NSContactsUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问联系人以提供相关功能</string>
        </edit-config>
        
        <!-- 运动权限 -->
        <edit-config target="NSMotionUsageDescription" file="*-Info.plist" mode="merge">
            <string>此应用需要访问运动传感器以检测设备运动</string>
        </edit-config>
    </platform>
    
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
        
        <!-- 录音权限 -->
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
        
        <!-- 振动权限 -->
        <uses-permission android:name="android.permission.VIBRATE" />
        
        <!-- 网络权限 -->
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    </platform>`
  
  // 在</widget>标签前插入权限配置
  configContent = configContent.replace('</widget>', `${iosPermissions}\n</widget>`)
  
  // 写回文件
  fs.writeFileSync(configPath, configContent, 'utf8')
  log('✓ 权限配置已添加到config.xml', 'green')
}

function showStatus() {
  log('显示当前状态...', 'yellow')
  
  const srcCordovaPath = path.join(process.cwd(), 'src-cordova')
  
  if (!fs.existsSync(srcCordovaPath)) {
    log('✗ Cordova模式未配置', 'red')
    return
  }
  
  process.chdir(srcCordovaPath)
  
  try {
    log('已安装的插件:', 'cyan')
    execCommand('cordova plugin list')
    
    log('已添加的平台:', 'cyan')
    execCommand('cordova platform list')
    
    log('环境检查:', 'cyan')
    execCommand('cordova requirements')
  } catch (error) {
    log('状态检查失败', 'yellow')
  }
  
  // 返回原目录
  process.chdir('..')
}

function main() {
  log('='.repeat(50), 'magenta')
  log('Cordova自动配置脚本', 'bright')
  log('='.repeat(50), 'magenta')
  
  try {
    checkPrerequisites()
    addCordovaMode()
    installPlugins()
    addPlatforms()
    createConfigXml()
    showStatus()
    
    log('='.repeat(50), 'magenta')
    log('✓ Cordova配置完成！', 'green')
    log('='.repeat(50), 'magenta')
    
    log('下一步操作:', 'yellow')
    log('1. 运行 "quasar dev" 在Web环境中测试', 'cyan')
    log('2. 运行 "quasar dev -m cordova -T android" 在Android设备上调试', 'cyan')
    log('3. 访问 http://localhost:9000/cordova 查看插件演示', 'cyan')
    
  } catch (error) {
    log('配置过程中出现错误，请检查上述输出信息', 'red')
    process.exit(1)
  }
}

// 运行主函数
main()
