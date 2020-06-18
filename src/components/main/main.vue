<template>
  <div class='mainDiv'>     
    <!-- 导航 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>

    <el-container>
      <!--  <el-header> -->
      <!-- </el-header> -->
      <el-container>
        <el-aside width="200px">

          <el-row :gutter="10">
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
              <div class="grid-content bg-purple-light">
                <el-button type="danger" @click='signOut()'>注销</el-button>
              </div>
            </el-col>
          </el-row>
          
        </el-aside>
        <el-main>

          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item, index) in userList" :key="item.id" style="background-color: red;">
              <h3 class="medium" @click="gitUserInfo(item.id)">
                {{ item.username }}
              </h3>
            </el-carousel-item>
          </el-carousel>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-model="userInfo" :key="userInfo.id" class="text item">
              主键id：  {{ userInfo.id }}<br>
              注册名称：  {{ userInfo.username }}<br>
              密码：  {{ userInfo.password }}<br>
              密码：  {{ userInfo.salt }}
            </div>
          </el-card>

        </el-main>
      </el-container>
    </el-container>


    
    
    

  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      imgData: ["../../asets/mainImg/1.jpg","../../asets/mainImg/2.jpg","../../asets/mainImg/3.jpg","../../asets/mainImg/4.jpg","../../asets/mainImg/5.jpg","../../asets/mainImg/6.jpg"],
      userList: [],
      userInfo: "",
      activeIndex: '1',
    }
  },
  created(){
    this.getUserList();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getUserList(){
      this.$server.getUserList().then(data=>{
        this.userList = data.result;
      })
    },
    gitUserInfo(id){
      console.log(id);
      this.$server.gitUserInfo(id).then(data=>{
        this.userInfo = data.result;
      })
    },
    signOut () {
      localStorage.removeItem("token");
      // 重定向页面 Home
      this.$router.push('home');
    }
  }
}
</script>

<style>
  .mainDiv{
    padding: 0;
    margin: 0;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
