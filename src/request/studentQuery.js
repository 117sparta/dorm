import { request } from './http.js'
export const doomQuery = () => {
  return request({
    url: 'dormQuery',
    method: 'get'
  });
};

export const roomMateQuery = () => {
  return request({
    url: 'roomMateQuery',
    method: 'get'
  });
};
