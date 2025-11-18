<?php

session_start();

require_once __DIR__ . '/../config.php';
require_once 'PartidaDAO.php';

use src\ClasesDAO\PartidaDAO;
use src\ClasesCervezaLimite\Partida;

//Instanciar objetos para hacer peticiones a la bbdd.
$partidaDAO = new PartidaDAO($bd);

//Si el usuario ya se ha autenticado, lleva al Menú Principal.
if (isset($_SESSION['jugador'])) {
    $jugador = $_SESSION['jugador'];
    // Si se pulsa el botón cerrar sesión.
    if (filter_has_var(INPUT_GET, 'cerrar_sesion')) {
        // Destruyo la sesión del jugador.
        session_unset();
        session_destroy();
        setcookie(session_name(), '', 0, '/');
        //Redirijo al formulario de Inicio de Sesión/Registro.
        header('Location:formloginregistro.php');
        exit;
    //Si se pulsa el botón de nueva partida   
    }elseif(filter_has_var(INPUT_GET, 'nueva_partida')) {
        //Crea una nueva partida y la persiste en la bbdd.
        $partida = new Partida();
        $partidaDAO->creaPartida($partida);
        //Almacena la información de las partidas en la sesión.
        $_SESSION['partida_data'] = $partida;
        //Redirije al script de control de la Partida.
        header('Location:partida.php');
        exit;
    //Si se pulsa el botón Ranking.    
    }elseif(filter_has_var(INPUT_GET, 'ranking')) {
        //Hace una petición a la bbdd para recuperar las partidas del usuario.
        $infoJugador = $partidaDAO->recuperaPartidasJugador($jugador);
        //Almacena la información de las partidas en la sesión.
        $_SESSION['ranking_data'] = $infoJugador;
        //Llama al script de control del ranking.
        header('Location:ranking.php');
        exit;
    //Si se pulsa el botón Reanudar Partida.
    }elseif(filter_has_var(INPUT_GET, 'reanudar_partida')) {
        //Hace una petición a la bbdd con las partidas disponibles para el usuario.
        $partidasJugador = $partidaDAO->recuperaPartidasEnCursoJugador($jugador);
        //Almacena la información de las partidas en la sesión.
        $_SESSION['reanudar_partida_data'] = $partidasJugador;
        //Llama al script de control con la información obtenida.
        header('Location:reanudarpartida.php');
        exit;
    }else {
        //Redirije al Menú Principal.
        header('Location:index.php');
        exit;
    }
    // Sino, redirije al formulario de Inicio de Sesión/Registro. 
}else {
    header('Location:formlogin.php');    
    exit;
}