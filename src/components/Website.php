<?php

namespace Seba;

class Website {
    public static function getPaymentUrl(string $method, int $amount): string{

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

    public function createPreviews(string $previewsPath, array $pages){

        foreach($pages as $page){
            $pageName = $this->removeExtension($page);

            $image = new \mikehaertl\wkhtmlto\Image($this->settings->server_url . $page);
            $image->saveAs("$previewsPath$pageName.png");
        }
        
    }

}