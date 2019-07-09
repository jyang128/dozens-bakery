<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

startUp();

if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
}

$orderId = $_GET['orderId'];
$query = "SELECT * FROM `orders` WHERE id = {$orderId}";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception( mysqli_error($conn) );
}

if ($result) {
    if ($result) {
        $numRows = mysqli_num_rows($result);
    } else {
        throw new Exception('there is an error' . mysqli_error($conn));
    }

    if ($numRows === 0) {
        throw new Exception("order not found");
    }

    $output = [];

    while ($row = mysqli_fetch_assoc($result)) {
    $output[] = $row;
    }
} else {
    throw new Exception("failed to retrieve order: " . mysqli_error($conn));
}

$json_output = json_encode($output);
print $json_output;
?>