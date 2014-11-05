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
              if(postData.type == 'verify'){
                if(data == 'success'){ 
                    myApp.alert('Thank you for registering. Login?', function(){
                          $('.navbar').removeClass('hidden');
                           mainView.router.loadPage('http://54.69.118.223/imjamin/www/profile.html');
                         

                   });
                }
                else{ myApp.alert('There was an error with your code! Try again.', function () {
                           verification_code(postData.mobile);
                    });  
                }
               }
          }
     
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

