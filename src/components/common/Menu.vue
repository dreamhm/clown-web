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
            <a href="home">
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
            <el-dropdown-item><a href="/individual.htlm">个人中心</a></el-dropdown-item>
            <el-dropdown-item><a href="/setting.html">密码设置</a></el-dropdown-item>
            <el-dropdown-item><a @click='signOut()'>退出</a></el-dropdown-item>
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
    name : 'Menu',
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
          "children": [{
            "mid": "79c0f92b653749d4baa7f849a2e32c3d",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "企业管理",
            "url": "enterprise.html",
            "menuImg": "icon-shouye",
            "children": []
          }, {
            "mid": "7c4v6j15bf4fff868dc2css29a3h7d44",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "招聘管理",
            "url": "recruit-List.html",
            "menuImg": "icon-wenjuan",
            "children": []
          }, {
            "mid": "7a17ca5c4eb94aac99547f948190b0e6",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "人员管理",
            "url": "employee-List.html",
            "menuImg": "icon-qunzu",
            "children": []
          }, {
            "mid": "b87c429f75bf4fff868dc2c29a6dd962",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "考勤管理",
            "url": "clockManager-List.html",
            "menuImg": "icon-fasong",
            "children": []
          }, {
            "mid": "f5173784c17940ebab622e06a1fa076d",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "日报管理",
            "url": "empHour-List.html",
            "menuImg": "icon-jianyi",
            "children": []
          }, {
            "mid": "8ba0599f3c9546c19ba3fee294c5eb25",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "公告管理",
            "url": "notice-List.html",
            "menuImg": "icon-tixing",
            "children": []
          }, {
            "mid": "7c3v6j15bf4fff868dc2css29a3g6s11",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "资产管理",
            "url": "fixedAssets-List.html",
            "menuImg": "icon-icon_jiaofeijilu-copy",
            "children": []
          }, {
            "mid": "7c429f75bf4fff868dc2css29a66slc8",
            "pid": "b4f72f9004634007bd451574c9d2bdc0",
            "menuName": "用章管理",
            "url": "seal-List.html",
            "menuImg": "icon-shenhe",
            "children": []
          }]
        }, {
          "mid": "76cd6f6b32b247589ebd0920b755586d",
          "menuName": "业务管理",
          "menuImg": "icon-wendang",
          "children": [{
            "mid": "28c0f92b65bc59d49937f849a2e36alc",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "招标管理",
            "url": "tender-List.html",
            "menuImg": "icon-shuju",
            "children": []
          }, {
            "mid": "6c9ebc8a554842ea8931f85276beb6de",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "客户管理",
            "url": "customer-List.html",
            "menuImg": "icon-kehu",
            "children": []
          }, {
            "mid": "28c0f92b65bc59d4bsx7f849a2e31c4x",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "投标管理",
            "url": "bid-List.html",
            "menuImg": "icon-chanpin",
            "children": []
          }, {
            "mid": "9618c36eb9ba459d9b2d0e9b6848b77d",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "合同管理",
            "url": "contract-List.html",
            "menuImg": "icon-shaixuan",
            "children": []
          }, {
            "mid": "fdf419040d684842b1ea84dca1b4423a",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "项目管理",
            "url": "enterpriseProject-List.html",
            "menuImg": "icon-guanli",
            "children": []
          }, {
            "mid": "2c9ebc8a56742ea1111f85276beb1ab",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "报告管理",
            "url": "presentation-List.html",
            "menuImg": "icon-piliangdaoru",
            "children": []
          }, {
            "mid": "7c2v6j15bf4fff868dc2css29a66s222",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "指标管理",
            "url": "costIndex-List.html",
            "menuImg": "icon-baojiajieshou",
            "children": []
          }, {
            "mid": "7c5v6j15bf4fff868dc2css29a3hc655",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "询价管理",
            "url": "inquiry-List.html",
            "menuImg": "icon-hengxiangzhuzhuangtu",
            "children": []
          }, {
            "mid": "fdf419040d684842b1ea84dca1bsd36v",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "归档管理",
            "url": "documentApprove-List.html",
            "menuImg": "icon-yuangonggonghao",
            "children": []
          }, {
            "mid": "fde2c9d4aad44fe6ad3c0776dd759a8a",
            "pid": "76cd6f6b32b247589ebd0920b755586d",
            "menuName": "档案管理",
            "url": "document-List.html",
            "menuImg": "icon-wenben",
            "children": []
          }]
        }, {
          "mid": "10e534e5570f4a5eab3a45732f339417",
          "menuName": "财务管理",
          "menuImg": "icon-jifenduihuan",
          "children": [{
            "mid": "7x4c5f75bf4fff868dc2css29a14sla3",
            "pid": "10e534e5570f4a5eab3a45732f339417",
            "menuName": "账户管理",
            "url": "account-List.html",
            "menuImg": "icon-touxiang",
            "children": []
          }, {
            "mid": "bbb7129c67dd45d0a86a6a91eae681db",
            "pid": "10e534e5570f4a5eab3a45732f339417",
            "menuName": "类型管理",
            "url": "financeConfig.html",
            "menuImg": "icon-jifen",
            "children": []
          }, {
            "mid": "64025dc96fb24ee3b2d83b9e525ba013",
            "pid": "10e534e5570f4a5eab3a45732f339417",
            "menuName": "收支管理",
            "url": "income-List.html",
            "menuImg": "icon-jisuanqi",
            "children": []
          }, {
            "mid": "9845cba5a0064ddf98ecad3c31bef73e",
            "pid": "10e534e5570f4a5eab3a45732f339417",
            "menuName": "薪酬配置",
            "url": "salaryConfig.html",
            "menuImg": "icon-zichanguanli",
            "children": []
          }, {
            "mid": "6sf16s2cg684842b1ea84dca1bs33s",
            "pid": "10e534e5570f4a5eab3a45732f339417",
            "menuName": "借款管理",
            "url": "loan-List.html",
            "menuImg": "icon-coupons",
            "children": []
          }, {
            "mid": "6fhweiyu23okdwieu9475hkh10sdkl34",
            "pid": "10e534e5570f4a5eab3a45732f339417",
            "menuName": "绩效管理",
            "url": "commission-List.html",
            "menuImg": "icon-huiyuanzhekou",
            "children": []
          }, {
            "mid": "8cd3350006a84428b616307cfcbc669e",
            "pid": "10e534e5570f4a5eab3a45732f339417",
            "menuName": "项目成本",
            "url": "workStatistic-List.html",
            "menuImg": "icon-jisutuikuan",
            "children": []
          }]
        }, {
          "mid": "ebe89d5cba3d445a8f27bc0a9415304c",
          "menuName": "数据报表",
          "menuImg": "icon-zengchangshuai",
          "children": [{
            "mid": "fdf419040d684842b1e123fca1b4423a",
            "pid": "ebe89d5cba3d445a8f27bc0a9415304c",
            "menuName": "报表管理",
            "url": "reportManagement-List.html",
            "menuImg": "icon-wodeshenqing",
            "children": []
          }, {
            "mid": "19c0f92b614609d4baa7f84ja2e32c4a",
            "pid": "ebe89d5cba3d445a8f27bc0a9415304c",
            "menuName": "自定义报表",
            "url": "sheet-List.html",
            "menuImg": "icon-yeji",
            "children": []
          }]
        }, {
          "mid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
          "menuName": "系统设置",
          "menuImg": "icon-xitongpeizhi",
          "children": [{
            "mid": "11cea6c1b93249b0931f8b7ba3dbb128",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "组织岗位",
            "url": "organisation-Tree.html",
            "menuImg": "icon-liuchengguanli",
            "children": []
          }, {
            "mid": "ea40d71a997f4ebd9ee0cf83d39ec18b",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "权限管理",
            "url": "role-Tree.html",
            "menuImg": "icon-jiaquanshouyishuai",
            "children": []
          }, {
            "mid": "11cea6c1b91119b0931f8b7ba3dbb145",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "审批流模板",
            "url": "approveTplConfig-List.html",
            "menuImg": "icon-liucheng",
            "children": []
          }, {
            "mid": "123v6j15bf4f4n868dc2css29a3h7dj4",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "自定义字典",
            "url": "busiDic-List.html",
            "menuImg": "icon-zhishiguanli",
            "children": []
          }, {
            "mid": "128v6j15bf4f4n868dc2css29a3h7dj5",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "自定义标签",
            "url": "customProperty-List.html",
            "menuImg": "icon-shoucang",
            "children": []
          }, {
            "mid": "83ba24a66c2043139c35d2802e467264",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "模板配置",
            "url": "phaseTemplate-List.html",
            "menuImg": "icon-renwuzhongxin",
            "children": []
          }, {
            "mid": "160d22ea5ddd469182432924d29a0b6d",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "账户余额",
            "url": "accountBalance.html",
            "menuImg": "icon-yongjin",
            "children": []
          }, {
            "mid": "11318e6b49b14f3f95c31d466a8cd33b",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "积分管理",
            "url": "pointManagement.html",
            "menuImg": "icon-jifen",
            "children": []
          }, {
            "mid": "b70928fcb131485a8e91fea88fb063b2",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "smartTv设置",
            "url": "smartTvStart.html",
            "children": []
          }, {
            "mid": "8d42b4f1d9d24aa7b202e46687420dd8",
            "pid": "2b4f7ad9aeed4fdfa06c1d351a1e1bed",
            "menuName": "后台管理",
            "url": "presentationSys-List.html",
            "menuImg": "icon-yulancopy",
            "children": []
          }]
        }], 
        message : 0,
      }
    },
    created(){
     
    },
    methods: {
      signOut () {
        localStorage.removeItem("token");
        // 重定向页面 Home
        this.$router.push('home');
      }
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