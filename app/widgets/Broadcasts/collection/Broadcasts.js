/*!
 * Test

 */

define([
    'lib/settings',
    '../models/Broadcast'
], function(
    settings,
    BroadcastModel
) {
    'use strict';
    return Backbone.Collection.extend({
       currentArr : [],
       // url: '/report',
       // model: BroadcastModel,
        // comparator: function(column) {
        //     return column.get('columnName');
        // }
       //override parse due to json format. point to "data"
        page: 10,
        response : null
        // parse: function(response) {
        //     this.response = response.data;
        //     var self = this;
        //     debugger;
        //     console.log('parse ###########################################');
        //     var counter = 0;
        //     _.each(response.data, function(model){
        //               if(counter <= self.page){
        //                 self.currentArr.push(model);
        //                 self.push(model);
        //               }
        //                counter++;
        //      });
        //      //Object.keys(response.data).lengt
        //      //return models
          
        //      //return all channels
        //      return this.models;
        // },

        // addResults: function(){
        //   console.log('pages:' + this.page);
        //   var counter = 0;
        //   var self = this;
        //   debugger;
        //    _.each(this.response, function(model){
        //               if(counter <= self.page){
        //                 if($.inArray(model, self.currentArr) == -1){
        //                     console.log('model id:' + model.channel.id);
        //                      self.currentArr.push(model);
        //                     self.add(model);
        //                 }
        //               }
        //       counter++;
        //   });
        //   //update  current array
        // }
    });
});
