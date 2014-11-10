// Initialize your app
var myApp = new Framework7({
    modalTitle: 'ToDo7'
});


// Export selectors engine
var $$ = Dom7;

// Add views
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true

});

var todoData = localStorage.td7Data ? JSON.parse(localStorage.td7Data) : [];

var status;

$$('.popup').on('open', function () {
    $$('body').addClass('with-popup');
});
$$('.popup').on('opened', function () {
    $$(this).find('input[name="title"]').focus();
});
$$('.popup').on('close', function () {
    $$('body').removeClass('with-popup');
    $$(this).find('input[name="title"]').blur().val('');
});

// Popup colors
$$('.popup .color').on('click', function () {
    $$('.popup .color.selected').removeClass('selected');
    $$(this).addClass('selected');
});

$('body').on('click', '.done.prompt-ok', function () {
    var number = $('#mobile').val();
    if( number == ''){
        myApp.alert('Please enter your mobile number in order to proceed.');   
        return false;           
    }
    else{
         var type = 'sign_in';
        $('input[type="radio"]').each(function(){
             var checkbox = $(this).is(':checked');
            if(checkbox){ num_code = $(this).val(); }
        });


        var mobile = num_code + number; 
        var data = {type:type, mobile:mobile};  
            ajaxCall(data);
            verification_code(mobile);
    }
});

function verification_code(mobile){
    console.log(mobile);
    myApp.prompt('Please enter the verification code sent to your device via SMS.', function (value) {
            var type = "verify";
            var code = value;
            data = {type:type, code:code, mobile:mobile};
            ajaxCall(data); 
        });
}


// Add Task
$$('.popup .add-task').on('click', function () {
    var title = $$('.popup input[name="title"]').val().trim();
    if (title.length === 0) {
        return;
    }
    var color = $$('.popup .color.selected').attr('data-color');
    todoData.push({
        title: title,
        color: color,
        checked: '',
        id: (new Date()).getTime()
    });
    localStorage.td7Data = JSON.stringify(todoData);
    buildTodoListHtml();
    myApp.closeModal('.popup');
});

$$('.toolbar .link').on('click', function () {
    $('.toolbar .link').removeClass('active');
    $(this).addClass('active');
});


// Build Todo HTML using Template7 template engine
var todoItemTemplateSource = $$('#todo-item-template').html();
var todoItemTemplate = Template7.compile(todoItemTemplateSource);
function buildTodoListHtml() {
    var renderedList = todoItemTemplate(todoData);
    $$('.todo-items-list').html(renderedList);
}
// Build HTML on App load
buildTodoListHtml();

// Mark checked
$$('.todo-items-list').on('change', 'input', function () {
    var input = $$(this);
    var item = input.parents('li');
    var checked = input[0].checked;
    var id = item.attr('data-id') * 1;
    for (var i = 0; i < todoData.length; i++) {
        if (todoData[i].id === id) todoData[i].checked = checked ? 'checked' : '';
    }
    localStorage.td7Data = JSON.stringify(todoData);
});

// Delete item
$$('.todo-items-list').on('delete', '.swipeout', function () {
    var id = $$(this).attr('data-id') * 1;
    var index;
    for (var i = 0; i < todoData.length; i++) {
        if (todoData[i].id === id) index = i;
    }
    if (typeof(index) !== 'undefined') {
        todoData.splice(index, 1);
        localStorage.td7Data = JSON.stringify(todoData);
    }
});

$('body').on('keypress', 'input[type="search"]', function(){
   console.log('search');
   var type = 'search_library';
   var keyword = $(this).val();
   data = {type:type, keyword:keyword}
   ajaxCall(data);
});

$('body').on('click', '.status', function(){
    status = $(this).attr('data-user');
});

myApp.onPageAfterAnimation("home", function(){
    type = "get_contacts";
    data = {type:type}; 
    ajaxCall(data);
});


