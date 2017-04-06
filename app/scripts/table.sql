-- //table1
-- //name,id,family,people,rail,type,area,land,nonland,prj,unit,quantity
-- //table3
-- //id,index,length.width,high,area,type1,type2,prj,unit,quantity

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