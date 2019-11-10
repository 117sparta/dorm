<template>
  <dm-section>
    <div style="margin-bottom: 20px; text-align: left;">
      <el-button type="primary" size="small" @click="handleShowOptionModal('CREATE')">新增入住信息</el-button>
    </div>
    <dm-table :columns="columns" :data="checkInList"></dm-table>
    <option-modal
      v-if="showOptionModal"
      :status="status"
      :origin-check-in-msg="checkInMsg"
      @on-close="handleModalClose"
      @on-submit="handleModalSubmit"
      >
    </option-modal>
  </dm-section> 
</template>

<script>
import DmSection from '@/components/section';
import DmTable from '@/components/table';
import OptionModal from './components/modal';
import { queryCheckInMsg, deleteCheckInMsg } from '@/request/manager.js';
import { Notification } from 'element-ui';
export default {
  name: 'checkInManager',
  components: {
    DmSection,
    DmTable,
    OptionModal
  },
  data () {
    return {
      showOptionModal: false,
      status: 'CREATE',
      checkInMsg: {},
      columns: [
        {
          id: 1,
          label: '学号',
          field: 'studentID',
          type: 'string',
          minWidth: 200
        },
        {
          id: 2,
          label: '姓名',
          field: 'Sname',
          type: 'string',
          minWidth: 130
        },
        {
          id: 3,
          label: '性别',
          field: 'Ssex',
          type: 'string',
          minWidth: 80
        },
        {
          id: 4,
          label: '班级',
          field: 'Sclass',
          type: 'string',
          minWidth: 240
        },
        {
          id: 5,
          label: '宿舍楼栋',
          field: 'dormBuilding',
          type: 'string'
        },
        {
          id: 6,
          label: '宿舍号',
          field: 'dormNO',
          type: 'string'
        },
        {
          id: 7,
          label: '登记人',
          field: 'managerID',
          type: 'string'
        },
        {
          id: 8,
          label: '操作',
          type: 'opt',
          width: 120,
          children: [
            {
              text: '编辑',
              color: '#008080',
              cb: (e) => {
                this.handleShowOptionModal('EDIT', e);
              }
            },
            {
              text: '删除',
              color: '#f78989',
              cb: (e) => {
                this.handleDelete(e);
              }
            }
          ]
        }
      ],
      checkInList: []
    }
  },
  
  methods: {
    handleShowOptionModal (status, checkInMsg) {
      if (status === 'EDIT') {
        this.checkInMsg = checkInMsg;
      } else {
        this.checkInMsg = {};
      }
      this.status = status;
      this.showOptionModal = true;
    },
    handleDelete (checkInMsg) {
      this.$confirm('你确定要删除这条信息吗？', {
        title: '提示',
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let query = { 
          studentID: checkInMsg.studentID,
          dormNO: checkInMsg.dormNO,
          dormBuilding: checkInMsg.dormBuilding
        };
        deleteCheckInMsg(query)
          .then((response) => {
            let statusCode = response.statusCode;
            if (statusCode === -1) {
              let showMsg = {
                title: '错误',
                message: '删除失败',
                duration: 0
              };
              Notification.error(showMsg);
            } else if (statusCode === 4) {
              let showMsg = {
                title: '错误',
                message: response.message,
                duration: 0
              };
              Notification.error(showMsg);
              return;
            } else {
              let showMsg = {
                title: '成功',
                message: '删除成功',
                duration: 0
              };
              Notification.success(showMsg);
              this.handleGetAllCheckInMsg();
            }
          }).catch(() => {
            let showMsg = {
              title: '错误',
              message: '删除失败',
              duration: 0
            };
            Notification.error(showMsg);
          });
      }).catch(() => false);
    },
    handleModalClose () {
      this.showOptionModal = false;
    },
    handleModalSubmit () {
      this.showOptionModal = false;
      this.handleGetAllCheckInMsg();
    },
    handleGetAllCheckInMsg () {
      queryCheckInMsg()
      .then(response => {
        const { message: { checkInList } } = response;
        this.checkInList = checkInList;
      }).catch(() => false);
    }
  },

  mounted () {
    this.handleGetAllCheckInMsg();
  }
}
</script>