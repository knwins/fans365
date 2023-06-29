// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import host from '../../host';
import type { AccountsItem, EnvironmentItem, EnvironmentLogItem, WalletItem, WalletLogItem, WalletTokenItem } from './data.d';

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
  }>(host.api+'api/environment/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 新建 GET /api/environment/list */
export async function getEnvironment(data: { [id: string]: any }, options?: { [id: string]: any }) {

  return request<EnvironmentItem>(host.api+'api/environment/get', {
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
  }>(host.api+'api/environment/update', {
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
  }>(host.api+'api/environment/add', {
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
  }>(host.api+'api/environment/delete', {
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
  }>(host.api+'api/environment_log/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/environment/update */
export async function updateEnvironmentLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: EnvironmentItem;
    status?: boolean;
    info?: string;
  }>(host.api+'api/environment_log/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}






/** 删除 DELETE /api/environment/delete */
export async function removeEnvironmentLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/environment_log/delete', {
    data,
    method: 'DELETE',
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
  }>(host.api+'api/accounts/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function updateAccounts(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: AccountsItem;
    status?: boolean;
    info?: string;
  }>(host.api+'api/accounts/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

//导入现在TWitter账户
export async function importTwittert(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/accounts/import_twitter', {
    data,
    method: 'POST',
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
  }>(host.api+'api/accounts/delete', {
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
  }>(host.api+'api/wallet/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/orders/update */
export async function updateWallet(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: WalletItem;
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 新建  */
export async function createWallet(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: WalletItem;
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet/create', {
    data,
    method: 'POST',
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
  }>(host.api+'api/wallet/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//----------------------------------WalletToken----------------------------

/** 获取列表 GET /api/wallet_token/list */
export async function getWalletTokenList(
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
    data: WalletTokenItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>(host.api+'api/wallet_token/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 */
export async function addWalletToken(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet_token/add', {
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}


/** 刷新 */
export async function refreshWalletToken(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet_token/refresh', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}


/** 转账 */
export async function transferWalletToken(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet_token/transfer', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}


export async function removeWalletToken(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet_token/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}


//----------------------------------WalletLogs----------------------------

/** 获取列表 GET /api/wallet_log/list */
export async function getWalletLogList(
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
    data: WalletLogItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>(host.api+'api/wallet_log/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 */
export async function addWalletLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet_log/add', {
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function removeWalletLog(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/wallet_log/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

