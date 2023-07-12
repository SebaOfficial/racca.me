<?php
/**
 * Response Class.
 * This class provides methods for sending HTTP responses.
 * 
 * @package Seba\Components\HTTP
 * @author Sebastiano Racca
*/
declare(strict_types=1);

namespace Seba\Components\HTTP;


final class Response{
    protected int $httpCode;
    protected string|array|object|null $body;

    /**
     * Response constructor.
     * 
     * @param int $defaultHttpCode   The default HTTP Status Code.
     */
    public function __construct(int $defaultHttpCode = 204){
        $this->body = null;
        $this->httpCode = $defaultHttpCode;
    }

    /**
     * Sets the HTTP Code.
     * 
     * @param int $code   The code to be set.
     * 
     * @return self       Returns the current instance.
     */
    public function setHttpCode(int $code): self{
        $this->httpCode = $code;
        return $this;
    }

    /**
     * Sets the response body.
     * 
     * @param int $body   The body to be set.
     * 
     * @return self       Returns the current instance.
     */
    public function setBody(string|array|object $body): self{
        $this->body = $body;
        return $this;
    }

    /**
     * Sets response headers.
     * 
     * @param array $headers  A list of headers to be set or replaced.
     * 
     * @return self           Returns the current instance.
     */
    public function setHeaders(array $headers): self{
        foreach($headers as $header => $value)
            header("$header: $value", true);
        return $this;
    }

    /**
     * Sends an response to the HTTP Request.
     * 
     * @param bool $exit   Wheter to exit the program or not.
     *                     Default is set to true.
     * 
     * @return void
     */
    public function send(bool $exit = true): void{
        http_response_code($this->httpCode);

        if(isset($this->body)){
            if(is_string($this->body))
                echo $this->body;
            else
                echo json_encode($this->body);
        }
        
        if($exit) exit;
    }


    /**
     * Sets the alowed HTTP Methods.
     * 
     * @param array $methods   The allowed methods.
     * 
     * @return bool           Wheter the method is allowed or not.
     */
    public function allowMethods(array $methods): bool{
        header("Access-Control-Allow-Methods: " . implode(", ", $methods));
        return in_array($_SERVER['REQUEST_METHOD'], $methods);
    }


    /**
     * Sets the Access-Control-Allow-Origin header.
     * 
     * @param array|null $origins   The allowed origins.
     *                              Pass empty array to deny all.
     *                              Pass '*' as an array element to allow all.
     * 
     * @return bool                 Wheter the origin is allowed or not.
     */
    public function allowOrigin(array $origins): bool{
        
        if(empty($origins)){
            header("Access-Control-Allow-Origin: null");
            return false;
        }

        if(in_array("*", $origins)){
            header("Access-Control-Allow-Origin: *");
            return true;
        }

        if(!in_array($_SERVER['HTTP_ORIGIN'] ?? null, $origins))
            return false;

        header("Access-Control-Allow-Origin: " . ($_SERVER['HTTP_ORIGIN'] ?? "*"));
        return true;
    }


    /**
     * Sets the alowed Headers.
     * 
     * @param array $headers   The allowed headers.
     * 
     * @return bool            Wheter all the headers are allowed or not
     */
    public function allowHeaders(array $headers): bool{
        header("Access-Control-Allow-Headers: " . implode(", ", $headers));
        
        foreach(getallheaders() as $header => $value)
            if(!in_array($header, $headers))
                return false;

        return true;
    }
}


?>