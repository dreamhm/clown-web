<template>
  <div class='mainDiv'> 
    <!-- 导航 -->
    <Menu />    
    <div class="container">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      userList: [],
      userInfo: ""
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
    
  }
}
</script>

<style>
.container {
    padding: 80px 20px 20px 20px;
    min-width: 1024px;
}
</style>
