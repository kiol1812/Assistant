<!-- operations description -->

# SQLite Operation Functions
``` plain
src/
├── sqlite_operations/
│   ├── create.js
│   ├── update.js
│   └── load.js
├── commands/
│   └── schedule/
│       └── index.js
└── DB/
    └── test.db
```
## create.js
- createTable( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)
- checkTables( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)
- deleteTable( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)

## update.js
- post( `[DB:sqlite3.Database()]` , `[table:String]` , `[newDate:String[]]`, `[column]:String`, `callbacks:NULL`)

## load.js
- select( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)
