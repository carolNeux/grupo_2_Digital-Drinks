/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Query para cargar de a una receta en pestaña de 	query
-- INSERT INTO `digitaldrinks_db`.`recipes` (`id`, `name`, `ingredients`, `method`, `garnish`, `image`) VALUES ('15', 'asdfgh', 'azsdfgbhnj', 'zxcvbnm', 'sdcfgvbhnjm', 'sxdcfgbhn');
--
-- Carga de varios items por script
--

USE digitaldrinks_db;

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES 
(2, 'Americano', '30 ml Bitter Campari, 30 ml de Vermouth Rosso, un Dash de Soda', 'Mezcla todos los ingredientes en un vaso old fashioned lleno con cubos de hielo. Agregar un dash de Soda. Revolver gentilmente', 'Decorar con media rodaja de naranja y piel de limon.', 'americano.png', NULL, NULL, NULL),
(3, 'Boulevardier', '45 ml Bourbon o Whiskey de Centeno, 30 ml Bitter Campari, 30 ml Vermouth Rosso', 'Verter todos los ingredientes vaso de mezclador con cubos de hielo. Revolver bien, Colar en una copa cocktail previamente enfriada.', 'Decorar con piel de naranja o piel de limon.', 'boulevardier.png', NULL, NULL, NULL),
(4, 'Daiquiri', '60 ml Ron Blanco, 20 ml Jugo de Lima Fresco, 2 cucharaditas de Azucar', 'En una coctelera agregar todos los ingredientes. Revolver bien hasta que se disuelva el azucar. Agregar hielo y batir. Colar dentro de una copa cocktail previamente enfriada.', 'Rodaja de Lima', 'daiquiri.png', NULL, NULL, NULL),
(5, 'Dry Martini', '60 ml Gin, 10 ml Vermouth Dry', 'Verter todos los ingredientes en un vaso mezclador con cubos de hielo. Revolver bien. Colar en una copa martini previamente enfriada.', 'Exprimir los aceites de una piel de limon sobre la bebida o decorar con aceitunas verdes si asi lo solicitan.', 'dryMartini.png', NULL, NULL, NULL),
(6, 'Gin Fizz', '345 ml Gin, 30 ml Jugo de Limon Fresco, 10 ml Almibar Simple, Dash de Soda', 'Batir todos los ingredientes con hielo menos la soda. Verter dentro de un vaso de trago largo, completa con la soda. Servir sin hielo.', 'Decorar con una rodaja de limon o piel de limon.', 'ginFizz.png', NULL, NULL, NULL),
(7, 'Hanky Panky', 'Hanky Panky', 'Verter todos los ingredientes dentro de un vaso mezclador con cubos de hielo. Revolver bien. Colar en una copa cocktail previamente enfriada.', 'Piel de Naranja.', 'hankyPanky.png', NULL, NULL, NULL),
(8, 'John Collins', '45 ml Gin, 30 ml Jugo de Limon Fresco, 15 ml de Almibar Simple, 60 ml  Soda', 'Verter todos los ingredientes directamente en un vaso Highball lleno de hielo. Revolver gentilmente. Usar Old Tom Gin para hacer Tom Collins.', 'Decorar con una rodaja de limon y una cereza de marrasquino.', 'johnCollins.png', NULL, NULL, NULL),
(9, 'Manhattan', '50 ml Whiskey de Centeno, 20 ml Vermouth Rosso, 1 dash de Angostura Bitter', 'Verter todos los ingredientes en un vaso mezclador con cubos de hielo. Revolver bien. Colar en una copa cocktail previamente enfriada.', 'Decorar con una cereza.', 'manhattan.png', NULL, NULL, NULL),
(10, 'Negroni', '30 ml Gin, 30 ml Bitter Campari, 30 ml Sweet Red Vermouth', 'Verter todos los ingredientes en un vaso mezclador con cubos de hielo. Revolver bien. Colar en un vaso old fashioned lleno de hielo.', 'Decorar con media rodaja de naranja.', 'negroni.png', NULL, NULL, NULL),
(11, 'Old Fashioned', '45 ml Bourbon o Whiskey de Centeno, 1 Terron de Azucar o 1 cucharada, unos cuantos dashes de Angostura Bitter, un par de dashes de agua (opcional).', 'Colocar el terron de azucar en un vaso old fashioned y aplica los dashes de Angostura. Macerar hasta crear una pasta, llenar el vaso con cubos de hielo y agregar el whiskey. Revolver gentilmente.', 'Decorar con media rodaja o piel de naranja y una cereza.', 'oldFashioned.png', NULL, NULL, NULL),
(12, 'Rusty Nail', '45 ml Whisky Escoces, 25ml Drambuie', 'Verter todos los ingredientes directamente en un vaso old fashioned lleno de hielo. Revolver gentilmente.', 'Decorar con piel de limon.', 'rustyNail.png', NULL, NULL, NULL),
(13, 'Whiskey Sour', '45 ml Whiskey Bourbon, 25 ml Jugo de Limon Fresco, 20 ml Almibar Simple,20 ml Clara de Huevo', 'Verter todos los ingredientes en una coctelera con hielo. Batir bien. Colar en una copa Cobbler. Si se desea servir a "las rocas", colar los ingredientes en un vaso old fashioned lleno de hielo.', 'Decorar con media rodaja de naranja y una cereza de marrasquino.', 'whiskeySour.png', NULL, NULL, NULL),
(14, 'Black Russian', '350 ml Vodka,20 ml Licor de Cafe', 'Verter los ingredientes en un vaso old fashioned lleno de hielo. Revolver gentilmente. Para el WHITE RUSSIAN – colocar crema de leche fresca sobre el cocktail y revolver suavemente.', 'No hay decoracion', 'image-1605648294094.png', NULL, NULL, NULL);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
--
LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES 
-- (id, name, price, discount, description, image, created_at, updated_at, deleted_at)
(2, 'Bar Manager', '15500', '0', 'Destinado a que desarrolles una capacidad de análisis crítico, con el objetivo de poder crear y resolver de una forma óptima cada situación en Bares, Restaurantes, Clubes u Hoteles. Descubrirás en nuestro programa una forma nueva de desempeñarte tras una barra, de una manera efectiva con relación al trabajo en equipo, preparación de cocteles, rentabilidad de producto, organización de espacio de trabajo y recepción de clientes.    Basado en la experiencia de nuestro Director Académico, recorrerás', 'bar-manager.png', NULL, NULL, NULL);

