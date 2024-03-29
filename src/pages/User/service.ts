// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { UserItem, UserRegisterParams } from './data';

/** 获取列表 GET /api/users/list */
export async function queryUserList(
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
    data: UserItem[];
    /** 列表的内容总数 */
    total?: number;
    status?: boolean;
  }>(host.api+'api/users/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 GET /api/users/list */
export async function getUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/users/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新PUT /api/users/update */
export async function updateUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    info?: string;
    status?: boolean;
  }>(host.api+'api/users/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 删除 DELETE /api/users/delete */
export async function removeUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/users/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/** */

/**注册用户 */
export async function registerUser(params: UserRegisterParams) {
  return request<{
    status?: boolean;
    info?: string;
  }>(host.api+'api/users/register', {
    method: 'POST',
    data: params,
  });
}

/** 发送验证码 注册用 POST /api/users/captcha */
export async function getFakeCaptcha(
  data: { [username: string]: any },
  options?: { [id: string]: any },
) {
  return request<{ status?: boolean; info?: string }>(host.api+'api/users/captcha', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 发送验证码 找回密码 POST /api/users/captcha_user */
export async function getFakeCaptchaUser(
  data: { [username: string]: any },
  options?: { [id: string]: any },
) {
  return request<{ status?: boolean; info?: string }>(host.api+'api/users/captcha_user', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/**找回密码 */
export async function forgotPassword(
  data: { [username: string]: any },
  options?: { [id: string]: any },
) {
  return request<{ status?: boolean; info?: string }>(host.api+'api/users/forgotpassword', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/**修改密码 */
export async function modifyPassword(
  data: { [username: string]: any },
  options?: { [id: string]: any },
) {
  return request<{ status?: boolean; info?: string }>(host.api+'api/users/modifypassword', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/**支付绑定 */
export async function payBinding(
  data: { [username: string]: any },
  options?: { [id: string]: any },
) {
  return request<{ status?: boolean; info?: string }>(host.api+'api/users/paybinding', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

