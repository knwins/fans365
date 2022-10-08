// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import type { UserItem } from '../User/data';

export async function queryCurrent(): Promise<{ data: UserItem }> {
  return request('http://localhost:8081/api/users/current');
}

// export async function queryProvince(): Promise<{ data: GeographicItem[] }> {
//   return request('http://localhost:8081/api/geographic/province');
// }

// export async function queryCity(province: string): Promise<{ data: GeographicItem[] }> {
//   return request(`http://localhost:8081/api/geographic/city?province=${province}`);
// }

/** 更新PUT /api/user/update */
export async function updateUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: UserItem;
    /** 列表的内容总数 */
    info?: string;
    status?: boolean;
  }>('http://localhost:8081/api/users/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
