export type TSTaskItem = {
  id: string;
  time: Date;
  status: string;
};

export type TSTaskPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TSTaskData = {
  list: TSTaskItem[];
  pagination: Partial<TSTaskPagination>;
};

export type TSTaskParams = {
  bindId?: string;
  goodsId?: string;
  ordersId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
