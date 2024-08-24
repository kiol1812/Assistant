// const { REST, Routes } = require('discord.js');
import { REST, Routes } from 'discord.js';
// const { clientId, guildId, token } = require('./config.json');
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
dotenv.config()

const rest = new REST().setToken(process.env.TOKEN);
const updateSlashCommands = async (guildId, commands) => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const result = await rest.put(
			Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                guildId
            ),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${result.length} application (/) commands.`);
        console.log(result);
	} catch (error) {
		console.error(error);
	}
}

export const loadAndUpdateCommands = async () => {
    const commands = [];
    const foldersPath = path.join('src/commands');
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders.filter((file)=>{
        if(file.endsWith('.md')) return false;
        return true;
    })) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = await import("./commands/"+folder+"\\"+file);
            if ('command' in command && 'action' in command) {
                commands.push(command.command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    updateSlashCommands(process.env.GUILD_ID, commands);
}

loadAndUpdateCommands();
