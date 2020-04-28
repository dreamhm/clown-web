<template>
  <div id="registerDiv">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="dr02u">
        <el-input v-model.number="ruleForm.dr02u"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="dr03u">
        <el-input type="password" v-model="ruleForm.dr03u" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pwd">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      var checkDr02u = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        } else {
          callback();
        }
      };
      var validateDr03u = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.dr03u) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          dr02u: '',
          dr03u: '',
          pwd: ''
        },
        rules: {
          dr02u: [
            { validator: checkDr02u, trigger: 'blur' }
          ],
          dr03u: [
            { validator: validateDr03u, trigger: 'blur' }
          ],
          pwd: [
            { validator: validatePwd, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            const detail = {dr02u: this.ruleForm.dr02u, dr03u:this.ruleForm.dr03u}
            this.$axios.post("user/regist", detail)
            .then(res=>{
              if (res.data.code === 0){
                // 重定向页面 Home
                this.$router.push('Login');
              } else {
                alert("no")
              }
            })
            .catch(console.log)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancel(){
        this.$router.push('home');
      }
    }
  }
</script>

<style>
  .mint-cell-wrapper {
    width: 450px
  }
</style>
