/*
  审批组件
 */
<template>
  <div>
    <el-button type="primary" size="medium" plain @click="handleApproval(objProjectDetails)">行政审批</el-button>
    <el-table
      :data="arrUserGroupData.data"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="审批类型">
      </el-table-column>
      <el-table-column
        prop="userGroupName"
        label="审批名称">
      </el-table-column>
      <el-table-column
        prop="userGroupName"
        label="审批结果">
        <template slot-scope="scope">
          <div>
            <el-tag type="info" v-if="scope.row.tState == 4">审批中</el-tag>
            <el-tag type="success" v-if="scope.row.tState == 5">审批通过</el-tag>
            <el-tag type="danger" v-if="scope.row.tState == 6">审批驳回</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="userGroupName"
        label="时间">
      </el-table-column>
    </el-table>
    <div class="footer-pagination">
      <el-pagination 
        background 
        layout="total,prev,pager,next" 
        :page-size="20"
        :total="arrUserGroupData.count"
        @current-change='handleApprovalPage'
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  // import { getUrlParent } from '../../../utils/tool';
  export default {
    name : 'Approval',
    data(){
      return {
        
      }
    },
    methods : {
      handleApproval(item){
        sessionStorage.setItem('projectName',item.projecttitle)
        window.open(`restructureAllocApprove.html?from=project&belongProject=${getUrlParent('id')}`)
        // this.$emit('handleApproval')
      },

      // 分页
      handleApprovalPage(num){
        this.$emit('handleApprovalPage',num)
      },
    },
    props : ['arrUserGroupData','objProjectDetails']
  }
</script>

<style lang="css">
  .approval_title{
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
    margin-bottom: 20px;
  }
  .setup{
    display: flex;
    justify-content: center;
  }
  .setup li:first-child .line{
    display: none;
  }
  .done,.ing,.stop,.off{
    display: flex;
    align-items: center;
  }
  .done .line,.ing .line,.stop .line,.off .line{
    width: 110px;
    height: 3px;
    background: #67C23A;
    display: block;
    position: relative;
    top: -20px;
  }

  .ing .line{
    background: #8cc5ff;
  }

  .off .line{
    background: #cccccc;
  }
  .stop .line{
    background: #F56C6C;
  }
  .el-table__expanded-cell{
    background: #f6f6f6;
  }
  .footer-pagination{
    padding: 15px 0 5px 0;
    text-align: right;
  }
  .approvla-info{
    width : 55px;
    height: 55px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -28px;
    border:1px solid #eeeeee;
  }
</style>