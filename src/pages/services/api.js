// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */

const isDev = process.env.NODE_ENV === 'development';
const apiDir = isDev ? '/api/' : '/openapi/api/';

export async function getLands(params = {}, options = {}) {
  return request(apiDir + '?namespace=admin/@farm/layouts&action=lands', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getDataList(params = {}, options = {}) {
  return request(apiDir + '?namespace=daping2', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
