<?php
/**
 * Entry point for the web and page router
 * 
 * @package Seba
 * @author Sebastiano Racca
 */
declare(strict_types=1);

namespace Seba;

define("ROOT_DIR", dirname(dirname(__DIR__)));

require_once ROOT_DIR . "/vendor/autoload.php";

$settings = json_decode(strtr(
    file_get_contents(ROOT_DIR . "/src/racca.me.json"), [
        "@" => ROOT_DIR
    ]
));

$website = new Components\Website($settings);

$website->send(isset($_GET['api']));