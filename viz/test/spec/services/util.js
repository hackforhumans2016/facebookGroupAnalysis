'use strict';

describe('Service: util', function () {

  // load the service's module
  beforeEach(module('vizApp'));

  // instantiate service
  var util;
  beforeEach(inject(function (_util_) {
    util = _util_;
  }));

  it('should do something', function () {
    expect(!!util).toBe(true);
  });

  it('should do determine array intersections', function () {
    var a = [{id: 1}, {id:2}];
    var b = [{id: 2}];
    var c = util.onlyInA(a,b);
    console.log(c);
    expect(c[0].id).toBe(1);
  });

});
