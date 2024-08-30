import sqlite3 from 'sqlite3';

export const selectAll = (DB, table, callbacks=null) => {
    DB.serialize(()=>{
        DB.all(`SELECT * FROM ${table}`, function(err, items){
            console.log(items);
        });
    });
}