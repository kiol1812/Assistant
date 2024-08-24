import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import fs from "node:fs";
import path from "node:path";

dotenv.config()

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, (c)=>{
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

var actions = new Collection();
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
            actions.set(command.command.name, command.action);
		} else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction=>{
    if(!interaction.isChatInputCommand()) return;
    const action = actions.get(interaction.commandName);
    if (!action) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    try{
        action(interaction);
    }catch(error){
        console.log(error);
        // if(interaction.replied||interaction.deferred){
        //     await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		// } else {
		// 	await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		// }
    }
});

client.login(process.env.TOKEN);