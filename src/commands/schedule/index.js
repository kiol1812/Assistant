import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
// import { createTable, checkTables, deleteTable } from "../../sqlite_operations/create.js"; //static path
import { post } from "../../sqlite_operations/update.js";
import { getData, showAll } from "../../sqlite_operations/load.js";
import sqlite3 from 'sqlite3';

const now = new Date();
// console.log(now.getTimezoneOffset()); // -480 min
now.setTime(now.getTime()+(now.getTimezoneOffset()*60000)); //set UTC+0
let dataValues = {
    yaer    : now.getFullYear(),
    mouth   : now.getMonth() + 1,
    date    : now.getDate(),
    hour    : now.getHours(),
    minute  : now.getMinutes(),
    second  : now.getSeconds(),
};
const dateString = () =>{
    return `${dataValues.yaer}-${String(dataValues.mouth).padStart(2, "0")}-${String(dataValues.date).padStart(2, "0")} ${String(dataValues.hour).padStart(2, "0")}:${String(dataValues.minute).padStart(2, "0")}:${String(dataValues.second).padStart(2, "0")}`;
}

const execute = async (tasks=[], newData=["default from command"], column="`description`", db_path="./src/DB/test.db", table="`schedule`") => {
    const DB = new sqlite3.Database(db_path); // static path, template
    let res = [];
    while(tasks.length>0){
        if(tasks[0]==post) tasks.shift()(DB, table, newData, column);
        else if(tasks[0]==getData){
            res=await tasks.shift()(DB, table);
        }
        else tasks.shift()(DB, table);
    }
    DB.close();
    return res;
}

export const command = new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('schedule command')
    .addSubcommand(subCommand=>
        subCommand
            .setName('post')
            .setDescription('post new schedule')
            .addStringOption(option=>
                option.setName('matter')
                .setDescription('A name of one todo item')
                .setRequired(true)
                .setMaxLength(2_000)
            )
            .addStringOption(option=>
                option.setName('start')
                .setDescription('date and time of matter start')
                .setRequired(true)
                .setMaxLength(2_000)
            )
            .addStringOption(option=>
                option.setName('end')
                .setDescription('date and time of matter end')
                .setRequired(true)
                .setMaxLength(2_000)
            )
    )
    .addSubcommand(subCommand=>
        subCommand
            .setName('list')
            .setDescription('list schedules')
    );

export const action = async(ctx) => { // post
    let tasks = [];
    
    if(ctx.options.getSubcommand()==='post'){
        const newData=[
            ctx.options.getString('matter')??"default from command",
            ctx.options.getString('start')??dateString(),
            ctx.options.getString('end')??dateString()
        ], column = "`description`, `start`, `end`";
        tasks.push(post);
        tasks.push(showAll);
        execute(tasks, newData, column);
        ctx.reply({content:"Success.", ephemeral:true});
    }else if(ctx.options.getSubcommand()==='list'){
        tasks.push(showAll);
        tasks.push(getData);
        const res = await execute(tasks);
        // console.log(res_string);
        let embedPrint = new EmbedBuilder()
            .setColor(0xE2D7C3)
            .setTitle('Schedule')
            .setDescription('show all')
            .addFields({name:'\u200B', value:'\u200B'})
        res.forEach(element => {
            embedPrint.addFields({
                name:`${element.description}`,
                value:`${element.start}~${element.end}`
            });
        });
        embedPrint.setTimestamp().setFooter({text:`total ${res.length} matters`});
        ctx.reply({embeds:[embedPrint], ephemeral:true});
    }else{
        console.log("not except");
        ctx.reply({content:"Command not found.", ephemeral:true});
    }
    // console.log();
}
