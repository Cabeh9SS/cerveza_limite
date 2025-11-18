<?php

namespace src\ClasesCervezaLimite;

class Jugador{
    
    private string $nombre;
    private bool $esActivo;
    private int $ptosCerveza;
    private array $cartasMano;
    private string $cartaActual;
    private int $maxCartas;
    private string $accion;
    private ?int $id;
    
    public function __construct(string $nombre = "", string $password = ""){
        $this->nombre = $nombre;
        $this->password = $password;
        $this->esActivo = false;
        $this->ptosCerveza = 0;
        $this->cartasMano = []; 
        $this->cartaActual=""; 
        $this->accion = "";        
    }
    
    public function esJugadorActivo(Jugador $jugador): void {
        if(!$jugador->getEsActivo()){
            $jugador->setEsActivo(true);
        }
    }
    
    public function robarCartas(Jugador $jugador): void {
        
    }
    
    public function jugarCarta(Jugador $jugador): void {
        
    }
    
    public function pasar(Jugador $jugador) {
        
    }
    
    public function getNombre(): string {
        return $this->nombre;
    }
    
    public function getPassword(): string {
        return $this->password;
    }

    public function getEsActivo(): bool {
        return $this->esActivo;
    }

    public function getPtosCerveza(): int {
        return $this->ptosCerveza;
    }

    public function getCartasMano(): int {
        return $this->cartasMano;
    }

    public function getCartaActual(): string {
        return $this->cartaActual;
    }

    public function getMaxCartas() {
        return $this->maxCartas;
    }

    public function getAccion(): string {
        return $this->accion;
    }
    
    public function getId(): int {
        return $this->id;
    }

    public function setNombre(string $nombre): void {
        $this->nombre = $nombre;
    }
    
    public function setPassword(string $password): void {
        $this->password = $password;
    }
    
    public function setEsActivo(bool $esActivo): void {
        $this->esActivo = $esActivo;
    }

    public function setPtosCerveza(int $ptosCerveza): void {
        $this->ptosCerveza = $ptosCerveza;
    }

    public function setCartasMano(int $cartasMano): void {
        $this->cartasMano = $cartasMano;
    }

    public function setCartaActual(string $cartaActual): void {
        $this->cartaActual = $cartaActual;
    }

    public function setAccion(string $accion): void {
        $this->accion = $accion;
    }

    public function setId(?int $id): void {
    $this->id = $id;
}



}

