import { Controller } from 'egg';

export default class BaseController extends Controller {
  constructor (app) {
    super(app);
    this.app = app;
  }

  success(data, code = 0) {
    this.ctx.body = {
      code,
      data,
    };
  }

  notFound (msg = 'not found') {
    this.ctx.throw(404, msg);
  }
}
