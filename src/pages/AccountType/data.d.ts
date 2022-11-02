export type AccountTypeItem = {
  id: string;
  name: string;
  link?: string;
  icon?: string;
  lang?: string;
};

export type AccountTypePagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type AccountTypeData = {
  list: AccountTypeItem[];
  pagination: Partial<AccountTypePagination>;
};

export type AccountTypeParams = {
   name?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
