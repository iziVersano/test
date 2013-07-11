/*!
 * Test

 */

define([
    'lib/settings',
    'underscore', 
    'backbone'
], function(
    settings,
    _,
    Backbone
) {
    'use strict';
    return Backbone.NestedModel.extend({
          url: '/'
    });
});
