
 

//get approval token //

$("#approvalToken").click(function(){
 var escort_id=(document.getElementById("escortId").innerText).split(":");
 var visitor_id=document.getElementById("Id").innerText;
 if(escort_id != "" &&  visitor_id != "")
 {
    $.ajax(
      {
        url: "/getApprovalToken",
        type:"Post",
        data: {
            escort_id: visitor_id           
          },
       success: function(result){
         if(!result)
         {
           alert("Your previous token is expired.Please regenerate token!!");
         }
         else{
           var getToken=prompt(result);
            if (getToken) {

            var date= new Date();
            var day=date.getDay();
            var hrs=date.getHours();
            //var min=date.getMinutes();
            
            if(day == 6 || day == 7 || (hrs > 21 &&  hrs <= 23) || (hrs >=0 &&  hrs < 9))
            {
                $.ajax(
                    {
                      url: "/OddHoursApproval",
                      type:"POST",
                      data: {
                        visitor_id: visitor_id ,getToken: getToken, escort_id: visitor_id.trim()        
                      },
                     success: function(result){
                    // alert(result);
                      if(result)
                      {
                      alert("Visitor approved !!");
                      document.location.href="/";
                      }
                      else{
    
                        alert("Error while updating record. Please try again !!");
                        document.location.href="/";
                      }
                  }
                  }
                  ); 
            }
            
            else{
            $.ajax(
                {
                  url: "/visitorApproved",
                  type:"POST",
                  data: {
                    visitor_id: visitor_id ,getToken: getToken, escort_id: visitor_id.trim()        
                  },
                 success: function(result){
                // alert(result);
                  if(result)
                  {
                  alert("Visitor approved !!");
                  document.location.href="/";
                  }
                  else{

                    alert("Error while updating record. Please try again !!");
                    document.location.href="/";
                  }
              }
              }
              ); 
            }
              
        } else {
           // document.location.href="/";
        }
      
    }
  }
    }
 

    ); 
}
else{
    alert("Please enter required details!!");
} 
});

function defaultDate()
{
    $( "#visitor_date" ).datepicker( "setDate", new Date());
}

$("#i_agree").click(function(){
    
    $("#submit").attr('disabled',false);
});


//update out Time //
$("#outTime").click(function(){
    
    var visitor_id=document.getElementById("Id").innerText;
    var smartCard=(document.getElementById("Card").innerText).split(":");
    var name=(document.getElementById("Name").innerText).split(":");
    var floorCode = localStorage.getItem('floorCode');
    
    if( document.getElementById("outTime").innerHTML=="Out")
    {
    $.ajax(
      {
        url: "/updateOutTime",
        type:"POST",
        data: {
         visitor_id: visitor_id,visitor_smartcard: smartCard[1].trim(),visitor_name: name[1].trim(),floorCode: floorCode           
          },
         
       success: function(result){
       // alert(result);
         if(result)
         {
            alert("Record Updated !!");
            document.location.href="/visitorGrid"
         }
         else{

            alert("Error while updating record!!");
             
            // document.location.href="/";
         }        
    }
    }
    ); 
  }
  else{

    $.ajax(
      {
        url: "/updateInTime",
        type:"POST",
        data: {
          visitor_smartcard: smartCard[1].trim(),visitor_name: name[1].trim(),floorCode: floorCode.trim()           
          },
         
       success: function(result){
        
         if(result)
         {
            alert("Record Updated !!");
            document.location.href="/visitorGrid"
         }
         else{
  
            alert("Error while updating record!!");
             
            // document.location.href="/";
         }        
    }
    }
    ); 
  }

});


//update InTime
// $("#InTime").click(function(){
    
  
//   var smartCard=(document.getElementById("Card").innerText).split(":");
//     var name=(document.getElementById("Name").innerText).split(":");
//     var floorCode = localStorage.getItem('floorCode');
  
