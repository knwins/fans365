// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
//console.log(host.api);


/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(host.api+'api/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(host.api+'api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(host.api+'api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/notices */
export async function getNoticeList(options?: { [key: string]: any }) {
  return request<{
    total?: number;
    data: API.NoticeIconItem[];
    status?: boolean;
  }>(host.api+'api/notice/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建 GET /api/notice */
export async function getNotice(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: API.NoticeIconItem;
    status?: boolean;
  }>(host.api+'api/notice/get', {
    data,
    method: 'GET',

    ...(options || {}),
  });
}

 
export async function updateNotice(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/notice/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/notice */

export async function removeNotice(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/notice/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function addNotice(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/notice/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}