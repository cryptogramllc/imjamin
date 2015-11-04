// Initialize your app
var myApp = new Framework7({modalTitle: 'ToDo7'});
var status_obj = {};
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {dynamicNavbar: true});
var wavesurfer;
var username;
var userKey = localStorage.getItem('userKey');
var status;
var callBackObj = {};






/*
    workFlow: 

    1. Check if user is logged in via local.Storage()
       a. if user is not logged-in ----> enter mobile and recieve verification code.
           - if verification code has been entered -- set local.Storage("userKey", userKey)
           - proceed to step b.


       b. if user is logged-in -----> check to see if registration has been completed.
           - if user has not completed registration ---> "register.html"
           - if user has completed registration ----> "home.html"







*/









var imJam = {
  init: function(){
     
     imJam.actions();
     imJam.loadPage('check_session.html');

  },
   
   index:function(){
    console.log('Index Page');



   },


   check_session: function(){
       console.log('Checking Session');
       console.log(userKey);
       var page  = (userKey === undefined || userKey === null) ? "login.html" : "home.html"; 
       imJam.loadPage(page);

   },
   




   login: function(){

    console.log("This is the login page");

   }, 
   





   checkNum: function(elem){
        var number = $('#mobile').val();
        if(number === '' || number === null || number.length < 0){
              myApp.alert('Please enter your mobile number in order to proceed.');
            return false;           
        }
        else{
            var type = 'create_code';
            $('input[type="radio"]').each(function(){
                 var checkbox = $(this).is(':checked');
                if(checkbox){ num_code = $(this).val(); }
            });
            var mobile = num_code + number; 
            var data = {type:type, mobile:mobile};  
            imJam.ajaxCall(data);
            var promptData = {type: 'verify', msg: "Please enter the verification code sent to your device via SMS.", mobile:mobile};
            imJam.promptMsg(promptData);
            
            //prompt
           
        } 
   },


   localStorage: function(){

   },
   
   
   loadPage: function(page){   
     console.log('loading page ---> ' + page);
     setTimeout(function(){  mainView.router.loadPage(page) }, 1000);
   },
  

   newUser: function(){
     console.log('new user obj ===> ' + callBackObj);
     


   },

   loadPageFromAjax: function(data){
     console.log('loading page from Ajax ---> ' + data.page);
     setTimeout(function(){  mainView.router.loadPage(data.page) }, 1000);
     callBackObj = data;

      
   },

   promptMsg: function(promptData){
            myApp.prompt(promptData.msg, function (value) {
                 var code = value;
                 promptData['code'] = code;
                 data = promptData;
                 console.log("promptData => " +  promptData);
                 imJam.ajaxCall(data); 
            });

   },
   

   ajaxCall: function(data){
        var postData = data;
        $.ajax({
          url: 'http://54.69.118.223/server/server.php',
          type: 'POST',
          data: postData,
          dataType: 'JSON',
          cache: false,
          beforeSend:function(){
             $('.loader-gif').show();
          },
          success: function(data){
              console.log(data);
              $('.loader-gif').hide();
              $function = data.function;
              if ($function !== undefined){
                imJam[$function](data);
              }
          }

        });
  },

  register: function(){
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
  },
  
   actions: function(){
    


      $('body').on('touchstart, click', 'a, span, button, submit', function(event){

            console.log(event);
            var $this = $(this);
            var $function = $this.attr('data-function');

            if($function !== undefined){
                event.preventDefault();
                imJam[$function]($this);
            }
        });

        $('body').on('touchstart touchmove', '#waveform', function(event) {
           imJam.selectRegion(event);
        });


        $$(document).on('pageInit', function (e) {
            var page = e.detail.page;
            console.log(page.name);
            imJam[page.name]();
        });
      

    
   }  
    
    

  

}

imJam.init();





// var imJam = {


//   init: function(){
//      imJam.actions();
//      console.log('started');
   
//   },


//   checkSession: function(){

//   },


//   checkStatus: function(){



//   },

//   completedStatus: function(){



//   },

//   registerUser: function(){

//            var code = "";	
//            var type = "register";
//            var name = $('#name').val();
//            var email = $('#email').val(); 
//            var num_code;
//             $('input[type="radio"]').each(function(){
//                var checkbox = $(this).is(':checked');
//                if(checkbox){ num_code = $(this).val(); }
//             });
//            var number = $('#mobile').val();
//            var mobile = num_code + number; 
//            var password = $('#password').val(); 
//            var confirm = $('#confirm').val();
//            var avatar = $('#avatar_preview').attr('src');
//            var data = {type:type, name:name, email:email, mobile:mobile,  avatar:avatar};  
//            imJam.ajaxCall(data);

//   },



//   actions: function(){


       
   


//   }, 

   

//   selectRegion: function(event){
//         event.preventDefault();

//         wavesurfer.play();
//         wavesurfer.pause();
//         var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
//         //CODE GOES HERE
//         console.clear();
//         var wrapper_width = $('#waveform').width();  
//         var dur = wavesurfer.getDuration();
//         var pageX = touch.pageX; 
//         var ratio = (pageX/wrapper_width);
     

//         var wrap_width = $('#waveform').offset().left;
//         var start = (dur * ratio) - (wrap_width); 
//         var end = start + 20;

//         wavesurfer.clearRegions();
//         wavesurfer.addRegion({'start': start, 'end': end, 'drag' : true, 'color' : "rgba(0, 0, 0, 0.3)"});
       
//         $('.proceed.text').fadeOut(function(){
//            $('#proceed').attr('id', 'play-back');
//            $('.play.text').delay(500).fadeIn();   
//         });


          
//   },   


//   loadSearch: function(){

//   },

  

//   search: function(){


//   },





//   getUserStatus: function(){





//   },
   

