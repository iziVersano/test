(function( $ ){
    var methods = {
        init : function() {
            $(".drop_down_menu", this).css({width:$(this).width()-2});

            $('.selected_value', this).click(function(event){
                if($(this).parents('.styled_dropdown').hasClass('act')){
                    $(this).parents('.styled_dropdown').removeClass('act');
                }
                else {
                    $('.styled_dropdown').removeClass('act');
                    $(this).parents('.styled_dropdown').addClass('act');
                }
                event.stopPropagation();
                event.preventDefault(event);
            })

            $('.drop_down_menu ul li', this).click(function(event){
                $(this).parents('.styled_dropdown').find('.selected_value b').html($(this).text())
                $(this).parents('.styled_dropdown').toggleClass('act');
                $(this).parents('.drop_down_menu').find('li').removeClass('act');
                $(this).addClass('act');
                $(".styled_dropdown input").val($(this).attr('val'));
                $(".styled_dropdown input").trigger("change");

            })

            $('.drop_down_menu', this).click(function(event){
                event.stopPropagation();
                event.preventDefault(event);
            })

            $('body').click(function(){
                $('.styled_dropdown').removeClass('act')
            })
        }
    };

    $.fn.styledDropdown = function( method ) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }
    };
})( jQuery );