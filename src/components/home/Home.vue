<template>
  <div class="hello">

    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple">
          <el-button type="danger" @click='longin()'>登录</el-button>
        </div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple">
          <el-button type="danger" @click='register()'>注册</el-button>
        </div>
      </el-col>
    </el-row>

    <el-calendar v-model="value"/>
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
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
