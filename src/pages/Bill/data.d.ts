import type { UserItem } from '../Account/data';
import type { OrdersItem } from '../Orders/data';
export type BillItem = {
  id: string;
  name: string;
  blance: number;
  amount: number;
  createTime: Date;
  type: string;
  status: string;
  orders: OrdersItem;
  user: UserItem;
};

export type BillPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type BillParams = {
  type?: string;
  ordersId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<BillItem>;
