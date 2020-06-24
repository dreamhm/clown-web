/**
  tabs : 项目详情
 */
<template>
  <div class="section">
    <h4>进度里程碑</h4>
    <div class="planBox">
      <div class="plan">
        <el-tooltip placement="bottom" v-for="item in objUserDetails.milepost" :key="item.id">
          <div slot="content">
            <ul class="planList">
              <template v-for="(item,index) in item.children">
                <li :key="item.id" :class="item.state == 1? 'active' : ''">{{item.lable}}</li>
              </template>
            </ul>
          </div>
          <a href="javascript:void(0)" v-if="item.id == 4" :class="item.state == 1? 'planDone planNone' : item.state == 2? 'planDone planEnd' : 'planDone'">
            <p>{{item.lable}}</p>
            <span></span>
          </a>
          <a href="javascript:void(0)" v-else :class="item.state == 0? 'planDone planNone' : 'planDone'">
            <p>{{item.lable}}</p>
            <span></span>
          </a>
        </el-tooltip>
      </div>
      <el-button type="primary" round plain v-show="objUserDetails.approveState==5 && objUserDetails.proRole==0" @click="handleSuspended">重启</el-button>
      <el-popover
        placement="bottom-end"
        width="250"
        trigger="hover"
        :content="objUserDetails.projectStopRemark">
        <el-link style="margin-left: 10px" type="warning" slot="reference" v-show="objUserDetails.approveState==5">搁置理由</el-link>
      </el-popover>
      <el-popover
        placement="bottom"
        width="300"
        v-model="visible">
        <el-input
          type="textarea"
          v-model="content"
          :rows="3"
          placeholder="请输入内容">
        </el-input>
        <el-button size="small" type="primary" @click="handleSuspended" style="margin-top: 10px;">确定</el-button>
        <el-button size="small" type="primary" @click="()=>visible = false" style="margin-top: 10px;">取消</el-button>
        <el-button slot="reference" type="danger" round plain v-show="objUserDetails.approveState==0 && objUserDetails.proRole==0 && objUserDetails.projectStopStatus==1">搁置</el-button>
      </el-popover>
      <el-button size="primary" @click="handleDone('已完成')" round icon="el-icon-check" v-if="objUserDetails.approveState==0 && objUserDetails.proRole==0 && objUserDetails.projectStopStatus==1">完成</el-button>
    </div>
    <h4>项目详情</h4>
    <el-row :gutter="20">
      <el-col :xl="12" :lg="12" :md="24" :sm="24">
        <el-row :gutter="20" class="table-boreder">
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>项目编号：</p><span>{{objUserDetails.projectNum}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>所属部门：</p><span>{{objUserDetails.orgName}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>计划起止日期：</p><span>{{objUserDetails.dateJiaoBegin}} - {{objUserDetails.dateJiaoEnd}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>实际起止日期：</p><span>{{objUserDetails.dateStart}} - {{objUserDetails.dateEnd}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>项目状态：</p><span>{{objUserDetails.projectState}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>所属合同：</p><span>{{objUserDetails.contractName}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>委托单位：</p><span style="width: 70%;display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{objUserDetails.customerName}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>业务取得方式：</p><span>{{objUserDetails.businessMode}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>计算规则：</p><span>{{objUserDetails.cacu_rule}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12">
            <p>总投资（万元)：</p><span>{{objUserDetails.totalInvestment}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12" style="display:flex;">
            <p>服务类型：</p><span style="flex:1;">{{objUserDetails.serviceTypeContent}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="12" :sm="12" style="display:flex;">
            <p>所属专业：</p><span style="flex:1;">{{objUserDetails.belongMajor}}</span>
          </el-col>
          <el-col :xl="24" :lg="24" :md="24" :sm="24" style="display:flex;">
            <p>项目概述：</p><span style="width:90%;">{{objUserDetails.remark}}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xl="12" :lg="12" :md="24" :sm="24" style="display:block;">
        <div>
          <el-button size="small" @click="handleUploadImg" style="margin-bottom:10px;" type="primary" plain>上传图片</el-button>
          此处只支持JPG、BMP、JPEG、GIF、PNG格式的文件
        </div>
        <el-carousel height="500px" :style="'margin:0 auto;width:'+strCarouselWidth" :interval="5000">
          <el-carousel-item v-for="(item,index) in arrImg" :key="index">
            <img :src="'/upload/userhead/'+item.url" style="width:100%;height:500px;" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-dialog
     :visible="bolUpload"
     :before-close="handleClose"
     title="上传图片"
     width="800px">
      <el-upload
        class="upload-demo"
        action="/metering/upload/uploadImg"
        multiple
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="tempImg"
        list-type="picture">
        <el-button size="small">继续添加</el-button>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  size="medium" @click="handleUploadSubmit" :loading="bolSubmit">提交数据</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name : 'MemberInfo',
    data(){
      return {
        visible: false,
        content : '',
        bolUpload : false,  // 
        arrImg : [],        // 轮播图
        tempImg:[], //临时图片
        arrResult : [],
        bolSubmit : false
      }
    },
    created(){

    },
    methods : {
      // 轮播图
      getCarousel(){
        this.$server.getCarousel(getUrlParent("id")).then(data=>{
          if(data.code == 0){
            this.arrImg = data.data;
            this.arrResult = data.data;
          }
        })
      },
      // 上传图片显示模态框
      handleUploadImg(){
        this.bolUpload = true;
        this.arrImg.forEach(element => {
          element.url='/upload/userhead/'+element.url;
          // this.tempImg.push(element);
        });
      },

      // 轮播图提交数据
      handleUploadSubmit(){
        this.bolSubmit = true;
      },

      // 删除图片
      handleRemove(file,fileList){
        this.arrResult = fileList;
        this.arrImg = fileList;
      },

      // 图片上传成功后
      handleSuccess(response,file){
        this.arrResult.push({...response,'title':file.response.title,"name" : file.response.original,"fileid":''})
      },

      // 关闭上传图片模态框
      handleClose(){
        this.getCarousel()
        this.bolUpload = false;
        this.tempImg=[];
      },

      // 重启事件
      handleSuspended(){
        this.visible = false;
        // this.$emit('handleSuspended',this.content)
      },

      // 完成事件
      handleDone(item){
        this.$confirm('是否完成?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$emit('handleDone',item)
        })
      }
    },
    props : ['objUserDetails','strCarouselWidth']
  }
</script>

<style lang="css">
.planBox{
  padding: 10px 10px 30px 10px;
  display: flex;
  align-items: center;
}
.planBox .is-round{
  margin-left: 10px;
  width: 120px;
}
.plan{
  display: flex;
  overflow: auto;
}
.plan .planDone{
  width: 200px;
  height: 40px;
  background: #4BCB81;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  text-align: right;
}
.plan .planIng{
  background: #005FB3;
}
.plan .planNone{
  background: #ECEBE9;
  color: #666666;
}
.plan .planEnd{
  background: #F56C6C;
}
.plan .planDone:last-child{
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.plan .planDone:last-child span{
  display: none;
}
.plan .planDone:first-child{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.plan .planDone span{
  position: absolute;
}
.plan .planDone span:before,.plan .planDone span:after{
  position: absolute;
  content: '';
  border-top: 20px transparent dashed;
  border-bottom: 20px transparent dashed;
  border-right: 0 transparent dashed;
}
.plan .planDone p{
  display: inline-block;
  width: 90%;
  text-align: center;
}
.plan .planDone span:before{
  left: 0px;
  border-left: 20px #ffffff solid;
}
.plan .planDone span::after{
  left: -3px;
  border-left: 20px #4BCB81 solid;
}
.plan .PlanIng span:before{
  left: 3px;
  border-left: 20px #ffffff solid;
}
.plan .planIng span::after{
  left: 0px;
  border-left: 20px #005FB3 solid;
}
.plan .planNone span::after{
  left: -3px;
  border-left: 20px #ECEBE9 solid;
}
.plan .planEnd span:before{
  left: 0px;
  border-left: 20px #ffffff solid;
}
.plan .planEnd span::after{
  left: -3px;
  border-left: 20px #F56C6C solid;
}
.planList li {
  line-height: 30px;
  color: #999999;
  font-size: 14px;
}
.planList li.active{
  color: #00FF00;
}
</style>