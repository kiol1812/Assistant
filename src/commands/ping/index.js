import { SlashCommandBuilder } from 'discord.js';

// export default {
//     command: new SlashCommandBuilder()
//         .setName('ping')
//         .setDescription('ping comment'),
//     async execute(interaction) {
//         await interaction.reply('Pong!');
//     },
// }
    // action: async(ctx)=>{
    //     await ctx.reply('pong!')
    // }
    
export const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping command');

export const action = async(ctx) => {
    ctx.reply('pong!');
    console.log("action reply");
}
