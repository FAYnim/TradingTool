<?php
function get_market_data($market){
	$url = "https://indodax.com/api/ticker/dogeidr";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	$response = curl_exec($ch);
	$decode = json_decode($response, 1);
	curl_close($ch);
	return $decode;
}

$data = get_market_data("dogeidr");
$high = $data["ticker"]["high"];
$low = $data["ticker"]["low"];
$last = $data["ticker"]["last"];
$r = array(
	"high" => $high,
	"low" => $low,
	"last" => $last,
	"data" => $data
);

header('Content-Type: application/json');

echo json_encode($r);
?>