//   $.ajax(
//     {
//       url: "/updateInTime",
//       type:"POST",
//       data: {
//         visitor_smartcard: smartCard[1].trim(),visitor_name: name[1].trim(),floorCode: floorCode.trim()           
//         },
       
//      success: function(result){
//       alert(result);
//        if(result)
//        {
//           alert("Record Updated !!");
//           document.location.href="/visitorGrid"
//        }
//        else{

//           alert("Error while updating record!!");
           
//           // document.location.href="/";
//        }        
//   }
//   }
//   ); 


// });


function getVisitorFlooStatus()
{
  //var visitor_id=document.getElementById("Id").innerText;
    var smartCard=(document.getElementById("Card").innerText).split(":");
    var name=(document.getElementById("Name").innerText).split(":");
    var floorCode = localStorage.getItem('floorCode');
  $.ajax(
    {
      url: "/getVisitorFloorStatus",
      type:"POST",
      data: {
        visitor_smartcard: smartCard[1].trim(),visitor_name: name[1].trim(),floorCode: floorCode.trim()                      
        },
       
     success: function(result){
      
       if(result == "In")
       {
          
          document.getElementById("outTime").innerHTML="Out";
       }
       else{

        
        document.getElementById("outTime").innerHTML="In";
           
          // document.location.href="/";
       }  
           
  }
  }
  ); 


}


//Validate user from database//

$("#validateEscort").click(function(){
    
       $.ajax(
         {
           url: "/validateEscort",
           type:"Post",
           data: {
            escort_id: $("#escort_id").val()           
             },
            
          success: function(result){
           
            if(result)
            {
        //    alert("Form validated.Press ok to submit form !!");
        //    $(this).attr('disabled',true);
        //    $("#submit").attr('disabled',false);
               var items=JSON.parse(result);
               
               for(var i=0; i<items.length;i++)
               {
                  var name =items[i].escort_Name;
                  var project= items[i].project;
                  var smartCard=items[i].smartCard;
                   
                   
               }
               //alert(data);
               document.getElementById("escort_name").value =name; 
                document.getElementById("escort_name").name.value=name;
               document.getElementById("escort_unit").value =project; 
               document.getElementById("escort_smartcard").value =smartCard; 
               $("#escortDeclaration").attr('disabled',false);

            }
            else{

                alert("Escort is not Authorized.Please try agin!!");
                $("#escortDeclaration").attr('disabled',true);
                
               // document.location.href="/";
            }        
       }
       }
       );  
   });

   $("#escortDeclaration").click(function(){
    
    document.getElementById("modale_escort_name").value =$("#escort_id").val(); 
   
  });

   $("#company-1").click(function(){
    
     $("#other").attr('disabled',false);
    
   });

   $("#company-0").click(function(){
    
    $("#other").attr('disabled',true);
   
  });

   //get the current status of visitor//

   $("#getStatus").click(function(){
    
    if($("#visitor_empid").val() != "")
    {
       $.ajax(
         {
           url: "/validateVisitor",
           type:"Post",
           data: {
               visitor_id: $("#visitor_empid").val()           
             },
          success: function(data){
           
            if(data != "null")
            {
               if(data == "pending")
               {
                document.getElementById("progressbar").style.display = "block";
                document.getElementById("progress-bar").style.backgroundColor="#f9fac4";
                document.getElementById("progress-bar").style.color="black";
                document.getElementById("progress-bar").style.width="50%";
                document.getElementById("progress-bar").innerText="Pending";
               }
               else if(data == "Approved")
               {
                //$('.progressbar').toggle("slide");
                document.getElementById("progressbar").style.display = "block";
                document.getElementById("progress-bar").style.width="100%";
                document.getElementById("progress-bar").style.backgroundColor="#78d3a8";
                document.getElementById("progress-bar").innerText="Approved";
               }
              

               
                  
            }
            else{

                alert("user does not exist.Please try agin!!");
                document.location.href="/";
            }        
       }
       }
       ); 
    }
    else{

        alert("Please provide visitorId !!");
    }
   });

 // redirect to home page //
 $("#home").click(function(){  
        
    document.location.href="/home"
   
  });

  $("#floor").click(function(){  
    var floorCode=4;
    localStorage.setItem("floorCode", floorCode);   
    document.location.href="/home"
   
  });

  $("#addVisitor").click(function(){  
        
    document.location.href="/addVisitor"
   
  }); 
   

