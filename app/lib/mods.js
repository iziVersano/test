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
    Backbone.sync = function (method, model, options) {
        
        var ajaxURL;
        var methodMap = {
            'create': 'POST',
            'update': 'PUT',
            'delete': 'DELETE',
            'read':   'GET'
        };
        var payload =  JSON.stringify(model.toJSON());
        if(payload.length > 20000 && (methodMap[method] == 'POST' || methodMap[method] == 'PUT' || methodMap[method] == 'DELETE')){
            ajaxURL = settings.apiBaseURL + '/'+methodMap[method].toLowerCase();
            var AJAXtype = 'POST';
            var jsonType = 'json';
            var flag = false;
        }
        else{
            ajaxURL = settings.apiBaseURL + '/__';
            var AJAXtype = 'GET';
            var jsonType = 'jsonp';
            var flag = true;
            var payload = encodeURIComponent(payload);
        }

        ajaxURL += (_.isFunction(model.url) ? model.url() : model.url) + '/';
        if(flag){
        ajaxURL  += "?&callback=?";
        ajaxURL  += "&_method=" + methodMap[method];
        ajaxURL  += "&start=" + 1367320200;
        ajaxURL += "&limit=" + model.brodcasts;   
         var postData={};
        }
        else{
            var postData = {_payload:payload};
        }
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