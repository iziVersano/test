/*!
 * Test

 */

define([
    'lib/settings'
], function(
    settings
) {
    'use strict';
    return Backbone.Collection.extend({
       // url: '/report',
       // model: ReportModel,
        // comparator: function(column) {
        //     return column.get('columnName');
        // }
       //override parse due to json format. point to "data"
        page: 5,
        parse: function(response) {
           var dataArr = [];
           var self = this;
          //filter broadcasts
           var counter = 0 ;
            _.each(response.data, function(model){ 
                      if(counter <= self.page){
                        self.push(model);
                      }
                      counter++;
             });
             //Object.keys(response.data).length
             //return models
             return this.models;
        }
    });
});
