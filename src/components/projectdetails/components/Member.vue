<template>
  <div>
    <div>
      <el-form v-model="objSearch">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item>
              <el-input size="medium" placeholder="请输入姓名" v-model="objSearch.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-top:2px;">
            <el-button size="medium" type="primary" @click="handleSearch">搜索</el-button>
            <el-button size="medium" type="default" @click="handleAddUser(0)">添加成员</el-button>
            <el-button size="medium" type="default" @click="handleAddUser(1)">邀请关注</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col :xl="6" :lg="8" :md="8" :sm="12" v-for="item in arrUserData.data" :key="item.attenId" style="position: relative;">
        <i class="el-icon-close deleteuser" title="删除成员" @click="handleDelete(item)" v-show="item.username == 'clown'"></i>
        <el-card shadow="hover">
          <div class="member-header">
            <img :src="'/upload/userhead/'+item.userpic"/>
            <p>{{item.username}}</p>
          </div>
          <ul class="member-item">
            <li><span>职位：</span><el-tag style="color:#409EFF;" size="medium">{{item.id}}</el-tag></li>
            <li><span>手机：</span>{{item.username}}</li>
            <li><span>Q Q：</span>{{item.username}}</li>
            <li><span>电话：</span>{{item.password}}</li>
            <li><span>邮箱：</span>{{item.salt}}</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <div class="footer-pagination">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :page-size="20"
        :total="arrUserData.count"
        @current-change='handleUserPage'
      ></el-pagination>
    </div>
    <el-dialog
      title="添加成员"
      :visible.sync="bolAddUser"
      width="600px"
    >
      <el-tree
        ref="tree"
        :data="arrUser"
        :default-expanded-keys="[arrUser[0] ? arrUser[0].userid : '']"
        show-checkbox
        node-key="userid"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bolAddUser = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" size="medium">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getUrlParent } from '../../../utils/tool'
export default {
  name : 'Member',
  data(){
    return {
      title : 'member',
      objSearch : {
        userName : ''
      },
      bolAddUser : false,
      arrUser : [],
      defaultProps : {
        children: 'children',
        label: 'title'
      },
      strAddUserType : 0
    }
  },
  methods : {
    handleUserPage(num){
      this.$emit('handleUserPage',num,this.objSearch.userName)
    },
    handleDelete(item){
      this.$confirm('确定删除此'+item.role+'么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$emit('deleteUser',item.attenId)
      })
    },
    handleAddUser(type){
      this.strAddUserType = type
      this.bolAddUser = true;
      this.$server.getPersonnel().then(data=>{
        this.arrUser = data.data
      })
    },
    handleSubmit(){
      let result = this.$refs.tree.getCheckedNodes().filter(item => item.isRoot != 0);
      if(result.length<1){
        this.$message({
          type: 'error',
          message: '您未选中任何成员'
        });
      }else{
        this.$server.addUser({'projectid':getUrlParent('id'),'userids':result.map(item => item.userid).toString(),'state':this.strAddUserType}).then(data=>{
          if(data.data.code == 0){
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.$emit('getUserList',1,20)
            this.bolAddUser = false
          }
        })
      }
    },
    handleSearch(){
      this.$emit('getUserList',1,20,this.objSearch.userName)
    }
  },
  props : ['arrUserData','role']
}
</script>

<style lang="css">
  .el-card__body{
    display: flex;
  }
  .el-col-md-8{
    margin-bottom: 20px;
  }
  .member-header img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .member-header p{
    text-align: center;
    color: #16325C;
    font-size: 16px;
  }
  .member-header .el-tag{
    display: inherit;
    text-align: center;
    margin-top: 10px;
  }
  .member-item{
    margin-left: 30px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .member-item li>span{
    color: #333333;
  }
  .member-item li{
    color: #999999;
    line-height: 30px;
  }
  .footer-pagination{
    padding: 15px 0 5px 0;
    text-align: right;
  }
  .deleteuser{
    position: absolute;
    right: 21px;
    top: 11px;
    font-size: 16px;
    color: #999;
    cursor: pointer;
  }
  .el-checkbox:last-of-type{
    margin-right:8px;
  }
</style>
