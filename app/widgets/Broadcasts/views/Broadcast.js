/*!
 * Test

 */

define([
    'lib/helpers',
    'lib/user',
    'lib/mediator',
    'text!../templates/broadcast.tpl',
    'backbone'
], function(
    helpers,
    user,
    mediator,
    broadcastTemplate,
    Backbone
) {
    'use strict';
    return Backbone.View.extend({
        tagName:'li',
        template: broadcastTemplate,
        className: 'broadcast',
        serialize: function () {
            return {
               broadcastId: this.model.get('broadcast').id,
               broadcastImage: this.model.get('images').backdrops['w154'],
               program:this.model.get('program').title,
               broadcastTime : this.getBroadcastTime()
            };
        },
       
        initialize: function () {
            this.popularity = this.model.get('program').popularity;
            this.getBroadcastTime();
        },
        beforeRender: function () {
            
        },
        afterRender: function () {
            // var view = this;
            // var pop = parseFloat( parseFloat(this.popularity));
            //  console.log('pop:' + pop)
            // $.fn.stars = function() {
            //     return $(this).each(function() {
            //         $(this).html($('<span />').width(Math.max(0, (Math.min(5, pop))) * 46));
            //     });
            // }
            
            // this.$('span.stars').stars();
        },

        getBroadcastTime: function(){
            var startTime=  helpers.convertTimestamp(this.model.get('time').start);
            var endTime=    helpers.convertTimestamp(this.model.get('time').end);
            return (startTime + ' - ' + endTime);
        }

    });
});
