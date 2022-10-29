<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/config.php";

if(empty($_SESSION['admin']['id'])){
    header("Location: ../nongchang");die;
}

if(empty($_GET['id'])){
    header("Location: ?id=1000000");
}

require_once __DIR__.'/index.html';