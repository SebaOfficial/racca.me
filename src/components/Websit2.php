<?php
/**
 * Website Class.
 * This class provides the website to the client.
 * 
 * @package Seba\Components
 * @author Sebastiano Racca
 */
declare(strict_types=1);

namespace Seba\Components;

use GuzzleHttp\Client;


final class Website{
    public string $uri;
    public string $page;
    public string $lang;
    public Translator $translator;
    public HTTP\Response $response;
    private string $pageContents;
    protected object $settings;
    protected array $availableLanguages;

    public function __construct(object $settings){
        $this->settings = $settings;
        $this->response = new HTTP\Response(200);
        $this->setRequestUri();
        $this->setPageInfo();
        $this->initializeTranslator();
    }

    /**
     * Sets the request URI.
     * 
     * @return void
     */
    private function setRequestUri(): void{
        $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    }

    /**
     * Sets the page information from the request.
     * 
     * @return void
     */
    private function setPageInfo(): void{
        $resources = explode("/", $this->uri); // The uri should look like /{language}/resource

        $this->lang = in_array($resources[1], $this->getLanguages()) ? $resources[1] : $this->settings->languages->default;
        $this->page = (isset($resources[2]) && $resources[2] !== "") ? $resources[2] : "index";

        $files = array_map(fn ($file) => pathinfo($file, PATHINFO_FILENAME), array_filter(glob(\ROOT_DIR . "/src/pages/*.html"), fn ($file) => $file !== \ROOT_DIR . "/src/pages/404.html"));

        $this->page = in_array($this->page, $files) ? $this->page : "404";

        $this->pageContents = file_get_contents($this->settings->pages->path . $this->page . ".html");

        if($this->page == "404")
            $this->response->setHttpCode(404);
    }

    /**
     * Returns an array of absolute paths of all the pages.
     * 
     * @return array   The actual pages.
     */
    private function getAllPages(): array{
        return glob($this->settings->pages->path . "*.html");
    }

    /**
     * Returns an array of all the navigators for the translator.
     * 
     * @return array   Associative array for the translator.
     */
    private function getNavigators(): array{

        $pages = array_map(function($element) {
            return strtr($element, [
                ".html" => "",
                $this->settings->pages->path => ""
            ]);
        }, $this->getAllPages());
        
        $navigators = [];
        
        foreach ($pages as $page) {
            $navigators["{{NAVIGATOR." . strtoupper($page) . "}}"] = $this->translator->pages->{$page}->navigator ?? "";
        }

        return $navigators;
        
    }

    /**
     * Initializes the translator.
     * 
     * @return void
     */
    private function initializeTranslator(): void{
        $this->translator = new Translator(
            json_decode(file_get_contents($this->settings->languages->path . "$this->lang.json"), true),
            [
                "{{USER_LANGUAGE}}" => $this->lang,
                "{{DEFAULT_USER_LANGUAGE}}" => $this->settings->languages->default,
                "'{{AVAILABLE_LANGUAGES}}'" => json_encode($this->availableLanguages),
            ]
        );

        $this->translator->addTranslations(array_merge(
            [
                "{{DOC_TITLE}}" => $this->translator->pages->{$this->page}->title,
                "{{DOC_DESCRIPTION}}" => $this->translator->pages->{$this->page}->description,
                "{{CURRENT_PAGE}}" => $this->uri,
                "{{CURRENT_SHORT_PAGE}}" => $this->page,
                "{{DOC_PREVIEW}}" => $this->translator->pages->{$this->page}->preview,
                "{{SECTION_TITLE}}" => $this->translator->pages->{$this->page}->h1,
            ],
            $this->getNavigators(),
            match($this->page){
                "index" => [
                    "{{BIO}}" => $this->getBio(),
                ],
                "projects" => [
                    "{{PROJECTS.TITLE}}" => $this->translator->pages->{"projects"}->content->title,
                    "{{PROJECTS}}" => $this->getProjects(),
                ],
                "contacts" => [
                    "{{CONTACTS.TITLE}}" => $this->translator->pages->{"contacts"}->content->title,
                    "{{CONTACTS.FORM.SUBJECT.LABEL}}" => $this->translator->pages->{"contacts"}->content->form->subject->label,
                    "{{CONTACTS.FORM.SUBJECT.PLACEHOLDER}}" => $this->translator->pages->{"contacts"}->content->form->subject->placeholder,
                    "{{CONTACTS.FORM.NAME.LABEL}}" => $this->translator->pages->{"contacts"}->content->form->name->label,
                    "{{CONTACTS.FORM.NAME.PLACEHOLDER}}" => $this->translator->pages->{"contacts"}->content->form->name->placeholder,
                    "{{CONTACTS.FORM.MESSAGE.LABEL}}" => $this->translator->pages->{"contacts"}->content->form->message->label,
                    "{{CONTACTS.FORM.MESSAGE.PLACEHOLDER}}" => $this->translator->pages->{"contacts"}->content->form->message->placeholder,
                    "{{CONTACTS.FORM.SUBMIT}}" => $this->translator->pages->{"contacts"}->content->form->submit,
                ],
                default => [
                    "{{NOTFOUND.TITLE}}" => $this->translator->pages->{"404"}->content->title,
                    "{{NOTFOUND.DESCRIPTION}}" => $this->translator->pages->{"404"}->content->description,
                ]
            }
        ));

    }

