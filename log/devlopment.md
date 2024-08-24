# Assistant
Tags: project  
References:  
1. [Playlist: build a discord using discord.js](https://youtube.com/playlist?list=PLSCgthA1AnidGdmSea6V6N24O8mXESrf3&si=xwGpzJ1xp7SAwlsu)
2. [Discord.js Guide](https://discordjs.guide/#before-you-begin)
---
## Introduction
Record the process of writing a personal assistant which developed using discord.js.

## environment
[`node.js LTS`](https://nodejs.org/en)  
[`nvm: node.js version manager`](https://github.com/coreybutler/nvm-windows/releases)>`assets` > `nvm-setup.exe` { if dev with windows }
```
$ nvm ls
	* 20.17.0 (Currently using 64-bit executable)
$ node -v
20.17.0

# command of list available usage of node.js version
$ nvm ls available

# command of install new version
$ nvm install 19.3.0

# command of uninstall new version
$ nvm uninstall 19.3.0

# command of change version.
$ nvm use 19.3.0

# check current node.js version
$ node -v
```
[yarn: package manager](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- node.js 自帶`npm`，裝`yrarn`是因為較快。

# Basic bot
```
yarn add discord.js
yarn add dotenv
```
About `basic bot code` refer to [commit: `🎉 env initialization and basic bot`](https://github.com/kiol1812/Assistant/commit/c7bc285b455057269e9b2a6590b0172246c086ca)  
About `token` or `discord application` refer to [build basic discord bot](https://youtu.be/-oBSz4MZC6Q?si=IbbbM3TPUqgt0J-s).




