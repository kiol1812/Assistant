import { SlashCommandBuilder } from "discord.js";
// import { createTable, checkTables, deleteTable } from "../../sqlite_operations/create.js"; //static path
import { post } from "../../sqlite_operations/update.js";
import { selectAll } from "../../sqlite_operations/load.js";
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
console.log(dateString());

const execute = (tasks=[], newData="default from command", column="`description`", db_path="./src/DB/test.db", table="`schedule`") => {
    const DB = new sqlite3.Database(db_path); // static path, template
    while(tasks.length>0){
        if(tasks[0]==post) tasks.shift()(DB, table, newData, column);
        else tasks.shift()(DB, table);
    }
    DB.close();
}

export const command = new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('schedule command');

export const action = async(ctx) => { // post
    let tasks = [];
    let newData=["default from command", dateString()], column = "`description`, `timestamp`";
    tasks.push(post);
    tasks.push(selectAll);
    execute(tasks, newData, column);

    // ctx.reply();
    // console.log();
}

// action("local");
