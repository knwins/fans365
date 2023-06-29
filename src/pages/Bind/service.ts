// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import host from '../../host';
import type { BindItem } from './data.d';

/** 获取列表 GET /api/merchant_list */
export async function getBindMyList(
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
    data: BindItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>(host.api+'api/bind/mylist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表 GET /api/admin_list */
export async function getBindList(
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
    data: BindItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>(host.api+'api/bind/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/bind */
export async function getBind(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: BindItem;
    status?: boolean;
  }>(host.api+'api/bind/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建 PUT /api/bind */
export async function updateBind(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: string;
  }>(host.api+'api/bind/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}


/** 新建 POST /api/bind */
export async function addBind(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: string;
  }>(host.api+'api/bind/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/bind */
export async function removeBind(data: { id: string }, options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: string;
  }>(host.api+'api/bind/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}


/** 批量修改 /api/bind*/

export async function updateBinds(data: { ids: string[],key:any,value:any }, options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: string;
  }>(host.api+'api/bind/updates', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
