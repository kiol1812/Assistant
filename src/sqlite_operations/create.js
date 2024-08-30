import sqlite3 from 'sqlite3';

export const createTable = (DB, table, callbacks=null) => {
    DB.serialize(() => {
        DB.run(`CREATE TABLE ${table} (\`id\` INTEGER PRIMARY KEY AUTOINCREMENT,\`description\` TEXT,\`start\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\`end\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`, function(err){
            if(err){
                console.log(`table ${table} aleadly exit.`);
            }
        });
    });
}

export const checkTables = (DB, table, callbacks=null) => {
    DB.serialize(()=>{
        DB.all("SELECT name FROM sqlite_master WHERE type='table'", function(err, tables){
            console.log(tables); // tables.length
        });
    });
}

export const deleteTable = (DB, table, callbacks=null) => {
    DB.serialize(()=>{
        DB.run(`DROP TABLE ${table}`, function(err){
            if(err){
                console.log(`table ${table} doesn't exit.`);
            }
        });
    });
}