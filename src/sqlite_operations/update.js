import sqlite3 from 'sqlite3';

export const post = (DB, table, newData=["new default description"], column="`description`", callbacks=null) => {
    DB.serialize(()=>{
        let VALUES="?", size=newData.length;
        while(--size) VALUES+=", ?";
        const stmt = DB.prepare(`INSERT INTO ${table} (${column}) VALUES (${VALUES})`);
        stmt.run(newData, function(err){
            if(err) console.log("failed to post");
        });
        stmt.finalize();
    });
}