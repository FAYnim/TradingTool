<?php
// Contoh data (ganti dengan data dari sumber yang sebenarnya)
$data = array(
  "h24" => rand(100, 200) / 100.0,
  "cp" => rand(90, 210) / 100.0,
  "l24" => rand(80, 220) / 100.0
);

// Set header untuk mengindikasikan bahwa kita mengirimkan JSON
header('Content-Type: application/json');

// Encode array PHP ke JSON
echo json_encode($data);
?>
