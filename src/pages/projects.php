<?php

$client = new \GuzzleHttp\Client([
    'headers' => [
        'Authorization' => 'Bearer ' . $_ENV['GITHUB_TOKEN'],
        'User-Agent' => 'racca.me'
    ]
]);

$response = $client->get('https://api.github.com/users/SebaOfficial/repos?type=public');

$repos = json_decode((string) $response->getBody());


// Sort the repositories by stargazers_count in descending order
usort($repos, function($a, $b) {
    return $b->stargazers_count - $a->stargazers_count;
});


$repositories = "";

foreach ($repos as $repo) {
    $repositories .= "
        <div itemscope itemtype='http://schema.org/SoftwareSourceCode' class='repository'>
            <h3><a itemprop='codeRepository' class='active' href='https://github.com/$repo->full_name' target='_blank' rel='noreferrer'>$repo->full_name </a></h3>
            <p itemprop='description'>$repo->description</p>
            <span class='star'>
                <span class='fa fa-star'></span>
                $repo->stargazers_count " . ($repo->stargazers_count == 1 ? "#{{content.star.singular}}" : "#{{content.star.plural}}") ."
            </span>
        </div>";
}

?>

<div id="projects">
    <h2>#{{content.title}}</h2>
    <div>
        <?= $repositories ?>
    </div>
</div>

<style>

    #projects h2{
        text-align: center;
        margin-bottom: 20px;
    }

    #projects .repository {
        padding: 1em;
        background-color: rgba(0, 0, 0, 0.177);
        margin: 1em;
        border-radius: 15px;
    }

    #projects .star {
        color: orange;
    }

    #projects > div {
    height: 35em;
    overflow: auto;
    }

</style>