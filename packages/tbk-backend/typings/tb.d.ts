import { platform } from "os";

// 淘宝客相关 http://open.taobao.com/api.htm?docId=24515&docType=2

interface IItemGet {
  fields?: string,
  q: string,
  cat?: string,
  itemloc?: string,
  sort?: string, // 排序
  is_tmall?: boolean,
  is_overseas?: boolean,
  start_price?: number,
  end_price?: number,
  start_tk_rate?: number,
  end_tk_rate?: number,
  platform?: number,
  page_no?: number,
  page_size?: number,
}

interface IItemInfoGet {
  ip?: string,
  platform: number,
  num_iids: string,
}

interface IItemRecommendGet {
  fields?: string, // 需返回的字段列表
  num_iid: number, // 商品ID
  count?: number, // 返回数量，默认20，最大值40
  platform?: number, // 链接形式：1：PC，2：无线，默认：１
}

interface IShopGet {
  fields?: string,
  q: string,
  sort?: string,
  is_tmall?: boolean,
  start_credit?: number,
  end_credit?: number,
  start_commission_rate?: number,
  end_commission_rate?: number,
  start_total_action?: number,
  end_total_action?: number,
  start_auction_count?: number,
  end_auction_count?: number,
  platform?: number,
  page_no?: number,
  page_size?: number,
}

interface IShopRecommendGet {
  fields?: string,
  user_id: number,
  count?: number,
  platform?: number,
}

interface IUatmFavoritesItemGet {
  platform?: number,
  page_size?: number,
  adzone_id: number,
  unid?: string,
  favorites_id: number,
  page_no?: number,
  fields?: string,
}

interface IUatmFavoritesGet {
  page_no?: number,
  page_size?: number,
  fields?: string,
  type?: number,
}

interface IJuTqgGet {
  adzone_id: number,
  fields?: string,
  start_time?: Date,
  end_time?: Date,
  page_no?: number,
  page_size?: number,
}

interface IItemGuessLike {
  adzone_id: number,
  user_nick?: string,
  user_id?: number,
  os?: string,
  idfa?: string,
  imei?: string,
  imei_md5?: string,
  ip: string,
  ua?: string,
  apnm?: string,
  net?: string,
  mn?: string,
  page_no?: number,
  page_size?: number,
}

interface IDgItemCouponGet {
  adzone_id: number,
  platform?: number,
  cat?: string,
  q?: string,
  page_size?: number,
  page_no?: number,
}

interface ICouponGet {
  me?: string,
  item_id?: number,
  activity_id?: string,
}

interface ITpwdCreate {
  user_id?: string,
  text: string,
  url: string,
  logo?: string,
  ext?: string,
}

interface IDgNewuserOrderGet {
  adzone_id: number,
  page_size?: number,
  page_no?: number,
  start_time?: Date,
  end_time?: Date,
  activity_id: string,
}

interface IScNewuserOrderGet {
  adzone_id: number,
  page_size?: number,
  page_no?: number,
  site_id?: number,
  activity_id: string,
  start_time?: Date,
  end_time?: Date,
}

interface IDgOptimusMaterial {
  adzone_id: number,
  page_size?: number,
  page_no?: number,
  material_id?: number,
  device_value?: string,
  device_encrypt?: string,
  device_type?: string,
  content_id?: number,
  content_source?: string,
  item_id?: number,
}

interface IDgmaterialOptional {
  adzone_id: number,
  start_dsr?: number,
  page_size?: number,
  page_no?: number,
  platform?: number,
  end_tk_rate?: number,
  start_tk_rate?: number,
  end_price?: number,
  start_price?: number,
  is_overseas?: boolean,
  is_tmall?: boolean,
  sort?: string,
  itemloc?: string,
  cat?: string,
  q?: string,
  material_id?: number,
  has_coupon?: boolean,
  ip?: string,
  need_free_shipment?: boolean,
  need_prepay?: boolean,
  include_pay_rate_30?: boolean,
  include_good_rate?: boolean,
  include_rfd_rate?: boolean,
  npx_level?: number,
  end_ka_tk_rate?: number,
  start_ka_tk_rate?: number,
  device_encrypt?: string,
  device_value?: string,
  device_type?: string,
}

interface IDgNewuserOrderSum {
  adzone_id: number,
  page_size?: number,
  page_no?: number,
  site_id?: number,
  activity_id: string,
  settle_month?: string,
}

interface IScNewuserOrderSum {
  adzone_id: number,
  page_size?: number,
  page_no?: number,
  site_id?: number,
  activity_id: string,
  settle_month?: string,
}

interface IScOptimusMaterial {
  adzone_id: number,
  site_id: number,
  page_size?: number,
  page_no?: number,
  material_id?: number,
  device_type?: string,
  device_encrypt?: string,
  device_value?: string,
  content_id?: number,
  content_source?: string,
  item_id?: number,
}

interface IActivitylinkGet {
  adzone_id: number,
  promotion_scene_id: number,
  platform?: number,
  union_id?: string,
  sub_pid?: string,
  relation_id?: string,
}

interface IScActivitylinkToolget {
  adzone_id: number,
  site_id: number,
  promotion_scene_id: number,
  platform?: number,
  union_id?: string,
  relation_id?: string,
}

interface IDgPunishOrderGet {
  span?: number,
  relation_id?: number,
  tb_trade_id?: number,
  tb_trade_parent_id?: number,
  page_size?: number,
  page_no?: number,
  start_time?: Date,
  special_id?: number,
  violation_type?: number,
  punish_status?: number,
}

interface IItemConver {
  fields?: string,
  num_iids: string,
  adzone_id: number,
  platform?: number,
  unid?: string,
  dx?: string,
}