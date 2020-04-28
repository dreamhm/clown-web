<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in imgData" :key="item" style="background-color: red;">
        <h3 class="medium">
        {{ item }}

        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      imgData: ["../../asets/mainImg/1.jpg","../../asets/mainImg/2.jpg","../../asets/mainImg/3.jpg"
      ,"../../asets/mainImg/4.jpg","../../asets/mainImg/5.jpg","../../asets/mainImg/6.jpg"]
    }
  },
  methods: {
    signOut () {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      // 重定向页面 Home
      this.$router.push('home');
    },
    longin(){
      this.$router.push('login');
    },
    register(){
      this.$router.push('register');
    }
  }
}
</script>
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
</style>
