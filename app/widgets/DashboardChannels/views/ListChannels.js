/*!
 * Test

 */

define([
    'lib/helpers',
    './AccordionItem',
    'lib/mediator',
    'text!../templates/titleEpg.tpl'
], function(
    helpers,
    AccordionitemView,
    mediator,
    listTemplate
) {
    'use strict';
    return Backbone.View.extend({
        //template: listTemplate,
        className: 'tablecontainer',
        serialize: function () {
            return {
            };
        },
        initialize:function () {
         
        },
        beforeRender: function () {
            //this.collection.sort();
            
            this.collection.each(function (epg) {
                this.insertView(new AccordionitemView({collection:this.collection , broadcasts: epg.get('broadcasts'), model: epg }));
            }, this);
        }
       
    });
});
