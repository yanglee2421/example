# Expo App

## Installation

[Android Studio Command Line Tools](https://developer.android.google.cn/studio?hl=zh-cn)

```bash
# Install chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install JDK
choco install -y microsoft-openjdk17

# Add Env ANDROID_HOME %USERPROFILE%\android_sdk
# Add Path %ANDROID_HOME%\cmdline-tools\latest\bin
# Install Android SDK
sdkmanager "platform-tools" "build-tools;34.0.0"

# Install Emulator
sdkmanager "emulator" "platforms;android-34" "system-images;android-34;google_apis;x86_64"
avdmanager create avd -n emulatorName -k "system-images;android-34;google_apis;x86_64" -d "pixel"
# emulator -avd emulatorName -gpu host
```

## Build

[Expo Documation](https://docs.expo.dev/guides/local-app-production/)

```bash
# Generate database migrate sql files
drizzle-kit generate
# Generate native dir by Expo prebuild
expo prebuild
cd ./android

# For .aab
./gradlew app:bundleRelease
# For .apk
./gradlew app:assembleRelease
# Or build with expo
expo run:android --variant release
```

## Sign

```bash
# Prepare keystore
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

```properties
# android/gradle.properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=123456
MYAPP_UPLOAD_KEY_PASSWORD=123456
```

```properties
# android/app/build.gradle
release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }

signingConfig signingConfigs.release
```
