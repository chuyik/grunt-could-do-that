'use strict';

describe('Controller: MsgCtrl', function () {

  // load the controller's module
  beforeEach(module('gafApp'));

  var MsgCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MsgCtrl = $controller('MsgCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
