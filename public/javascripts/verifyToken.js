$("#Verify_token").click(function(){
    
    $.ajax(
      {
        url: "/verifyApprovalToken",
        type:"Post",
        data: {
            token_key: $("#token_key").val()           
          },
       success: function(data){
        
         if(data)
         {
           alert("Your approval token is :"+data);
           document.location.href="/";
         }
         else{

             alert("Error while generating token");
             document.location.href="/";
         }        
    }
    }
    );  
});
