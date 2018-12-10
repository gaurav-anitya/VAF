
 

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
            escort_id: escort_id[1]           
          },
       success: function(result){
           var getToken=prompt("Please verify approval token :" +result);
        if (getToken) {
            
            $.ajax(
                {
                  url: "/visitorApproved",
                  type:"POST",
                  data: {
                    visitor_id: visitor_id ,getToken: getToken, escort_id: escort_id[1].trim()        
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
              
        } else {
           // document.location.href="/";
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
    var outTime=$("#out_time").val();
    if(outTime != "")
    {
    $.ajax(
      {
        url: "/updateOutTime",
        type:"Post",
        data: {
         visitor_id: visitor_id, outTime: outTime            
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
else{
    document.getElementById("out_time").style.display="block";
    document.getElementById("outTime").innerText="Update";
} 
});


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
     document.getElementById("id_tool").style.display = "none";
     document.getElementById("demo2").style.display="none";
     
    
   });

   $("#company-0").click(function(){
    var numbers = /^[0-9]+$/; 
    $("#other").attr('disabled',true);
    document.getElementById("id_tool").style.display = "inline";
    document.getElementById("demo2").style.display="inline";
    var empid = document.getElementById("visitor_id").value;
    if(empid != "" && empid.match(numbers)){
                return true;
            }else{
                document.getElementById("demo2").innerHTML="<br><sup>Please enter a valid EmpID</sup>";
            }
   
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
            //     "aaData": items,
            //     "processing": true,
                
            //     "scrollX": true,
            //     "scrollY": "500px",
            //     "width":"101%",
            //     "scrollCollapse": true,
            //     "columns": [ 
            //         { "data": "visitor_empid" },
            //     { "data": "visitor_name" },
                 
            //      { "data": "escort_date"},
                 
            //      { "data": "approvalStatus" },
                 
                
            // ],
            "dom": 'lBrtip',
            buttons: [
                {
                    text: 'My button',
                    action: function ( e, dt, node, config ) {
                        alert( 'Button activated' );
                    }
                }
            ]
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

   function validation1(){
    var letters = /^[a-zA-Z]+$/;
    var name = document.getElementById("visitor_name").value;
    if(name != "" && name.match(letters)){
        return true;
    }else{
        document.getElementById("demo1").innerHTML="<br><sup>Please enter a valid Name</sup>";
    }
   }

//    function validation2(){
//     var numbers = /^[0-9]+$/; 
//     var empid = document.getElementById("visitor_id").value;
    
//     if ($('#company-0').is(':checked') && empid == "" && empid.match(numbers)){
//         document.getElementById("demo2").innerHTML="<br><sup>Please enter a valid Emp Id</sup>";
//     }
   
// }

   function validation3(){
    var letters = /^[a-zA-Z]+$/;    
    var project = document.getElementById("project").value;
    if(project != "" && project.match(letters)){
        return true;
    }else{
        document.getElementById("demo3").innerHTML="<br><sup>Please enter a valid Project Name</sup>";
    }
   }

   function validation4(){
    var numbers = /^[0-9]+$/;    
    var smartcard = document.getElementById("smart_card").value;
    if(smartcard != "" && smartcard.match(numbers)){
        return true;
    }else{
        document.getElementById("demo4").innerHTML="<br><sup>Please enter a valid Smartcard Number</sup>";
    }
   }



//   $("#formValidation1").click(function(){
//     var letters = /^[a-zA-Z]+$/;
//     var numbers = /^[0-9]+$/;    
//     var name = document.getElementById("visitor_name").value;
//     var empid = document.getElementById("visitor_id").value;
//     var project = document.getElementById("project").value;
//     var smartcard = document.getElementById("smart_card").value;
    
//     if(name != "" && name.match(letters)){
//        if(company== true){ if (empid != "" && empid.match(numbers) ){
//          if (project != "" && project.match(letters)){
//                 if(smartcard != "" && smartcard.match(numbers)){
//                     alert("true");                 
    
//              }else {
//                  alert("Enter valid Smartcard Number");
//              }
//            }else{
//                alert("Enter valid Project Name");
//            }
//         }else{
//             alert("Enter valid Employee ID");
//         }
//     }else{
//         if (project != "" && project.match(letters)){
//             if(smartcard != "" && smartcard.match(numbers)){
//                 alert("true");                 

//          }else {
//              alert("Enter valid Smartcard Number");
//          }
//        }else{
//            alert("Enter valid Project Name");
//        }
    
//     }
//    }
//     else{
        
//         document.getElementById("demo1").innerHTML="<br><sup>Please enter a valid Name</sup>";
//         alert("Enter valid Name");
//     }

//    });
$("#formValidation1").click(function val(){
    var empid = document.getElementById("visitor_id").value;
    var numbers = /^[0-9]+$/;

        if ( validation1()){
            //return true;
        }else{
            document.getElementById("demo1").innerHTML="<br><sup>Please enter a valid Name</sup>";
        }
        if ($('#company-0').is(':checked') && empid != "" && empid.match(numbers)){
            //return true;            
        }else{
            if(empid != "" && empid.match(numbers)){
            document.getElementById("demo2").innerHTML="";
            }
            else{
                document.getElementById("demo2").innerHTML="<br><sup>Please enter a valid Emp Id</sup>";
            }
        }
        if ( validation3()){
            //return true;
        }else{
            document.getElementById("demo3").innerHTML="<br><sup>Please enter a valid Project Name</sup>";
        }
        if ( validation4()){
            $("#formValidation1").attr("data-toggle", "modal");
            //return true;
            
            $( document ).ready(function() {
                $('#myModalVisitor').on('hidden.bs.modal', function () {
                          if($('#visitor_dec').prop("checked") == true) {
                             //alert("true");
                             $('#myCarousel').carousel('next');
                         } 
             
               });
             });
        }else{
            document.getElementById("demo4").innerHTML="<br><sup>Please enter a valid Smartcard Number</sup>";
        }
});

   
 $("#visitor_name").keyup(function(){
    document.getElementById("demo1").innerHTML="";
});
$("#visitor_id").keyup(function(){
    document.getElementById("demo2").innerHTML="";
});
$("#project").keyup(function(){
    document.getElementById("demo3").innerHTML="";
});
$("#smart_card").keyup(function(){
    document.getElementById("demo4").innerHTML="";
});
$("#visitor_date").change(function(){
    document.getElementById("demo5").innerHTML="";
});
$("#escort_time_from").change(function(){
    document.getElementById("demo5").innerHTML="";
});



$("#escortDeclaration").click(function time(){
    var time = document.getElementById("escort_time_from").value;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
    dd = '0'+dd
    }
    if(mm<10) {
    mm = '0'+mm
    }
    Date1 = yyyy + '-' + mm + '-' + dd;
    var Date2 = document.getElementById("visitor_date").value;
    if(time != ""){
        var t=1;
    }   else{
        document.getElementById("demo5").innerHTML="Please enter a valid Time";
    } 
    if (Date2 < Date1 || Date2 == ""){
        document.getElementById("demo5").innerHTML="Please enter a valid Date";
        
    }else{
        var d=1;
    }
    if ($('#idCheckbox1').is(':checked') || $('#idCheckbox2').is(':checked') || $('#idCheckbox3').is(':checked') || $('#idCheckbox4').is(':checked') || $('#idCheckbox5').is(':checked') || $('#idCheckbox6').is(':checked')){
        if(t==1&&d==1){
        $("#escortDeclaration").attr("data-toggle", "modal");
        return true;  }          
    }else{
        document.getElementById("demo6").innerHTML="<br><sup>Please select atleast one or more Identication</sup>";
    }

    
    
});

$("#idCheckbox1").change(function(){
    document.getElementById("demo6").innerHTML="";
});
$("#idCheckbox2").change(function(){
    document.getElementById("demo6").innerHTML="";
});
$("#idCheckbox3").change(function(){
    document.getElementById("demo6").innerHTML="";
});
$("#idCheckbox4").change(function(){
    document.getElementById("demo6").innerHTML="";
});
$("#idCheckbox5").change(function(){
    document.getElementById("demo6").innerHTML="";
});
$("#idCheckbox6").change(function(){
    document.getElementById("demo6").innerHTML="";
});
   
