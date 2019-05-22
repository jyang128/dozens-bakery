<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

startUp();

if (empty($_GET['id'])){
  $whereClause = '';
} else {
  $whereClause = "WHERE id=".$_GET['id'];
}

$query = "SELECT * FROM `products` ".$whereClause;
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
   $output[] = $row;
}

$json_output = json_encode($output);
print($json_output);

?>
