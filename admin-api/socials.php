<?php

require_once __DIR__ . '/auth.php';
require_login();
require_method('PATCH');

$db = get_db();
$body = read_json_body();
$networks = ['facebook', 'instagram', 'linkedin', 'x', 'tiktok'];

$stmt = $db->prepare(
    'update social_links set url = :url, is_published = :is_published, updated_at = now() where network = :network'
);

foreach ($networks as $network) {
    $entry = is_array($body[$network] ?? null) ? $body[$network] : [];
    $url = trim((string)($entry['url'] ?? ''));
    $isPublished = bool_val($entry['is_published'] ?? false);
    $stmt->execute(['url' => $url, 'is_published' => $isPublished ? 1 : 0, 'network' => $network]);
}

send_json(['ok' => true]);
