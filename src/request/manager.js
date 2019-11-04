import { request } from '@/request/http.js';

export const queryCheckInMsg = (query) => {
  return request({
    method: 'get',
    url: '/checkInManager/queryCheckInMsg',
    params: query
  });
}
