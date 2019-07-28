<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

startUp();

if(!$conn){
    throw new Exception('there is an error' . mysqli_connect_error());
}

if(empty($_GET['orderId'])){
    $item = file_get_contents('php://input');
    $item = json_decode($item, true);

    $customer_name = test_input($item['name']);
    $phone_number = test_input($item['phoneNum']);
    $special_instr = test_input($item['specialInstr']);
    $cart_items = test_input($item['cart']);
    
    $query = "INSERT INTO `orders` (`customer_name`, `phone_number`, `special_instr`, `cart_items`) VALUES ('{$customer_name}','{$phone_number}', '{$special_instr}', '{$cart_items}')";

} else {
    if( !is_numeric($_GET['orderId']) ){
        throw new Exception('order id needs to be a number');
    }
    $orderId = $_GET['orderId'];
    $query = "SELECT * FROM `orders` WHERE id = {$orderId}";
} 

$result = mysqli_query($conn, $query);

if(!$result){
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        throw new Exception("failed to retrieve order: " . mysqli_error($conn));
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        throw new Exception("failed to create order: " . mysqli_error($conn));
    }
}

$output = [];

if(empty($_GET['orderId'])){
    $lastId = mysqli_insert_id($conn);
    $output['orderId'] = $lastId;
} else {
    if (mysqli_num_rows($result) === 0) {
        throw new Exception("No orders found.");
    } else {
        while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
        }
    }
}

$json_output = json_encode($output);
print $json_output;
?>