<?php

function error_handler($error){
    http_response_code(500);
    $output = [
        'succcess' => false,
        'error' => $error->getMessage()
    ];
    $json_output = json_encode($output);
    print($json_output);
}

function startUp(){
    header("Content-Type: application/json");
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}

?>