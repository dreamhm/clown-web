<template>
  <div class="hello">
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <el-button type="danger" @click='longin()'>登录</el-button>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <el-button type="danger" @click='register()'>注册</el-button>
        </el-col>
      </el-row>
      <el-calendar v-model="value"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: new Date()
    }
  },
  methods: {
    longin(){
      this.$router.push('login');
    },
    register(){
      this.$router.push('register');
    }
  }
}
</script>

<style scoped>
.container {
    padding: 80px 20px 20px 20px;
    min-width: 1024px;
}
</style>
