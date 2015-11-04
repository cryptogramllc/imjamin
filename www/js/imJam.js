var userKey;
var pageData = {}; 
var $$ = Dom7;
var myApp = new Framework7({modalTitle: 'ToDo7'});
var mainView = myApp.addView('.view-main', {dynamicNavbar: true});
var callBackObj = {};
var status_obj = {};
var wavesurfer;


var imJam = {
    // initialize
    initialize:  function(){
		    imJam.bindEvents();
        imJam.getUserKey(); 
		    pages.checkSession();

        $('body').on('keypress', 'input[type="search"]', function(){
            console.log('search');
            var type = 'search_library';
            var keyword = $(this).val();
            var data = {type:type, keyword:keyword}
            imJam.ajaxCall(data);
        });

    },
    
    //code Generator
    codeGen: function(){
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
            var mobile =  num_code + parseInt(number, 10); 
            var data = {type:type, mobile:mobile};  
            imJam.ajaxCall(data);
            var promptData = {type: 'verify', msg: "Please enter the verification code sent to your device via SMS.", mobile:mobile};
            imJam.promptMsg(promptData);
           
        } 
    },

    //request to retrieve track

    getTrack: function(elem){
        var track_id = elem.attr('data-track');
        var type = "get_track";
        var data = {type:type, track_id: track_id};
        imJam.ajaxCall(data);
    }, 



    //load track once it has been received
    loadTrack: function(data){
        console.log(data);
        var track = 'http://54.69.118.223/media/' + data.track.file;
        var track_id = parseInt(data.track.id);
        $('#play-back').attr('data-track', track_id);
        imJam.waveSurfer(track);
    
    },


    //localStorage ... 
    getUserKey: function(){

	     userKey = localStorage.getItem('userKey');

    },

    //store user keys
    storeUserKey: function(data){
            
        localStorage.setItem('userKey', data.userKey);
        imJam.getUserKey();
            
    },



    getImage: function(){
       
       navigator.camera.getPicture(imJam.uploadPhoto, function(message) { 
       	   // alert('get picture failed');
            promptData.msg = "Uh-Oh! There was an error. Try again";
            imJam.errorPrompt(promptData);

       },{
       	    quality: 50, 
       	    destinationType: navigator.camera.DestinationType.FILE_URI, 
       	    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY 
       });
    },



    //upload a photograph
    uploadPhoto: function(imageURI){

        $('#register #message').empty();
        $('.col-25').show();
        var options = new FileUploadOptions();
        options.fileKey="avatar";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://54.69.118.223/server/upload.php", imJam.winUpload, imJam.failUpload, options);
    },




    
    //upload success
    winUpload: function(){

        $('.col-25').hide();
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        $('#register #message').append(r.response);   
    },

    


    //failed to upload file
    failUpload:function(error){
    	    
          promptData.msg = "An error has occurred: Code = " + error.code;
          imJam.errorPrompt(promptData);
    },





    // bind all click and touch events
    bindEvents: function(){

            // touchstart and click
		        $('body').on('touchstart, click', 'a, span, button, submit', function(event){
		            console.log(event);
		            var $this = $(this);
		            var $function = $this.attr('data-function');
                var $href = $this.attr('href');
		            if($function !== undefined){
		                event.preventDefault();
		                imJam[$function]($this);
		            }


		        });

		        // touchmove waveform
		        $('body').on('touchstart touchmove', '#waveform', function(event) {
		            
		             imJam.selectRegion(event);
		        });

                //pageInit 
		        $$(document).on('pageInit', function (e) {
                  imJam.waveReset();                  
                $('.loader-gif').hide();
		            var page = e.detail.page;
		            console.log(page.name);
		            pages[page.name]();
		        });


          // myApp.onPageInit('*', function (page) {

          //     console.log(page.name + ' initialized'); 
          //     pages[page.name]();

          // });
    },





    //register 
    register: function(){
         
           var type = "register";
           var name = $('#name').val();
           var avatar = $('#avatar_preview').attr('src');
           var data = {type:type, name:name, avatar:avatar, userKey:userKey};  
           imJam.ajaxCall(data); 
    },





    //load page.... here
    loadPage: function(pageData){   
       console.log('loading page ---> ' + pageData.page);
      setTimeout( mainView.router.loadPage(pageData.page), 1000);
    },
  


    

    //prompt new message
    promptMsg: function(promptData){
        myApp.prompt(promptData.msg, function (value) {
             var code = value;
             promptData['code'] = code;
             data = promptData;
             console.log("promptData => " +  promptData);
             imJam.ajaxCall(data); 
        });
    },


    
    

    //registration complete
    regComplete: function(){
	   	pageData.page = 'home.html';
	  	imJam.loadPage(pageData);
    },



   

    //error prompt messages
    errorPrompt: function(promptData){
       
        myApp.alert(promptData.msg);
    },

  

   


    //ajaxCall
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

              $FUNCTION = data.function;
              var $function = $FUNCTION.split(',');         
              $.each($function, function(i, v){
					       $functionCall = String(v);
					       if ($function !== undefined){
						        imJam[$functionCall](data);
					        }
              });
          }

        });
    },
 
    noStatus: function(){
          $('.status .content-block').html("<i> This user has not set thier status yet. </i>");


    },

   

    //logout functions
    logOut:function(){
       localStorage.clear();
       location.reload();
    },

   


    //finding contacts
    findContacts:function(){
         var contactsArray = [];
         var options = new ContactFindOptions();
         navigator.contacts.find(["*"], onSuccess, onError);
         $('.media-list ul').empty();
         function onSuccess(contacts){
            console.log('finding contacts');
            for (var i=0; i<contacts.length; i++) { 
                if (contacts[i].phoneNumbers != null) {
                    $.each(contacts[i].phoneNumbers, function(i ,v){
                          $.each(v, function(e, f){
                                if (e == 'value') {
                                    var value = f.replace(/-|\s/g,"").replace(/[{()}]/g, ''); 
                                    var length = value.length;
                                    var number;

                                    if (length == 10){
                                      var number = "+1" + value;
                                    }
                                    if (length == 11){
                                        var firstDigit = value.substring(0,1);
                                        if(firstDigit == '0'){
                                          number = "+44" + value.substring(1);
                                        }
                                        if(firstDigit == "1"){
                                          number = "+" + value;
                                        }

                                    }
                                    if(length == 12){
                                      number = value;
                                    }
                                    if(length == 13){
                                      number = value;
                                    }
                                   contactsArray.push(number);
                                }
                          });
                    });
                }
            }

            console.log(contactsArray);
            var postData = {contactsArray:contactsArray , type: "findContacts", userKey:userKey};
            imJam.ajaxCall(postData);
          }

         function onError(){
          promptData.msg = "Error loading contacts";
          imJam.errorPrompt(promptData);
         } 
    },
    
    //wavesurfer ...
    waveSurfer: function(track){
          $('#play-back').hide();
          $('.loader-gif').show();

          console.log(track);
          wavesurfer  = Object.create(WaveSurfer);
          wavesurfer.init({
            container: '#waveform',
            waveColor: '#310D55',
            progressColor: 'purple'
          });
          wavesurfer.load(track);
          wavesurfer.on('ready', function (){
           $('.loader-gif').hide();
           $('.play_button').show();
            console.log("track is ready");
            $('#play-back').show();
         });
    },


    //select region... 
    selectRegion: function(e){
           e.preventDefault();
           wavesurfer.play();
           wavesurfer.pause();
           var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
           //CODE GOES HERE
           console.clear();
           var wrapper_width = $('#waveform').width();  
           var dur = wavesurfer.getDuration();
           var pageX = touch.pageX; 
           var ratio = (pageX/wrapper_width);
           var wrap_width = $('#waveform').offset().left;
           var start = (dur * ratio) - (wrap_width); 
           var end = start + 20;
           
           wavesurfer.clearRegions();
           wavesurfer.addRegion({'start': start, 'end': end, 'drag' : true, 'color' : "rgba(0, 0, 0, 0.3)"});
            $('.proceed.text').fadeOut(function(){
               $('#proceed').attr('id', 'play-back').attr('href','').attr('data-function','playBack');
               $('.play.text').delay(500).fadeIn();   
            });
    },

    //destroy the wave object
    waveDestroy: function(){
        console.log('destroying wave'); 
                wavesurfer.empty();
    },


    wavePlay:function(start, end){
        (start !== null && end != null) ?  wavesurfer.play(start, end): wavesurfer.play(); 
    },

    //playback function...
    playBack: function(){
         console.log('play');
         $('.play.text').fadeOut(function(){
            $('#play-back').attr('id', 'proceed').attr('href','setQuote.html').removeAttr('data-function');  
            $('.proceed.text').delay(500).fadeIn();    
          });       

          var start, end; 
          $.each(wavesurfer.regions.list, function(index, value){
            start =  value.start;
            end =  value.end;
          });
          imJam.wavePlay(start, end);
          
    },
    
    playStatus: function(){
        $('.play_button').hide();
        $('.pace').removeClass("hidden");
        setTimeout(function(){
             $('.pace-progress').addClass('go');
             imJam.wavePlay();
        }, 500);
        wavesurfer.on("finish", function(){
             imJam.waveReset();
        });
       
    },


    waveReset: function(){
        if(wavesurfer !== undefined){
               imJam.waveDestroy();
               $('.play_button').show();
               $('.pace').addClass("hidden");
               $('.pace-progress').removeClass('go');
       }
    },


    //loadContacts
    loadContacts: function(data){
       $.each(data, function(index, value){
                      var status_quote = value.status.status;

                      var user_name = value.user.name;
                      var user_id = value.user.id;
                      var user_avatar = value.user.avatar;


                      var artist = value.track_info.artist;
                      var song = value.track_info.song;
                      
                      var iphone = "";  
                      var status;
                      
                      if(user_avatar == null || user_avatar.length == 0){
                          user_avatar = 'http://media3.vindy.com/ellington_defaults/images/avatars/blank_avatar_240x240.gif';
                      }else{
                          if (user_avatar.indexOf("iphone") >= 0){
                              var iphone = "iphone";
                          
                          }else{
                          
                             iphone = "";
                          
                          }
                      }
                      if(status_quote == null){
                         status_quote = "<i> Hi! I'm using ImJamin'... I have not yet set a status.</i>";
                      }
                      if(artist == null && song == null) {
                          status =  "<div class='item-text' style='line-height:120%; font-size:13px;'>"+ status_quote +"</div>";
                          
                      }else{
                         status = "<div class='item-subtitle'>Listening to <strong style='color:#73358B; font-size:15px;'>"+ song +"</strong> by <em>"+ artist +"</em></div>" +
                                   "<div class='item-text' style='line-height:120%; font-size:13px;'>"+ status_quote +"</div>";

                      }
                     
                     
                      $('.media-list ul').append("<li>"+
                           "<a href='status.html' data-user='"+ user_id +"' data-function='getStatus' class='item-link status item-content'>"+
                              " <div class='item-media "+ iphone +"' >" +
                                    "<img src='"+ user_avatar +"' width='60'  />" +
                               "</div>" +
                               "<div class='item-inner'>" +
                                "<div class='item-title-row'>" +
                                   "<div class='item-title'>"+ user_name +"</div>" +
                                   "<div class='item-after'> </div>" +
                                "</div>" +
                                     status + 
                               "</div>" +
                          "</a>" +
                      "</li>");    
              });
    },

    statusComplete: function(){
        console.log("status completed");
        var type = 'set_status';
        var status = $('textarea.status-input').val();
        status_obj['type'] = type;
        status_obj['status'] = status;
        status_obj['userKey'] = userKey;
        var data = status_obj;
        console.log(data);
        imJam.ajaxCall(data);
    },

    getStatus: function($elem){
        var dataUser = $elem.attr('data-user');

        var data = {type: "user_status", dataUser:dataUser};
        console.log(data);
        imJam.ajaxCall(data);

    },
    
    loadStatus:function(data){
        console.log(data);
        var status = data.status_info.status;
        var cover = data.track_info.cover;
        var song = data.track_info.song;
        var artist = data.track_info.artist;
        var album = data.track_info.Album;
        var avatar = data.user.avatar;
        var thisUser = data.user.encrypt;
        var name = data.user.name;
        var track = 'http://54.69.118.223/user_status/' + thisUser + ".mp4";

        var duration = (20) * 1000;
         
         
          if(avatar == null || avatar.length == 0){
              avatar = 'http://media3.vindy.com/ellington_defaults/images/avatars/blank_avatar_240x240.gif';
          }else{
              if (avatar.indexOf("iphone") >= 0){
                  var iphone = "iphone";
              
              }else{
              
                 iphone = "";
              
              }
          }
         var container; 
         if (userKey == thisUser){
          container = '.popup';

         }else{
          container = '.status .content-block';
         }


        $('.status .content-block').html('<div class="upper">' +
        '<div class= "avatar left"><img src="'+ avatar +'" height="60" /><span class="u_name">'+ name +'</span></div>' +
        '<div class= "status right"><blockquote>'+ status +'</blockquote></div>' +                                      
        '</div>' +
        '<div class="bottom">'+
        '<div class="cover" style="background-image:url('+ cover +')">'+
               '<audio id="track"></audio>'+
             '<div class="pace hidden"><div class="pace-progress" style="transition: width '+ duration + 'ms linear;-webkit-transition: width '+ duration + 'ms linear;"> </div></div>'+
             '<a href="#" class="play_button icon icon-play " style="display:none;" data-function="playStatus"></a>'+
        '</div>'+
        '<div class="track_info">' +
            '<div class="album">Album: '+ album +'</div>'+
            '<div class="song">Track: "'+ song +'"</div>'+
            '<div class="artist">Artist: '+ artist +'</div>'+
         '</div>'+  
        '</div><div class="wave-container" style="display:none;"><div id="waveform"></div></div>'); 
         if(userKey == thisUser){
             $('#user_status .cover').append('<a href="edit_status.html" class="button edit-status">Edit Status</a>');
         }
        imJam.waveSurfer(track);
    },
     
    loadSearch:function(data){

        console.log(data);
        $('.media-list.results ul').empty();
        $.each(data, function(index, value){
            var song = value.info.song;
            var artist = value.info.artist;
            var album = value.info.Album;
            var cover = value.info.cover;
            var id = value.info.id;

            $('.media-list.results ul').append("<li>" +
                    "<a href='clip.html' data-function='getTrack' data-track='"+ id +"' class='item-link media item-content'>"+
                    " <div class='item-media'>" +
                                  "<img src='"+ cover +"' width='60' />" +
                             "</div>" +
                             "<div class='item-inner'>" +
                              "<div class='item-title-row'>" +
                                 "<div class='item-title'>"+ artist +"</div>" +
                                 "<div class='item-after'> </div>" +
                              "</div>" +
                                  "<div class='item-subtitle'><strong style='color:#73358B; font-size:15px;'>"+ song +"</strong></div>" +
                                  "<div class='item-text' style='line-height:120%; font-size:13px;'>"+ album +"</div>" +
                             "</div>" +
                        "</a>" +
                    "</li>");
            });  
    }
   


}

