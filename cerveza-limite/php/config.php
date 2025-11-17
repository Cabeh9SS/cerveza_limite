<?php

require_once __DIR__ . '/src/BD/BD.php';

/* IMPORTANTE. Todos los script de la carpeta public que necesiten conectarse a la BD deben incluir la siguiente ruta:
 * require_once __DIR__ . '/../config.php';
 * __DIR__ es una constante mágica que siempre devuelve la ruta absoluta del directorio donde está el archivo actual.
 */


$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $linea) {
        [$index, $valor] = explode('=', $linea, 2);
        $_ENV[trim($index)] = trim($valor);
    }
}

// Crear conexión a BD
$bd = BD::getConexion(
    $_ENV['DB_HOST'],
    $_ENV['DB_PORT'],
    $_ENV['DB_DATABASE'],
    $_ENV['DB_USUARIO'],
    $_ENV['DB_PASSWORD']
);


