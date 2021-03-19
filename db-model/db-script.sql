-- MySQL Workbench Synchronization
-- Generated: 2021-03-17 21:21
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: hlima

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `ecommerce` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `ecommerce`.`produtos` (
  `idproduto` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `preco` DOUBLE NOT NULL,
  PRIMARY KEY (`idproduto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ecommerce`.`pedidos` (
  `idpedidos` INT(11) NOT NULL,
  `idproduto` INT(11) NOT NULL,
  `quantidade` SMALLINT(6) NULL DEFAULT NULL,
  PRIMARY KEY (`idpedidos`),
  INDEX `fk_pedidos_produtos_idx` (`idproduto` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_produtos`
    FOREIGN KEY (`idproduto`)
    REFERENCES `ecommerce`.`produtos` (`idproduto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;