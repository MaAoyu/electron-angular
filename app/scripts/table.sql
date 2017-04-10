-- table1
-- name,id,family,people,rail,type,area,land,nonland,prj,unit,quantity,city
-- table2
-- id,prj,unit,quantity,price,total
-- table3
-- id,index,length.width,high,area,type1,type2,prj,unit,quantity
-- table4
-- index,t1,t2,t3,t4,t5,price,total,index2,arcName,unit,price2,quantity,total2,
-- table41
-- name,id,type,unit,quantity,price,total,city
-- table43
-- name,id,type,unit,quantity,price,total,city
-- table11
-- city4,area,familys,t1,t2,t3,t4,total,a1,a2,a3,a4,a5,a6

CREATE TABLE `table_manager`.`table2` (
  `id` VARCHAR(45) NOT NULL,
  `prj` VARCHAR(45) NULL,
  `unit` VARCHAR(45) NULL,
  `quantity` VARCHAR(45) NULL,
  `price` VARCHAR(45) NULL,
  `total` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `table_manager`.`table3` (
  `id` INT NOT NULL,
  `index` VARCHAR(45) NOT NULL,
  `length` VARCHAR(45) NULL,
  `width` VARCHAR(45) NULL,
  `high` VARCHAR(45) NULL,
  `area` VARCHAR(45) NULL,
  `type1` VARCHAR(45) NULL,
  `type2` VARCHAR(45) NULL,
  `prj` VARCHAR(45) NULL,
  `unit` VARCHAR(45) NULL,
  `quantity` VARCHAR(45) NULL);