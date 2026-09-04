<?php

function config(string $key, ?string $default = null): ?string
{
    static $local = null;
    if ($local === null) {
        $local = [];
        $localFile = __DIR__ . '/config.local.php';
        if (is_file($localFile)) {
            $local = require $localFile;
        }
    }

    $env = getenv($key);
    if ($env !== false && $env !== '') {
        return $env;
    }

    return $local[$key] ?? $default;
}
