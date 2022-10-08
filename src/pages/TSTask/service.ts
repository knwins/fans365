// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import type { TSTaskItem } from './data';

/** 获取列表 GET /api/tstask/list */
export async function getTSTaskList(
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
    data: TSTaskItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/tstask/list', {
    method: 'GET',

    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表 GET /api/tstask/list */
export async function getTSTaskMerchantList(
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
    data: TSTaskItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/tstask/mylist', {
    method: 'GET',

    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/tstask */
export async function getTSTask(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: TSTaskItem;
    status?: boolean;
  }>('http://localhost:8081/api/tstask/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建 PUT /api/tstask */
export async function updateTSTask(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TSTaskItem>('http://localhost:8081/api/tstask/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建 POST /api/tstask */
export async function addTSTask(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('http://localhost:8081/api/tstask/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/tstask */
export async function removeTSTask(data: { id: string }, options?: { [key: string]: any }) {
  return request<TSTaskItem>('http://localhost:8081/api/tstask/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
