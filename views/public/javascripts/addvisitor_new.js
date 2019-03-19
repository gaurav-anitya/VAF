$(document).on('blur', '#txt_visitor_name', function () {
    $('#txt_visitor_name_2').val($('#txt_visitor_name').val());
});

$(document).ready(function () {
    $("#btn_purpose_other").click(function () {
        $("#txt_visit_purpose").prop("disabled", false);
    });
    $("#btn_purpose_new_joinee, #btn_purpose_audit, #btn_purpose_meeting, #btn_purpose_lost_card, #btn_purpose_de_allocation").click(function () {
        $("#txt_visit_purpose").val('');
        $("#txt_visit_purpose").prop("disabled", true);
    });
    $("#btn_company_other").click(function () {
        $("#txt_visitor_company_name").prop("disabled", false);
        $("#txt_visitor_company_name").prop("disabled", false);
        $("#div_employee_id").css("display","none");
        $("#div_employee_id").hide();
    });
    $("#btn_company_tcs").click(function () {
        $("#txt_visitor_company_name").val('');
        $("#txt_visitor_company_name").prop("disabled", true);
        $("#div_employee_id").show();
    });    
    $("#btn_purpose_new_joinee, #btn_purpose_lost_card, #btn_purpose_de_allocation").click(function () {
     //   $("#btn_company_tcs")[0].click();
     //   $("#btn_company_other").prop("disabled", true);
     $("#btn_company_tcs").addClass('btn_on_click');
     $("#visitor_company").val($("#btn_company_tcs").text());
    });
    $("#btn_purpose_audit, #btn_purpose_meeting, #btn_purpose_other").click(function () {
        $("#btn_company_other").prop("disabled", false);
    });
    $("#escort_id1").blur(function(e){
        if($("#escort_id").val().trim().length==0)
        return;
        var currentval=$(e.target).val();
        let idcount=0;
        $("[name='visitor_empid']").each(function(){
        
            if($(this).val().trim() === currentval.trim())
            {
                idcount++; 
            }
            if(idcount>0)
            {
                alertMessage('Escort person cannot be a visitor.Please verify ');
                $(e.target).val("");
            }
        });

        $.ajax(
          {
            url: "/validateEscort",
            type:"Post",
            data: {
             escort_id: $("#escort_id").val().trim()          
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

                document.getElementById("escort_smartcard").value =smartCard===0?'':smartCard; 
                $("#escortDeclaration").attr('disabled',false);
                getEscortPhotos();
                $('.escortDetails').removeClass('error');
             }
             else{
                document.getElementById("escort_name").value =""; 
                document.getElementById("escort_name").name.value="";
               document.getElementById("escort_unit").value =""; 
               document.getElementById("escort_smartcard").value =""; 
                 alertMessage("Escort is not Authorized.Please select other.");
                 $("#escortDeclaration").attr('disabled',true);
                 resetEscortPhotos();
                 
                // document.location.href="/";
             }        
        }
        }
        );  
    });
 
});