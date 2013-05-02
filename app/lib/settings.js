/*!
 * Test

 */

define(function() {
    'use strict';
    return {
        apiBaseURL: 'http://api.gettuned.in/epg/test',//window.location.hostname
        defaultLanguage: 'en',
        loginRoute: 'login',
        loginSuccessRoute: 'home',
        logoutRoute: 'logout',
        databaseSetttings: 'settings',
        homeRoute: 'home',
        splashScreenRoute: 'welcome',
        supportEmail: 'support@Test.com',
        databases:'settings/databases',
        emailAuthUrl:'util/forgotpassword',
        successPasswordreset:'resetpwdsuccess',
        dateFormat: 'd MM yy',
        defaultMinWidth:1224,
        defaultChartType: 'line',   // used to set the default chart type in the application
        defaultMinHeight:667,  // because, jakob's laptop has mega ultra high resolution screen
        defaultHeaderHeight:61,
        defaultToolbarHeight:56,
        chartsRoute: 'charts'
    };
});
