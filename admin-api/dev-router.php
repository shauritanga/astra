<?php
// Local dev only. Run from the repo root:
//   php -d extension=pdo_mysql -S localhost:8000 -t . admin-api/dev-router.php
//
// Maps /api/* requests to admin-api/*, mirroring production where admin-api/'s
// contents are uploaded into an api/ subdirectory of the admin document root.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (strpos($uri, '/api/') === 0) {
    $file = __DIR__ . '/' . substr($uri, strlen('/api/'));
    if (is_file($file)) {
        chdir(dirname($file));
        require $file;
        return true;
    }
    http_response_code(404);
    return true;
}

return false;
