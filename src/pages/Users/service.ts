// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import type { UserItem } from './data';

/** 获取列表 GET /api/users/list */
export async function queryUsersList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: UserItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('https://api.fans365.net/api/users/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/users/list */
export async function getUsers(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<UserItem>('https://api.fans365.net/api/users/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新PUT /api/users/update */
export async function updateUsers(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: UserItem;
    /** 列表的内容总数 */
    info?: string;
    status?: boolean;
  }>('https://api.fans365.net/api/users/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 删除 DELETE /api/users/delete */
export async function removeUsers(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/users/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