var pages = {

      home: function(){
         console.log('Page for the homepage');
         console.log("load Contacts");
         mainView.showToolbar();
         mainView.showNavbar();
         imJam.findContacts();    
      },


      newUser: function(){

         console.log('Page for the new user registration when status is incomplete');
      },

      getCode: function(){

    		 console.log('Page for generating unique code for user');
      },
      
      checkReg: function(){
          console.log("Checking Reg");
      	  // if userKey is not set.....
          var type="check_status";
          var data = {type: type, userKey:userKey}		
          console.log(data);
          imJam.ajaxCall(data);  
      },

      checkSession: function(){
         console.log('Page for checking session by referencing localStorage');
         if(userKey === null){
           pageData.page = 'getCode.html';
           imJam.loadPage(pageData);
        }else{ pages.checkReg(); }  
      },

      yourStatus: function(){
         
         console.log('finding your status');
         var data = {type: "your_status", userKey:userKey};
         imJam.ajaxCall(data);
      },

      newStatus: function(){
          console.log("This is a new status page");
      },
      
      search: function(){

          console.log("this is the search page.");

      },

      clip:function(){
         console.log("This is the music clip page");

      },

      setQuote:function(){
            var start; 
            $.each(wavesurfer.regions.list, function(index, value){
              start = value.start;
            });
            var track_id = $('#proceed').attr('data-track');
            status_obj = { track_id:track_id, start:start };
            console.log(status_obj);
            imJam.stop();
      },




     status: function(){
         console.log("This is the users status page");
      },


      editStatus: function(){
        console.log("This page for editing your current status");
      }

}




imJam.initialize();