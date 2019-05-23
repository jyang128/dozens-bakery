<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

startUp();

if (empty($_GET['id'])){
  $whereClause = '';
} else {
  if( !is_numeric($_GET['id']) ){
    throw new Exception('id needs to be a number!');
  }
  $whereClause = "WHERE id={$_GET['id']}";
}

$query = "SELECT * FROM `products` ".$whereClause;
$result = mysqli_query($conn, $query);

if(!$result){
  throw new Exception('error message: '.mysqli_connect_error());
}

$numRows = mysqli_num_rows($result);

if(!$numRows){
    if (!empty($_GET['id'])){
      throw new Exception('Invalid Id: '.$_GET['id']);
    }
} 

$output = [];

while ($row = mysqli_fetch_assoc($result)) {
   $row['id'] = intval($row['id']);
   $row['price'] = intval($row['price']);
   $output[] = $row;
}

$json_output = json_encode($output);
print($json_output);

?>
