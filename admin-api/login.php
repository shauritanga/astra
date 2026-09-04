<?php

require_once __DIR__ . '/auth.php';

require_method('POST');

$body = read_json_body();
$email = strtolower(trim((string)($body['email'] ?? '')));
$password = (string)($body['password'] ?? '');

if ($email === '' || $password === '') {
    send_json(['error' => 'Email and password are required.'], 400);
}

$user = find_user_by_email($email);
if (!$user || !verify_password($password, $user['password_hash'])) {
    send_json(['error' => 'Invalid email or password.'], 401);
}

$_SESSION['user'] = [
    'id' => (string)$user['id'],
    'email' => $user['email'],
    'name' => $user['name'],
    'role' => $user['role'],
];

send_json(['ok' => true, 'user' => $_SESSION['user']]);
