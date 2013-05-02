/*!
 * Test

 */

define([
    'lib/settings',
    '../models/Channel'
], function(
    settings,
    ChannelModel
) {
    'use strict';
    return Backbone.Collection.extend({
       currentArr : [],
        //url: '/report',
       // model: ChannelModel,
        // comparator: function(column) {
        //     return column.get('columnName');
        // }
       //override parse due to json format. point to "data"
        page: 6,
        brodcasts: 1,
        response : null,
        // parse: function(response) {s
        //     this.response = response.data;
        //     var self = this;
            
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

        parse: function(response) {
            this.response = response.data;
            var self = this;
            console.log('processing backend data');
            _.each(response.data, function(model){
                        var brodcast =  _.last(model.broadcasts);
                        var brodcastArray = [];
                        brodcastArray.push(brodcast);
                        var newModel = {channel:model.channel, broadcasts:brodcastArray};
                        //Add object as bacbone model.
                        self.push(newModel);
              });
             
             //return all channels
             return this.models;
        },

        addResults: function(){
          console.log('pages:' + this.page);
          var counter = 0;
          var self = this;
          
           _.each(this.response, function(model){
                      if(counter <= self.page){
                        if($.inArray(model, self.currentArr) == -1){
                            console.log('model id:' + model.channel.id);
                             self.currentArr.push(model);
                            self.add(model);
                        }
                      }
              counter++;
          });
          //update  current array
        }
    });
});
