import BaseTb from './baseTb';
// import { IItemGet } from '../../typings/tb';

export default class Tb extends BaseTb {
  constructor(args) {
    super(args);
  }

  /**
   * 淘宝客商品查询 http://open.taobao.com/api.htm?docId=24515&docType=2
   * @param params IItemGet
   *  {string} q 查询词
   *  {string} cat 后台类目ID，用,分割，最大10个，该ID可以通过taobao.itemcats.get接口获取到
   *  {string} itemloc 所在地
   *  {string} sort 排序_des（降序），排序_asc（升序），销量（total_sales）
   *  {boolean} is_tmall 是否商城商品，设置为true表示该商品是属于淘宝商城商品，设置为false或不设置表示不判断这个属性
   *  {boolean} is_overseas 是否海外商品，设置为true表示该商品是属于海外商品，设置为false或不设置表示不判断这个属性
   *  {string} platform 链接形式：1：PC，2：无线，默认：１
   */
  public async searchGoods (params: IItemGet) {
    const { q, cat, itemloc, sort = 'total_sales', is_tmall, is_overseas, platform = 1, page_no = 1, page_size = 20 } = params;
    const data = await this.itemGet({ q, cat, itemloc, sort, is_tmall, is_overseas, platform , page_no, page_size });
    return data;
  }

  /**
   * 淘宝客商品详情（简版）
   * @param params
   *  {string} id 商品ID串，用,分割，最大40个
   *  {number} platform 链接形式：1：PC，2：无线，默认：１
   *  {string} ip ip地址，影响邮费获取，如果不传或者传入不准确，邮费无法精准提供
   */
  public async itemInfo ({ id, platform = 1 }, ip) {
    const data = await this.itemInfoGet({
      ip,
      platform,
      num_iids: String(id),
    });
    return data;
  }

}
