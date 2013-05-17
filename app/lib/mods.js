/*!
 * Test

 */

define([
    'lib/settings',
    'lib/user',
    'lib/mediator'
], function(
    settings,
    user,
    mediator
) {
    'use strict';

    // New sync
    Backbone.emulateHTTP = false;
    Backbone.emulateJSON = false;

    function getRootUrl(url) {
      return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
    }

    Backbone.sync = function (method, model, options) {
        
        var ajaxURL;
       
        //check if we are in the same origin if we are we will use empty callback and return json 
        //if not we will use jsonp with a callback.
        var callback = (window.location.origin  ==  getRootUrl(settings.apiBaseURL)); 

        ajaxURL = settings.apiBaseURL;
        var AJAXtype = 'GET';
        var jsonType = callback ? 'json' : 'jsonp';

        ajaxURL +=  model.url;
      
        ajaxURL  += "&callback=";
        ajaxURL  += "&start=" + 1367320200;
        ajaxURL  += "&limit=" + model.brodcasts;   
        var postData={};
      
        return $.ajax({
            url: ajaxURL,
            type: AJAXtype,
            crossDomain :true,
            dataType: jsonType,
            data:postData,
            timeout: 360000,
            success: function (data, textStatus, jqXHR) {
                if (data.kind == "error" || data.success == "false" || data.success === false) {
                    if (options.error && _.isFunction(options.error)) {
                        options.error.apply(model, [model, data.error]);
                        mediator.broadcast('errorMessage', { message:data.description,error_code: data.error_code});
                    }
                    return false;
                } else {
                    if (options.success && _.isFunction(options.success)) {
                        options.success.apply(model, [data, 200, options]);
                    }
                    return true;
                }
            },
            error: function(model, fail, xhr){

            }
        });
    };
});