import { Service } from 'egg';
import { ApiClient } from '@ali/topSdk';
import { IItemGet, IItemRecommendGet, IItemInfoGet, IShopGet, IShopRecommendGet, IUatmFavoritesItemGet, IUatmFavoritesGet, IJuTqgGet, IItemGuessLike, IDgItemCouponGet, ICouponGet, IItemConver, ITpwdCreate, IDgNewuserOrderGet, IScNewuserOrderGet, IDgOptimusMaterial, IDgmaterialOptional, IDgNewuserOrderSum, IScNewuserOrderSum, IScOptimusMaterial, IActivitylinkGet, IScActivitylinkToolget, IDgPunishOrderGet } from '../../typings/tb';

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
    // 过滤掉参数中的null和undefined
    params = this.ctx.helper.ignoreNull(params);
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
    const data = await this.baseCurl('taobao.tbk.item.get', {
      fields, q, cat, itemloc, sort, is_tmall, is_overseas, platform, page_no, page_size, start_price, end_price, start_tk_rate, end_tk_rate,
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
    const data = await this.baseCurl('taobao.tbk.shop.get', {
      fields, q, sort, is_tmall, start_credit, end_credit, start_commission_rate, end_commission_rate, start_total_action,
      end_total_action, start_auction_count, end_auction_count, platform, page_no, page_size,
    });
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
   * 获取淘宝联盟选品库的宝贝信息 http://open.taobao.com/api.htm?docId=26619&docType=2
   * @param param0
   */
  public async uatmFavoritesItemGet ({
    fields = 'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick,shop_title,zk_final_price_wap,event_start_time,event_end_time,tk_rate,status,type',
    platform = 1,
    page_size = 20,
    adzone_id,
    unid,
    favorites_id,
    page_no = 1,
  }: IUatmFavoritesItemGet) {
    const data = await this.baseCurl('taobao.tbk.uatm.favorites.item.get', {
      fields, platform, page_size, adzone_id, unid, favorites_id, page_no,
    });
    return data;
  }

  /**
   * 获取淘宝联盟选品库列表 taobao.tbk.uatm.favorites.get
   * @param param0
   */
  public async uatmFavoritesGet ({
    page_no = 1,
    page_size = 20,
    fields = 'favorites_title,favorites_id,type',
    type = -1,
  }: IUatmFavoritesGet) {
    const data = await this.baseCurl('taobao.tbk.uatm.favorites.get', {
      page_no, page_size, fields, type,
    });
    return data;
  }

  /**
   * 淘抢购api http://open.taobao.com/api.htm?docId=27543&docType=2
   * @param param0
   */
  public async juTqgGet ({
    adzone_id,
    fields = 'click_url,pic_url,reserve_price,zk_final_price,total_amount,sold_num,title,category_name,start_time,end_time',
    start_time,
    end_time,
    page_no = 1,
    page_size = 40,
  }: IJuTqgGet) {
    const data = await this.baseCurl('taobao.tbk.ju.tqg.get', {
      adzone_id, start_time, end_time, fields, page_no, page_size,
    });
    return data;
  }

  /**
   * 链接解析api http://open.taobao.com/api.htm?docId=28156&docType=2
   * @param click_url 长链接或短链接
   */
  public async itemClickExtract (click_url: string) {
    const data = await this.baseCurl('taobao.tbk.item.click.extract', { click_url });
    return data;
  }

  /**
   * 淘宝客商品猜你喜欢 http://open.taobao.com/api.htm?docId=29528&docType=2
   * @param param0
   */
  public async itemGuessLike ({
    adzone_id,
    user_nick,
    user_id,
    os = 'android',
    idfa,
    imei,
    imei_md5,
    ip,
    ua = 'Mozilla/5.0',
    apnm,
    net = 'wifi',
    mn,
    page_no = 1,
    page_size = 20,
  }: IItemGuessLike) {
    const data = await this.baseCurl('taobao.tbk.item.guess.like', {
      adzone_id, user_nick, user_id, os, idfa, imei, imei_md5, ip, ua, apnm, net, mn, page_no, page_size,
    });
    return data;
  }

  /**
   * 好券清单API【导购】 http://open.taobao.com/api.htm?docId=29821&docType=2
   * @param param0
   */
  public async dgItemCouponGet ({
    adzone_id,
    platform = 1,
    cat,
    q,
    page_size,
    page_no,
  }: IDgItemCouponGet) {
    const data = await this.baseCurl('taobao.tbk.dg.item.coupon.get', {
      adzone_id, platform, cat, q, page_size, page_no,
    });
    return data;
  }

  /**
   * 阿里妈妈推广券信息查询 http://open.taobao.com/api.htm?docId=31106&docType=2
   * @param param0
   */
  public async CouponGet ({
    me,
    item_id,
    activity_id,
  }: ICouponGet) {
    const data = await this.baseCurl('taobao.tbk.coupon.get', {
      me, item_id, activity_id,
    });
    return data;
  }

  /**
   * 淘宝客淘口令 http://open.taobao.com/api.htm?docId=31127&docType=2
   * @param param0
   */
  public async tpwdCreate ({
    user_id,
    text,
    url,
    logo,
    ext,
  }: ITpwdCreate) {
    const data = await this.baseCurl('taobao.tbk.tpwd.create', {
      user_id, text, url, logo, ext,
    });
    return data;
  }

  /**
   * 淘宝客新用户订单API--导购 http://open.taobao.com/api.htm?docId=33892&docType=2
   * @param param0
   */
  public async dgNewuserOrderGet ({
    adzone_id,
    page_size = 20,
    page_no = 1,
    start_time,
    end_time,
    activity_id,
  }: IDgNewuserOrderGet) {
    const data = await this.baseCurl('taobao.tbk.dg.newuser.order.get', {
      adzone_id, page_size, page_no, start_time, end_time, activity_id,
    });
    return data;
  }

  /**
   * 淘宝客新用户订单API--社交 http://open.taobao.com/api.htm?docId=33897&docType=2
   * @param param0
   */
  public async scNewuserOrderGet ({
    adzone_id,
    page_size = 20,
    page_no = 1,
    site_id,
    activity_id,
    end_time,
    start_time,
  }: IScNewuserOrderGet) {
    const data = await this.baseCurl('taobao.tbk.sc.newuser.order.get', {
      adzone_id, page_size, page_no, site_id, activity_id, start_time, end_time,
    });
    return data;
  }

  /**
   * 淘宝客物料下行-导购 http://open.taobao.com/api.htm?docId=33947&docType=2
   * @param param0
   */
  public async dgOptimusMaterial ({
    adzone_id,
    page_size = 20,
    page_no = 1,
    material_id,
    device_value,
    device_encrypt,
    device_type,
    content_id,
    content_source,
    item_id,
  }: IDgOptimusMaterial) {
    const data = await this.baseCurl('taobao.tbk.dg.optimus.material', {
      adzone_id, page_size, page_no, material_id, device_encrypt, device_type, device_value, content_id, content_source, item_id,
    });
    return data;
  }

  public async dgMaterialOptional ({
    adzone_id,
    start_dsr,
    page_size = 20,
    page_no = 1,
    platform = 1,
    end_tk_rate,
    start_tk_rate,
    end_price,
    start_price,
    is_overseas,
    is_tmall,
    sort = 'total_sales',
    itemloc,
    cat,
    q,
    material_id,
    has_coupon,
    ip,
    need_free_shipment,
    need_prepay,
    include_pay_rate_30,
    include_good_rate,
    include_rfd_rate,
    npx_level,
    end_ka_tk_rate,
    start_ka_tk_rate,
    device_encrypt,
    device_value,
    device_type,
  }: IDgmaterialOptional) {
    const data = await this.baseCurl('taobao.tbk.dg.material.optional', {
      adzone_id, start_dsr, page_size, page_no, platform, end_tk_rate, start_tk_rate, end_price, start_price, is_overseas,
      is_tmall, sort, itemloc, cat, q, material_id, has_coupon, ip, need_free_shipment, need_prepay, include_pay_rate_30,
      include_good_rate, include_rfd_rate, npx_level, end_ka_tk_rate, start_ka_tk_rate, device_encrypt, device_value,
      device_type,
    });
    return data;
  }

  /**
   * 拉新活动汇总API--导购 http://open.taobao.com/api.htm?docId=36836&docType=2
   * @param param0
   */
  public async dgNewuserOrderSum ({
    adzone_id,
    page_size = 20,
    page_no = 1,
    site_id,
    activity_id,
    settle_month,
  }: IDgNewuserOrderSum) {
    const data = await this.baseCurl('taobao.tbk.dg.newuser.order.sum', {
      adzone_id, page_size, page_no, site_id, activity_id, settle_month,
    });
    return data;
  }
  /**
   * 拉新活动汇总API--社交 http://open.taobao.com/api.htm?docId=36837&docType=2
   * @param param0
   */
  public async scNewuserOrderSum ({
    adzone_id,
    page_size = 20,
    page_no = 1,
    site_id,
    activity_id,
    settle_month,
  }: IScNewuserOrderSum) {
    const data = await this.baseCurl('taobao.tbk.sc.newuser.order.sum', {
      adzone_id, page_size, page_no, site_id, activity_id, settle_month,
    });
    return data;
  }

  /**
   * 淘宝客擎天柱通用物料API - 社交 http://open.taobao.com/api.htm?docId=37884&docType=2
   * @param param0
   */
  public async scOptimusMaterial ({
    adzone_id,
    site_id,
    page_size = 20,
    page_no = 1,
    material_id,
    device_type,
    device_encrypt,
    device_value,
    content_id,
    content_source,
    item_id,
  }: IScOptimusMaterial) {
    const data = await this.baseCurl('taobao.tbk.sc.optimus.material', {
      adzone_id, site_id, page_no, page_size, material_id, device_encrypt, device_type, device_value, content_id, content_source, item_id,
    });
    return data;
  }

  /**
   * 淘宝联盟官方活动推广API-媒体 http://open.taobao.com/api.htm?docId=41918&docType=2
   * @param param0
   */
  public async activitylinkGet ({
    adzone_id,
    promotion_scene_id,
    union_id,
    platform = 1,
    sub_pid,
    relation_id,
  }: IActivitylinkGet) {
    const data = await this.baseCurl('taobao.tbk.activitylink.get', {
      adzone_id, promotion_scene_id, union_id, platform, sub_pid, relation_id,
    });
    return data;
  }

  /**
   *  淘宝联盟官方活动推广API-工具 http://open.taobao.com/api.htm?docId=41921&docType=2
   * @param param0
   */
  public async scActivitylinkToolget ({
    adzone_id,
    site_id,
    promotion_scene_id,
    platform = 1,
    union_id,
    relation_id,
  }: IScActivitylinkToolget) {
    const data = await this.baseCurl('taobao.tbk.sc.activitylink.toolget', {
      adzone_id, site_id, promotion_scene_id, platform, union_id, relation_id,
    });
    return data;
  }

  /**
   * 处罚订单查询 -导购-私域用户管理专用 http://open.taobao.com/api.htm?docId=42050&docType=2
   * @param param0
   */
  public async dgPunishOrderGet ({
    span,
    relation_id,
    tb_trade_id,
    tb_trade_parent_id,
    page_size = 20,
    page_no = 1,
    start_time,
    special_id,
    violation_type,
    punish_status,
  }: IDgPunishOrderGet) {
    const data = await this.baseCurl('taobao.tbk.dg.punish.order.get', {
      af_order_option: this.ctx.helper.ignoreNull({
        span, relation_id, tb_trade_id, tb_trade_parent_id, page_size, page_no, start_time,
        special_id, violation_type, punish_status,
      }),
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
      fields, num_iids, platform, dx, unid, adzone_id,
    });
    return data;
  }
}
