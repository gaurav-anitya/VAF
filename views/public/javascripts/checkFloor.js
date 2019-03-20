$( document ).ready(function() {
    if(! localStorage.getItem("floorCode")){        
        alert('It seems like devie is not registered.Redirecting to device registration page');
        document.location.href="/floorsetting";
    }
    
     



});