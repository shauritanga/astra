<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../cors.php';
require_once __DIR__ . '/../json.php';

$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    handle_public_options($origin);
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_public_json(['error' => 'Method Not Allowed'], 405, $origin);
}

$body = read_json_body();
$companyName = trim((string)($body['companyName'] ?? ''));
$contactPerson = trim((string)($body['contactPerson'] ?? ''));
$phone = trim((string)($body['phone'] ?? ''));
$email = trim((string)($body['email'] ?? ''));
$serviceType = trim((string)($body['serviceType'] ?? ''));
$details = trim((string)($body['details'] ?? ''));

if ($companyName === '' || $contactPerson === '' || $phone === '' || $email === '' || $serviceType === '' || $details === '') {
    send_public_json(['error' => 'All fields are required.'], 400, $origin);
}
if (strlen($details) > 8000 || strlen($companyName) > 200) {
    send_public_json(['error' => 'One or more fields are too long.'], 400, $origin);
}

$db = get_db();
$stmt = $db->prepare(
    'insert into quote_requests (company_name, contact_person, phone, email, service_type, details)
     values (:company_name, :contact_person, :phone, :email, :service_type, :details)'
);
$stmt->execute([
    'company_name' => $companyName,
    'contact_person' => $contactPerson,
    'phone' => $phone,
    'email' => $email,
    'service_type' => $serviceType,
    'details' => $details,
]);

send_public_json(['ok' => true], 201, $origin);
