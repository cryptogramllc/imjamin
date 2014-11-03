
$(document).ready(function(){


   $('.col-25').show();
   session_check();

   //make session request
   
   function session_check(){
   		var type = 'session_check';
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

  $("body").on('submit', "#register", (function(e) {
        e.preventDefault();
        $("#message").empty();
        $('#loading').show();
      $.ajax({
      url: "http://54.69.118.223/server/upload.php", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data)   // A function to be called if request succeeds
        {
           $('#loading').hide();
           $("#message").html(data);
        }
      });
  }));

// Function to preview image after validation

    $("body").on("change", "input#avatar", function() {
        $('#register').submit();
        $("#message").empty(); // To remove the previous error message
        var file = this.files[0];
        var imagefile = file.type;
        var match= ["image/jpeg","image/png","image/jpg"];
      if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2])))
      {
        $('#output').attr('src','noimage.png');
        $("#message").html("<p id='error'>Please Select A valid Image File</p>"+"<h4>Note</h4>"+"<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
        return false;
      }
      else
      {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });



function imageIsLoaded(e) {
  $("#avatar").css("color","green");
  $('#image_preview').css("display", "block");
  $('#output').attr('src', e.target.result);
  $('#output').attr('width', '250px');
$('#output').attr('height', '230px');
};    



    
   
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
          //  console.log(data);
             $('.col-25').hide();

            if(data == 'fail'){
            	$('.navbar').removeClass('hidden');
            	mainView.router.loadPage('http://54.69.118.223/imjamin/www/login.html');
            }else{
            	$('.navbar').removeClass('hidden');
                mainView.router.loadPage('http://54.69.118.223/imjamin/www/profile.html');	
            }
       	  }

       }); 

   }




});