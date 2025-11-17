-- Establece la zona horaria para la sesión actual (UTC)
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS cerveza_limite;
CREATE DATABASE cerveza_limite DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE cerveza_limite;

-- TABLA USUARIO
DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    partidas_jugadas INT DEFAULT 0,
    partidas_ganadas INT DEFAULT 0
);

-- TABLA PARTIDA
DROP TABLE IF EXISTS partida;
CREATE TABLE partida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador1 INT NOT NULL,
    id_jugador2 INT NOT NULL,
    turno_actual INT,
    estado ENUM('en curso','finalizada') DEFAULT('en curso'),
    ganador INT,
    fecha_inicio TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (id_jugador1) REFERENCES usuario(id),
    FOREIGN KEY (id_jugador2) REFERENCES usuario(id),
    FOREIGN KEY (turno_actual) REFERENCES usuario(id),
    FOREIGN KEY (ganador) REFERENCES usuario(id)
);

-- TABLA CARTA
DROP TABLE IF EXISTS carta;
CREATE TABLE carta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tipo ENUM('cerveza', 'especial') NOT NULL,
    puntos INT DEFAULT NULL,
    valor VARCHAR(20) DEFAULT NULL,
    descripcion TEXT,
    ruta_img VARCHAR(255),
    ruta_icono VARCHAR(255)
);

-- TABLA CARTA_EN_JUEGO
DROP TABLE IF EXISTS carta_en_juego;
CREATE TABLE carta_en_juego (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_partida INT,
    id_carta INT,
    id_jugador INT NULL,
    estado ENUM ('mazo','mano','mesa','descartada','bebida'),
    FOREIGN KEY (id_partida) REFERENCES partida(id) ON DELETE CASCADE, -- Si se borra una partida, también se eliminan las cartas asociadas
    FOREIGN KEY (id_carta) REFERENCES carta(id),
    FOREIGN KEY (id_jugador) REFERENCES usuario(id)
);

-- Usuario administrador con permisos en la BD
DROP USER IF EXISTS 'admin_cervecero'@'localhost';
CREATE USER 'admin_cervecero'@'localhost' IDENTIFIED BY 'beber';
GRANT ALL PRIVILEGES ON cerveza_limite.* TO 'admin_cervecero'@'localhost';
FLUSH PRIVILEGES;


-- Introduce las cartas de cerveza en la tabla CARTA
INSERT INTO carta (nombre, tipo, puntos, descripcion, ruta_img) VALUES
('doble', 'cerveza', 2, 'Suma 2 puntos de cerveza', 'assets/images/cartas_cerveza/doble.jpg'),
('conmisterio', 'cerveza', 2, 'Suma 2 puntos de cerveza', 'assets/images/cartas_cerveza/conmisterio.jpg'),
('negra', 'cerveza', 1, 'Suma 1 punto de cerveza', 'assets/images/cartas_cerveza/negra.jpg'),
('birra', 'cerveza', 1, 'Suma 1 puntos de cerveza', 'assets/images/cartas_cerveza/birra.jpg'),
('tinto', 'cerveza', 1, 'Suma 1 puntos de cerveza', 'assets/images/cartas_cerveza/tinto.jpg'),
('caida', 'cerveza', 0, 'Suma 0 puntos de cerveza', 'assets/images/cartas_cerveza/caida.jpg'),
('malTirada', 'cerveza', 0, 'Suma 0 puntos de cerveza', 'assets/images/cartas_cerveza/malTirada.jpg'),
('sinAlcohol', 'cerveza', 0, 'Suma 0 puntos de cerveza', 'assets/images/cartas_cerveza/sinAlcohol.jpg'),
('jarra', 'cerveza', 3, 'Suma 3 puntos de cerveza', 'assets/images/cartas_cerveza/jarra.jpg'),
('digestivo', 'cerveza', 3, 'Suma 3 puntos de cerveza', 'assets/images/cartas_cerveza/digestivo.jpg');

-- Introduce las cartas especiales en la tabla CARTA
INSERT INTO carta (nombre, tipo, valor, descripcion, ruta_img, ruta_icono) VALUES
('Aceitunas', 'especial', 'aperitivo', 'Anula una carta de 1 PC antes de que se beba. No tiene efecto sobre cartas de 2 o 3 PC', 'assets/images/cartas_accion/aceitunas.jpg', 'assets/images/iconos/iconoAperitivo.jpg'),
('Voy al Baño', 'especial', 'WC', 'Permite devolver 1 o 2 cartas de cerveza de 1 PC que tiene es su mazo de cervezas bebidas al mazo de descartes de cartas de cervezas, reduciendo así su total', 'assets/images/cartas_accion/aceitunas.jpg', 'assets/images/iconos/iconoWC.jpg'),
('Bravas', 'especial', 'aperitivo', 'Anula una carta de 1 PC antes de que se beba. No tiene efecto sobre cartas de 2 o 3 PC', 'assets/images/cartas_accion/bravas.jpg', 'assets/images/iconos/iconoAperitivo.jpg'),
('Cambio', 'especial', 'reversible', 'Intercambia la cerveza que tienes enfrente con la del otro jugador, NO con ninguna que esté en el mazo de cervezas bebidas', 'assets/images/cartas_accion/cambio.jpg', 'assets/images/iconos/iconoReversible.jpg'),
('Chorizo', 'especial', 'aperitivo', 'Anula una carta de 1 PC antes de que se beba. No tiene efecto sobre cartas de 2 o 3 PC', 'assets/images/cartas_accion/chorizo.jpg', 'assets/images/iconos/iconoAperitivo.jpg'),
('Experto Cervecero', 'especial', 'viejo', 'Permite devolver una carta de dos PC del mazo de cervezas bebidas. Solo una carta de dos PC, NO dos cartas de un PC cada una.', 'assets/images/cartas_accion/experto.jpg', 'assets/images/iconos/iconoViejo.jpg'),
('Patatas fritas', 'especial', 'aperitivo', 'Anula una carta de 1 PC antes de que se beba. No tiene efecto sobre cartas de 2 o 3 PC', 'assets/images/cartas_accion/fritas.jpg', 'assets/images/iconos/iconoAperitivo.jpg'),
('¿Qué vas a Pedir?', 'especial', 'mirar', 'Permite mirar las 2 cartas superiores del mazo de cervezas y devolverlas en el orden que prefiera.', 'assets/images/cartas_accion/mirar.jpg', 'assets/images/iconos/iconoMirar.jpg'),
('Picante', 'especial', 'picante', 'Anula el efecto de una carta de aperitivo jugada por el oponente. Además, añade una carta de cerveza en juego para ver si se bebe o no, enfrente del jugador que intentó usar el aperitivo', 'assets/images/cartas_accion/picante.jpg', 'assets/images/iconos/iconoPicante.jpg'),
('Queso', 'especial', 'aperitivo', 'Anula una carta de 1 PC antes de que se beba. No tiene efecto sobre cartas de 2 o 3 PC', 'assets/images/cartas_accion/queso.jpg', 'assets/images/iconos/iconoAperitivo.jpg'),
('Algo para picar', 'especial', 'robar', 'Roba dos cartas especiales', 'assets/images/cartas_accion/robar.jpg', 'assets/images/iconos/iconoRobar.jpg'),
('No queda nada', 'especial', 'vacio', 'Cuando el oponente juegue una carta de aperitivo, juega esta carta  para anular el efecto de la carta aperitivo', 'assets/images/cartas_accion/vacio.jpg', 'assets/images/iconos/iconoVacio.jpg');
