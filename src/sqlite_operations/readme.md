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
> createTable( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)  
>  
> Create a table, default named `schedule` and use `DB/test.db`

> checkTables( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)  
>  
> Check out how many table exit, then show all. Default to chect out `DB/test.db`.

> deleteTable( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)  
>  
>Delete a table. Default to remove table `schedule` from `DB/test.db`.

## update.js
> post( `[DB:sqlite3.Database()]` , `[table:String]` , `[newDate:String[]]`, `[column]:String`, `callbacks:NULL`)  
>   
> Add a new item to table. Default use table `schedule` from `DB/test.db`.

## load.js
> showAll( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)  
>  
> Display all items from table. Default use table `schedule` from `DB/test.db`.

> getData( `[DB:sqlite3.Database()]` , `[table:String]` , `callbacks:NULL`)  
>  
> A promise function. return all items from table. Default use table `schedule` from `DB/test.db`.
