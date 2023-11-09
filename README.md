# React Native

## 平台差异

1. Text 组件在 IOS 上不支持 borderRadius（包裹一层 View）
2. Android 不支持 shadow

## cli

```bash
# Install dependencies
yarn expo install axios

# EAS
yarn eas login
yarn eas whoami

# EAS build
yarn eas build:configure
yarn eas build -p android
yarn eas build -p ios --profile preview
```
