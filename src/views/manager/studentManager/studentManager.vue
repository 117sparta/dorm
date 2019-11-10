<template>
  <dm-section>
    <div style="text-align: left; margin: 0 0 20px 10px;">
      <el-button type="primary" size="small">新增学生信息</el-button>
    </div>
    <dm-table
      :columns="columns"
      :data="studentList">
    </dm-table>
  </dm-section>
</template>

<script>
import DmSection from '@/components/section';
import DmTable from '@/components/table';
import { Notification } from 'element-ui';
import { queryStudentInfo } from '@/request/manager';
export default {
  name: 'studentManager',
  components: {
    DmSection,
    DmTable
  },
  data () {
    return {
      studentList: [],
      columns: [
        {
          id: 1,
          type: 'string',
          label: '学号',
          field: 'studentID',
          minWidth: 150
        },
        {
          id: 2,
          type: 'string',
          label: '姓名',
          field: 'Sname',
          minWidth: 150
        },
        {
          id: 3,
          type: 'string',
          label: '性别',
          field: 'Ssex',
          minWidth: 150
        },
        {
          id: 4,
          type: 'string',
          label: '班级',
          field: 'Sclass',
          minWidth: 150
        },
        {
          id: 5,
          type: 'string',
          label: '院系',
          field: 'Sdept',
          minWidth: 150
        },
        {
          id: 6,
          type: 'opt',
          label: '操作',
          children: [
            {
              text: '编辑',
              color: '#008080',
              hidden: false,
              cb: (e) => {

              }
            },
            {
              text: '删除',
              color: '#f78989',
              hidden: false,
              cb: (e) => {

              }
            }
          ],
          minWidth: 150
        }
      ]
    }
  },
  methods: {
    handleGetAllStuInfo () {
      queryStudentInfo().then((response) => {
        const message = response.message;
        if (typeof message === 'string') {
          let showMsg = {
            title: '错误',
            message: '查询错误',
            duration: 0
          };
          Notification.error(showMsg);
          return;
        }
        let { studentInfosList } = message;
        this.studentList = studentInfosList;
      })
    }
  },
  mounted () {
    this.handleGetAllStuInfo();
  }
}
</script>
