export type ProxyItem = {
  id: string;
  ip: string;
  port: string;
  username?: string;
  password?: string;
  provider?: string;
  provider?: string;
  createtime: Date;
  lang?: string;
};

export type ProxyPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type ProxyData = {
  list: ProxyItem[];
  pagination: Partial<ProxyPagination>;
};

export type ProxyParams = {
  ip?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
