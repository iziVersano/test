/*!
 * Test

 */

define([
    'lib/helpers',
    'lib/mediator',
    'widgets/Broadcasts/main',
    'text!../templates/channel.tpl'

], function(
    helpers,
    mediator,
    BroadcastsWidget,
    channelTemplate
) {
    'use strict';
    return Backbone.View.extend({
        tagName: 'li',
        className: 'tablecontainerrow',
        template: channelTemplate,
        initialize: function () {
         // this.collection.on("add reset", this.render, this);
        },
          serialize: function () {
            return {
               
                channeLogo: this.model.get('channel').img.icons['w110'],
                avatar:this.model.get('channel').id
            };
        },
        beforeRender: function () {
            this.nextButton = this.$('.next');
            this.prevButton = this.$('.prev');
             this.setViews({
            '.container-widget-broadcasts'  : new BroadcastsWidget({model:this.model, brodcasts:this.collection ,collection: this.options.broadcasts, widget: this })
            });
        },

        afterRender: function () {
            
        }
     });
});