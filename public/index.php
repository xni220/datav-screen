<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config.php";

if(empty($_SESSION['admin']['id'])){
    header("Location ../nongchang");die;
}

require_once __DIR__.'/index.html';