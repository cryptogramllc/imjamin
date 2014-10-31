<?php
   error_reporting(-1);
   ini_set('display_errors', 'On');



require '../twilio-php-master/Services/Twilio.php';
   
  // $string = substr(str_shuffle(abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ),0, 1) . substr(str_shuffle(aBcEeFgHiJkLmNoPqRstUvWxYz0123456789),0, 31);
  // $code = substr($string, 0, 6);
  // $arr = array('code' => $code);
  // echo json_encode($arr);
  

  $type = $_POST['type'];
  $type();

  function sign_in(){

      mysql_connect('54.69.118.223', 'pictouser', 'jammer121'); 
      mysql_select_db('mydb');
      
      $mobile = $_POST['mobile'];
      
      $string = substr(str_shuffle(abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ),0, 1) . substr(str_shuffle(aBcEeFgHiJkLmNoPqRstUvWxYz0123456789),0, 31);
      $ver_code = substr($string, 0, 6);
      
      $result = mysql_query("SELECT * FROM `users` WHERE `phone` = '$mobile'");
      if(mysql_num_rows($result) == 0) {
      // row not found, do stuff...
         mysql_query("INSERT INTO `users`(`phone`, `verification_code`) VALUES ('$mobile', '$ver_code')");

      } else {
      // do other stuff...
         mysql_query("UPDATE `users` SET `verification_code`='$ver_code' WHERE `phone` = '$mobile' ");
      }
      

      // $sid = "AC65f408f0dd0b97b2ca15ff6eeadfd310"; // Your Account SID from www.twilio.com/user/account
      // $token = "34e70e70f3793e4fcdc635e6a35a0a7a"; // Your Auth Token from www.twilio.com/user/account

      // $client = new Services_Twilio($sid, $token);
      // $message = $client->account->messages->sendMessage(
      //   '441303570130', // From a valid Twilio number
      //   $mobile, // Text this number
      //   "Pict-o-Jam - Your Verification Code is : $ver_code."
      // );

      // print $message->sid;

  } 


  function register(){
       mysql_connect('54.69.118.223', 'pictouser', 'jammer121'); 
       mysql_select_db('mydb');
       
       // postdata
       $fullname = $_POST['name'];
       $email = hash('sha256', $_POST['email']);
       $phone = $_POST['mobile'];
       $password = hash('sha256', $_POST['password']);
       $confirm = hash('sha256', $_POST['confirm']);
       $avatar = $_POST['avatar'];

      //generate verification code :
       $string = substr(str_shuffle(abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ),0, 1) . substr(str_shuffle(aBcEeFgHiJkLmNoPqRstUvWxYz0123456789),0, 31);
       $ver_code = substr($string, 0, 6);
      
       mysql_query("INSERT INTO `users`(`name`, `email`, `phone`, `password`, `verification_code`, `avatar`) VALUES('$fullname', '$email', '$phone', '$password', '$ver_code', '$avatar')");
     
     
	     // mysql_query()
     

      

  }


   function verify(){
      mysql_connect('54.69.118.223', 'pictouser', 'jammer121'); 
      mysql_select_db('mydb');
      $code = $_POST['code'];
      $mobile = $_POST['mobile'];
      $result = mysql_query("SELECT * FROM `users` WHERE `phone` = '$mobile' AND `verification_code` = '$code'");
      if(mysql_num_rows($result) == 0) { echo 'fail'; }
      else { echo 'success'; }
   }















?>
