<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

startUp();

if (empty($_GET['id'])){
  $productQuery = "SELECT * FROM `products`";
} else {
  if( !is_numeric($_GET['id']) ){
    throw new Exception('id needs to be a number!');
  }
  $whereClause = "WHERE p.`id`={$_GET['id']}";
  $imageQuery = "SELECT p.*, GROUP_CONCAT(i.`url`) AS url FROM `products` AS p JOIN `images` AS i ON p.`id` = i.`product_id` ".$whereClause." GROUP BY p.`id`";
  $productQuery = "SELECT * FROM `products` WHERE id={$_GET['id']}";
}

$productResult = mysqli_query($conn, $productQuery);

if($productResult){
  if(!empty($_GET['id'])) {
    $imageResult = mysqli_query($conn, $imageQuery);
  }
} else {
  throw new Exception('error message: '.mysqli_connect_error());
}

$numRowsProduct = mysqli_num_rows($productResult);

if(!empty($_GET['id'])) {
  $numRowsImage = mysqli_num_rows($imageResult);
}

if(!$numRowsProduct){
    if (!empty($_GET['id'])){
      throw new Exception('Invalid Id: '.$_GET['id']);
    }
} 

$output = [];

while ($row = mysqli_fetch_assoc($productResult)) {
   $row['id'] = intval($row['id']);
   $row['price'] = intval($row['price']);
   if(!empty($_GET['id'])) {
    while ($imageRow = mysqli_fetch_assoc($imageResult)){
      $row['url'] = explode( ',', $imageRow['url']);
    }
   }
   $output[] = $row;
}

$json_output = json_encode($output);
print($json_output);

?>
