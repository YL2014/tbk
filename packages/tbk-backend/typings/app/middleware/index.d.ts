// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportError from '../../../app/middleware/error';

declare module 'egg' {
  interface IMiddleware {
    error: typeof ExportError;
  }
}
