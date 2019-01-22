module.exports = {
  searchGoodsResponse: {
    results: {
      type: 'object',
      description: '商品列表信息: http://open.taobao.com/api.htm?docId=24515&docType=2',
      properties: {
        n_tbk_item: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              nick: { type: 'string', description: '店铺名' },
              num_iid: { type: 'number', description: '商品ID' },
            },
          },
        },
      },
    },
    total_results: { type: 'number', description: '总数据量' },
  },

  itemInfoResponse: {
    results: {
      type: 'object',
      description: '商详: http://open.taobao.com/api.htm?docId=24518&docType=2',
      properties: {
        n_tbk_item: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              cat_name: { type: 'string', description: '一级类目名称' },
              num_iid: { type: 'number', description: '商品ID' },
              title: { type: 'string', description: '商品标题' },
              pict_url: { type: 'string', description: '商品主图' },
              small_images: { type: 'array', items: { type: 'string' }, description: '商品小图列表' },
              reserve_price: { type: 'string', description: '商品一口价格' },
              zk_final_price: { type: 'string', description: '商品折扣价' },
              provcity: { type: 'string', description: '商品所在地' },
              item_url: { type: 'string', description: '商品链接' },
            },
          },
        },
      },
    },
  },

  object: {},
};
