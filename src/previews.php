<?php

require_once __DIR__ . "/envirorment.php";

$pages = PHPStatic\Sys::getDir(ROOT_DIR . "/dist/", ["html"]);

foreach ($pages as $page) {
    list($lang, $name) = explode('/', str_replace("index", "", PHPStatic\Builder::removeExtension($page)));

    exec("wkhtmltoimage --width 1024 --height 768 --javascript-delay 2000 'https://racca.me/$page' 'dist/assets/previews/$lang-$name.png'");
}