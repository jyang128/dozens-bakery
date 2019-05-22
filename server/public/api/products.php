<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

// header('Content-Type: application/json');

// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }

$query = "SELECT * FROM `products`";
$result = mysqli_query($conn, $query);

if(!$result){
  print('error message: '.mysqli_connect_error());
  exit();
}

$numRows = mysqli_num_rows($result);

if(!$numRows){
    print('No data available!');
    exit();
}

$output = [];

while ($row = mysqli_fetch_assoc($result)) {
   array_push($output, $row);
}

$json_output = json_encode($output);
print($json_output);

?>
