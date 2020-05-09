import { get,post } from './httpServer';

export const server = {

  // home.html-用户登录
  userLogin(body){
    return post(`/login`, body)
  },
  // home.html-用户注册
  userRegister(body){
    return post(`/clUserInfo/userInfo/addUserInfo`, body)
  },
  // main.html-用户列表
  getUserList(body){
	return post(`/clUserInfo/userInfo/queryUserList`)
  },
  //
  gitUserInfo(id){
  	return get('/clUserInfo/userInfo/' + id)
  }
}