<template>
  <dm-section>
    <div style="margin-bottom: 20px; text-align: left;">
      <el-button type="primary" size="small" @click="handleShowOptionModal('CREATE')">新增入住信息</el-button>
    </div>
    <dm-table :columns="columns" :data="checkInList"></dm-table>
    <option-modal
      v-if="showOptionModal"
      ref="modal"
      >
    </option-modal>
  </dm-section>
</template>

<script>
import DmSection from '@/components/section';
import DmTable from '@/components/table';
import OptionModal from './components/modal';
import { queryCheckInMsg } from '@/request/manager.js';
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
                this.showOptionModal('edit', e);
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
    
    },
    handleDelete (checkInMsg) {
    
    },
    
  },

  mounted () {
    queryCheckInMsg()
      .then(response => {
        const { message: { checkInList } } = response;
        this.checkInList = checkInList;
      }).catch(() => false);
  }
}
</script>