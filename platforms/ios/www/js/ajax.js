$(document).ready(function(){


   $('.col-25').show();
   session_check();

   //make session request
   
   function session_check(){
   		var type = 'session_check';
        var data = {type:type};
   		  ajaxCall(data);
                  



   }
   function status_check(){
        var type = 'status_check';
        var data = {type:type};
        ajaxCall(data);
   }

  
   //functions	
	$('body').on('touchstart', '.fileUpload', function(){
		    $('input#avatar').focus().click();
		       return false;
    });
     
    //register click trigger
    $('body').on('touchstart', 'a.register', function(){
           	
           var code = "";	
           var type = "register";
           var name = $('#name').val();
           var email = $('#email').val(); 
           var num_code;
        
           $('input[type="radio"]').each(function(){

				var checkbox = $(this).is(':checked');
			    if(checkbox){ num_code = $(this).val(); }
			});

           var number = $('#mobile').val();
           var mobile = num_code + number; 
           var password = $('#password').val(); 
           var confirm = $('#confirm').val();
           var avatar = $('#avatar_preview').attr('src');
           var data = {type:type, name:name, email:email, mobile:mobile,  avatar:avatar};  

           ajaxCall(data);

			

			
    });


    
   
   //ajax
   function ajaxCall(data){

      var postData = data;
     
       console.log(postData);
       $.ajax({
       	  url: 'http://54.69.118.223/server/server.php',
       	  type: 'POST',
       	  data: postData,
       	  dataType: 'html',
       	  cache: false,
       	  beforeSend:function(){

       	  },
       	  success: function(data){

            console.log(data);
            $('.col-25').hide();
            
            if(data == 'fail'){
                mainView.router.loadPage('http://54.69.118.223/imjamin/www/login.html'); 
            }
            else if(data == 'session_set'){
                status_check();
            }
            else if(data == 'complete'){
                mainView.router.loadPage('http://54.69.118.223/imjamin/www/home.html');
            }
            else{
                mainView.router.loadPage('http://54.69.118.223/imjamin/www/register.html');
            }
       	  }

       }); 

   }

    


});