<template>
  <dm-section>
    <dm-table :columns="columns" :data="checkInList"></dm-table>
  </dm-section>
</template>

<script>
import DmSection from '@/components/section';
import DmTable from '@/components/table';
import { queryCheckInMsg } from '@/request/manager.js';
export default {
  name: 'checkInManager',
  components: {
    DmSection,
    DmTable
  },
  data () {
    return {
      columns: [
        {
          id: 1,
          label: '学号',
          field: 'studentID'
        },
        {
          id: 2,
          label: '姓名',
          field: 'Sname'
        },
        {
          id: 3,
          label: '性别',
          field: 'Ssex'
        },
        {
          id: 4,
          label: '班级',
          field: 'Sclass'
        },
        {
          id: 5,
          label: '宿舍楼栋',
          field: 'dormBuilding'
        },
        {
          id: 6,
          label: '宿舍号',
          field: 'dormNO'
        },
        {
          id: 7,
          label: '登记人',
          field: 'managerID'
        }
      ],
      checkInList: []
    }
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