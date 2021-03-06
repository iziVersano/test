/*!
 * Test

 */

define([
    'lib/mediator',
    'text!./templates/layout.tpl'
], function(
    mediator,
    layoutTemplate
) {
    'use strict';
    return Backbone.Layout.extend({
        className: 'widget widget-ErrorMessage',
        template: layoutTemplate,
        events: {
            'click .btn_popup_cancel'   : 'onClickClose',
            'click .btn_popup_confirm'  : 'onClickConfirm'
        },
        serialize: function () {
            return {
                confirmationTitleMessage: this.options.confirMessage,
                confirmationBodyMessage: this.options.confirMessageBody,
                cancelButton: this.options.cancelButton,
                confirmButton: this.options.confirmButton || 'OK'
            };
        },
        onClickClose:function (){
            mediator.broadcast('closePopup');
        },
        onClickConfirm: function () {
            if (this.options.callback && this.options.callback.fn) {
                var context = this.options.callback.context || window;
                this.options.callback.fn.call(context);
            }
            mediator.broadcast('closePopup');
        }
    });
});
