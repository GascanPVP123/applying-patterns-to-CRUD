
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `dni` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `persona` (`id`, `dni`, `nombre`, `apellidos`, `telefono`) VALUES
(1, '77889900', 'Carlos', 'Perez', '999111222'),
(4, '11223344', 'Roberto', 'Garcia', '987659321'),
(5, '55667788', 'Ana', 'Campos', '912341678'),
(6, '85663145', 'Johan', 'Arango', '933475526');


ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni_UNIQUE` (`dni`);

ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

