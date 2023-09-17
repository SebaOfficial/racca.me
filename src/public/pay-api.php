<?php

require_once __DIR__ . "/../src/envirorment.php";

use Seba\HTTP\{IncomingRequestHandler, ResponseHandler, Exceptions\InvalidContentTypeException, Exceptions\InvalidBodyException};

$website = new Seba\Website();
$response = new ResponseHandler();
$request = new IncomingRequestHandler();

$response->setHeaders([
    "Content-Type: application/json"
]);


try{
    
    $params = $request->getRequiredParams([
        "method",
        "amount"
    ]);

} catch(InvalidContentTypeException){
    $response->setHttpCode(400)
        ->setBody([
            "error" => "Must specify the Content-Type header."
        ])
        ->send();
} catch(InvalidBodyException){
    $response->setHttpCode(400)
        ->setBody([
            "error" => "Invalid Body provided."
        ])
        ->send();
}

if($params !== false){

    if(in_array($params['method'], ["card", "paypal", "satispay"])){

        if(filter_var($params['amount'], FILTER_VALIDATE_INT) !== false){
            $url = $website::getPaymentUrl($params['method'], $params['amount']);
            $response->setHttpCode(201)
                ->setBody([
                    "url" => $url
                ])
                ->setHeaders(["Location: $url"]);

        } else{
            $response->setHttpCode(400)
                ->setBody([
                    "error" => "The amount must be an integer."
                ]);
        }

    } else{
        $response->setHttpCode(400)
            ->setBody([
                "error" => "Payment method not allowed."
            ]);
    }

} else{
    $response->setHttpCode(400)
        ->setBody([
            "error" => "Must specify all the required parameters."
        ]);
}

$response->send();