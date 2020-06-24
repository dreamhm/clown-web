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
            <el-button size="medium" type="default" @click="handleIsEdit()">添加成员</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-row :gutter="20">
      <el-col :xl="8" :lg="8" :md="12" :sm="12" v-for="item in arrUserData.data" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="position:relative;">
          <div class="dropdown-menu">
            <i class="el-icon-more"></i>
            <ul class="menu-list">
              <li @click="handleIsEdit(item)">编辑</li>
              <li @click="handleDelete(item)">删除</li>
            </ul>
          </div>
          <template slot="title">
            <span class="tags-ing">进行中</span>
            {{item.username}}
          </template>
          <el-row :gutter="20">
            <el-col :span="24" style="display:flex;">
              <div class="create-header">
                <el-avatar :size="45" :src="item.id" @error="errorHandler">
                  <i class="el-icon-user-solid" style="font-size:24px;line-height:45px;"></i>
                </el-avatar>
                <span class="name">{{item.username}}</span>

                <el-tag size="small" type="success" v-if="true">员工所属部门</el-tag>
                <el-tag size="small" v-else-if="item.approveState == 1">审核中</el-tag>
                <el-tag size="small" type="warning" v-else-if="item.approveState == 2">已归档</el-tag>
                <el-tag size="small" type="danger" v-else-if="item.approveState == 3">归档驳回</el-tag>
                <el-tag size="small" type="danger" v-else-if="item.approveState == 4">未归档</el-tag>
                <el-tag size="small" type="danger" v-else-if="item.approveState == 5">暂停中</el-tag>
              </div>
              <div style="width:94%;">
                <ul class="info-list">
                  <li>
                    <span>主键：</span>{{item.id}}
                  </li>
                  <li>
                    <span>名称：</span><el-tag type="info" size="small">{{item.username}}</el-tag>
                  </li>
                  <li>
                    <span>密码：</span>{{item.password}}
                  </li>
                  <li>
                    <span>salt：</span>
                    <span style="color:#999999;" v-if="true">{{item.salt}}</span>
                    <span style="color:#999999;" v-else>暂无</span>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <div class="footer-pagination">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :page-size="15"
        :total="arrUserData.count"
        @current-change='handleUserPage'
      ></el-pagination>
    </div>

    
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
        <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="个人基本信息"
      :visible.sync='bolIsEdit'
      width="70%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      top="15px"
      class="section"
    >
      <el-form :model="objInfo" :rules="rules" ref="ruleForm" label-width="150px" size='small'>
        <h4>个人信息</h4>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="头像：">
              <el-upload
                class="avatar-uploader"
                action="/metering/upload/uploadImg"
                :show-file-list="false"
                :on-change="changeUpload"
                >
                <img v-if="objInfo.userpic" :src="objInfo.userpic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成员主键：" prop="id">
              <el-input v-model="objInfo.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成员姓名：" prop="username">
              <el-input v-model="objInfo.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成员密码：" prop="password">
              <el-input v-model="objInfo.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="salt：" prop="salt">
              <el-input v-model="objInfo.salt"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="真实姓名：" prop="truename">
              <el-input v-model="objInfo.truename"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名（昵称）：" prop="username">
              <el-input v-model="objInfo.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：">
              <el-input v-model="objInfo.mobile" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="紧急联系人电话：">
              <el-input v-model="objInfo.emergencyMobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱：" prop="email">
              <el-input v-model="objInfo.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="QQ：">
              <el-input v-model="objInfo.qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-radio-group v-model="objInfo.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="固定电话：">
              <el-input v-model="objInfo.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执业资质：">
              <el-select v-model="objInfo.qualifications" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属专业：">
              <el-cascader
                ref="cascaderAddr"
                @change="handleAddressFun"
                v-model="objInfo.belongIndustry"
                style="width:100%"
                clearable
                :options="selectData"
                :props="{ expandTrigger: 'hover',multiple:true,emitPath:false,label:'itemValue',children:'childrens',value:'itemCode' }">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职称：">
              <el-select v-model="objInfo.techTitle" placeholder="请选择">
                <el-option
                  v-for="item in subtitle"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作年限：">
              <el-input v-model="objInfo.workyear"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属地区：">
              <el-select v-model="objInfo.province" placeholder="请选择">
                <el-option
                  v-for="item in addres"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址：">
              <el-input v-model="objInfo.detailArea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家庭住址：">
              <el-input v-model="objInfo.areaHome"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校：">
              <el-input v-model="objInfo.graduationSchool"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业：">
              <el-input v-model="objInfo.major"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历：">
              <el-input v-model="objInfo.education"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专业技能：">
              <el-checkbox-group v-model="objInfo.skills">
                <el-checkbox label="1">土建</el-checkbox>
                <el-checkbox label="2">钢筋</el-checkbox>
                <el-checkbox label="3">精装修</el-checkbox>
                <el-checkbox label="4">电气</el-checkbox>
                <el-checkbox label="5">暖通</el-checkbox>
                <el-checkbox label="6">给排水</el-checkbox>
                <el-checkbox label="7">BIM建模</el-checkbox>
                <el-checkbox label="8">PPP咨询</el-checkbox>
                <el-checkbox label="9">安装</el-checkbox>
                <el-checkbox label="10">市政</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有无合作经历：">
              <el-radio-group v-model="objInfo.cooperation">
                <el-radio label="有">有</el-radio>
                <el-radio label="无">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="个人简介：">
              <el-input type="textarea" :rows="4" v-model="objInfo.aboutme"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>

        <!-- <h4 style="margin-top:30px;">资质上传</h4>
        <div>
          <el-upload
            action="/metering/upload/uploadfile"
            :on-success="handleUpload"
            :show-file-list="false"
            :data="{'filetype':strFileType}"
          >
            <el-button v-for="item in arrFileType" :key="item.type" size="small" @click="handleUpdata(item.label)">{{item.label}}</el-button>
          </el-upload>
        </div>
        <el-table
          :data="arrFile"
          style="width: 100%">
          <el-table-column
            prop="original"
            label="文件名称">
          </el-table-column>
          <el-table-column
            prop="filesourcetype"
            label="文件类型">
          </el-table-column>
          <el-table-column
            prop="option"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <div>
                <el-button size="small" type="primary" plain @click="handleDown(scope.row)" v-if="scope.row.fileid">下载</el-button>
                <el-button size="small" type="primary" plain @click="handlePreView(scope.row)">预览</el-button>
                <el-link style="margin-left:15px;" @click="handleRemove(scope)">删除</el-link>
              </div>
            </template>
          </el-table-column>
        </el-table> -->
      </el-form>
         
      <!-- <el-dialog
        top="15px"
        width="50%"
        title="预览"
        :visible.sync="innerVisible"
        append-to-body>
        <iframe :src="strPreView" frameborder="0" width="100%" height="600">

        </iframe>
      </el-dialog> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="handleSubmit('ruleForm')">保存</el-button>
        <el-button size="medium" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name : 'Member',
  data(){
    let addres = [
      {
        "value" : "北京市",
        "label" : "北京市"
      },{
        "value" : "天津市",
        "label" : "天津市"
      },{
        "value" : "河北省",
        "label" : "河北省"
      }
    ]
    return {
      title : 'member',
      objSearch : {
        userName : ''
      },
      strAddUserType : 0,

      // popu
      dialogVisible : false,
      bolIsEdit : false,
      objInfo : {},
      rules : {
        username : [
          { required: true, message: '姓名为必填项', trigger: 'blur' }
        ],
        password : [
          { required : true,message : '昵称为必填项',trigger : 'blur'}
        ]
      },

        previews: {},
        option: {
          img: '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 0.8, // 裁剪生成图片的质量
          outputType: 'jpeg', // 裁剪生成图片的格式
          canScale: false, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 100, // 默认生成截图框宽度
          autoCropHeight: 100, // 默认生成截图框高度
          fixedBox: false, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          full: true, // 是否输出原图比例的截图
          canMoveBox: true, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: false, // 截图框是否被限制在图片里面
          infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        },
        picsList: [],  //页面显示的数组
        selectData: [],
        
        
        innerVisible : false,
        strPreView : '',
        
        arrFile : [],
        strFileType : '',
        options: [
          { value: 0, label: '无' },
          { value: 1, label: '一级造价师' }, 
          { value: 2, label: '二级造价师' },
          { value: 3, label: '造价员' }
        ],
        objProfessional : [
          {value:1,label:'土建'},
          {value:2,label:'钢筋'},
          {value:3,label:'精装修'},
          {value:4,label:'电气'},
          {value:5,label:'暖通'},
          {value:6,label:'给排水'},
          {value:7,label:'BIM建模'},
          {value:8,label:'PPP咨询'},
          {value:9,label:'安装'},
          {value:10,label:'市政'},
        ],
        subtitle : [
          {value: 4,label: '无'},
          {value: 0,label: '初级'},
          {value: 1,label: '中级'},
          {value: 2,label: '高级'},
          {value: 3,label: '教授级'},
        ],
        arrFileType : [
          {label:'个人证件'},
          {label:'社保缴费证明'},
          {label:'纳税证明'},
          {label:'个人执业资格证书'},
          {label:'毕业证书'},
          {label:'职称证书'},
          {label:'身份证'},
          {label:'劳动合同'},
          {label:'其他资料'},
        ],
        addres,
        objPreView : {},
    }

  },
  methods : {
    errorHandler(){
      return true;
    },
    handleSearch(){
      this.$emit('getUserList',1, this.objSearch.userName)
    },
    handleUserPage(page){
      this.$emit('handleUserPage',page,this.objSearch.userName)
    },
    handleIsEdit(tiem){
      if(!tiem){
        this.objInfo = {};
      }else{
        this.objInfo = tiem;
      }
      this.bolIsEdit = true;
    },
    handleSubmit(formName){
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$server.userRegister({
            ...this.objInfo
          }).then(data=>{
            if(data.code == 1001){
              that.bolIsEdit = false;
              this.$emit('getUserList',1,this.objSearch.userName);
              this.$message({
                type: 'success',
                message : '保存成员信息成功'
              });
            }else{
              this.$message({
                type: 'error',
                message : '系统异常，请联系客服处理'
              });
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message : '您有必填项没有填写，请检查！'
          });
          return false;
        }
      });
    },
    handleClose(){
      this.bolIsEdit = false;
      this.$emit('getUserList',1,this.objSearch.userName);
    },
    handleDelete(item){
      this.$confirm('确定删除此'+item.username+'么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$emit('deleteUser',item.id)
      })
    },



    handleAddUser(type){
      this.strAddUserType = type
      /*this.$server.getPersonnel().then(data=>{
        this.arrUser = data.data
      })*/
    },
    changeUpload(file, fileList) {
      // 上传成功后将图片地址赋值给裁剪框显示图片
      if(file.response){
        this.$nextTick(() => {
          this.option.img = file.response.url
          this.dialogVisible = true
        })
      }
    },

    handleAvatarSuccess(res, file) {
      this.objInfo.userpic = res.url
    },
    handleUpdata(label){
      this.strFileType = label;
    },
    handleAddressFun(e,form,thsAreaCode){
      let data = this.$refs.cascaderAddr.getCheckedNodes();
      let result = data.map(item=>item.label);
      this.objInfo.belongMajor = result;
    },
    handleUpload(file){
      if(file.state == 'error'){
        this.$message({
          type : 'error',
          message : file.msg
        })
      }else{
        this.arrFile.push({
          ...file,
          'filename' : file.original,
          'filesourcetype' : this.strFileType
        })
      }
    },
    handleRemove(row){
      this.arrFile = this.arrFile.filter((item,index) => index != row.$index)
    },
    getIndividual(){
      let value = '';
     
    },
    handleDown(row){
      axios.get(row.url, {
          responseType: 'blob' //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
      })
      .then(response => {
          let url = window.URL.createObjectURL(response.data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = url;
          a.download = row.original;
          a.click();
          window.URL.revokeObjectURL(url);
      })
      .catch(err => {
          console.log(`接口调用失败`);
          console.log(err);
      })
    },
    handlePreView(row){
      console.log(row)
      let url = '';
      let onlineViewType = ['doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx','txt']
      let fileTypeName = row.url.substring(row.url.lastIndexOf('.') + 1, row.url.length).split('?')[0]
      let isWord = onlineViewType.find((type) => type === fileTypeName)
      if (isWord) {
        url = 'http://view.officeapps.live.com/op/view.aspx?src=http://localhost:8080' + row.url
      }
      window.open(url, '_blank')
    },
    finish() {
      this.$refs.cropper.getCropData((data) => {
        this.objInfo.userpic = data;
        this.dialogVisible = false;
      })
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
 
  .el-checkbox:last-of-type{
    margin-right:8px;
  }
  .create-header {
    color: #333333;
    text-align: center;
  }
  .create-header .name {
    font-size: 14px;
    display: block;
    margin-bottom: 5px;
  }
  .create-header img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .info-list {
    padding-left: 20px;
    color: #999999;
  }
  .info-list>li {
    width: 90%;
    display: inline-block;
    position: relative;
    line-height: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .info-list li>span {
    color: #333333;
  }
  .info-list li a{
    color: #409EFF;
    font-weight: 600;
  }
  .el-collapse-item__header {
    font-weight: 600;
    height: 65px;
  }
  .tags-ing,
  .tags-stop {
    background: #67c23a;
    height: 25px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    color: #fff;
    padding: 0 10px;
    border-radius: 3px;
    margin-right: 10px;
  }
  .tags-stop {
    background: #909399;
  }
  .footer-pagination{
    padding: 15px 0;
    text-align: right;
  }
  .more-search .footer-btn{
    text-align: center;
    padding-bottom: 10px;
  }
  .view-toggle{
    text-align: right;
    border-top: 1px solid #eee;
    padding: 10px;
    background: #f6f6f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-checkbox{
    line-height: 35px;
  }
  .project-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-card{
    padding: 15px 15px 0 15px;
    margin-top: 20px;
  }
  .el-input__inner{
    height: 33px;
    line-height: 33px;
  }
  .dropdown-menu{
    position: absolute;
    right: 17px;
    z-index: 9;
  }
  .dropdown-menu .el-icon-more{
    cursor: pointer;
    color: #999999;
  }
  .dropdown-menu .menu-list{
    display: none;
    padding: 8px 12px;
    position: absolute;
    right: -2px;
    top: 13px;
    border-radius: 2px;
    border: 1px solid #eee;
    background: #f5f5f5;
  }
  .dropdown-menu:hover .menu-list{
    display: block;
    top: 19px;
  }
  .dropdown-menu .menu-list li{
    line-height: 25px;
    white-space: nowrap;
    display: block;
    cursor: pointer;
    text-align: left;
    color: #666666;
  }
  .dropdown-menu .menu-list li:hover{
    color: #409EFF;
  }
  .el-dialog__header {
    padding: 20px 20px 20px;
    border-bottom: 2px solid #eee;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: scroll !important;
    height: 29rem !important;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .section{
    padding: 15px 0;
  }
  .section h4{
    color: #666666;
    font-weight: 600;
    line-height: 40px;
    background: #f7f7f7;
    padding-left: 10px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;
  }
  .section .el-row .el-col{
    display: flex;
    margin: 15px 0;
  }
  .section .el-row .el-col p{
    width: 150px;
    text-align: right;
    color: #999999;
  }
  .section .el-form .el-form-item{
    margin-bottom: 0;
    width: 100%;
  }
  .section .el-form .el-form-item__label{
    color: #999999;
    padding: 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .el-cascader-panel > div:nth-child(-n+2) ul li .el-checkbox__inner {
    display: none;
  }
  .section .el-row .el-col span{
    color: #333333;
    width: 70%;
    display: block;
  } 
  .cropperwrapper{
    position: fixed;
    width: 100%;
    top: 0;
    height: 500px;
  }
  .cropper-content .cropper {
    width: auto;
    height: 400px;
  }
  .el-dialog__footer {
    padding: 15px;
    text-align: center;
    border-top: 2px solid #eee;
    background: #f6f6f6;
  }
</style>
