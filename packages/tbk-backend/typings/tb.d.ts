
// 淘宝客相关

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

interface IItemConver {
  fields?: string,
  num_iids: string,
  adzone_id: number,
  platform?: number,
  unid?: string,
  dx?: string,
}