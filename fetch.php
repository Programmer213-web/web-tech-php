<?php

$xmlFile = new DOMDocument();

$xmlFile->load('./data.xml');

echo $xmlFile->saveXml();

?>