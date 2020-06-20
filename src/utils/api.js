import { get,post,del } from './httpServer';

export const server = {

  // home.html-用户登录
  userLogin(body){
    return post(`/clUserInfo/userInfo/login`, body)
  },
  // home.html-用户注册
  userRegister(body){
    return post(`/clUserInfo/userInfo/addUserInfo`, body)
  },
  // main.html-用户列表
  getUserList(body){
    return post(`/clUserInfo/userInfo/queryUserList`, body)
  },
  //
  gitUserInfo(id){
  	return get('/clUserInfo/userInfo/' + id)
  },
  // main.html-用户删除
  deleteUser(id){
    return del('/clUserInfo/userInfo/' + id)
  },
  // 获取用户组数据
  getUserGroupList(body){
    return post(`/clUser/userGroup/queryUserGroupList`)
  }
}