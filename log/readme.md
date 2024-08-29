# Devlopment log
> [!NOTE]  
> Document the development process.
> 
> Project Name: Assistant  
> Tags: project  
> References:
> 1. [Playlist: build a discord using discord.js](https://youtube.com/playlist?list=PLSCgthA1AnidGdmSea6V6N24O8mXESrf3&si=xwGpzJ1xp7SAwlsu)
> 2. [Discord.js Guide](https://discordjs.guide/#before-you-begin)

## Introduction
Record the process of writing a personal assistant which developed using discord.js.

## Environment
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
- node.js included`npm`, but `yarn` is faster.

## Basic bot
```
yarn add discord.js
yarn add dotenv
```
About `basic bot code` refer to [commit: `🎉 env initialization and basic bot`](https://github.com/kiol1812/Assistant/commit/c7bc285b455057269e9b2a6590b0172246c086ca)  
About `token` or `discord application` refer to [build basic discord bot](https://youtu.be/-oBSz4MZC6Q?si=IbbbM3TPUqgt0J-s).

## Slash Commands
refer to [commit: `✨ feat: Slash Commands`](https://github.com/kiol1812/Assistant/commit/773d198a05dc304ea7fa6c9675b8947a14c6f624)  
The program writing method refers to the `official documents` and `playlist`, but it is not completely copied, because the playlist method uses `vite`, `vue`.  
Currently, I don’t want to use the kits all the time, it has been mentioned that you could write it by self, but I haven’t researched it yet.

## Date Schedule
``` javascript
// time covert
let date = new Date() // now
dataValues = [
  date.getFullYear(),
  date.getMonth() + 1, // !
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];
console.log(dataValues);
```
``` javascript
// change day
let theDay = new Date();
let changeDay = 30;
let timeStamp = theDay.setDate(theDay.getDate() + changeDay);
console.log(theDay.toISOString());
```
``` javascript
// time zone
new Date('2017-07-09 00:00:00 +0800');
// Sun Jul 09 2017 00:00:00 GMT+0800 (CST)
// Note that if want to store in DB, need to use UTC (+0)
```


## How to use SQLite with `sqlite3`
refer to [SQL Note](./Note/SQL.md), but has little difference between `SQL` and `SQLite`.  
check out [SQLite Note](./Note/SQLite.md)
``` javascript
// smaple example to explain how to use sqlite3
import sqlite3 from 'sqlite3';

const DB = new sqlite3.Database("./src/DB/test.db"); // static path, template
DB.serialize(() => { // use serialize to make sure it was in order
    DB.run("CREATE TABLE lorem (info TEXT)");
    const stmt = DB.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
    DB.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});

DB.close();
```
