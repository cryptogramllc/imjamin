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

     $('body').on('change', 'input#avatar', function(){ 
     		$('form#register').submit();
     });
	
	var options = { 
	    target: '#output',   // target element(s) to be updated with server response 
	    beforeSubmit:  beforeSubmit,  // pre-submit callback 
	    resetForm: false        // reset the form after successful submit 
	}; 

	$('body').on('submit', 'form#register', function() { 
	    $(this).ajaxSubmit(options);  //Ajax Submit form            
	    // return false to prevent standard browser submit and page navigation 
	    return false; 
	});




		function beforeSubmit(){
		//check whether browser fully supports all File API
		if (window.File && window.FileReader && window.FileList && window.Blob)
		{
		    
		    if( !$('input#avatar').val() ) //check empty input filed
		    {
		        $("#output").html("Are you kidding me?");
		        return false
		    }
		    
		    var fsize = $('#avatar')[0].files[0].size; //get file size
		    var ftype = $('#avatar')[0].files[0].type; // get file type
		    

		    //allow only valid image file types 
		    switch(ftype)
		    {
		        case 'image/png': case 'image/gif': case 'image/jpeg': case 'image/pjpeg':
		            break;
		        default:
		            $("#output").html("<b>"+ftype+"</b> Unsupported file type!");
		            return false
		    }
		    
		    //Allowed file size is less than 1 MB (1048576)
		    if(fsize>1048576) 
		    {
		        $("#output").html("<b>"+ fsize +"</b> Too big Image file! <br />Please reduce the size of your photo using an image editor.");
		        return false
		    }
		            
		    $('#submit-btn').hide(); //hide submit button
		    $('#loading-img').show(); //hide submit button
		    $("#output").html("");  
		}
		else
		{
		    //Output error to older browsers that do not support HTML5 File API
		    $("#output").html("Please upgrade your browser, because your current browser lacks some new features we need!");
		    return false;
		}
		}




    
   
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