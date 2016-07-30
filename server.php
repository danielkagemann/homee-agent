<?php

$data = @unserialize(@file_get_contents('data.json'));

function T($m) {
    $fp = fopen('had.log', 'at+');
    if ($fp) {
        fwrite($fp, $m . "\n");
        fclose($fp);
    }
}

T('request ' . $_REQUEST['q']);

if ($_REQUEST['q'] == 'info') {
    echo json_encode($data);
    T('  ' . json_encode($data));
} else {
    $area = $_REQUEST['q'];
    $name = $_REQUEST['name'];
    $status = $_REQUEST['status'];

    T('   name={$name}');
    T('   status={$status}');

    $data[$area][$name] = $status == "1" ? true : false;
    @file_put_contents('data.json', serialize($data));
}