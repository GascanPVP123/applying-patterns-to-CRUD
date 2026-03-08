CREATE DATABASE  IF NOT EXISTS `personadb` 

DROP TABLE IF EXISTS `persona`;

CREATE TABLE `persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


LOCK TABLES `persona` WRITE;

INSERT INTO `persona` VALUES
(1,'70123456','Micaela','Cacerez',NULL,'Activo','Docente','2026-03-05 05:32:59','2026-03-06 02:40:47'),
(4,'73456789','Luis','Casimiro',NULL,'Activo','Docente','2026-03-05 05:32:59','2026-03-05 05:32:59'),
(15,'41235898','Walter','Hernandez',NULL,'Inactivo','Administrativo','2026-03-07 19:32:01','2026-03-07 19:32:01'),
(17,'42015963','Fabio','Gutierrez',NULL,'RETIRADO','Egresado','2026-03-07 20:24:05','2026-03-07 20:24:05'),
(18,'89635210','Yino','Rodriguez',NULL,'RETIRADO','Docente','2026-03-07 20:25:09','2026-03-07 20:25:09'),
(24,'78968445','Dario','Espinoza',NULL,'Activo','Egresado','2026-03-07 23:15:09','2026-03-07 23:15:09'),
(25,'84551668','Fabio','Sanchez',NULL,'RETIRADO','Estudiante','2026-03-07 23:25:37','2026-03-07 23:25:37');

UNLOCK TABLES;
