/* FUNCTION TO CHECK DUPLICATE NAMES IN DYNAMICALLY GENERATED TEXTBOX */
    $(document).on('blur','.selector',function () {
        var current_value = $(this).val();
        $(this).attr('value',current_value);
        console.log(current_value);
        //alert($('.selector[value="' + current_value + '"]'));
        if ($('.selector[value="' + current_value + '"]').not($(this)).length > 0 || current_value.length == 0 ) {
            $(this).val('');
            alert('Duplicate IDs present in Visitor List');
        }
    });

 $(document).on('blur','#escort_id',function () {
        var current_value = $(this).val();
        $(this).attr('value',current_value);
        console.log(current_value);
        //alert($('.selector[value="' + current_value + '"]'));
        if ($('.selector[value="' + current_value + '"]').not($(this)).length > 0 || current_value.length == 0 ) {
            $(this).val('');
            alert('Escort ID and Visitor ID cannot be the same or blank');
        }
    });

$(function()
{
    $( ".second_add_btn" ).hide();
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('#repeatable_item'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')            
            .html('<span class="glyphicon glyphicon-minus"></span>');       
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();
		e.preventDefault();
		return false;
	});
    
});

