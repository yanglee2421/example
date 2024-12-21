# Expo App

## Set Building Environment

[Expo Documation](https://docs.expo.dev/guides/local-app-production/)

```powershell
# Install chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install JDK
choco install -y microsoft-openjdk17

# Install Android SDK
sdkmanager "platform-tools" "build-tools;34.0.0"

# Expo build
expo prebuild
cd ./android

# Prepare keystore
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# For .aab
./gradlew app:bundleRelease
# For .apk
./gradlew app:assembleRelease

# Install Emulator
sdkmanager "emulator" "platforms;android-34" "system-images;android-34;google_apis;x86_64"
avdmanager create avd -n emulatorName -k "system-images;android-34;google_apis;x86_64" -d "pixel"
emulator -avd emulatorName -gpu host
```

## Note

```properties
# android/gradle.properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=123456
MYAPP_UPLOAD_KEY_PASSWORD=123456

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

## Set Development Environment

1. Install WSL

```powershell
# Install Ubuntu
wsl --install
# Unistall Ubuntu
wsl --list
wsl --uninstall Ubuntu
```

2. Ubuntu Bash

```bash
# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install nodejs
pnpm env use -g lts
```
