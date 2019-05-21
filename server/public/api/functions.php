<?php

function error_handler($error){
    $output = [
        'succcess' => false,
        'error' => $error->getMessage()
    ];
    $json_output = json_encode($output);
    print($json_output);
}

?>