/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES 
-- (id, name, price, discount, description, image, category_id, created_at, updated_at, deleted_at)
(2, 'Whisky Jameson Black Barrel', '2810', '5','Jameson Black Barrel es de cuerpo medio, muy suave y sedoso. Empieza especiado, destacando las notas del whisky pot-still con un toque picante en la punta de la lengua. Le siguen notas dulces de azúcar panela, caramelo y vainilla, acompañadas del lado más frutal.', 'jamesonBlackBarrel.png', 1, NULL, NULL, NULL),
(3,'Tanqueray','1650', '25', 'Balance perfecto de sus cuatro botanicos. La misma seleccion de ingredientes utilizada por Charles Tanqueray. La ginebra favorita de los bartenders para el gin tonic perfecto.', 'tanquerey.png', 1, NULL, NULL, NULL),
(4,'Beefeater', '1550', '10', 'La Ginebra Beefeater es fabricada usando alcohol neutro de grano, en el cual son macerados durante 24 horas los ingredientes vegetales que le dan su sabor y aroma. (Bayas de enebro, junto a cáscara de naranja amarga y limón, almendras, raíz de lirio, semillas de cilantro, raíz y semillas de Angelica y regaliz). Después de este proceso la mezcla es destilada durante 7 horas, conservándose solo el producto intermedio de la misma, conocido como el corazón.','beefeater.png', 1, NULL, NULL, NULL);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;