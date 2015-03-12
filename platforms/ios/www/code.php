<?php
  $string = substr(str_shuffle(abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ),0, 1) . substr(str_shuffle(aBcEeFgHiJkLmNoPqRstUvWxYz0123456789),0, 31);
  $code = substr($string, 0, 6);
  echo $code;

?>
