<?php
// One-off CLI script to create (or update) the first admin user.
// Usage: php admin-api/db/seed-admin.php
// Reads ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from config.php (env or config.local.php).

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';

$email = strtolower(trim((string)config('ADMIN_EMAIL', '')));
$password = (string)config('ADMIN_PASSWORD', '');
$name = (string)config('ADMIN_NAME', 'Astra Admin');

if ($email === '' || $password === '') {
    fwrite(STDERR, "ADMIN_EMAIL and ADMIN_PASSWORD must be set (env or config.local.php).\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

$db = get_db();
$stmt = $db->prepare('select id from admin_users where email = :email');
$stmt->execute(['email' => $email]);
$existing = $stmt->fetch();

if ($existing) {
    $stmt = $db->prepare('update admin_users set name = :name, password_hash = :hash where id = :id');
    $stmt->execute(['name' => $name, 'hash' => $hash, 'id' => $existing['id']]);
    echo "Updated existing admin user: {$email}\n";
} else {
    $stmt = $db->prepare('insert into admin_users (email, name, password_hash) values (:email, :name, :hash)');
    $stmt->execute(['email' => $email, 'name' => $name, 'hash' => $hash]);
    echo "Created admin user: {$email}\n";
}
