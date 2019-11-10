import { request } from '@/request/http.js';
import qs from 'qs';

// 入住信息管理部分
export const queryCheckInMsg = (query) => {
  return request({
    method: 'get',
    url: '/checkInManager/queryCheckInMsg',
    params: query
  });
};

export const createCheckInMsg = (data) => {
  return request({
    method: 'post',
    url: '/checkInManager/createCheckInMsg',
    data: qs.stringify(data)
  });
};

export const searchCheckInMsg = (data) => {
  return request({
    method: 'post',
    url: '/checkInManager/searchCheckInMsg',
    data: qs.stringify(data)
  })
};

export const deleteCheckInMsg = (params) => {
  return request({
    method: 'get',
    url: '/checkInManager/deleteCheckInMsg',
    params
  });
};

// 入住信息管理部分

// 学生信息查询部分
export const createStudentInfo = (data) => {
  return request({
    method: 'post',
    url: '/studentManager/createStudentInfo',
    data: qs.stringify(data)
  })
};

export const queryStudentInfo = () => {
  return request({
    method: 'get',
    url: '/studentManager/queryStudentInfo'
  });
}

export const searchStudentInfo = (data) => {
  return request({
    method: 'post',
    url: '/studentManager/searchStudentInfo',
    data: qs.stringify(data)
  })
};

// 学生信息查询部分

// 宿舍管理部分
export const searchDormInfo = (data) => {
  return request({
    method: 'post',
    url: '/dormManager/searchDormInfo',
    data: qs.stringify(data)
  });
};

export const queryDormMsg = () => {
  return request({
    method: 'get',
    url: '/dormManager/queryDormMsg'
  });
};

// 宿舍管理部分

