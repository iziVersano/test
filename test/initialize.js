/*!
 * Datapine
 * Test Initialize
 * Copyright(c) 2012
 */

"use strict";

// Require configuration
require.config({
    baseUrl: '../app',
    paths: {
        'text' : '../vendor/require.text-2.0.3',
    }
});

// Jasmine setup
var jasmineEnv = jasmine.getEnv();
jasmineEnv.updateInterval = 1000;
var htmlReporter = new jasmine.HtmlReporter();
jasmineEnv.addReporter(htmlReporter);
jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
};

// Tests
require([
      '../test/specs/Channels',
         'lib/mods'
    // '../test/specs/mediatorSpec',
    // '../test/specs/utilsSpec',
    // '../test/specs/widgets/FieldEditor/subwidgets/NumberGrouping/models/RangeSpec',
    // '../test/specs/widgets/FieldEditor/subwidgets/NumberGrouping/collections/GroupsSpec'
], function () {
    jasmineEnv.execute();
});
