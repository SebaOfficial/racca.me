<?php
/**
 * Website Class.
 * This class provides the website to the client.
 * 
 * @package Seba
 * @author Sebastiano Racca
 */
declare(strict_types=1);

namespace Seba;

use Seba\HTTP\{IncomingRequestHandler, ResponseHandler};


class Website{
    protected IncomingRequestHandler $request;
    protected ResponseHandler $response;
    protected object $settings;
    private array $languages;
    private array $pages;

    public function __construct(object $settings){
        $this->settings = $settings;
        $this->response = new ResponseHandler();
        $this->request = new IncomingRequestHandler();
    }

    /**
     * From a given text returns all the variables like '#{{var}}'
     * 
     * @param string $text   The text to search.
     * 
     * @return array         List of variables.
     */
    private function getVariables(string $text): array{
        preg_match_all('/#{{(.*?)}}/', $text, $matches);
        return $matches[1];
    }

    /**
     * Replaces the placeholder with the actual text value
     */
    private function replacePlaceholders($match, $texts){
        $keys = explode('.', $match[1]);
    
        foreach ($keys as $key) {
            if (isset($texts[$key])) {
                $texts = $texts[$key];
            } else {
                return $match[0]; // Return the original placeholder if key doesn't exist
            }
        }
    
        return $texts;
    }

    /**
     * Removes the file extension.
     * 
     * @param string $string   The file name.
     * 
     * @return string          The file name without the exitension.
     */
    public function removeExtension(string $string): string{
        $lastDotPosition = strrpos($string, ".");

        if ($lastDotPosition !== false) {
            return substr($string, 0, $lastDotPosition);
        }

        return $string;
    }

    /**
     * Gets all the available languages.
     * 
     * @return array   The languages.
     */
    public function getLanguages(): array{

        if (!isset($this->languages)) {
            $this->languages = array_map(
                function ($path) {
                    return strtr($path, [".json" => "", $this->settings->languages->path => ""]);
                },
                glob($this->settings->languages->path . "*.json")
            );
        }

        return $this->languages;
    }

    /**
     * Returns an array of absolute paths of all the pages.
     * 
     * @return array   The actual pages.
     */
    public function getPages(): array{
        if(!isset($this->pages)){
            $this->pages = array_map(function($element) {
                return strtr($element, [
                    $this->settings->pages->path => ""
                ]);
            }, glob($this->settings->pages->path . "*"));
        }

        return $this->pages;
    }

    /**
     * Returns the body of a page
     * 
     * @param string $page         The page name (without extension).
     * @param string $lang         The language of the page.
     * @param bool $onlyContents   Wheter the function should return the full body or just the main content.
     * 
     * @return string              The actual page.
     */
    public function getPage(string $page, string $lang, bool $onlyContents): string {
        $texts = json_decode(file_get_contents($this->settings->languages->path . $lang . ".json"), true);
        $pageName = $this->removeExtension($page);
    
        if (pathinfo($page, PATHINFO_EXTENSION) === 'php') {
            ob_start();
            include $this->settings->pages->path . $page;
            $content = ob_get_clean();
        }

        $content = $actualPage = preg_replace_callback('/#{{(.*?)}}/', function ($match) use ($texts, $pageName) {
            return $this->replacePlaceholders($match, $texts["pages"][$pageName]);
        }, $content ?? file_get_contents($this->settings->pages->path . $page));
    
        if ($onlyContents) {
            return $content;
        }
    
        $actualPage = preg_replace_callback('/#{{(.*?)}}/', function ($match) use ($texts, $pageName) {
            return $this->replacePlaceholders($match, $texts["pages"][$pageName]);
        }, file_get_contents(ROOT_DIR . "/src/template.html"));
    
        $actualPage = preg_replace_callback('/#{{(.*?)}}/', function ($match) use ($texts) {
            return $this->replacePlaceholders($match, $texts["pages"]);
        }, $actualPage);
    
        return strtr(
            $actualPage,
            array_merge(
                [
                    "#{{CURRENT_PAGE}}" => $pageName,
                    "#{{CURRENT_PAGE_NO_INDEX}}" => $pageName == "index" ? "" : $pageName,
                    "#{{LANGUAGE}}" => $lang,
                    "#{{DEFAULT_LANGUAGE}}" => $this->settings->languages->default,
                    "`#{{AVAILABLE_LANGUAGES}}`" => json_encode($this->getLanguages()),
                    "#{{PAGE_CONTENTS}}" => $content,
                ]
            )
        );
    }


    /**
     * Returns the url for the payment.
     * 
     * @param string $method   The payment method.
     * @param int $amount      The amount to pay.
     * 
     * @return string          The actual url.
     */
    public function getPaymentUrl(string $method, int $amount): string{

        if($method === "card"){
            $stripe = new \Stripe\StripeClient($_ENV['STRIPE_SECRET_KEY']);
            $session = $stripe->checkout->sessions->create([
                'success_url' => "https://" . $_SERVER['SERVER_NAME'],
                'line_items' => [
                    [
                      'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                          'name' => 'Checkout Session',
                        ],
                        'unit_amount' => $amount,
                      ],
                      'quantity' => 1,
                    ],
                  ],
                'mode' => 'payment',
            ]);

            return $session->url;
    
        }

        else if($method === "paypal"){
            return $_ENV['PAYPAL_LINK'] . $amount/100 . "EUR";
        }

        else if($method === "satispay"){
            return $_ENV['SATISPAY_LINK'] . "?amount=$amount";
        }
    }

}