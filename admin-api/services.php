<?php

require_once __DIR__ . '/auth.php';
require_login();

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

$ICON_KEYS = ['truck', 'globe', 'clipboard', 'hardhat'];

function slugify_service(string $value): string
{
    $slug = strtolower($value);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    $slug = substr($slug, 0, 80);
    return $slug !== '' ? $slug : 'service';
}

function unique_service_slug(PDO $db, string $base, ?int $excludeId = null): string
{
    $slug = slugify_service($base);
    for ($i = 2; $i < 50; $i++) {
        if ($excludeId !== null) {
            $stmt = $db->prepare('select id from services where slug = :slug and id <> :id');
            $stmt->execute(['slug' => $slug, 'id' => $excludeId]);
        } else {
            $stmt = $db->prepare('select id from services where slug = :slug');
            $stmt->execute(['slug' => $slug]);
        }
        if (!$stmt->fetch()) {
            return $slug;
        }
        $slug = slugify_service($base) . '-' . $i;
    }
    return slugify_service($base) . '-' . time();
}

function row_to_service(array $r): array
{
    return [
        'id' => (string)$r['id'],
        'slug' => $r['slug'],
        'title' => $r['title'],
        'summary' => $r['summary'],
        'body' => $r['body'],
        'image_url' => $r['image_url'],
        'icon_key' => $r['icon_key'],
        'sort_order' => (int)$r['sort_order'],
        'is_published' => (bool)(int)$r['is_published'],
        'created_at' => $r['created_at'],
        'updated_at' => $r['updated_at'],
    ];
}

if ($method === 'GET') {
    if ($id) {
        $stmt = $db->prepare('select * from services where id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            send_json(['error' => 'Not found'], 404);
        }
        send_json(row_to_service($row));
    }

    $publishedOnly = isset($_GET['published']);
    $sql = 'select * from services' . ($publishedOnly ? ' where is_published = 1' : '') . ' order by sort_order, id';
    send_json(array_map('row_to_service', $db->query($sql)->fetchAll()));
}

if ($method === 'POST') {
    $body = read_json_body();
    $title = trim((string)($body['title'] ?? ''));
    $summary = trim((string)($body['summary'] ?? ''));
    $bodyText = trim((string)($body['body'] ?? ''));
    $imageUrl = trim((string)($body['imageUrl'] ?? ''));
    $iconKey = in_array($body['iconKey'] ?? '', $ICON_KEYS, true) ? $body['iconKey'] : 'truck';
    $sortOrder = (int)($body['sortOrder'] ?? 0);
    $isPublished = bool_val($body['isPublished'] ?? false);

    if ($title === '' || $summary === '' || $bodyText === '' || $imageUrl === '') {
        send_json(['error' => 'Required service fields are missing'], 400);
    }

    $slug = unique_service_slug($db, $title);
    $stmt = $db->prepare(
        'insert into services (slug, title, summary, body, image_url, icon_key, sort_order, is_published)
         values (:slug, :title, :summary, :body, :image_url, :icon_key, :sort_order, :is_published)'
    );
    $stmt->execute([
        'slug' => $slug,
        'title' => $title,
        'summary' => $summary,
        'body' => $bodyText,
        'image_url' => $imageUrl,
        'icon_key' => $iconKey,
        'sort_order' => $sortOrder,
        'is_published' => $isPublished ? 1 : 0,
    ]);

    send_json(['ok' => true, 'id' => (string)$db->lastInsertId()], 201);
}

if ($method === 'PATCH') {
    if (!$id) {
        send_json(['error' => 'Missing id'], 400);
    }
    $body = read_json_body();
    $title = trim((string)($body['title'] ?? ''));
    $summary = trim((string)($body['summary'] ?? ''));
    $bodyText = trim((string)($body['body'] ?? ''));
    $imageUrl = trim((string)($body['imageUrl'] ?? ''));
    $iconKey = in_array($body['iconKey'] ?? '', $ICON_KEYS, true) ? $body['iconKey'] : 'truck';
    $sortOrder = (int)($body['sortOrder'] ?? 0);
    $isPublished = bool_val($body['isPublished'] ?? false);

    if ($title === '' || $summary === '' || $bodyText === '' || $imageUrl === '') {
        send_json(['error' => 'Required service fields are missing'], 400);
    }

    $stmt = $db->prepare(
        'update services
            set title = :title, summary = :summary, body = :body, image_url = :image_url,
                icon_key = :icon_key, sort_order = :sort_order, is_published = :is_published,
                updated_at = now()
          where id = :id'
    );
    $stmt->execute([
        'title' => $title,
        'summary' => $summary,
        'body' => $bodyText,
        'image_url' => $imageUrl,
        'icon_key' => $iconKey,
        'sort_order' => $sortOrder,
        'is_published' => $isPublished ? 1 : 0,
        'id' => $id,
    ]);

    send_json(['ok' => true]);
}

if ($method === 'DELETE') {
    if (!$id) {
        send_json(['error' => 'Missing id'], 400);
    }
    $stmt = $db->prepare('delete from services where id = :id');
    $stmt->execute(['id' => $id]);
    send_json(['ok' => true]);
}

send_json(['error' => 'Method Not Allowed'], 405);
