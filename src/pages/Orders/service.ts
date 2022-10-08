// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import type { OrdersItem, TweetItem } from './data.d';

/** 获取列表 GET /api/orders/list */
export async function ordersList(
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
    data: OrdersItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/orders/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表 GET /api/orders/mylist */
export async function ordersMyList(
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
    data: OrdersItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/orders/mylist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表 GET /api/orders/display */
export async function ordersDisplay(
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
    data: OrdersItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/orders/display', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/orders/list */
export async function getOrders(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<OrdersItem>('http://localhost:8081/api/orders/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建 PUT /api/orders/update */
export async function updateOrders(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
    data: OrdersItem;
  }>('http://localhost:8081/api/orders/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 新建 POST /api/orders/add */
export async function addOrders(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
    data: OrdersItem;
  }>('http://localhost:8081/api/orders/add', {
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 删除 DELETE /api/orders/detele */
export async function removeOrders(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('http://localhost:8081/api/orders/detele', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//Tweet

/** 获取列表 GET /api/tweet/list */
export async function tweetList(
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
    data: TweetItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('http://localhost:8081/api/tweet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/orders/update */
export async function updateTweet(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<OrdersItem>('http://localhost:8081/api/tweet/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
