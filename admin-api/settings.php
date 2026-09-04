<?php

require_once __DIR__ . '/auth.php';
require_login();

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query(
        'select phone_display, phone_tel, email_info, email_operations,
                address_line1, address_line2, hours_weekday, hours_saturday
           from company_settings where id = 1'
    );
    $contact = $stmt->fetch() ?: null;

    $socialsStmt = $db->query('select network, url, is_published from social_links order by sort_order, id');
    $socials = array_map(static function (array $r): array {
        return [
            'network' => $r['network'],
            'url' => $r['url'],
            'is_published' => (bool)(int)$r['is_published'],
        ];
    }, $socialsStmt->fetchAll());

    send_json(['contact' => $contact, 'socials' => $socials]);
}

if ($method === 'PATCH') {
    $body = read_json_body();
    $contact = is_array($body['contact'] ?? null) ? $body['contact'] : [];

    $fieldMap = [
        'phoneDisplay' => 'phone_display',
        'phoneTel' => 'phone_tel',
        'emailInfo' => 'email_info',
        'emailOperations' => 'email_operations',
        'addressLine1' => 'address_line1',
        'addressLine2' => 'address_line2',
        'hoursWeekday' => 'hours_weekday',
        'hoursSaturday' => 'hours_saturday',
    ];

    $values = [];
    foreach ($fieldMap as $jsonKey => $column) {
        $value = trim((string)($contact[$jsonKey] ?? ''));
        if ($value === '') {
            send_json(['error' => 'All contact fields are required'], 400);
        }
        $values[$column] = $value;
    }

    $stmt = $db->prepare(
        'update company_settings
            set phone_display = :phone_display,
                phone_tel = :phone_tel,
                email_info = :email_info,
                email_operations = :email_operations,
                address_line1 = :address_line1,
                address_line2 = :address_line2,
                hours_weekday = :hours_weekday,
                hours_saturday = :hours_saturday,
                updated_at = now()
          where id = 1'
    );
    $stmt->execute($values);

    send_json(['ok' => true]);
}

send_json(['error' => 'Method Not Allowed'], 405);
