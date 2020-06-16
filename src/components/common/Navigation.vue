<template>
  <div >
    <el-row>
      <el-col :span="24">
        <!-- 导航信息 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo"  mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">测试</el-menu-item>
          <el-menu-item v-for="item in data" :index="item.label">{{item.title}}</el-menu-item>
          <!-- 
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
          <el-menu-item index="4"><a href="http://localhost:8081/navigation" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      activeIndex: '1',
      data: [
        {
          label:"2",
          title:"处理中心"
        },{
          label:"3",
          title:"我的工作台"
        },
      ]
    }
  },
  created(){
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
