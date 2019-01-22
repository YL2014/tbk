# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### 参考文档
- validate
  - https://github.com/node-modules/parameter
  - https://eggjs.org/zh-cn/basics/controller.html#%E5%8F%82%E6%95%B0%E6%A0%A1%E9%AA%8C

- 淘宝客api
  - http://open.taobao.com/api.htm?docId=24515&docType=2
