// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { BillItem } from './data';

/** 获取列表 GET /api/bill_list */
export async function queryBillList(
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
    data: BillItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/bill/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表 GET /api/bill/mylist */
export async function queryBillMyList(
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
    data: BillItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/bill/mylist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**  /api/bill/latest */
export async function latestBill() {
  return request<{
    data: BillItem;
    status?: boolean;
    info?: number;
  }>('http://localhost:8081/api/bill/latest', {
    method: 'GET',
  });
}

/**  /api/bill/get */
export async function getBill(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: BillItem;
    status?: boolean;
    info?: number;
  }>('http://localhost:8081/api/bill/get', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/**  /api/bill/update */
export async function updateBill(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: number;
  }>('http://localhost:8081/api/bill/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建POST /api/bill/add */
export async function addBill(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('http://localhost:8081/api/bill/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除DELETE /api/bill/delete */
export async function removeBill(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('http://localhost:8081/api/bill/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
