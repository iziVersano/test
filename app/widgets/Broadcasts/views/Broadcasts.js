/*!
 * Test

 */

define([
    'lib/helpers',
    './broadcast',
    'lib/mediator'
], function(
    helpers,
    BroadcastItemView,
    mediator
) {
    'use strict';
    return Backbone.View.extend({
        //template: reportsTemplate,
        className: 'broadcastlist',
        initialize:function () {
          
        },
        beforeRender: function () {
            //this.collection.sort();
            this.collection.each(function (broadcast) {
                this.insertView(new BroadcastItemView({ model: broadcast }));
            }, this);
        }
    });
});
