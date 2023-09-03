<?php

require __DIR__ . "/envirorment.php";

$build = new Seba\Build($settings);


$build->message("Building website...\n", 1);

if(is_dir($build::DIST_DIR)){
    $build->message("Removing old website...", 1);
    $build->rrmdir($build::DIST_DIR);
    $build->message("✔ Old Website removed  \n", 2, true);
}


$build->message("Creating pages...\n", 1);
$build->createPages();

$pagesCount = count($build->getPages()) + 1;
echo "\e[$pagesCount" . "A";
$build->message("✔ Pages created.", 2, true);
echo "\e[" . $pagesCount-1 . "B\n";


$build->message("Copying public directory...", 1);
$build->rcopy(ROOT_DIR . "/src/public/", $build::DIST_DIR);
$build->message("✔ Public directory copied \n", 2, true);

$build->message("Generating website previews...", 1);
$build->createPreviews();
$build->message("✔ Previews generated       \n", 2, true);

$build->message("Done! Enjoy your website\n", 1);