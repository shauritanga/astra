<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../cors.php';

$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    handle_public_options($origin);
}

$db = get_db();

$contact = $db->query(
    'select phone_display, phone_tel, email_info, email_operations,
            address_line1, address_line2, hours_weekday, hours_saturday
       from company_settings where id = 1'
)->fetch();

if (!$contact) {
    send_public_json(['error' => 'Site content is not configured.'], 503, $origin);
}

$services = $db->query(
    'select id, slug, title, summary, body, image_url, icon_key
       from services where is_published = 1 order by sort_order, id'
)->fetchAll();

$jobs = $db->query(
    'select id, title, department, location, description
       from job_openings where is_open = 1 order by sort_order, id'
)->fetchAll();

$socials = $db->query(
    'select network, url from social_links where is_published = 1 order by sort_order, id'
)->fetchAll();

$payload = [
    'contact' => [
        'phoneDisplay' => $contact['phone_display'],
        'phoneTel' => $contact['phone_tel'],
        'emailInfo' => $contact['email_info'],
        'emailOperations' => $contact['email_operations'],
        'addressLine1' => $contact['address_line1'],
        'addressLine2' => $contact['address_line2'],
        'hoursWeekday' => $contact['hours_weekday'],
        'hoursSaturday' => $contact['hours_saturday'],
    ],
    'services' => array_map(static fn(array $s): array => [
        'id' => (string)$s['id'],
        'slug' => $s['slug'],
        'title' => $s['title'],
        'summary' => $s['summary'],
        'body' => $s['body'],
        'imageUrl' => $s['image_url'],
        'iconKey' => $s['icon_key'],
    ], $services),
    'jobs' => array_map(static fn(array $j): array => [
        'id' => (string)$j['id'],
        'title' => $j['title'],
        'department' => $j['department'],
        'location' => $j['location'],
        'description' => $j['description'],
    ], $jobs),
    'socials' => array_values(array_filter(array_map(static function (array $s): ?array {
        $url = trim($s['url']);
        if ($url === '' || $url === '#') {
            return null;
        }
        return ['network' => $s['network'], 'url' => $url];
    }, $socials))),
];

send_public_json($payload, 200, $origin);
