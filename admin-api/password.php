<?php

require_once __DIR__ . '/auth.php';
$user = require_login();
require_method('PATCH');

$db = get_db();
$body = read_json_body();
$current = (string)($body['currentPassword'] ?? '');
$next = (string)($body['newPassword'] ?? '');

if (strlen($next) < 8) {
    send_json(['error' => 'New password must be at least 8 characters'], 400);
}

$stmt = $db->prepare('select password_hash from admin_users where id = :id');
$stmt->execute(['id' => $user['id']]);
$row = $stmt->fetch();
if (!$row) {
    send_json(['error' => 'User not found'], 404);
}

if (!verify_password($current, $row['password_hash'])) {
    send_json(['error' => 'Current password is incorrect'], 403);
}

$hash = hash_password($next);
$stmt = $db->prepare('update admin_users set password_hash = :hash where id = :id');
$stmt->execute(['hash' => $hash, 'id' => $user['id']]);

send_json(['ok' => true]);
