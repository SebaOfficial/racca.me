<?php
/**
 * Build Class.
 * This class provides the methods to build the website.
 * 
 * @package Seba
 * @author Sebastiano Racca
 */
declare(strict_types=1);

namespace Seba;


final class Build extends Website{
    public const DIST_DIR = \ROOT_DIR . "/dist/";

    public function __construct(object $settings){
        parent::__construct($settings);
    }

    /**
     * Recursevly removes the contents of a directory.
     * 
     * @param string $directory   The directory.
     * 
     * @return void
     */
    public function rrmdir(string $directory): void {
        $files = glob($directory . '/*');
        
        foreach ($files as $file) {
            if (is_dir($file)) {
                $this->rrmdir($file); // Recursively remove subdirectories and their contents
            } else {
                unlink($file); // Remove files
            }
        }
        
        rmdir($directory); // Remove the empty directory itself
    }    

    /**
     * Recursevly copies the contents of a directory to another.
     * 
     * @param string $source        The source direcory.
     * @param string $destination   The destination directory.
     * 
     * @return void
     */
    public function rcopy(string $source, string $destination): void{
        if (is_dir($source)) {
            if (!is_dir($destination)) {
                mkdir($destination, 0777, true);
            }
    
            $dirContents = scandir($source);
    
            foreach ($dirContents as $file) {
                if ($file != '.' && $file != '..') {
                    $srcFile = $source . '/' . $file;
                    $dstFile = $destination . '/' . $file;
    
                    if (is_dir($srcFile)) {
                        $this->rcopy($srcFile, $dstFile);
                    } else {
                        copy($srcFile, $dstFile);
                    }
                }
            }
        } elseif (is_file($source)) {
            copy($source, $destination);
        }
    }

    /**
     * Displays a message to the console
     * 
     * @param string $text      The text to be displayed
     * @param int $level        The intensity level
     * @param bool $overwrite   Wheter the text should overwrite the previus text or not.
     * 
     * @return void
     */
    public function message(string $text, int $level, bool $overwrite = false): void{
        $color = "\033[" . match ($level) {
            1 => 36, // Cyan
            2 => 32, // Green
            3 => 31,  // Red
        } . "m";
    
        if ($overwrite){
            echo "\r" . str_repeat(" ", strlen($text)) . "\r";
        }
    
        echo "$color$text\033[0m";
    
        if ($level == 3) {
            exit(1);
        }
    }

    public function createPages(){
        $pages = $this->getPages();
        $languages = $this->getLanguages();

        foreach($pages as $page){
            $pageName = $this->removeExtension($page);
            
            foreach($languages as $lang){
                $current = self::DIST_DIR . $lang . "/";
        
                if (!is_dir($current)) {
        
                    if (!mkdir($current, 0755, true)) {
                        $this->message("Couldn't create $current", 3);
                    }
                
                }
        
                file_put_contents("$current$pageName.html", $this->getPage($page, $lang, false));
                
                if($lang == $this->settings->languages->default){
                    file_put_contents(self::DIST_DIR . "$pageName.html", $this->getPage($page, $lang, false));
                }
        
            }
        
            $this->message("\t✔ $pageName created\n", 2);
        
        }
    }

    public function createPreviews(){
        $pages = $this->getPages();
        $previews_path = self::DIST_DIR . "assets/previews/";

        if (!mkdir($previews_path, 0755)) {
            $this->message("Couldn't create $previews_path\n", 3);
        }

        foreach($pages as $page){
            $pageName = $this->removeExtension($page);

            $image = new \mikehaertl\wkhtmlto\Image($this->settings->server_url . $page);
            $image->saveAs("$previews_path$pageName.png");
        }
        
    }

}