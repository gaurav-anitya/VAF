$(function()
  {
    // $( ".second_add_btn" ).hide();
    var total_rows = 1;
    $(document).on('click', '.btn-add', function(e)
                   {
        total_rows++;
        var controlForm = $('.repeatable_item'),
            currentEntry = $(this).parents('#repeatable_row'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);
        newEntry.find('input').val('');
        controlForm.find('.btn-add:not(:last)')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')            
            .html('<span class="glyphicon glyphicon-minus"></span>');  
        controlForm.find('.btn-remove:last').clone().appendTo('.row_operation:last');
        $('.row_operation').find('.btn-add:not(:first)').remove();   
        $('.row_operation').find('.btn-remove:not(:first)').remove();
    }).on('click', '.btn-remove', function(e)
          {
        total_rows--;
        $(this).parents('#repeatable_row:first').remove();
        var controlForm = $('.repeatable_item');
        controlForm.find('.btn-remove:last').clone().appendTo('.row_operation:last');
        $('.repeatable_row:last').find('.btn-remove:not(:last)')
            .removeClass('btn-remove').addClass('btn-add')
            .removeClass('btn-danger').addClass('btn-success')            
            .html('<span class="glyphicon glyphicon-plus"></span>');
        $('.row_operation').find('.btn-add:not(:first)').remove();   
        $('.row_operation').find('.btn-remove:not(:first)').remove();

        if (total_rows==1){
            $('.row_operation').find('.btn-remove').remove();
        }

        e.preventDefault();
        return false;
    });
});

