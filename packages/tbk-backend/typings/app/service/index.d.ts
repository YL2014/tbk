// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportBaseTb from '../../../app/service/baseTb';
import ExportTb from '../../../app/service/tb';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    baseTb: ExportBaseTb;
    tb: ExportTb;
  }
}
