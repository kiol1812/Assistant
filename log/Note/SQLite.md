## Difference with SQL
``` javascript
// AUTOINCREMENT (sql: AUTO_INCREMENT) and
// CURRENT_TIMESTAMP (sql: GETDATE() or DATETIME('now'))
DB.run("CREATE TABLE `schedule` (`id` INTEGER PRIMARY KEY AUTOINCREMENT,`description` TEXT,`timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
```