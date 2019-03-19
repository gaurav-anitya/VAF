$(document).ready(function(){
    var guard_id;
    var guard_password;
    var loggedInUser = localStorage.getItem('userLoggedIn');
    if(loggedInUser != null || loggedInUser != undefined){
   $.post('/localStorageUserId',{loggedInUser: loggedInUser}, function(res){
        if(res.loggedOutInDB == true){
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userLoggedInName');
            window.location.href = '/';
        }
   });    
}
    $('#guardLogin').on('click', function(e){
        e.preventDefault();
        guard_id = $('#guard_user_id').val();
        guard_password = $('#guard_password_id').val();
        if(guard_id == '' || guard_id == null){
            // $('#username_reqd').show();
        }
        else if(guard_password  == '' || guard_password == null){
            // $('#password_reqd').show();
        }
        else{
            $.post('/checkGuard', {guard_id : guard_id, guard_password: guard_password}, function(res){
                console.log(res);
                if(res.already_loggedin == true && (loggedInUser != '' || loggedInUser != undefined || loggedInUser != null)){
                    // alert('you are already logged into another device!');
                    $('.errorTag').text('You are already logged into another device!');
                    $('#errorModal').show();

                }
                else if (res.authenticated == true){
                localStorage.setItem('userLoggedIn',res.userId);
                localStorage.setItem('userLoggedInName',res.name);            
                window.location.href = '/home';
                }
                else if(res.authenticated == false){
                    // alert('Incorrect username or password.');
                    $('.errorTag').text('Incorrect username or password.');
                    $('#errorModal').show();
                }
            });
        }
    });
    $('#guardLogout').on('click', function(){
        $.post('/logoutGuard', {user_id: loggedInUser}, function(){            
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userLoggedInName');
            window.location.href = '/';
        });
    });
    $('#modalClose').on('click', function(){
        location.reload();
    });
});