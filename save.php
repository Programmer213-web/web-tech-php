<?php

function has($tocheck) {
    foreach($_GET as $key => $value) {
        if($key == $tocheck) {
            return true;
        }   
    }
    return false;
}

if(has('income')) { 
    $xmlFile = new DOMDocument();
    $xmlFile->load('./data.xml');
    $xmlFile->documentElement->getElementsByTagName('income')->item(0)->nodeValue = $_GET['income'];

    $xmlFile->save('./data.xml');
}
else if(has('amount') && has('desc')){
    $xmlFile = new DOMDocument();
    $xmlFile->load('./data.xml');

    $element = $xmlFile->createElement('expense');

    $amount = $_GET['amount'];
    $desc = $_GET['desc'];

    $child1 = $xmlFile->createElement('amount', $amount);
    $child2 = $xmlFile->createElement('desc', $desc);

    $element->appendChild($child1);
    $element->appendChild($child2);

    $xmlFile->getElementsByTagName('expenses')->item(0)->appendChild($element);

    $xmlFile->save('./data.xml');
}

echo '<script> window.location.href = "./index.html";</script>';


?>