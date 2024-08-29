## SQL
### Basic operators
> [!NOTE]
>
> Use `.serialize()` to make sure it was in order.
``` javascript
// like this example
import sqlite3 from 'sqlite3';
const DB = new sqlite3.Database("./src/DB/test.db"); // static path, template
DB.serialize(() => { // use serialize to make sure it was in order
    DB.run("CREATE TABLE lorem (info TEXT)");
    const stmt = DB.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
    DB.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});
DB.close();
```
#### Create Database
``` javascript
// create database or load one.
cosnt DB = new sqlite3.Database("./path/DB.db");
```
``` SQL
CREATE DATABASE `databaseName`; -- create
DROP DATABASE `databaseName`;   -- delete
```
#### Create Table
``` javascript
DB.run("CREATE TABLE lorem (info TEXT)");
/*
CREATE TABLE lorem(
	`id` INT PRIMARY KEY, -- probably AUTO_INCREMENT
	`info` TEXT
);
*/
```
``` SQL
-- enumerate some types
INT -- Integer
DECIMAL(m, n) -- Float, like c:{ %m.nf }
VARCHAR(n) -- String, like c:{ char[n] }
BLOB -- (Binary Large Object) like image, vedio and file...
DATE -- 'YYYY-MM-DD' Date
TIMESTAMP -- 'YYYY-MM-DD HH:MM:SS' Record time
```
``` SQL
USE `databaseName`;
CREATE TABLE `tableName`(
	`object_id` INT PRIMARY KEY,
	`name` VARCHAR(20) -- cauld add `NOT NULL` or `UNIQUE` to constraint
);
DROP TABLE `tableName`;
```
#### Insert
``` javascript
DB.run("CREATE TABLE lorem (info TEXT)");
const stmt = DB.prepare("INSERT INTO lorem VALUES (?)");
for (let i = 0; i < 10; i++) {
	stmt.run("Ipsum " + i);
}
stmt.finalize();
```
``` SQL
INSERT INTO `tableName` VALUES(100, 'name test'); -- by order
INSERT INTO `tableName` (`name`) VALUES('name test'); -- by assignation
```
#### Update
``` javascript
DB.run("UPDATE lorem SET name=$name WHERE id=$id", {
	$id: 1,
	$name: "update name"
}, function(err){ // overload function
	console.log(this.changes);
});
```
``` SQL
UPDATE `tableName`
SET `name` = 'update name'
WHERE `name` = 'name test'; -- note ';'. could add `OR`...
```
#### Delete
``` SQL
DELETE FROM `tableName`
WHERE `object_id` >= 1; -- delete all, note that <> in sql mean !=
```
#### Distinct

#### Select
``` javascript
DB.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
	console.log(row.id + ": " + row.info);
});
```
``` SQL
SELECT * FROM `tableName`;
```
#### Subquery
``` SQL
SELECT `name`
FROM `employee`
WHERE `emp_id` = (
	SELECT `manager_id`
	FROM `branch`
	WHERE `branch_name`='IT';
)
```
#### ON Delete
``` SQL
CREATE TABLE `branch`(
	`branch_id` INT PRIMARY KEY,
	`branch_name` VARCHAR(20),
	`manager_id` INT,
	FOREIGN KEY (`manager_id`) REFERENCES `employee`(`emp_id`) ON DELETE SET NULL
	-- when emp_id 3 be deleted, 
	-- then this tabel's item that emp_id equal 3 will be change to NULL. 
);
CREATE TABLE `works_with`(
	`emp_id` INT,
	`client_id` INT,
	PRIMARY KEY (`emp_id`, `client_id`),
	FOREIGN KEY (`emp_id`) REFERENCES `employee`(`emp_id`) ON DELETE CASCADE
	-- when emp_id 3 be deleted, 
	-- then this tabel's item that emp_id equal 3 will be delete too. 
);
```
### (Aggregate) Functions
#### Avg
``` SQL
SELECT AVG(`object_id`) FROM `tableName`;
```
#### Count
``` SQL
SELECT COUNT(*) FROM `tableName`;
SELECT COUNT(`name`) FROM `tableName`; -- if name is NULL, it'll not to be counted.
```
#### Max
``` SQL
SELECT MAX(`object_id`) FROM `tableName`;
```
##### Min
``` SQL
SELECT MIN(`object_id`) FROM `tableName`;
```
#### Sum
``` SQL
SELECT SUM(`object_id`) FROM `tableName`;
```
#### Round
#### Format
#### Limit
``` SQL
SELECT *
FROM `tableName`
LIMIT 3; -- return at most 3 object
```
#### Like
``` SQL
SELECT *
FROM `phone`
LIKE '%335';
```
#### In
``` SQL
SELECT *
FROM `tableName`
WHERE `name` IN('first', 'second');
-- mean: WHERE `name`='first' OR `name`='second';
```
#### Join
``` SQL
SELECT *
FROM `employee`
JOIN `branch` -- default use "RIGHT JOIN", could use "LEFT JOIN"
ON `employee`.`emp_id` = `branch`.`manager_id`;
```
#### Alter
更改table中的欄位。
``` SQL
ALTER TABLE `tableName` ADD newColumn DECIMAL(3, 2);
ALTER TABLE `tableName` DROP COLUMN newColumn;
```
#### Union
``` SQL
SELECT `name`
FROM `tableName`
UNION
SELECT `name`
FROM `tableName2`;
```
``` SQL
SELECT `name1` AS `name`
FROM `tableName1`
UNION
SELECT `name2`
FROM `tableName2`;
```
#### Auto-Increment
``` SQL
CREATE TABLE `tableName`(
	`object_id` INT AUTO_INCREMENT
);
```
#### Order by
``` SQL
SELECT *
FROM `tableName`
ORDER BY `object_id` DESC; -- DESC: high to low, ASC(default): low to hoght
```
#### Group by
#### Having
#### Default
``` SQL
CREATE TABLE `tableName`(
	`object_id` INT PRIMARY KEY,
	`name` VARCHAR(20) DEFAULT 'default text'
);
```

## Wildcards
#### % mean many character
``` SQL
SELECT *
FROM `phone`
LIKE '%335';
```
#### _ mean one character
``` SQL
SELECT *
FROM `phone`
LIKE '09_____335';
```

