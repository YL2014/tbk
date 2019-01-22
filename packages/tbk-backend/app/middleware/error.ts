import { Context } from 'egg';

export default function errorMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (error) {
      ctx.logger.error('errorMiddleware: ', error);
      ctx.body = {
        code: -1,
        status: 500,
        message: error.message || error,
      };
      ctx.status = 500;
    }
  };
}
