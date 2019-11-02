import  { request } from './http.js';
import qs from 'qs';

export const login = (data) => {
  return request({
      url: 'login',
      method: 'post',
      data: qs.stringify(data)
  });
};
