// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportHome from '../../../app/controller/home';
import ExportTb from '../../../app/controller/tb';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
    tb: ExportTb;
  }
}