//   loadStatus: function(elem){
//     var status = elem.attr('data-user');
//     var data = {status:status};
//     imJam.ajaxCall(data);

//     // imJam.waveSurferInit();
//     // imJam.loadTack(data);



//   },
  


//   waveSurferInit: function(){
      
//       wavesurfer = Object.create(WaveSurfer);

//       wavesurfer.init({
//             container: '#waveform',
//             waveColor: '#310D55',
//             progressColor: 'purple'
//       });
                                
//       wavesurfer.on('ready', function () {
//           $('.loader-gif').hide();
//           $('.play_button').show();
//            wavesurfer.clearRegions();
//           $('wave > wave').remove();
//            wavesurfer.play();
//            wavesurfer.pause();
//       });
      

     

//   },




//   loadTack: function(data){
//         console.log(data);
//         $('.loader-gif').show();
//         var status = data.status_info.status;
//         var track = 'http://54.69.118.223/media/' + data.track_info.file;
//         var cover = data.track_info.cover;
//         var song = data.track_info.song;
//         var artist = data.track_info.artist;
//         var album = data.track_info.Album;
//         var avatar = data.user.avatar;
//         var name = data.user.name;

//         $('.status .content-block').html('<div class="upper">' +
//         '<div class= "avatar left"><img src="'+ avatar +'" height="60" /><span class="u_name">'+ name +'</span></div>' +
//         '<div class= "status right"><blockquote>'+ status +'</blockquote></div>' +                                      
//         '</div>' +
//         '<div class="bottom">'+
//         '<div class="cover" style="background-image:url('+ cover +')">'+
//                '<audio id="track"></audio>'+
//              '<div class="pace hidden"><div class="pace-progress" style="transition: width '+ duration + 'ms linear;-webkit-transition: width '+ duration + 'ms linear;"> </div></div>'+
//              '<div class="play_button icon icon-play " style="display:none;"></div>'+
//         '</div>'+
//         '<div class="track_info">' +
//             '<div class="album">Album: '+ album +'</div>'+
//             '<div class="song">Track: "'+ song +'"</div>'+
//             '<div class="artist">Artist: '+ artist +'</div>'+
//          '</div>'+  
//         '</div><div class="wave-container" style="display:none;"><div id="waveform"></div></div>'); 
         

//          $('#user_status .cover').append('<a href="edit_status.html" class="button edit-status">Edit Status</a>');

//          wavesurfer.load(track);
//   },
   

  


//   playBack: function(){

//   }, 
   

   





//   afterPageLoad: function(page){
// 		myApp.onPageAfterAnimation(page, function(){
// 				var data = {type:page}; 
// 				imJam.ajaxCall(data);
// 			});
// 	  },





//   loadContacts: function(data){
//         console.log(data);


//         // var options = new ContactFindOptions();
//         // navigator.contacts.find(["*"], imJam.onSuccessContacts, imJam.onErrorContacts);
//         $('.media-list ul').empty();
//         $.each(data, function(index, value){
//                 console.log(value);
//                 var status_user_id = value.status.user_id;
//                 var status_quote = value.status.status;
//                 var user_avatar = value.user.avatar;

//                 var user_name = value.user.name;
//                 var artist = value.track_info.artist;
//                 var song = value.track_info.song;
                
//                 var iphone = "";  

//                 if (user_avatar.indexOf("iphone") >= 0){
//                          var iphone = "iphone";
//                 }else{
//                   iphone = "";
//                 }

//                 $('.media-list ul').append("<li>"+
//                      "<a href='status.html' data-user='"+ status_user_id +"' data-function='loadStatus' class='item-link status item-content'>"+
//                         " <div class='item-media "+ iphone +"' >" +
//                               "<img src='"+ user_avatar +"' width='60'  />" +
//                          "</div>" +
//                          "<div class='item-inner'>" +
//                           "<div class='item-title-row'>" +
//                              "<div class='item-title'>"+ user_name +"</div>" +
//                              "<div class='item-after'> </div>" +
//                           "</div>" +
//                               "<div class='item-subtitle'>Listening to <strong style='color:#73358B; font-size:15px;'>"+ song +"</strong> by <em>"+ artist +"</em></div>" +
//                               "<div class='item-text' style='line-height:120%; font-size:13px;'>"+ status_quote +"</div>" +
//                          "</div>" +
//                     "</a>" +
//                 "</li>");    
//         });


//   },
   

//   onSuccessContacts: function(){

//       for (var i=0; i<contacts.length; i++) { 
//             if (contacts[i].phoneNumbers != null) {
//                 $.each(contacts[i].phoneNumbers, function(i ,v){
//                       $.each(v, function(e, f){
//                             if (e == 'value') {
//                                 var number = f.replace(/-|\s/g,""); 
//                                 console.log(number);
//                             }
//                       });
//                 });
//             }
//       }



//   }, 




//   onErrorContacts: function(){
//         alert('onError!');

//   },

//   newStatus: function(){

//   },


//   processReg: function(){
// 		var number = $('#mobile').val();
// 		if( number == ''){
// 		    myApp.alert('Please enter your mobile number in order to proceed.');   
// 		    return false;           
// 		}
// 		else{
// 		     var type = 'sign_in';
// 		    $('input[type="radio"]').each(function(){
// 		         var checkbox = $(this).is(':checked');
// 		        if(checkbox){ num_code = $(this).val(); }
// 		    });

// 		    var mobile = num_code + number; 
// 		    var data = {type:type, mobile:mobile};  
// 			ajaxCall(data);
// 			imJam.verification_code(mobile);
// 		}
//   },







//  },





//   loadPage: function(page){
//   	 mainView.router.loadPage(page);
//   	 imJam.afterPageLoad(page);
//   }, 




   
// }


//    imJam.init();


