'use strict';

angular.module('gafApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('msg', {
        url: '/msg',
        templateUrl: 'app/msg/msg.html',
        controller: 'MsgCtrl'
      });
  });