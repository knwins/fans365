export type BindItem = {
  id: string;
  uuid: string;
  email: string;
  telephone: string;
  password: string;
  runtime:Date;
  username: string;
  environmentItem:EnvironmentItem;
  type: string;
  level: string;
  status: string;
  followersCount: number;
  tweetCount: number;
};

export type BindPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type BindData = {
  list: BindItem[];
  pagination: Partial<BindPagination>;
};

export type BindParams = {
  userId?: string;
  username?: string;
  status?:string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