    /**
     * Gets the languages and sets them.
     * 
     * @return array   The languages.
     */
    private function getLanguages(): array{
        if (($this->availableLanguages ?? NULL) === null) {
            $this->availableLanguages = array_map(
                function ($path) {
                    return strtr($path, [".json" => "", $this->settings->languages->path => ""]);
                },
                glob($this->settings->languages->path . "*.json")
            );
        }

        return $this->availableLanguages;
    }

    /**
     * Gets the bio.
     * 
     * @return string   The HTML bio.
     */
    private function getBio(): string{
        $str = "";
        foreach ($this->translator->pages->{"index"}->texts['content'] as $element) {
            $str .= "<h2>" . $element['title'] . "</h2><p>" . $element['content'] . "</p>";
        }
        return $str;
    }

    /**
     * Gets the projects from GitHub.
     * 
     * @return string   The HTML projects.
     */
    private function getProjects(): string{
        $client = new Client();
        $str = "";
    
        $response = $client->get('https://api.github.com/users/SebaOfficial/repos?type=public');
    
        $repos = json_decode((string) $response->getBody());
    
        // Sort the repositories by stargazers_count in descending order
        usort($repos, function($a, $b) {
            return $b->stargazers_count - $a->stargazers_count;
        });
    
        foreach ($repos as $repo) {
            $str .= "
                <div itemscope itemtype='http://schema.org/SoftwareSourceCode' class='repository'>
                    <h3><a itemprop='codeRepository' class='active' href='https://github.com/$repo->full_name' target='_blank'>$repo->full_name </a></h3>
                    <p itemprop='description'>$repo->description</p>
                    <span class='star'>
                        <span class='fa fa-star'></span>
                        $repo->stargazers_count " . ($repo->stargazers_count == 1 ? $this->translator->pages->{"projects"}->content->star->singular : $this->translator->pages->{"projects"}->content->star->plural) ."
                    </span>
                </div>";
        }
    
        return $str;
    }    

    /**
     * Replaces placeholders in a given text.
     * 
     * @param string $text   The text to replace placeholders in.
     * 
     * @return string   The text with replaced placeholders.
     */
    private function replacePlaceholders(string $text): string{
        return $this->translator->tr($text);
    }

    /**
     * Sends the web page to the client.
     * 
     * @param bool $isApi   Whether the page should be displayed as APIs or not.
     * 
     * @return void
     */
    public function send(bool $isApi): void{
        $this->pageContents = $this->replacePlaceholders($this->pageContents);

        $body = $isApi
            ? json_encode([
                "mainContent" => $this->pageContents,
                "sectionTitle" => $this->translator->pages->{$this->page}->h1,
                "title" => $this->translator->pages->{$this->page}->title,
                ])
            : str_replace("{{PAGE_CONTENTS}}", $this->pageContents, $this->replacePlaceholders(file_get_contents(ROOT_DIR . "/src/template.html")))
        ;

        $cache = new Cache($_SERVER['REQUEST_URI'], $body, 86400);

        $this->response->setBody($cache->get())
            ->setHeaders([
                "Cache-Control:" => "public, max-age=604800",
                "Content-Type" => $isApi ? "application/json" : "text/html"
            ])
            ->send();
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