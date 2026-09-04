<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/json.php';

session_name(config('ADMIN_SESSION_NAME', 'astra_admin_sess'));

$__isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

session_set_cookie_params([
    'lifetime' => 60 * 60 * 24 * 7,
    'path' => '/',
    'samesite' => 'Lax',
    'secure' => $__isHttps,
    'httponly' => true,
]);
session_start();

function current_user(): ?array
{
    return $_SESSION['user'] ?? null;
}

function require_login(): array
{
    $user = current_user();
    if (!$user) {
        send_json(['error' => 'Unauthorized'], 401);
    }
    return $user;
}

function find_user_by_email(string $email): ?array
{
    $stmt = get_db()->prepare(
        'select id, email, name, role, password_hash from admin_users where email = :email limit 1'
    );
    $stmt->execute(['email' => strtolower($email)]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function verify_password(string $password, string $hash): bool
{
    return password_verify($password, $hash);
}

function hash_password(string $password): string
{
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}
