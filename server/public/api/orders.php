<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

startUp();

if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
}

$item = file_get_contents('php://input');
$item = json_decode($item, true);

$customer_name = $item['name'];
$phone_number = addslashes($item['phoneNum']);
$special_instr = addslashes($item['specialInstr']);
$cart_items = $item['cart'];

$query = "INSERT INTO `orders` (`customer_name`, `phone_number`, `special_instr`, `cart_items`) VALUES ('{$customer_name}','{$phone_number}', '{$special_instr}', '{$cart_items}')";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception( mysqli_error($conn) );
}

if ($result) {
    
    $lastId = mysqli_insert_id($conn);
    $getQuery = "SELECT * FROM `orders` WHERE id = {$lastId}";
    $result = mysqli_query($conn, $getQuery);

    if ($result) {
        $numRows = mysqli_num_rows($result);
    } else {
        throw new Exception('there is an error' . mysqli_error($conn));
    }

    if ($numRows === 0) {
        throw new Exception("no orders found");
    }

    $output = [];

    while ($row = mysqli_fetch_assoc($result)) {   
        $output[] = $row;
    }

} else {
    throw new Exception("failed to create order: " . mysqli_error($conn));
}

$json_output = json_encode($output);
print $json_output;
