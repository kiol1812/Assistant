import sqlite3 from 'sqlite3';

const createTable = (DB, table, callbacks=null) => {
    DB.serialize(() => {
        DB.run(`CREATE TABLE ${table} (\`id\` INTEGER PRIMARY KEY AUTOINCREMENT,\`description\` TEXT,\`timestamp\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`, function(err){
            if(err){
                console.log(`table ${table} aleadly exit.`);
            }
        });
        // const stmt = DB.prepare("INSERT INTO `schedule` (`description`) VALUES (?)");
        // for (let i = 0; i < 10; i++) {
        //     stmt.run("Ipsum " + i);
        // }
        // stmt.finalize();
        // DB.each("SELECT rowid AS `id`, `description`, `timestamp` FROM `schedule`", (err, row) => {
        //     console.log(row.id + ": " + row.description + ", " + row.timestamp);
        // });
    });
}

const checkTables = (DB, table, callbacks=null) => {
    DB.serialize(()=>{
        DB.all("SELECT name FROM sqlite_master WHERE type='table'", function(err, tables){
            console.log(tables); // table.length
        });
    });
}

const deleteTable = (DB, table, callbacks=null) => {
    DB.serialize(()=>{
        DB.run(`DROP TABLE ${table}`, function(err){
            if(err){
                console.log(`table ${table} doesn't exit.`);
            }
        });
    });
}

let tasks = [];
tasks.push(checkTables);
// tasks.push(createTable);
// tasks.push(checkTables);
tasks.push(deleteTable);
tasks.push(checkTables);

const execute = (tasks=[], db_path="./src/DB/test.db", table="`schedule`") => {
    const DB = new sqlite3.Database(db_path); // static path, template
    while(tasks.length>0){
        tasks.shift()(DB, table);
    }
    DB.close();
}
execute(tasks);