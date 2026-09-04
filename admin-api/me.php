<?php

require_once __DIR__ . '/auth.php';

require_method('GET');
$user = require_login();

send_json(['user' => $user]);
