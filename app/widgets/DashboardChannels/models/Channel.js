/*!
 * Test

 */

define([
    'lib/settings',
    'backbone'
], function(
    settings,
    Backbone
) {
    'use strict';
    return Backbone.NestedModel.extend({
          url: '/',
        defaults: {
            broadcasts: {
                'to'           : '',
                'subject'      : '',
                'message'      : ''
            }
        }
    });
});
