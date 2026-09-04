<?php

require_once __DIR__ . '/config.php';

const PUBLIC_CORS_DEFAULT_ORIGINS =
    'http://localhost:5173,http://127.0.0.1:5173,https://astranova.co.tz,https://www.astranova.co.tz';

function public_cors_headers(?string $origin): array
{
    $allowed = array_map('trim', explode(',', config('PUBLIC_ORIGINS', PUBLIC_CORS_DEFAULT_ORIGINS)));
    $allowOrigin = ($origin && in_array($origin, $allowed, true)) ? $origin : $allowed[0];

    return [
        'Access-Control-Allow-Origin' => $allowOrigin,
        'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type',
        'Vary' => 'Origin',
    ];
}

function send_public_json($data, int $status = 200, ?string $origin = null): void
{
    foreach (public_cors_headers($origin) as $name => $value) {
        header("$name: $value");
    }
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function handle_public_options(?string $origin): void
{
    foreach (public_cors_headers($origin) as $name => $value) {
        header("$name: $value");
    }
    http_response_code(204);
    exit;
}
