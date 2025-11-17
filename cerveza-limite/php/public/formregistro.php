<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../src/ClasesDAO/JugadorDAO.php';

use src\ClasesDAO\JugadorDAO;

header('Content-Type: application/json');

//Instanciar objeto para hacer peticiones a la bbdd.
$jugadorDAO = new JugadorDAO($bd);

//Crear variables para recuperar datos introducidos por el jugador y gestión de errores con expresiones regulares.
$usuario=trim(filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_STRING));
$usuarioRegExp = "/^[a-zA-Z0-9_]{5,15}$/";
$clave=trim(filter_input(INPUT_POST, 'clave', FILTER_SANITIZE_STRING));
$claveRegExp = "/^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,20}$/";

$errores = [];

//Si se pulsa el botón Confirmar.
if(filter_has_var(INPUT_POST, 'confirmar')){
    //Se realiza la validación de los datos introducidos, y se devuelve un archivo JSON con el resultado para interpretar en JavaScript.
    if(!preg_match($usuarioRegExp, $usuario)){
        $errores['usuario'] = "El usuario es obligatorio y debe contener de 5 a 15 caracteres (letras y/o números)";
    }
    if(!preg_match($claveRegExp, $clave)){
        $errores['clave'] = "Introduce una contraseña válida. Requisitos: entre 8 y 20 caracteres (letras y/o números), "
        . "al menos una letra mayúscula, al menos un número y al menos un carácter especial";
    }
    if(count($errores) > 0){
        http_response_code(400);
        echo json_encode([
            'resultado' => false,
            'mensaje' => "Error de validación en el formulario",
            'errores' => $errores
        ]);
        exit;
    }else{
        //Si los datos introducidos son correctos, persiste el jugador en la bbdd.
        $jugadorDAO->creaJugador($usuario, $clave);
        http_response_code(200);
        echo json_encode([
            'resultado' => true,
            'mensaje' => 'Usuario creado con éxito'
        ]);
        exit;
    }
} else {
    // Aquí lo único que añado: una respuesta JSON si alguien llama sin 'confirmar'
    http_response_code(400);
    echo json_encode([
        'resultado' => false,
        'mensaje'   => 'Solicitud inválida.'
    ]);
    exit;
}
