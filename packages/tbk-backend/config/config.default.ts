import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1547722119546_936';

  // add your egg config in here
  config.middleware = [ 'error' ];

  // 修改端口为8001
  config.cluster = {
    listen: {
      port: 8001,
    },
  };

  // config.onerror = {
  //   all (err, ctx) {
  //     ctx.body = JSON.stringify({
  //       code: -1,
  //       status: 500,
  //       message: err.message || 'System error!',
  //     });
  //     ctx.status = 500;
  //   },
  // };

  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  // swagger 接口文档
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'tbk-api',
      description: 'tbk接口文档',
      version: '1.0.0',
    },
    schemes: [ 'http' ],
    enable: true,
    routerMap: true,
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,

    tbk: {
      appkey: 'appkey',
      appsecret: 'appsecret',
      url: 'http://gw.api.taobao.com/router/rest',
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
