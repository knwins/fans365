// @ts-ignore
/* eslint-disable */

import { request } from 'umi';
import type { AccountTypeItem } from './data.d';

//国际化
/** 获取列表 GET /api/AccountType_list */
export async function getAccountTypeList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<{
    data: AccountTypeItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('https://api.fans365.net/api/account_type/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/AccountType */
export async function getAccountType(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: AccountTypeItem;
    status?: boolean;
  }>('https://api.fans365.net/api/account_type/get', {
    data,
    method: 'GET',

    ...(options || {}),
  });
}

/** 新建 PUT /api/AccountType */
export async function updateAccountType(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/account_type/update', {
    data,
    method: 'PUT',

    ...(options || {}),
  });
}

/** 新建 POST /api/AccountType */
export async function addAccountType(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/account_type/add', {
    data,
    method: 'POST',

    ...(options || {}),
  });
}

/** 删除 DELETE /api/AccountType */
export async function removeAccountType(data: { id: string }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/account_type/delete', {
    data,
    method: 'DELETE',

    ...(options || {}),
  });
}
