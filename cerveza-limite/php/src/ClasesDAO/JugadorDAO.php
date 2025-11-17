<?php

namespace src\ClasesDAO;

use PDO;     
use src\ClasesCervezaLimite\Jugador;

require_once __DIR__ . '/../ClasesCervezaLimite/Jugador.php';

class JugadorDAO {
    
    private PDO $bd;
    
    public function __construct(PDO $bd){
        $this->bd = $bd;
    }
    
    public function recuperaJugador(string $usuario, string $clave): ?Jugador {
        $sql = "Select * from usuario where nombre=:usuario";
        $sth = $this->bd->prepare($sql);
        $sth->execute([":usuario" => $usuario]);

        $fila = $sth->fetch(PDO::FETCH_ASSOC);

            if (!$fila) {
                return null;
            }

    // Verificar contraseña
            if (!password_verify($clave, $fila["password"])) {
                return null;
            }

    // Construir el Jugador manualmente
        $jugador = new Jugador($fila["nombre"], $fila["password"]);
        $jugador->setId($fila["id"] ?? null);

        return $jugador;
    }
       public function creaJugador(string $usuario, string $clave): int|bool {
        // Hashear la contraseña de forma segura
        $pwdHashed = password_hash($clave, PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO usuario (nombre, password) VALUES (:usuario, :clave)";
        $sth = $this->bd->prepare($sql);
        $result = $sth->execute([":usuario" => $usuario, ":clave" => $pwdHashed]);
        return ($result ? $this->bd->lastInsertId() : false);
    }
        
}
    
 
    