myApp.onPageAfterAnimation("status", function(){
    type = "get_status";
    data = {type:type, status:status}; 
    ajaxCall(data);
});

 function ajaxCall(data){

       var postData = data;
     
       // console.log(postData);
       $.ajax({
          url: 'http://54.69.118.223/server/server.php',
          type: 'POST',
          data: postData,
          dataType: 'JSON',
          cache: false,
          beforeSend:function(){
                $('.col-25').show();
          },
          success: function(data){
              $('.col-25').hide();

              eval(data.function)(data);
              // $('.media-list ul').html(data);
        
              // if(postData.type == 'verify'){
              //   if(data == 'success'){ 
              //       myApp.alert('Thank you for registering. Login?', function(){
              //              mainView.router.loadPage('http://54.69.118.223/imjamin/www/register.html');
              //      });
              //   }
              //   else{ myApp.alert('There was an error with your code! Try again.', function () {
              //              verification_code(postData.mobile);
              //       });  
              //   }
              //  }
          }
     
       }); 

   }
   
   function load_contacts(data){

        $('.media-list ul').empty();
         $.each(data, function(index, value){
             console.log(value);
                  var status_user_id = value.status.user_id;
                  var status_quote = value.status.status;
                  var user_avatar = value.user.avatar;

                  var user_name = value.user.name;
                  var artist = value.track_info.artist;
                  var song = value.track_info.song;

                  $('.media-list ul').append("<li>"+
                       "<a href='status.html' data-user='"+ status_user_id +"' class='item-link status item-content'>"+
                          " <div class='item-media'>" +
                                "<img src='"+ user_avatar +"' width='60' />" +
                           "</div>" +
                           "<div class='item-inner'>" +
                            "<div class='item-title-row'>" +
                               "<div class='item-title'>"+ user_name +"</div>" +
                               "<div class='item-after'> </div>" +
                            "</div>" +
                                "<div class='item-subtitle'>Listening to <strong style='color:#ff2d55; font-size:15px;'>"+ song +"</strong> by <em>"+ artist +"</em></div>" +
                                "<div class='item-text' style='line-height:120%; font-size:13px;'>"+ status_quote +"</div>" +
                           "</div>" +
                      "</a>" +
                  "</li>");    
         });    
   
          
   } 
  function load_search(data){
    console.log(data);
    $.each(data, function(index, value){




    });
  }

  function load_status(data) {
    
  
    console.log(data);

    var status = data.status_info.status;
    var track = data.track_info.file;
    var cover = data.track_info.cover;
    var song = data.track_info.song;
    var artist = data.track_info.artist;
    var album = data.track_info.Album;
    var avatar = data.user.avatar;
    var name = data.user.name;
    
    var start_time = parseInt(data.status_info.start);
    var end_time = parseInt(data.status_info.stop);

    var duration = ((end_time - start_time) + 1) * 1000;     

    $('.status .content-block').html('<div class="upper">' +
                                        '<div class= "avatar left"><img src="'+ avatar +'" height="60" /><span class="u_name">'+ name +'</span></div>' +
                                        '<div class= "status right"><blockquote>'+ status +'</blockquote></div>' +                                      
                                      '</div>' +
                                      '<div class="bottom">'+
                                        '<div class="cover" style="background-image:url('+ cover +')">'+
                                             '<div class="pace hidden"><div class="pace-progress"></div></div>'+
                                             '<div class="play_button icon icon-play "></div>'+
                                             '<audio id="track" src="http://54.69.118.223/media/'+ track +'">'+
                                             '</audio>'+
                                        '</div>'+
                                        '<div class="track_info">' +
                                            '<div class="album">Album: '+ album +'</div>'+
                                            '<div class="song">Track: "'+ song +'"</div>'+
                                            '<div class="artist">Artist: '+ artist +'</div>'+
                                         '</div>'+     
                                     '</div>');
   
                                      var audio = document.getElementById('track');
                                      audio.addEventListener("canplay", function(){
                                           console.log('can play');
                                           audio.play();
                                           audio.pause();


                                      });

                                      $('body').on('click', '.play_button', function(){
                                          
                                            $('.play_button').hide();
                                            $('.pace').show();
                                            $('.pace-progress').css({'-webkit-transition': 'width '+ duration +'ms linear', 'transition': 'width '+ duration +'ms linear'});
                                            audio.play();
                                            audio.currentTime = start_time;

                                             setTimeout(function(){
                                                audio.pause();
                                            }, duration);


                                      });

                                                                            
                                    
                                      audio.addEventListener("play", function(){

                                            console.log('playing');
                                            $('.pace-progress').addClass('go');
                                      },false);

                                       audio.addEventListener("pause", function(){
                                             console.log('paused');
                                             $('.play_button').show();
                                             $('.pace').hide();
                                            $('.pace-progress').removeClass('go');
                                       });
}


// Update app when manifest updated 
// http://www.html5rocks.com/en/tutorials/appcache/beginner/
// Check if a new cache is available on page load.
window.addEventListener('load', function (e) {
    window.applicationCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            myApp.confirm('A new version of ToDo7 is available. Do you want to load it right now?', function () {
                window.location.reload();
            });
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);
}, false);

