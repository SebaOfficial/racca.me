<?php

require_once __DIR__ . "/envirorment.php";

$pages = PHPStatic\Sys::getDir(ROOT_DIR . "/dist/", ["html"]);

foreach ($pages as $page) {
    list($lang, $name) = explode('/', PHPStatic\Builder::removeExtension($page));


    $client = new GuzzleHttp\Client();

    try {
        $response = $client->get("https://screeenshot-api.com/screenshot?url=" . $_ENV['WEBSITE_URL']);

        if ($response->getStatusCode() === 200) {
            $imageData = $response->getBody()->getContents();

            if(!is_dir(ROOT_DIR . "/dist/assets/previews/")){
                mkdir(ROOT_DIR . "/dist/assets/previews/", 0744, true);
            }

            file_put_contents(ROOT_DIR . "/dist/assets/previews/$lang-$name.png", $imageData);

        } else {
            PHPStatic\Sys::message("Failed to retrieve the image [" . $response->getStatusCode() . "]: " . $response->getBody() . "\n", 3);
            exit(1);
        }

    } catch (Exception $e) {
        PHPStatic\Sys::message("An error occurred: " . $e->getMessage() . "\n", 3);
        exit(1);
    }
}