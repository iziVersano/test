/*!
 * Test

 */

define([
    'lib/user',
    'lib/mediator',
    'lib/helpers',
    'text!../templates/form.tpl'
], function(
    user,
    mediator,
    helpers,
    formTemplate
) {
    'use strict';
    return Backbone.View.extend({
        template: formTemplate,
        serialize: {
            translations: helpers.translations()
        },
        initialize:function(){
           
        },
        
        afterRender: function() {
            
        },
      
    });
});
