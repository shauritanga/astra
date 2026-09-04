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
$fullName = trim((string)($body['fullName'] ?? ''));
$companyName = trim((string)($body['companyName'] ?? ''));
$email = trim((string)($body['email'] ?? ''));
$phone = trim((string)($body['phone'] ?? ''));
$subject = trim((string)($body['subject'] ?? ''));
$message = trim((string)($body['message'] ?? ''));

if ($fullName === '' || $companyName === '' || $email === '' || $phone === '' || $subject === '' || $message === '') {
    send_public_json(['error' => 'All fields are required.'], 400, $origin);
}
if (strlen($message) > 8000) {
    send_public_json(['error' => 'Message is too long.'], 400, $origin);
}

$db = get_db();
$stmt = $db->prepare(
    'insert into contact_messages (full_name, company_name, email, phone, subject, message)
     values (:full_name, :company_name, :email, :phone, :subject, :message)'
);
$stmt->execute([
    'full_name' => $fullName,
    'company_name' => $companyName,
    'email' => $email,
    'phone' => $phone,
    'subject' => $subject,
    'message' => $message,
]);

send_public_json(['ok' => true], 201, $origin);
