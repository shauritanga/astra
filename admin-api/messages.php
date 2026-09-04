<?php

require_once __DIR__ . '/auth.php';
require_login();

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

function row_to_message(array $r): array
{
    return [
        'id' => (string)$r['id'],
        'full_name' => $r['full_name'],
        'company_name' => $r['company_name'],
        'email' => $r['email'],
        'phone' => $r['phone'],
        'subject' => $r['subject'],
        'message' => $r['message'],
        'status' => $r['status'],
        'notes' => $r['notes'],
        'created_at' => $r['created_at'],
        'updated_at' => $r['updated_at'],
    ];
}

if ($method === 'GET') {
    if ($id) {
        $stmt = $db->prepare('select * from contact_messages where id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            send_json(['error' => 'Not found'], 404);
        }
        send_json(row_to_message($row));
    }

    $stmt = $db->query('select * from contact_messages order by created_at desc');
    send_json(array_map('row_to_message', $stmt->fetchAll()));
}

if ($method === 'PATCH') {
    if (!$id) {
        send_json(['error' => 'Missing id'], 400);
    }
    $body = read_json_body();
    $status = (string)($body['status'] ?? '');
    $notes = trim((string)($body['notes'] ?? ''));
    $notes = $notes === '' ? null : $notes;

    if (!in_array($status, ['new', 'in_progress', 'closed'], true)) {
        send_json(['error' => 'Invalid status'], 400);
    }

    $stmt = $db->prepare(
        'update contact_messages set status = :status, notes = :notes, updated_at = now() where id = :id'
    );
    $stmt->execute(['status' => $status, 'notes' => $notes, 'id' => $id]);

    send_json(['ok' => true]);
}

send_json(['error' => 'Method Not Allowed'], 405);
