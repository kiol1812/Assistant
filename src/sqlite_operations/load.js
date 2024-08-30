import sqlite3 from 'sqlite3';

export const showAll = (DB, table, callbacks=null) => {
    DB.serialize(()=>{
        DB.all(`SELECT * FROM ${table}`, function(err, items){
            console.log(items);
        });
    });
}

export const getData = (DB, table, callbacks=null) => {
    return new Promise((resolve, reject)=>{
        DB.serialize(()=>{
            DB.all(`SELECT * FROM ${table}`, function(err, items){
                if (err) reject(err);
                resolve(items)
            });
        });
    });
}