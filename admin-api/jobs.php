<?php

require_once __DIR__ . '/auth.php';
require_login();

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

function row_to_job(array $r): array
{
    return [
        'id' => (string)$r['id'],
        'title' => $r['title'],
        'department' => $r['department'],
        'location' => $r['location'],
        'description' => $r['description'],
        'is_open' => (bool)(int)$r['is_open'],
        'sort_order' => (int)$r['sort_order'],
        'created_at' => $r['created_at'],
        'updated_at' => $r['updated_at'],
    ];
}

if ($method === 'GET') {
    if ($id) {
        $stmt = $db->prepare('select * from job_openings where id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            send_json(['error' => 'Not found'], 404);
        }
        send_json(row_to_job($row));
    }

    $openOnly = isset($_GET['open']);
    $sql = 'select * from job_openings' . ($openOnly ? ' where is_open = 1' : '') . ' order by sort_order, id';
    send_json(array_map('row_to_job', $db->query($sql)->fetchAll()));
}

if ($method === 'POST') {
    $body = read_json_body();
    $title = trim((string)($body['title'] ?? ''));
    $department = trim((string)($body['department'] ?? ''));
    $location = trim((string)($body['location'] ?? '')) ?: 'Dar es Salaam, Tanzania';
    $description = trim((string)($body['description'] ?? ''));
    $sortOrder = (int)($body['sortOrder'] ?? 0);
    $isOpen = bool_val($body['isOpen'] ?? false);

    if ($title === '' || $department === '') {
        send_json(['error' => 'Title and department are required'], 400);
    }

    $stmt = $db->prepare(
        'insert into job_openings (title, department, location, description, is_open, sort_order)
         values (:title, :department, :location, :description, :is_open, :sort_order)'
    );
    $stmt->execute([
        'title' => $title,
        'department' => $department,
        'location' => $location,
        'description' => $description,
        'is_open' => $isOpen ? 1 : 0,
        'sort_order' => $sortOrder,
    ]);

    send_json(['ok' => true, 'id' => (string)$db->lastInsertId()], 201);
}

if ($method === 'PATCH') {
    if (!$id) {
        send_json(['error' => 'Missing id'], 400);
    }
    $body = read_json_body();
    $title = trim((string)($body['title'] ?? ''));
    $department = trim((string)($body['department'] ?? ''));
    $location = trim((string)($body['location'] ?? '')) ?: 'Dar es Salaam, Tanzania';
    $description = trim((string)($body['description'] ?? ''));
    $sortOrder = (int)($body['sortOrder'] ?? 0);
    $isOpen = bool_val($body['isOpen'] ?? false);

    if ($title === '' || $department === '') {
        send_json(['error' => 'Title and department are required'], 400);
    }

    $stmt = $db->prepare(
        'update job_openings
            set title = :title, department = :department, location = :location,
                description = :description, is_open = :is_open, sort_order = :sort_order,
                updated_at = now()
          where id = :id'
    );
    $stmt->execute([
        'title' => $title,
        'department' => $department,
        'location' => $location,
        'description' => $description,
        'is_open' => $isOpen ? 1 : 0,
        'sort_order' => $sortOrder,
        'id' => $id,
    ]);

    send_json(['ok' => true]);
}

if ($method === 'DELETE') {
    if (!$id) {
        send_json(['error' => 'Missing id'], 400);
    }
    $stmt = $db->prepare('delete from job_openings where id = :id');
    $stmt->execute(['id' => $id]);
    send_json(['ok' => true]);
}

send_json(['error' => 'Method Not Allowed'], 405);
