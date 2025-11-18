#!/usr/bin/env node

/**
 * Capacitor 自动化设置脚本
 * 帮助快速从 Cordova 迁移到 Capacitor
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始 Capacitor 迁移设置...\n');

// 检查是否已安装必要的依赖
function checkPrerequisites() {
  console.log('📋 检查前置条件...');
  
  try {
    execSync('node --version', { stdio: 'pipe' });
    console.log('✅ Node.js 已安装');
  } catch (error) {
    console.error('❌ Node.js 未安装，请先安装 Node.js');
    process.exit(1);
  }
  
  try {
    execSync('npm --version', { stdio: 'pipe' });
    console.log('✅ npm 已安装');
  } catch (error) {
    console.error('❌ npm 未安装');
    process.exit(1);
  }
}

// 安装 Capacitor 依赖
function installCapacitorDependencies() {
  console.log('\n📦 安装 Capacitor 依赖...');
  
  const dependencies = [
    '@capacitor/core',
    '@capacitor/cli',
    '@capacitor/camera',
    '@capacitor/device',
    '@capacitor/geolocation',
    '@capacitor/network',
    '@capacitor/haptics',
    '@capacitor/status-bar',
    '@capacitor/splash-screen',
    '@capacitor/filesystem',
    '@capacitor-community/contacts',
    '@capacitor-community/media'
  ];
  
  try {
    console.log('正在安装 Capacitor 包...');
    execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Capacitor 依赖安装完成');
  } catch (error) {
    console.error('❌ 依赖安装失败:', error.message);
    process.exit(1);
  }
}

// 创建 Capacitor 配置文件
function createCapacitorConfig() {
  console.log('\n⚙️ 创建 Capacitor 配置文件...');
  
  const configContent = `import { CapacitorConfig } from '@capacitor/cli';

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
`;
  
  fs.writeFileSync('capacitor.config.ts', configContent);
  console.log('✅ capacitor.config.ts 已创建');
}

// 创建 Capacitor boot 文件
function createCapacitorBootFile() {
  console.log('\n🔧 创建 Capacitor boot 文件...');
  
  const bootContent = `import { boot } from 'quasar/wrappers'
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
`;
  
  const bootDir = 'src/boot';
  if (!fs.existsSync(bootDir)) {
    fs.mkdirSync(bootDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(bootDir, 'capacitor.js'), bootContent);
  console.log('✅ src/boot/capacitor.js 已创建');
}

// 创建 Capacitor 插件管理器
function createPluginManager() {
  console.log('\n🔌 创建 Capacitor 插件管理器...');
  
  const managerContent = `import { Capacitor } from '@capacitor/core'

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
`;
  
  const utilsDir = 'src/utils';
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(utilsDir, 'CapacitorPluginManager.js'), managerContent);
  console.log('✅ src/utils/CapacitorPluginManager.js 已创建');
}

// 更新 package.json 脚本
function updatePackageJsonScripts() {
  console.log('\n📝 更新 package.json 脚本...');
  
  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // 添加 Capacitor 脚本
  const capacitorScripts = {
    "cap:sync": "npx cap sync",
    "cap:open:android": "npx cap open android",
    "cap:open:ios": "npx cap open ios",
    "cap:run:android": "npx cap run android",
    "cap:run:ios": "npx cap run ios",
    "build:capacitor": "quasar build && npx cap sync",
    "dev:capacitor:android": "quasar build && npx cap sync && npx cap run android",
    "dev:capacitor:ios": "quasar build && npx cap sync && npx cap run ios",
    "build:android": "node scripts/build-capacitor.js android",
    "build:ios": "node scripts/build-capacitor.js ios"
  };
  
  packageJson.scripts = { ...packageJson.scripts, ...capacitorScripts };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json 脚本已更新');
}

// 创建构建脚本
function createBuildScript() {
  console.log('\n🏗️ 创建构建脚本...');
  
  const buildScriptContent = `const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function buildCapacitor(platform = 'android') {
  console.log(\`开始构建 Capacitor \${platform} 应用...\`);
  
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
    console.log(\`打开 \${platform} 项目...\`);
    execSync(\`npx cap open \${platform}\`, { stdio: 'inherit' });
    
    console.log('构建完成！请在原生 IDE 中进行最终构建和发布。');
    
  } catch (error) {
    console.error('构建失败:', error.message);
    process.exit(1);
  }
}

// 从命令行参数获取平台
const platform = process.argv[2] || 'android';
buildCapacitor(platform);
`;
  
  fs.writeFileSync('scripts/build-capacitor.js', buildScriptContent);
  console.log('✅ scripts/build-capacitor.js 已创建');
}

// 初始化 Capacitor
function initializeCapacitor() {
  console.log('\n🎯 初始化 Capacitor...');
  
  try {
    // 检查是否已经初始化
    if (fs.existsSync('capacitor.config.ts') || fs.existsSync('capacitor.config.js')) {
      console.log('⚠️ Capacitor 已经初始化，跳过初始化步骤');
      return;
    }
    
    console.log('正在初始化 Capacitor...');
    execSync('npx cap init "Quasar App" "io.filixitu.quasarlearn" --web-dir="dist/spa"', { stdio: 'inherit' });
    console.log('✅ Capacitor 初始化完成');
  } catch (error) {
    console.error('❌ Capacitor 初始化失败:', error.message);
    // 不退出，继续执行其他步骤
  }
}

// 添加平台
function addPlatforms() {
  console.log('\n📱 添加平台...');
  
  try {
    // 添加 Android 平台
    if (!fs.existsSync('android')) {
      console.log('添加 Android 平台...');
      execSync('npx cap add android', { stdio: 'inherit' });
      console.log('✅ Android 平台已添加');
    } else {
      console.log('⚠️ Android 平台已存在');
    }
    
    // 询问是否添加 iOS 平台
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('是否添加 iOS 平台？(y/N): ', (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        if (!fs.existsSync('ios')) {
          try {
            console.log('添加 iOS 平台...');
            execSync('npx cap add ios', { stdio: 'inherit' });
            console.log('✅ iOS 平台已添加');
          } catch (error) {
            console.error('❌ iOS 平台添加失败:', error.message);
          }
        } else {
          console.log('⚠️ iOS 平台已存在');
        }
      }
      rl.close();
      showCompletionMessage();
    });
  } catch (error) {
    console.error('❌ 平台添加失败:', error.message);
    showCompletionMessage();
  }
}

// 显示完成消息
function showCompletionMessage() {
  console.log('\n🎉 Capacitor 设置完成！\n');
  
  console.log('📋 接下来的步骤：');
  console.log('1. 更新 quasar.config.js 中的 boot 配置：');
  console.log('   boot: [\'i18n\', \'axios\', \'capacitor\']');
  console.log('');
  console.log('2. 构建并同步项目：');
  console.log('   npm run build:capacitor');
  console.log('');
  console.log('3. 在原生 IDE 中打开项目：');
  console.log('   npm run cap:open:android  # 打开 Android Studio');
  console.log('   npm run cap:open:ios      # 打开 Xcode');
  console.log('');
  console.log('4. 查看完整迁移指南：');
  console.log('   docs/CAPACITOR_MIGRATION_GUIDE.md');
  console.log('');
  console.log('🚀 开始您的 Capacitor 之旅吧！');
}

// 主函数
function main() {
  try {
    checkPrerequisites();
    installCapacitorDependencies();
    createCapacitorConfig();
    createCapacitorBootFile();
    createPluginManager();
    updatePackageJsonScripts();
    createBuildScript();
    initializeCapacitor();
    addPlatforms();
  } catch (error) {
    console.error('❌ 设置过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  main,
  checkPrerequisites,
  installCapacitorDependencies,
  createCapacitorConfig,
  createCapacitorBootFile,
  createPluginManager,
  updatePackageJsonScripts,
  createBuildScript,
  initializeCapacitor,
  addPlatforms
};
