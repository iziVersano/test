(function ($) {
    var methods = {
        init: function () {
            return this.each(function () {
                var $this = $(this),
                    currentHolder = $this.attr('dataholder');

                if (currentHolder) {

                    $this.on('focus', function () {
                        var value = $this.val(),
                            holder = $this.attr('dataholder');
                        if (value && value === holder) {
                            $this.val('').removeClass('dataHolder');
                        }
                    });

                    $this.on('blur', function () {
                        var value = $this.val(),
                            holder = $this.attr('dataholder');
                        if (!value) {
                            $this.val(holder).addClass('dataHolder');
                        }
                    });

                    if (!$this.val()) {
                        $this.val(currentHolder).addClass('dataHolder');
                    }
                }
            });
        },
        set: function (value) {
            if (typeof value === 'string' && value.length) {
                $(this).attr('dataholder', value);
            }
        },
        getValue: function () {
            var $this = $(this),
                value = $this.val(),
                holder = $this.attr('dataholder');
            if (value && value === holder) {
                return '';
            } else {
                return value;
            }
        }
    };

    $.fn.dataHolder = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.dataHolder');
        }
    };
})(jQuery);