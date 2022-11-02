// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import type { AccountsItem, EnvironmentItem, EnvironmentLogItem, WalletItem } from './data.d';

/** 获取列表 GET /api/environment/list */
export async function environmentList(
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
    data: EnvironmentItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('https://api.fans365.net/api/environment/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
 

/** 新建 GET /api/environment/list */
export async function getEnvironment(data: { [id: string]: any }, options?: { [id: string]: any }) {
  
  return request<EnvironmentItem>('https://api.fans365.net/api/environment/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建 PUT /api/environment/update */
export async function updateEnvironment(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/environment/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 新建 POST /api/environment/add */
export async function addEnvironment(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/environment/add', {
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 删除 DELETE /api/environment/delete */
export async function removeEnvironment(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/environment/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//EnvironmentLog

/** 获取列表 GET /api/environment_log/list */
export async function environmentLogList(
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
    data: EnvironmentLogItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('https://api.fans365.net/api/environment_log/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/environment/update */
export async function updateEnvironmentLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<EnvironmentItem>('https://api.fans365.net/api/environment_log/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}



//-------------------------------Accounts-----------------------------------//

//Wallet

 
export async function getAccountsList(
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
    data: AccountsItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('https://api.fans365.net/api/accounts/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

 
export async function updateAccounts(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<EnvironmentItem>('https://api.fans365.net/api/accounts/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}




export async function removeAccounts(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/accounts/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//----------------------------------Wallet----------------------------
//Wallet

/** 获取列表 GET /api/wallet/list */
export async function getWalletList(
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
    data: WalletItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>('https://api.fans365.net/api/wallet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/orders/update */
export async function updateWallet(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<EnvironmentItem>('https://api.fans365.net/api/wallet/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function removeWallet(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>('https://api.fans365.net/api/wallet/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
