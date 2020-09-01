import request from '../http/request';

// 注册接口
export function getCouponList(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  });
}

// 登录接口
export function login(data) {
  return ({
    url: '/login/denglu',
    method: 'post',
    data
  })
}

// 测试首页
// 登录接口
export function Index() {
  return request({
    url: '/content/index',
    method: 'post',
  })
}