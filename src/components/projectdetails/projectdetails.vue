<template>
  <div>
    <Menu />
    <div class="container">
      <div class="header">
        <div class="title">
          <div class="title-box">
            <img :src="objProjectDetails.projectHead" style="width: 50px;height: 50px;margin-right: 10px;">
            <div>
              <span class="tit">{{objProjectDetails.projecttitle}}</span>
              <p style="color:#999999;">委托单位：{{objProjectDetails.customerName?objProjectDetails.customerName:'暂无'}}，
                <span v-if="objProjectDetails.createdate >= 0">剩余{{objProjectDetails.createdate}}天</span>
                <span v-else style="color:#F56C6C;font-weight:600;">已过期</span>
              </p>
            </div>
          </div>
          <el-button-group>
            <el-button type="default" size="small" @click="handleEdit" v-if="objProjectDetails.proRole==0">编辑项目</el-button>
            <el-button type="default" size="small" @click="handleSee" v-else>查看项目</el-button>
            <el-button type="default" size="small" @click="handleCommission">绩效管理</el-button>
            <el-button type="default" size="small" @click="handleWorkingGroup">工作组备案信息</el-button>
          </el-button-group>
        </div>
      </div>
      
      <div class="main" :style="'min-height:' +height+'px'">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane name="1">
            <span slot="label"><i class="el-icon-s-operation"></i> 详情</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label"><i class="el-icon-user-solid"></i> 成员</span>
            <Member 
              :arrUserData="arrUserData"
              @getUserList='getUserList'
              @handleUserPage='handleUserPage'
              @deleteUser='deleteUser'
              :role='objProjectDetails.proRole'
            />
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label"><i class="el-icon-s-check"></i> 审批</span>
            <Approval 
              :arrUserGroupData="arrUserGroupData"
              :objProjectDetails="objProjectDetails"
              @handleApproval='handleApproval'
              @handleApprovalPage='handleApprovalPage'
            />
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label"><i class="el-icon-s-data"></i> 阶段</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="5">
            <span slot="label"><i class="el-icon-s-claim"></i> 任务</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>          <el-tab-pane name="6">
            <span slot="label"><i class="el-icon-s-comment"></i> 动态</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="7">
            <span slot="label"><i class="el-icon-s-order"></i> 文件</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="8">
            <span slot="label"><i class="el-icon-s-marketing"></i> 报告</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="9">
            <span slot="label"><i class="el-icon-s-cooperation"></i> 合同</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="10">
            <span slot="label"><i class="el-icon-s-check"></i> 用章</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="11">
            <span slot="label"><i class="el-icon-s-management"></i> 归档</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
          <el-tab-pane name="12">
            <span slot="label"><i class="el-icon-bank-card"></i> 财务</span>
            <ProjectInfo
              @handleSuspended='handleSuspended'
              @handleDone='handleDone'
              :objProjectDetails='objProjectDetails'
              :strCarouselWidth='strCarouselWidth'
            />
          </el-tab-pane>
        </el-tabs>
      </div>


    </div>
  </div>
</template>

<script>
import ProjectInfo from './components/ProjectInfo';   // 详情
import Member from './components/Member';             // 成员
import Approval from './components/Approval';         // 审批

