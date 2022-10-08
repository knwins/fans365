// @ts-ignore
/* eslint-disable */



import { request } from 'umi';
import type { GoodsTypeItem } from './data.d';

//国际化
/** 获取列表 GET /api/goodsType_list */
export async function getGoodsTypeList(
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
    data: GoodsTypeItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/goods_type/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/goodsType */
export async function getGoodsType(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: GoodsTypeItem;
    status?: boolean;
  }>('http://localhost:8081/api/goods_type/get', {
    data,
    method: 'GET',

    ...(options || {}),
  });
}

/** 新建 PUT /api/goodsType */
export async function updateGoodsType(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<GoodsTypeItem>('http://localhost:8081/api/goods_type/update', {
    data,
    method: 'PUT',

    ...(options || {}),
  });
}

/** 新建 POST /api/goodsType */
export async function addGoodsType(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<GoodsTypeItem>('http://localhost:8081/api/goods_type/add', {
    data,
    method: 'POST',

    ...(options || {}),
  });
}

/** 删除 DELETE /api/goodsType */
export async function removeGoodsType(data: { id: string }, options?: { [key: string]: any }) {
  return request<GoodsTypeItem>('http://localhost:8081/api/goods_type/delete', {
    data,
    method: 'DELETE',

    ...(options || {}),
  });
}
