'use strict';

describe('Directive: hfhImageGrid', function () {

  // load the directive's module
  beforeEach(module('vizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hfh-image-grid></hfh-image-grid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hfhImageGrid directive');
  }));
});
