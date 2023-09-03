<?php

namespace Seba;

define("ROOT_DIR", dirname(__DIR__));

require_once ROOT_DIR . "/vendor/autoload.php";

$dotenv = \Dotenv\Dotenv::createImmutable(ROOT_DIR);
$dotenv->load();

$settings = json_decode(strtr(
    file_get_contents(ROOT_DIR . "/src/racca.me.json"), [
        "@" => ROOT_DIR
    ]
));

$website = new Website($settings);