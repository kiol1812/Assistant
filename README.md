# Assistant
discord bot using discord.js

### Directory Structure
```plain
.env
.package.json
yarn.lock
src/
├── deploy_commands.js
├── main.js
├── commands/
    ├── first_command
    │   ├── index.js
    │   └── data.csv # or data.js ...
    ├── second_command
    │   └── ...
    ...
```

## Token
add a `.env` file store your `token` and `client id` of discord bot, and store `guild id` of your discord guild.  
refer to [build basic discord bot](https://youtu.be/-oBSz4MZC6Q?si=IbbbM3TPUqgt0J-s).

## Registering Commands
```palin
$ yarn upload
```
Refer to `package.json`, this command will execute `node src/deploy_commands.js`. In other words, It'll run a script that registering all commands which under directory `commands`(refer to [Directory Structure of dir `commands`](src\commands\readme.md)).

## Activate Bot
```palin
$ yarn main
```
Refer to `package.json`, this command will execute `node src/main.js`. In other words, It'll activate discord bot. 