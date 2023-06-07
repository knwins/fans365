// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import host from '../../host';
import { GoodsItem } from './data';

/** 获取列表 GET /api/goods_list */
export async function queryGoodsList(
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
    data: GoodsItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>(host.api+'api/goods/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建PUT /api/goods/get */
export async function getGoods(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: GoodsItem;
    status?: boolean;
    info?: number;
  }>(host.api+'api/goods/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 新建PUT /api/goods/update */
export async function updateGoods(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: number;
  }>(host.api+'api/goods/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建POST /api/goods/add */
export async function addGoods(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/goods/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除DELETE /api/goods/delete */
export async function removeGoods(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/goods/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
