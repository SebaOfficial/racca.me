<?php
/**
 * Entry point for the web and page router
 * 
 * @package Seba
 * @author Sebastiano Racca
 */
declare(strict_types=1);

namespace Seba;

require_once __DIR__ . "/../envirorment.php";

if(str_starts_with($_SERVER['REQUEST_URI'], "/preview/")){
    $page = str_replace("/preview", "", $_SERVER['REQUEST_URI']);
    $previewPath = \ROOT_DIR . "/src/previews/" . urlencode($page) . ".png";

    if(file_exists($previewPath)){
        header('Content-Type: image/png');
        readfile($previewPath);
    } else{
        $image = new \mikehaertl\wkhtmlto\Image('https://' . $_SERVER['SERVER_NAME'] . $page);
        $image->saveAs($previewPath);
        $image->send();
    }

} else{
    $website->send(isset($_GET['api']));
}