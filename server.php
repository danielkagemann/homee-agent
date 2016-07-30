<?php

require_once('weatherconfig.inc');

$data = @unserialize(@file_get_contents('storage/data.json'));
if ($data === FALSE) {
    $data = array();
}

function T($m) {
    $fp = fopen('storage/had.log', 'at+');
    if ($fp) {
        fwrite($fp, $m . "\n");
        fclose($fp);
    }
}

function getWeather() {
    $weather = @unserialize(@file_get_contents('storage/weather.json'));
    if ($weather === FALSE) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://api.openweathermap.org/data/2.5/weather?zip={$WEATHER_ZIP}&appid={$WEATHER_APIKEY}");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        $response = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($httpcode>= 200 && $httpcode < 300) {

        }
    }
}


if ($_REQUEST['q'] == 'info') {
    echo json_encode($data);
} else if ($_REQUEST['q'] == 'weather') {
    // only get new weather if last call was 10 minutes ago or storage is empty



} else {
    $area = $_REQUEST['q'];
    $name = $_REQUEST['name'];
    $status = $_REQUEST['status'];

    T('   name={$name}');
    T('   status={$status}');

    $data[$area][$name] = $status == "1" ? true : false;
    @file_put_contents('storage/data.json', serialize($data));
}