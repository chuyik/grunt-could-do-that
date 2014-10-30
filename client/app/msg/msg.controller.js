'use strict';
angular.module('gafApp').controller('MsgCtrl', function($scope, $http) {
  $scope.message = 'Hello';
  $scope.save = function() {
    $http.post('/api/msgs', {
      name: $scope.message,
      comments: [{
        body: 'nihao',
        nested: {
          stuff: "  OK ! "
        }
      }]
    });
    $scope.message = '';
  }

  $scope.update = function(){
    $http.put('/api/msgs/54462bb0a543e923921a1c19', {
        "name": "xxx",
        "__v": 1,
        "comments": [
            {
                "body": "44"
            },{
                "body": "55"
            }
        ]
    });
  }
});