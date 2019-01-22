export default {
  // 从对象里挑选属性
  pick: (obj, keys): object => {
    const result = {};
    keys.forEach((item: string) => {
      result[item] = obj[item];
    });
    return result;
  },

  // 去掉对象里的undefined和null
  ignoreNull: objs => {
    const result = {};
    Object.keys(objs).map(item => {
      if (objs[item] !== undefined && objs[item] !== null) {
        result[item] = objs[item];
      }
    });
    return result;
  },
};
