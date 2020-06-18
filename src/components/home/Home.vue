<template>
  <div class="hello">
    <HomeMenu/>
    
    <div class="container">
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
  }
}
</script>

<style scoped>
.container {
    padding: 80px 20px 20px 20px;
    min-width: 1024px;
}
</style>
