<?php
/**
 * Response Class.
 * This class provides methods for sending HTTP responses.
 * 
 * @package Seba\Components
 * @author Sebastiano Racca
*/
declare(strict_types=1);

namespace Seba\Components;


final class Translator{
    public $texts;
    protected $translations;

    /**
     * Translator constructor.
     * 
     * @param array $texts          The texts to be translated.
     * @param array $translations   The translations to be applied.
     */
    public function __construct(array $texts, array $translations){
        $this->texts = $texts;
        $this->translations = $translations;
    }

    public function addTranslations(array $translations){
        $this->translations = array_merge($this->translations, $translations);
    }

    /**
     * The function that translates the texts
     * 
     * @param string $text   The text to be translated
     * 
     * @return string        The translated string.
     */
    public function tr(string $text): string{
        return strtr($text, $this->translations);
    }


    /**
     * Magic method to dynamically access translated properties.
     *
     * @param string $name   The name of the property.
     * @return mixed         The value of the property, translated if applicable.
     */
    public function __get(string $name): mixed{
        if(!array_key_exists($name, $this->texts))
            return null;

        $propertyValue = $this->texts[$name];

        if(is_string($propertyValue))
            return $this->tr($propertyValue);

        if(is_object($propertyValue) || is_array($propertyValue)){
            $translator = new Translator($this->texts, $this->translations);
            $translator->texts = $propertyValue;
            return $translator;
        }

        return $propertyValue;
    }
}