//redirect to list page//
   $("#visitorDetail").click(function(){  
        
     document.location.href="/visitorGrid"
    
   });

   //redirect to status page //
   $("#status").click(function(){  
        
    document.location.href="/status"
   
  });

  
  // bind visitor record //
   function bindGrid(){

    $.ajax(
        {
          url: "/visitorRecord",
          type:"Post",
          data: {
                         
            },
            contentType: "application/json; charset=utf-8",
           
         success: function(result){
             var items=JSON.parse(result);
             
             for(var i=0; i<items.length;i++)
             {
               
                 var date=((items[i].escort_date).substring(0,10)).split('-').reverse().join('-');
                 
                 items[i].escort_date=date;
                
           
             }
             
           if(result)
           {
            $('#table_id').DataTable({
                "aaData": items,
                "processing": true,
                
                "scrollX": true,
                "scrollY": "500px",
                "width":"101%",
                "scrollCollapse": true,
                "columns": [ 
                    { "data": "visitor_empid" },
                    { "data": "Hall_Access"},
                    { "data": "visitor_name" },
                 
                 { "data": "escort_date"},
                 
                 
                 
                 { "data": "approvalStatus" },
                 
                
            ],
           
            });
            
           
   }
}   
        });
    }

   
    // $('#table_id').on('click', 'tr', function () {
    //     alert("clicked");
    //     var table = $('#table_id').DataTable();
    //     var data = table.row( this ).data();
    //     var data1=JSON.parse(data);
    //     alert( 'You clicked on '+data1);
    // } );

//     $("#table_id tbody").find('tr').click(function(){
     
//         var table = $('#table_id').DataTable();
//        var data =  table.row( this ).data();
//        alert( "hello" );
//        alert('You clicked row '+ ($(this).index()+1) );
//    });
  // var table = $('#table_id').DataTable();
 
//    $('#table_id tbody').on( 'click', 'tr', function () {
//        console.log( table.row( this ).data() );
//    } );
   //dataGrid Binding //

   function gridBind(items){
    
    jQuery("#myGrid").jqGrid({
        data: items,
        datatype: "jsonstring",
        height: 150,
         //insert data from the data object we created abov
        

        colNames: ['visitorID','visitor_name','visitor_company','visitor_unit','visitor_smartcard','visitor_access','visitor_assetId','visitor_purpose','escort_empid','escort_name','escort_unit','escort_smartcard','escort_date','escort_time_from','escort_time_to','approvalStatus','dayCount'],
        colModel: [
            { name: "visitorempid", key:true, width: 50 },
            { name: "visitor_name",  width: 200},
            { name: "visitor_company", width: 75 },
            { name: "visitor_unit", width: 75},
            { name: "visitor_smartcard",key:true, width: 50 },
            { name: "visitor_access",  width: 200},
            { name: "visitor_assetId", width: 75 },
            { name: "visitor_purpose", width: 75},
            { name: "escort_empid", key:true, width: 50 },
            { name: "escort_name",  width: 200},
            { name: "escort_unit",  width: 75 },
            { name: "escort_smartcard", width: 75},
            { name: "escort_date",  width: 75},
            { name: "escort_time_from",key:true, width: 50 },
            { name: "escort_time_to",  width: 200},
            { name: "approvalStatus",  width: 75 },
            { name: "dayCount",  width: 75}
        ],
        viewrecords: true,
        pager: jQuery('#pager'),
        rowNum: 10,
        rowList: [10, 20, 30],
        viewrecords: true,
        caption: 'Visitor Record'

    });

   }

   
   
