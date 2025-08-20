<?php
// public/steam_news.php

// Only allow GET requests - check early
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit('Method not allowed');
}

// Set headers efficiently
header('Content-Type: application/rss+xml; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: public, max-age=300');

// Initialize cURL with error handling
if (($ch = curl_init()) === false) {
    http_response_code(500);
    exit('Failed to initialize cURL');
}

// Set cURL options in one call for efficiency
curl_setopt($ch, CURLOPT_URL, 'https://steamcommunity.com/games/2850000/rss/');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 3);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_USERAGENT, 'Reborn Fansite RSS Proxy/1.0');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/rss+xml, application/xml, text/xml, */*']);

// Execute request and get info in one go
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for cURL errors before closing
if ($response === false) {
    $error = curl_error($ch);
    curl_close($ch);
    http_response_code(502);
    exit('Failed to fetch RSS feed: ' . $error);
}

curl_close($ch);

// Check HTTP response code
if ($httpCode !== 200) {
    http_response_code($httpCode);
    exit('Steam RSS returned HTTP ' . $httpCode);
}

// Optimized XML validation - check length and first 5 chars
if (strlen($response) < 5 || substr($response, 0, 5) !== '<?xml') {
    http_response_code(502);
    exit('Invalid RSS response from Steam');
}

// Output response
echo $response;