import '../../assets/reset.css';
// import { getUrlParent } from '../../utils/tool';
export default {
  name : 'ProjectDetails',
  provide () {
  
  },
  data(){
    return {
      arrUserData : {},        // 人员
      arrUserGroupData : {},   // 用户组
      arrApprovalData : {},    // 审批
      objProjectDetails :{
        'projectHead':require('@/assets/mainImg/5.jpg'),
        'projecttitle':'SEMIR',
        'customerName':'SEMIR单位',
        'createdate':200,
        'proRole':0,
        'approveState':0,
        'projectStopStatus':1,
        "milepost": [{
          "id": "1",
          "pId": "0",
          "lable": "客户",
          "state": "1",
          "children": [{
            "id": "8",
            "pId": "1",
            "lable": "已登记",
            "state": "1",
            "children": null
          }, {
            "id": "9",
            "pId": "1",
            "lable": "未登记",
            "state": "0",
            "children": null
          }]
        }, {
          "id": "2",
          "pId": "0",
          "lable": "投标",
          "state": "0",
          "children": [{
            "id": "10",
            "pId": "2",
            "lable": "未登记",
            "state": "1",
            "children": null
          }, {
            "id": "11",
            "pId": "2",
            "lable": "已立项",
            "state": "0",
            "children": null
          }, {
            "id": "12",
            "pId": "2",
            "lable": "已归档",
            "state": "0",
            "children": null
          }]
        }, {
          "id": "3",
          "pId": "0",
          "lable": "合同",
          "state": "1",
          "children": [{
            "id": "13",
            "pId": "3",
            "lable": "未登记",
            "state": "0",
            "children": null
          }, {
            "id": "14",
            "pId": "3",
            "lable": "审批中",
            "state": "0",
            "children": null
          }, {
            "id": "15",
            "pId": "3",
            "lable": "审批通过",
            "state": "0",
            "children": null
          }, {
            "id": "16",
            "pId": "3",
            "lable": "已驳回",
            "state": "0",
            "children": null
          }, {
            "id": "17",
            "pId": "3",
            "lable": "归档审核中",
            "state": "0",
            "children": null
          }, {
            "id": "18",
            "pId": "3",
            "lable": "已归档",
            "state": "0",
            "children": null
          }, {
            "id": "19",
            "pId": "3",
            "lable": "归档驳回",
            "state": "0",
            "children": null
          }, {
            "id": "20",
            "pId": "3",
            "lable": "草稿",
            "state": "1",
            "children": null
          }]
        }, {
          "id": "4",
          "pId": "0",
          "lable": "实施",
          "state": "1",
          "children": [{
            "id": "21",
            "pId": "4",
            "lable": "进行中",
            "state": "0",
            "children": null
          }, {
            "id": "22",
            "pId": "4",
            "lable": "已搁置",
            "state": "1",
            "children": null
          }, {
            "id": "23",
            "pId": "4",
            "lable": "已完成",
            "state": "0",
            "children": null
          }]
        }, {
          "id": "5",
          "pId": "0",
          "lable": "报告",
          "state": "1",
          "children": [{
            "id": "24",
            "pId": "5",
            "lable": "未登记",
            "state": "0",
            "children": null
          }, {
            "id": "25",
            "pId": "5",
            "lable": "审批中",
            "state": "0",
            "children": null
          }, {
            "id": "26",
            "pId": "5",
            "lable": "审批通过 ",
            "state": "1",
            "children": null
          }, {
            "id": "27",
            "pId": "5",
            "lable": "已驳回",
            "state": "0",
            "children": null
          }, {
            "id": "28",
            "pId": "5",
            "lable": "归档审核中",
            "state": "0",
            "children": null
          }, {
            "id": "29",
            "pId": "5",
            "lable": "已归档 ",
            "state": "0",
            "children": null
          }, {
            "id": "30",
            "pId": "5",
            "lable": "归档审核失败",
            "state": "0",
            "children": null
          }, {
            "id": "31",
            "pId": "5",
            "lable": "草稿",
            "state": "0",
            "children": null
          }]
        }, {
          "id": "6",
          "pId": "0",
          "lable": "收款",
          "state": "0",
          "children": [{
            "id": "32",
            "pId": "6",
            "lable": "未收款",
            "state": "1",
            "children": null
          }, {
            "id": "33",
            "pId": "6",
            "lable": "部分回款",
            "state": "0",
            "children": null
          }, {
            "id": "34",
            "pId": "6",
            "lable": "全部回款",
            "state": "0",
            "children": null
          }]
        }, {
          "id": "7",
          "pId": "0",
          "lable": "归档",
          "state": "0",
          "children": [{
            "id": "35",
            "pId": "7",
            "lable": "未归档",
            "state": "1",
            "children": null
          }, {
            "id": "36",
            "pId": "7",
            "lable": "归档审核中",
            "state": "0",
            "children": null
          }, {
            "id": "37",
            "pId": "7",
            "lable": "已归档",
            "state": "0",
            "children": null
          }]
        }],
      },
      activeName: '1',
      height : 0,
      strCarouselWidth : '100%',
    }
  },
  mounted(){
    this.height = document.documentElement.clientHeight-190;
    window.onresize = () => {
      return (() => {
        this.getWidowWidth()
        this.height = document.documentElement.clientHeight-190;
      })()
    }
  },
  created(){
    this.getWidowWidth()
  },
  methods : {
    getWidowWidth(){
      window.innerWidth <= 1200 ? this.strCarouselWidth = '840px' : this.strCarouselWidth = '100%'
    },
    handleEdit(){},
    handleSee(){},
    handleCommission(){},
    handleWorkingGroup(){},
    // tabs点击事件
    handleClick(tab, event) {
      switch (tab.paneName) {
        case "1":
          // this.getProjectDetails();
          break;
        case "2":
          this.getUserList(1);
          break;
        case "3":
          this.getUserGroupList();
          break;
        case "4":
          break;
        case "5":
          break;
        case "6":
          break;
        case "7":
          break;
        case "8":
        case "9":
          break;
        case "10":
          break;
        case "11":
          break;
        case "12":
          break;
      }
    },
    
    // 成员列表数据
    getUserList(page, username){
      this.$server.getUserList({
        "page" : page,
        "pageCount" : 15,
        "username" : username
      }).then(data=>{
        this.arrUserData = data.result
      })
    },
    // 成员列表-分页
    handleUserPage(page, username){
      this.getUserList(page, username)
    },
    // 成员列表-删除
    deleteUser(id){
      this.$server.deleteUser(id).then(data=>{
        if(data.code == 1001){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserList(1)
        }
      })
    },

    // 用户组数据
    getUserGroupList(){
      this.$server.getUserGroupList().then(data=>{
        this.arrUserGroupData = data.result
      })
    },
    handleSuspended(data){},
    handleDone(item){},
    // 审批
    handleApproval(num){
      this.getApprovalList(num,20)
    },
     // 审批分页
    handleApprovalPage(num){
      this.getApprovalList(num,20)
    },

    // 任务列表-分页
    handlePage(num){
      this.getTaksList(num,20)
    },
  },
  components : {
    ProjectInfo,      // 项目详情
    Member,           // 成员
    Approval,         // 审批
  },

}
</script>

<style lang="css">
.container {
  padding: 80px 20px 20px 20px;
  min-width: 1024px;
}
.header{
  padding:20px 15px 20px 15px;
  background: #f2f2f2;
  display: block;
  border-bottom: none;
}
.header .title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .tit{
  font-size: 18px;
  color: #333333;
  display: block;
  line-height: 25px;
}
.header .sub{
  color: #999999;
  display: block;
  line-height: 30px;
}
.title-box{
  display: flex;
  align-items: center;
}
.main{
  background: #fff;
  padding: 15px;
}
.sectionWorking{
  padding: 0 20px 20px 20px;
}
.sectionWorking .el-row .el-col p{
  width: auto;
}
.el-tabs--card>.el-tabs__1 .el-tabs__item.is-active{
  background: #409EFF;
  color: #ffffff;
  border: none;
}
.el-tabs--card>.el-tabs__header{
  border-bottom: none;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  border-bottom: 1px solid #E4E7ED;
  padding: 0 30px;
}
.el-tabs__item i{
  font-size: 16px;
}
</style>