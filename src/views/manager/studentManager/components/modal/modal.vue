<template>
  <el-dialog
  :visible.sync="visible"
  @close="handleCancel"
  width="40%">
    <div slot="title" style="text-align: left; border-bottom: 1px solid #eee;padding-bottom: 20px;">
      {{(this.status === 'CREATE' ? '新建' : '编辑') + '入住信息'}}
    </div>
    <el-form :model="checkInMsg" label-position="right" label-width="80px" ref="form">
      <el-form-item style="width: 350px" prop="studentID" label="学号" :rules="[
        { required: true, message: '请输入学号', trigger: 'change'}
      ]">
        <el-input  v-model="checkInMsg.studentID"></el-input>
      </el-form-item>
      <el-form-item style="width: 350px" prop="dormBuilding" label="宿舍楼栋" :rules="[
        { required: true, message: '请输入宿舍楼栋', trigger: 'change'}
      ]">
        <el-input  v-model="checkInMsg.dormBuilding"></el-input>
      </el-form-item>
      <el-form-item style="width: 350px"  prop="dormNO" label="宿舍号" :rules="[
        { required: true, message: '请输入宿舍号', trigger: 'change'}
      ]">
        <el-input v-model="checkInMsg.dormNO"></el-input>
      </el-form-item>
      <el-form-item style="width: 350px" prop="managerID" label="工号" :rules="[
        { required: true, message: '请输入工号', trigger: 'change'}
      ]">
        <el-input v-model="checkInMsg.managerID"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="handleSubmit" size="small">确定</el-button>
      <el-button type="info" @click="handleCancel" size="small">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'modal',
  data () {
    
  }
}
</script>
