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
-- creacion de la base de datos ----
--
DROP DATABASE IF EXISTS digitaldrinks_db;
CREATE DATABASE digitaldrinks_db;
USE digitaldrinks_db;
--
-- Tabla de categorias para los usuarios----
--
DROP TABLE IF EXISTS `user_category`;
/*!40101 SET @saved_cs_client = @@character_set_client*/;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_category` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name`varchar(100) COLLATE utf8_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT= 3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
--
-- Insercion de datos en tabla de categoria de usuarios ----
--
LOCK TABLES `user_category` WRITE;
/*!40000 ALTER TABLE `user_category` DISABLE KEYS */;
INSERT INTO `user_category` VALUES (1,'Administrador', NULL, NULL, NULL), (2, 'Usuario', NULL, NULL, NULL); 
/*!40000 ALTER TABLE `user_category` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Creacion de tabla de categoria para productos ----
--
DROP TABLE IF EXISTS `user_categories`;
/*!40101 SET @saved_cs_client = @@character_set_client*/;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name`varchar(100) COLLATE utf8_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT= 3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
--
-- Insercion de datos en tabla de categoria de productos ----
--
LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Bebidas', NULL, NULL, NULL), (2, 'Herramientas', NULL, NULL, NULL); 
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
--
-- creacion de la tabla usuarios ----
--
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client = @@character_set_client*/;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`username`varchar(100) unique COLLATE utf8_unicode_ci NOT NULL,
`first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
`last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
`email`varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
`password`varchar(250) COLLATE utf8_unicode_ci NOT NULL,
`birthday`date NOT NULL,
`user_category_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `users_user_category_id_foreign` (`user_category_id`),
CONSTRAINT `users_user_category_id_foreing` FOREIGN KEY (`user_category_id`) REFERENCES `user_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT= 5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Insertar info de los admins en tabla de usuarios ----
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ximena','Ximena','Camacho','ximena@digitaldrinks.com','$2a$10$VAXECey1cZD6Dq0LGGmsuuhOIlQgYcfF/Mkafq/0Wv9XOK2dDGu3a', '1981-10-07',1, NULL, NULL, NULL),
(2, 'carol', 'Carol', 'Neumeyer', 'carol@digitaldrinks.com', '$2a$10$wlEAI6qDV65tlF00PXtZ.umw1ifrxcb.j1dwMFnGbrkNM77NezQg2', '1964-09-11', 1, NULL, NULL, NULL),
(3,'carlos', 'Carlos', 'Loffreda', 'carlos@digitaldrinks.com', '$2a$10$9y4TnGsNe7UKz4ys6QDF5u4JO49xBArWDoAcVVT74O67pHQ8pXXhm', '1987-12-18', 1 ,NULL, NULL, NULL),
(4,'robert', 'Robert', 'Rondon', 'robert@digitaldrinks.com', '$2a$10$UIyPECj2tJm77CiX1EMDz.Or.Feqr7SGtkLn6fUw4xbKolWtc8KuW', '1989-10-12', 1, NULL, NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Creacion de la tabla de productos
--
DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client = @@character_set_client*/;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name`varchar(250) COLLATE utf8_unicode_ci NOT NULL,
`price` int(255) unsigned NOT NULL,
`discount` int(100) unsigned NOT NULL,
`description`varchar(6500) COLLATE utf8mb4_unicode_ci NOT NULL,
`image`varchar(250) COLLATE utf8_unicode_ci NOT NULL,
`category_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `products_category_id_foreign` (`category_id`),
CONSTRAINT `products_category_id_foreing` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT= 2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Insertar info de 1 producto ----
--
LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1 , 'Whisky Jameson Caskmates Stout', '1900', '50', 'Color caramelo profundo con un aroma inicial de heno recién cortado.' , 'jamesonCaskmates.png', 1, NULL, NULL, NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Creacion de la tabla de recetas ----
--
DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client = @@character_set_client*/;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipes` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
`ingredients` varchar(6500) COLLATE utf8_unicode_ci NOT NULL,
`method` varchar(6500) COLLATE utf8_unicode_ci NOT NULL,
`garnish` varchar(6500) COLLATE utf8_unicode_ci NOT NULL,
`image` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
--
-- Insertar info de un receta ----
--
LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1, 'Alexander', '30 ml Cognac, 30 ml Crème de Cacao (Brown),30 ml Crema de Leche', 'Verter todos los ingredientes en una coctelera llena con cubos de hielo. Batir y colar en una copa cocktail previamente enfriada.', 'Polvorear un poco de Nuez Moscada fresca sobre el cocktail', 'alexander.png', NULL, NULL, NULL);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Creacion de tabla de cursos ----
--
DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client = @@character_set_client*/;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
`price` int(255) unsigned NOT NULL,
`discount` int(100) unsigned NOT NULL,
`description` varchar(6500) COLLATE utf8_unicode_ci NOT NULL,
`image` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`deleted_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT= 2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
--
-- Insertar info de un curso ----
--
LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1, 'Bartender Profesional', '11500', '0', 'Destinado para toda persona que quiera iniciarse en esta profesión con o sin conocimientos previos. Las clases son teóricas y prácticas, donde el alumno tiene la posibilidad de entrenar lo aprendido en una barra real, con bebidas reales. El objetivo del curso es que el alumno se pueda desempeñar en una barra en forma profesional, tanto en el manejo de las herramientas, como en la elaboración de un cocktail con la correcta atención al cliente.', 'bartender.jpeg', NULL, NULL, NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;