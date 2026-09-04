<?php

require_once __DIR__ . '/auth.php';
$user = require_login();

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    send_json(['user' => $user]);
}

if ($method === 'PATCH') {
    $body = read_json_body();
    $name = trim((string)($body['name'] ?? ''));
    if ($name === '') {
        send_json(['error' => 'Name is required'], 400);
    }

    $stmt = $db->prepare('update admin_users set name = :name where id = :id');
    $stmt->execute(['name' => $name, 'id' => $user['id']]);

    $_SESSION['user']['name'] = $name;
    send_json(['ok' => true, 'user' => $_SESSION['user']]);
}

send_json(['error' => 'Method Not Allowed'], 405);
