﻿(function () {
    'use strict';

    var app = angular.module('app');

    // http://bartwullems.blogspot.ch/2014/10/angularjs-and-aspnet-mvc-isajaxrequest.html
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);

    app.config(["$provide", function ($provide) {
        var apiRoot = $("#apiRoot").attr("href");
        var mvcRoot = $("#mvcRoot").attr("href");

        $provide.constant('config', {
            apiRoot: apiRoot,
            mvcRoot: mvcRoot
        });
    }]);


    // Register global http exception handler

    app.factory('errorHttpInterceptor', errorHttpInterceptor);

    errorHttpInterceptor.$inject = ['$q',  '$rootScope'];

    function errorHttpInterceptor($q, $rootScope) {

        return {
            responseError: function responseError(rejection) {
        	    $rootScope.handleError(rejection);
        		return $q.reject(rejection);
        	}
        };
    }


    app.config(['$httpProvider', function ($httpProvider) {
    	$httpProvider.interceptors.push('errorHttpInterceptor');
    }]);


})();