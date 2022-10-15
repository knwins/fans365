import type { GoodsTypeItem } from '../GoodsType/data';

export type GoodsItem = {
  id: string;
  disabled?: boolean;
  name: string;
  logo: string;
  description: string;
  price: number; //单位分
  minNumber: number; //最大数量
  maxNumber: number; //最小数量
  days: number;
  status: string;
  sort: number;
  level:string;
  goodsTypeId: string;
  goodsType: GoodsTypeItem;
};

export type GoodsPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type GoodsParams = {
  name?: string;
  status?: string;
  goodsTypeId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
