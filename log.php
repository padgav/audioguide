<?php 
$data = $_POST['card'] . "," . $_POST['question'] . "," . $_POST['answer'] . "\n";
file_put_contents('log.txt', $data, FILE_APPEND);
?>
