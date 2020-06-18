<template>
  <div>
    <el-row class="container">
      <el-col :span="4" :lg="4" :md="5">
        <div class="logo">
          <img :src="objUserInfo.companyLoGo">
          <span :title="objUserInfo.companyName">{{objUserInfo.companyName}}</span>
        </div>
      </el-col>
      <el-col :span="17" :lg="17" :md="15">
        <el-menu mode="horizontal" style="display: flex;">
          <el-menu-item index="1">
            <a href="index.html">
              <i class="el-icon-s-help"></i>导航页
            </a>
          </el-menu-item>
          <el-menu-item index="2">
            <a href="project-list.html">
              <i class="el-icon-menu"></i>项目中心
            </a>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-home"></i>企业中心
            <div class="submenu">
              <ul>
                <li v-for="item in arrMenu" :key="item.mid">
                  <p>{{item.menuName}}</p>
                  <template v-for="items in item.children">
                    <a href="entrprise.html" v-if="items.url == 'enterpriseCard.html'" :key="items.mid">
                      <span :class="'iconfont' + items.menuImg"></span>{{items.menuName}}
                    </a>
                    <a href="javascript:void(0)" @click="handleLinks(items)" v-else :key="items.mid">
                      <span :class="'iconfont' + items.menuImg"></span>{{items.menuName}}
                    </a>
                  </template>
                </li>
              </ul>
            </div>
          </el-menu-item>
          <el-menu-item index="4">
            <a href="contactMyWorkmate.html">
              <i class="el-icon-s-order"></i>通讯录
            </a>
          </el-menu-item>
          <el-menu-item index="5">
            <a href="message-Recv.html">
              <el-badge is-dot :hidden="!message" class="item">
                <i class="el-icon-message-solid"></i>站内信
              </el-badge>
            </a>
          </el-menu-item>
          <el-menu-item index="6">
            <a href="main.html">
              <i class="el-icon-s-promotion"></i>返回首页
            </a>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3" :lg="3" :md="3">
        <el-dropdown style="float:right;" size="medium">
          <div class="user">
            <img :src="this.objUserInfo.userpic"/>
            <span class="name">{{this.objUserInfo.truename}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a href="register">注册</a></el-dropdown-item>
            <el-dropdown-item><a href="login">登录</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import '../../assets/reset.css';
  // import '../assets/iconfont.css';
  export default {
    name : 'HomeMenu',
    data(){
      return {
        objUserInfo:{
          'companyLoGo':require('@/assets/mainImg/7.jpg'),
          'companyName':'CLOWN',
          'userpic':require('@/assets/mainImg/1.jpg'),
          'truename':'dream'
        },
        arrMenu : [{
          "mid": "b4f72f9004634007bd451574c9d2bdc0",
          "menuName": "行政管理",
          "menuImg": "icon-daiban",
          "children": []
        }, {
          "mid": "76cd6f6b32b247589ebd0920b755586d",
          "menuName": "业务管理",
          "menuImg": "icon-wendang",
          "children": []
        }, {
          "mid": "10e534e5570f4a5eab3a45732f339417",
          "menuName": "财务管理",
          "menuImg": "icon-jifenduihuan",
          "children": []
        }, {
          "mid": "ebe89d5cba3d445a8f27bc0a9415304c",
          "menuName": "数据报表",
          "menuImg": "icon-zengchangshuai",
          "children": []
        }, {
          "mid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
          "menuName": "系统设置",
          "menuImg": "icon-xitongpeizhi",
          "children": []
        }], 
        message : 0,
      }
    },
    created(){
     
    },
    methods: {

    },
  }
</script>

<style lang="css" scoped>
  .container{
    border-bottom: 3px solid #0070D2;
    padding:0 15px;
    background: #ffffff;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 2000;
    min-width: 1009px;
  }
  .logo,.user{
    height: 60px;
    display: flex;
    align-items: center;
  }
  .logo img{
    height: 50px;
    min-width: 50px;
    margin-right: 10px;
  }
  .logo span{
    font-size: 18px;
    color: #666666;
    font-weight: 200;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .user{
    border-right: none;
    justify-content: flex-end;
  }
  .user img{
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid #cccccc;
    margin-right: 5px;
  }
  .user span{
    color: #999999;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
    background: #f6f6f6;
  }
    
  .el-menu-item:hover .submenu{
    display: block;
  }
  .el-menu-item,.el-menu-item i{
    color: #16325C;
  }
  .el-menu-item i{
    position: relative;
    top: -1px;
    margin-right:0;
  }
  .el-menu--horizontal>.el-menu-item.is-active,.el-menu--horizontal>.el-menu-item{
    border-bottom: none;
  }
  
  .el-menu.el-menu--horizontal{
    border-bottom: none;
  }

  .submenu{
    position: fixed;
    top: 60px;
    background: #f6f6f6;
    width: 100%;
    left: 0;
    text-align: center;
    display: none;
    border-top: 3px solid #0070D2;
    border-bottom: 1px solid #C9D9E7;
  }
  .submenu:hover{
    cursor: auto;
  }
  .submenu ul{
    display: flex;
    justify-content: center;
  }
  .submenu ul li{
    padding: 10px 20px 10px 20px;
    border-left: 1px solid #eeeeee;
  }

  .submenu ul li:hover{
    background: #f9f9f9;
  }

  .submenu ul li p,.submenu ul li a{
    display: block;
    line-height: 25px;
    text-align: left;
  }
  .submenu ul li p{
    color: #999999;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
    padding: 5px 0;
  }

  .submenu ul li p i{
    font-size: 22px;
    color: #999999;
  }

  .submenu ul li a{
    color: #666666;
    margin-bottom: 5px;
  }

  .submenu ul li a:hover,.submenu ul li a:hover i{
    color: #409EFF;
  }

  .el-badge{
    height: 30px;
    line-height: 25px;
  }

  .iconfont{
    color: #999999;
    width: 22px;
    height: 25px;
    display: inline-block;
  }
  .icon-yulancopy{
    font-size: 12px;
  }
</style>