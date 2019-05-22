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

startUp();

function startup(){
    header("Content-type:application/json");
}

?>