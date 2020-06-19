/**
  tabs : 项目详情
 */
<template>
  <div class="section">
    <h4>进度里程碑</h4>
    <div class="planBox">
      <div class="plan">
        <el-tooltip placement="bottom" v-for="item in objProjectDetails.milepost" :key="item.id">
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
    </div>


  </div>
</template>

<script>
  export default {
    name : 'ProjectInfo',
    data(){
      return {
        
      }
    },
    created(){

    },
    methods : {
     
    },
    props : ['objProjectDetails','strCarouselWidth']
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