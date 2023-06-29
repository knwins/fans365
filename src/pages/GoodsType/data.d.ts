export type GoodsTypeItem = {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  lang?: string;
  sort?: number;
};

export type GoodsTypePagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type GoodsTypeData = {
  list: GoodsTypeItem[];
  pagination: Partial<GoodsTypePagination>;
};

export type GoodsTypeParams = {
  status?: string;
  name?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
