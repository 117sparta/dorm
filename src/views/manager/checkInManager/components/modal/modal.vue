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
import { createCheckInMsg, searchCheckInMsg, searchStudentInfo, searchDormInfo } from '@/request/manager';
import { Notification } from 'element-ui';
  export default {
    name: 'modal',
    props: {
      status: {
        type: String,
        default: 'CREATE'
      },
      originCheckInMsg: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data () {
      return {
        visible: true,
        checkInMsg: {
          studentID: '',
          dormNO: '',
          dormBuilding: '',
          managerID: ''
        }
      }
    },

    mounted () {
      this.checkInMsg = this.originCheckInMsg;
    },

    methods: {
      hide () {
        this.visible = false;
      },
      handleSubmit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.status === 'CREATE') {
              Promise.all([this.checkStuIsExisted(), this.checkDormIsExisted(), this.checkHasCheckedIn()])
                .then(() => {
                createCheckInMsg(this.checkInMsg).then(() => {
                  let showMsg = {
                    title: '新建',
                    message: '新建入住信息成功',
                    duration: 0
                  };
                  Notification.success(showMsg);
                  this.$emit('on-submit');
                  this.hide();
                });
              }).catch(() => false);
            }
          }
        });
      },
      handleCancel () {
        this.$emit('on-close');
        this.hide();
      },
      // 检查该学生已经入住
      checkHasCheckedIn () {
        if (!this.checkInMsg.studentID) return;
        return new Promise((resolve, reject) => {
          let data = {
            studentID: this.checkInMsg.studentID
          };
          searchCheckInMsg(data).then(response => {
            if (typeof response.message === 'string') {
              let showMsg = {
                title: '错误',
                message: response.message,
                duration: 0
              };
              Notification.error(showMsg);
              reject();
            }
            !response.message.checkInList.length && resolve(); // 无信息，表示没有被安排
            if (response.message.checkInList.length) {
              let showMsg = {
                title: '错误',
                message: '该学生已经被安排入住',
                duration: 0
              };
              Notification.error(showMsg);
              reject();
            }
          })
        });
      },
      // 检查新创建的学生是否在系统中已经存在。
      checkStuIsExisted () {
        if (!this.checkInMsg.studentID) return;
        return new Promise((resolve, reject) => {
          let data = {
            studentID: this.checkInMsg.studentID
          };
          searchStudentInfo(data)
            .then(response => {
              if (typeof response.message === 'string') {
                let showMsg = {
                  title: 'Error',
                  message: response.message,
                  duration: 0
                };
                Notification.error(showMsg);
                reject();
              }
              response.message.studentList.length && resolve();
              if (!response.message.studentList.length) {
                let showMsg = {
                  title: '错误',
                  message: '该学生不存在',
                  duration: 0
                };
                Notification.error(showMsg);
                reject();
              }
            })
        });
      },
      // 检查宿舍是否存在
      checkDormIsExisted () {
        if (!(this.checkInMsg.dormNO && this.checkInMsg.dormBuilding)) return;
        return new Promise( (resolve, reject) =>{
          let data = {
            dormNO: this.checkInMsg.dormNO,
            dormBuilding: this.checkInMsg.dormBuilding
          };
          searchDormInfo(data).then((response) => {
            if (typeof response.message === 'string') {
              let showMsg = {
                title: '错误',
                message: response.message,
                duration: 0
              };
              Notification.error(showMsg);
              reject();
              return;
            }
            let { dormList } = response.message;
            if (!dormList.length) {
              let showMsg = {
                title: '错误',
                message: `${this.checkInMsg.dormBuilding} ${this.checkInMsg.dormNO}宿舍不存在`,
                duration: 0
              };
              Notification.error(showMsg);
              reject(new Error('dorm is not existed'));
              return;
            } else if (dormList[0].availableNum <= 0) {
              let showMsg = {
                title: '错误',
                message: '该宿舍已经住满',
                duration: 0
              };
              Notification.error(showMsg);
              reject(new Error('dorm is fullfilled'));
              return;
            } else {
              resolve();
            }
          });
        });
      }
    }
  }
</script>


