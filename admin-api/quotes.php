<?php

require_once __DIR__ . '/auth.php';
require_login();

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

function row_to_quote(array $r): array
{
    return [
        'id' => (string)$r['id'],
        'company_name' => $r['company_name'],
        'contact_person' => $r['contact_person'],
        'phone' => $r['phone'],
        'email' => $r['email'],
        'service_type' => $r['service_type'],
        'details' => $r['details'],
        'status' => $r['status'],
        'notes' => $r['notes'],
        'created_at' => $r['created_at'],
        'updated_at' => $r['updated_at'],
    ];
}

if ($method === 'GET') {
    if ($id) {
        $stmt = $db->prepare('select * from quote_requests where id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            send_json(['error' => 'Not found'], 404);
        }
        send_json(row_to_quote($row));
    }

    $stmt = $db->query('select * from quote_requests order by created_at desc');
    send_json(array_map('row_to_quote', $stmt->fetchAll()));
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
        'update quote_requests set status = :status, notes = :notes, updated_at = now() where id = :id'
    );
    $stmt->execute(['status' => $status, 'notes' => $notes, 'id' => $id]);

    send_json(['ok' => true]);
}

send_json(['error' => 'Method Not Allowed'], 405);
