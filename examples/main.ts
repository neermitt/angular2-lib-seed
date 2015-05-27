/// <reference path="../typings/angular2/angular2.d.ts" />

import {bootstrap} from 'angular2/angular2';

import {Something} from '../src/something';
import {MyAppComponent} from '../src/my_app_component';

var s = new Something();

console.log('1 + 2 is ', s.sum(1, 2));


bootstrap(MyAppComponent);
