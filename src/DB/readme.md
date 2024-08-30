<!-- doesn't complete yet. -->

## Descriptrion
DB file should be here.  
I use .gitignore to ignore it.

## Database Structure
refer to [create.js](../sqlite_operations/create.js)
``` javascript
DB.run(`CREATE TABLE ${table} (\`id\` INTEGER PRIMARY KEY AUTOINCREMENT,\`description\` TEXT,\`start\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\`end\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`, function(err){
    if(err){
        console.log(`table ${table} aleadly exit.`);
    }
});
/*
CREATE TABLE ${table}(
	`id` INT PRIMARY KEY AUTO_INCREMENT
	`description` TEXT
    `start` TIMESTAMP DEFAULT current_timestamp
    `end` TIMESTAMP DEFAULT current_timestamp
);
*/
```