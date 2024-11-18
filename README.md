# Expo App

## Installation

1. Windows Powershell

```powershell
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" "cmdline-tools;latest"
```

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
# Install Dependencies
sudo apt update
sudo apt install unzip wget openjdk-17-jdk
# Install Android Commandlinetools
wget https://dl.google.com/android/repository/commandlinetools-linux-xxxx_latest.zip -O commandlinetools.zip
```
