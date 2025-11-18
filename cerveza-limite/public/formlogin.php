<?php

session_start();

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../src/ClasesDAO/JugadorDAO.php';

use src\ClasesDAO\JugadorDAO;

header('Content-Type: application/json');

//Instanciar objeto para hacer peticiones a la bbdd.
$jugadorDAO = new JugadorDAO($bd);

if (filter_has_var(INPUT_POST, 'entrar')) {
    //Recupera los datos de acceso introducidos en el formulario.
    $usuario = trim(filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_STRING));
    $clave = trim(filter_input(INPUT_POST, 'clave', FILTER_SANITIZE_STRING));
    //Manda la petición a la bbdd para recuperar el jugador con los datos de acceso introducidos.
    $jugador = $jugadorDAO->recuperaJugador($usuario, $clave);
    //Si los datos coinciden, almacena la info del jugador en la sesión y redirije al Menú Pricipal.
    if ($jugador) {
        $_SESSION['jugador'] = $jugador;

         http_response_code(200);
        echo json_encode([
            'resultado' => true,
            'mensaje'   => "Inicio de sesión correcto"
        ]);
        exit;
        
    //Si los datos no coinciden, envía un JSON con el mensaje de error para evaluar en JavaScript.
    }else {
        http_response_code(401);
        echo json_encode([
            'resultado' => false,
            'mensaje' => "Nombre de usuario o contraseña incorrectos",
        ]);
        exit;
    }
//Si se pulsa el botón Registrarse, lleva al formulario de registro.
} elseif (filter_has_var(INPUT_POST, 'registrarse')) {
    header('Location: formregistro.php');
    exit;

}
