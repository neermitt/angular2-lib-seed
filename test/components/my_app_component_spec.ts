import {
  AsyncTestCompleter,
  beforeEach,
  ddescribe,
  describe,
  expect,
  iit,
  inject,
  it,
  xdescribe,
  xit,
  IS_DARTIUM
  } from 'angular2/test_lib';

import {MyAppComponent} from 'my-components/components/my_app_component';

export function main() {
  describe('alert', function () {
    var component;

    beforeEach(function () {
      component = new MyAppComponent();
    });

    it('should work', function () {
      expect(component.name).toBe('Alice');
    });

  });
}
