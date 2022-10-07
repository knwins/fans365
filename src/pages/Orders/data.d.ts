import type { GoodsItem } from '../Goods/data';
import type{ UserItem } from '../User/data';

export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type OrdersItem = {
  id: string;
  link: string;
  fee: number;
  quantity: number;
  startCount: number; //开始计数器
  finishedQty: number; //已完成数量
  tstaskCount: number;
  status: string;
  description: string;
  updateTime: Date;
  createTime: Date;
  progress?: number;
  goods: GoodsItem;
  goodsTypeId: string;
  user: UserItem;
};

export type OrdersPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type OrdersListData = {
  list: OrdersListItem[];
  pagination: Partial<OrdersPagination>;
};

export type OrdersParams = {
  key?: string;
  status?: string;
  name?: string;
  goodsId?: string;
  goodsTypeIds?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};



//Tweet
export type TweetItem = {
  id: string;
  status?: string;
  useCount?: number;
  ordersId?: string;
  content: string;
};

export type TweetPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TweetParams = {
  status?: string;
  ordersId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
 
	 
 


