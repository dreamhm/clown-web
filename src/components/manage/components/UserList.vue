<template>
  <div class='userInfoDiv'>

    <el-form :model="moreSearchForm" label-width="80px">
      <el-row :gutter="20">
        <el-col :xl="4" :lg="4" :md="8">
          <el-form-item label="人员名称">
            <el-input v-model="moreSearchForm.username" size="small" placeholder="请输入人员名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="4" :md="8">
          <el-form-item label="人员手机">
            <el-input v-model="moreSearchForm.usermobile" size="small" placeholder="请输入人员手机"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="4" :lg="4" :md="8">
          <el-button type="primary" plain size="small"  style="margin-left:11px;">搜索</el-button>
          <el-button type="text" @click="addUserInfo">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    
    <el-table
      :data="userList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="salt"
        label="盐">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-share" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    {{multipleSelection}}
  </div>
</template>

<script>
  export default {
    name: 'UserInfo',
    data () {
      return {
        userList: [],
        multipleSelection: [],
        moreSearchForm : {
          username : '',
          addUserInfo : ''
        },
      }
    },
    created(){
      this.getUserList(1);
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      getUserList(page, username){
        this.$server.getUserList({
          "page" : page,
          "pageCount" : 10,
          "username" : username
        }).then(data=>{
          this.userList = data.result.data;
        })
      },
      handleSelectionChange(rows){
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addUserInfo(){

      }

    }
  }
</script>

<style>
  .userInfoDiv {
    margin: 10px;
  }
</style>
