import { get,post } from './httpServer';

export const server = {

  // 首页-用户信息
  login(body){
    return post(`/login`, body)
  }
}