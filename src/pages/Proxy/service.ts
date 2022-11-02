// @ts-ignore
/* eslint-disable */

import { request } from 'umi';
import type { ProxyItem } from './data.d';

//国际化
/** 获取列表 GET /api/Proxy_list */
export async function getProxyList(
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
    data: ProxyItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('https://api.fans365.net/api/proxy/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/Proxy */
export async function getProxy(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: ProxyItem;
    status?: boolean;
  }>('https://api.fans365.net/api/proxy/get', {
    data,
    method: 'GET',

    ...(options || {}),
  });
}

/** 新建 PUT /api/Proxy */
export async function updateProxy(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/proxy/update', {
    data,
    method: 'PUT',

    ...(options || {}),
  });
}

/** 新建 POST /api/Proxy */
export async function addProxy(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/proxy/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/Proxy */
export async function removeProxy(data: { id: string }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/proxy/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
