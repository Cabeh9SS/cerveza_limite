<?php

session_start();

header('Content-Type: application/json');

//Si se pulsa el botón volver.
if(filter_has_var(INPUT_GET, 'volver')){
    header('Location:index.php');
}

//Inicia la variable de la respuesta JSON.
$respuesta = ['success' => false, 'message' => '', 'ranking' => []];

//Recuperación y verificación de los datos de la sesión.
if(isset($_SESSION['ranking_data'])){
    $partidas = $_SESSION['ranking_data'];
    unset($_SESSION['ranking_data']);
    if (is_array($partidas) && !empty($partidas)) {
        http_response_code(200);
        $respuesta['success'] = true;
        $respuesta['message'] = 'Partidas recuperadas con éxito.';
        $respuesta['ranking'] = $partidas;
    } else {
        http_response_code(200);
        $respuesta['success'] = true;
        $respuesta['message'] = 'El jugador no tiene partidas finalizadas.';
        $respuesta['ranking'] = [];
    }
}else {
    http_response_code(400); 
    $respuesta['message'] = 'No hay datos de ranking disponibles. Por favor, vuelve al Menú Principal.';
}

// Devuelve la respuesta final en formato JSON para JavaScript
echo json_encode($respuesta);
exit;


