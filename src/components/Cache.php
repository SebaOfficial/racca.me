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

use Symfony\Component\Cache\Adapter\ArrayAdapter;


class Cache{
    protected $cache;
    protected $pageName;
    protected $cachedPage;

    public function __construct(string $pageName, string $content, int $expiration){
        $this->cache = new ArrayAdapter();
        $this->pageName = $pageName;

        $this->cachedPage = $this->cache->get($this->pageName, function ($item) use ($content, $expiration) {
            $item->expiresAfter($expiration);
            return $content;
        });
    }

    public function get(){
        return $this->cachedPage;
    }

    public function delete(){
        $this->cache->deleteItem($this->pageName);
    }
}
