<?php

class BD {

    protected static ?PDO $bd = null;

    private function __construct(string $host, string $port, string $database, string $usuario, string $password) {
        try {
            self::$bd = new PDO("mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4",$usuario,$password);
            self::$bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Hace que cualquier error SQL lance una excepción.
            self::$bd->setAttribute(PDO::ATTR_CASE, PDO::CASE_NATURAL); //Respeta mayúsculas/minúsculas de las columnas de la base de datos 

        } catch (PDOException $error) {
             error_log("Error de conexión: " . $error->getMessage()); //se guarda el error en el log
            die("Error al conectar con la base de datos. Contacte con el administrador.");
          //   throw $error; // borrar
        }
    }

    public static function getConexion(string $host, string $port, string $database, string $usuario, string $password): PDO {
        if (self::$bd === null) {
            new BD($host, $port, $database, $usuario, $password);
        }
        return self::$bd;
    }
}

