export type UserPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export interface TagType {
  key: string;
  label: string;
}

export type GeographicType = {
  label: string;
  key: string;
};

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type UserItem = {
  id: string;
  name: string;
  avatar: string;
  notice: NoticeType[];
  signature: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  province: GeographicType;
  city: GeographicType;
  address: string;
  phone: string;
};

export type UserParams = {
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<UserItem>;
