import 'egg';

declare module 'egg' {
  interface Service {
    client: any,
  }
}
