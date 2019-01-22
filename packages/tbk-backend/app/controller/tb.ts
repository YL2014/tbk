import Base from './base';

/**
 * @Controller tb 淘宝客接口
 */
export default class Tb extends Base {
  /**
   * @summary 商品查询
   * @description 通过关键字搜索商品信息
   * @router get /tb/searchgoods
   * @request query q string 关键词
   * @response 200 searchGoodsResponse 商品列表信息
   */
  public async searchGoods () {
    const { ctx, service } = this;
    const query = this.ctx.query;
    ctx.validate(ctx.rule.searchGoodsRequest, query);
    const data = await service.tb.searchGoods(query);
    this.success(data);
  }

  /**
   * @summary 商品详情
   * @description 获取商品详情
   * @router get /tb/iteminfo
   * @request query id string 商品ID
   * @response 200 itemInfoResponse 商详
   */
  public async itemInfo () {
    const { ctx, service } = this;
    const rules = { id: { type: 'string' } };
    const query = this.ctx.query;
    ctx.validate(rules, query);
    const ip = ctx.ip;
    const data = await service.tb.itemInfo(query, ip);
    this.success(data);
  }
}
