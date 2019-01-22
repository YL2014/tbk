import { Service } from 'egg';
import { ApiClient } from '@ali/topSdk';
// import { IItemGet, IItemInfoGet, IItemConver, IItemRecommendGet, IShopGet, IShopRecommendGet } from '../../typings/tb';

/**
 * baseTb Service
 */
export default class BaseTb extends Service {
  constructor (args) {
    super(args);
    // 连接实例化
    this.client = new ApiClient({
      appkey: this.config.tbk.appkey,
      appsecret: this.config.tbk.appsecret,
      url: this.config.tbk.url,
    });
  }

  /**
   * 调用淘宝客api通用方法
   * @param url 接口地址
   * @param params 参数
   */
  private async baseCurl(url: string, params: any) {
    return new Promise((resolve: any, reject: any) => {
      this.client.execute(url, params, (error: Error, response: any) => {
        if (error) {
          this.logger.error(error);
          // reject('远程服务异常: tb');
          reject(JSON.stringify(error));
        } else {
          resolve(response);
        }
      });
    });
  }

  /**
   * 淘宝客商品查询 http://open.taobao.com/api.htm?docId=24515&docType=2
   * @param
   *  {string} q 查询词
   *  {string} cat 后台类目ID，用,分割，最大10个，该ID可以通过taobao.itemcats.get接口获取到
   *  {string} itemloc 所在地
   *  {string} sort 排序_des（降序），排序_asc（升序），销量（total_sales）
   *  {boolean} is_tmall 是否商城商品，设置为true表示该商品是属于淘宝商城商品，设置为false或不设置表示不判断这个属性
   *  {boolean} is_overseas 是否海外商品，设置为true表示该商品是属于海外商品，设置为false或不设置表示不判断这个属性
   *  {string} platform 链接形式：1：PC，2：无线，默认：１
   *  ...
   */
  public async itemGet ({
    fields = 'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick',
    q = '',
    cat,
    itemloc,
    sort = 'total_sales',
    is_tmall,
    is_overseas,
    platform = 1,
    page_no = 1,
    page_size = 20,
    start_price, end_price, start_tk_rate, end_tk_rate,
  }: IItemGet) {
    // 去除参数里的undefined和null
    const filterParams = this.ctx.helper.ignoreNull({
      q, cat, itemloc, sort, is_tmall, is_overseas, platform, page_no, page_size, start_price, end_price, start_tk_rate, end_tk_rate,
    });
    const data = await this.baseCurl('taobao.tbk.item.get', {
      fields,
      ...filterParams,
    });
    return data;
  }

  /**
   * 淘宝客商品关联推荐查询 http://open.taobao.com/api.htm?docId=24517&docType=2
   * @param params
   */
  public async itemRecommendGet ({
    fields = 'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url',
    num_iid,
    count = 20,
    platform = 1,
  }: IItemRecommendGet) {
    const data = await this.baseCurl('taobao.tbk.item.recommend.get', {
      fields, num_iid, count, platform,
    });
    return data;
  }

  /**
   * 淘宝客商品详情（简版）http://open.taobao.com/api.htm?docId=24518&docType=2
   * @param params
   *  {string} id 商品ID串，用,分割，最大40个
   *  {number} platform 链接形式：1：PC，2：无线，默认：１
   *  {string} ip ip地址，影响邮费获取，如果不传或者传入不准确，邮费无法精准提供
   */
  public async itemInfoGet ({ num_iids, platform = 1, ip }: IItemInfoGet) {
    const sendParams = { numiids: String(num_iids), platform } as any;
    if (ip) {
      sendParams.ip = ip;
    }
    const data = await this.baseCurl('taobao.tbk.item.info.get', sendParams);
    return data;
  }

  /**
   * 淘宝客店铺查询 http://open.taobao.com/api.htm?docId=24521&docType=2
   * @param params
   */
  public async shopGet ({
    fields = 'user_id,shop_title,shop_type,seller_nick,pict_url,shop_url',
    q,
    sort,
    is_tmall,
    start_credit,
    end_credit,
    start_commission_rate,
    end_commission_rate,
    start_total_action,
    end_total_action,
    start_auction_count,
    end_auction_count,
    platform = 1,
    page_no = 1,
    page_size = 20,
  }: IShopGet) {
    // 过滤没有传的无效参数
    const filterParams = this.ctx.helper.ignoreNull({
      fields, q, sort, is_tmall, start_credit, end_credit, start_commission_rate, end_commission_rate,
      start_total_action, end_total_action, start_auction_count, end_auction_count, platform, page_no, page_size,
    });
    const data = await this.baseCurl('taobao.tbk.shop.get', filterParams);
    return data;
  }

  /**
   * 淘宝客店铺关联推荐查询 http://open.taobao.com/api.htm?docId=24522&docType=2
   * @param params
   */
  public async shopRecommendGet ({
    fields = 'user_id,shop_title,shop_type,seller_nick,pict_url,shop_url',
    user_id,
    count = 20,
    platform = 1,
  }: IShopRecommendGet) {
    const data = await this.baseCurl('taobao.tbk.shop.recommend.get', {
      fields, user_id, count, platform,
    });
    return data;
  }

  /**
   * 淘宝客商品链接转换 http://developer.alibaba.com/docs/api.htm?spm=a219a.7395905.0.0.652c75fe6Lv8aZ&apiId=24516
   * 非淘宝客基础API，暂无该接口权限
   * @param param0
   */
  public async itemConvert ({
    fields = 'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick',
    num_iids,
    adzone_id,
    platform = 1,
    unid,
    dx = '1',
  }: IItemConver) {
    const data = await this.baseCurl('taobao.tbk.item.convert', {
      fields,
      num_iids,
      platform,
      dx,
      unid,
      adzone_id,
    });
    return data;
  }
}
