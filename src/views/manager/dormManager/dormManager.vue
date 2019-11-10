<template>
  <dm-section>
    <div style="text-align: left; margin: 0 0 20px 10px;">
      <el-button type="primary" size="small">新增宿舍信息</el-button>
    </div>
    <dm-table
      :columns="columns"
      :data="dormList">
    </dm-table>
  </dm-section>
</template>

<script>
import DmSection from '@/components/section';
import DmTable from '@/components/table';
import { Notification } from 'element-ui';
import { queryDormMsg } from '@/request/manager';
export default {
   name: 'dormManger',
   components: {
     DmSection,
     DmTable
   },
   data () {
     return {
       dormList: [],
       columns: [
         {
           id: 1,
           type: 'string',
           label: '宿舍楼栋',
           field: 'dormBuilding',
           minWidth: 100
         },
         {
           id: 2,
           type: 'string',
           label: '宿舍号',
           field: 'dormNO',
           minWidth: 150
         },
         {
           id: 3,
           type: 'string',
           label: '可住人数',
           field: 'totalNum',
           minWidth: 100
         },
         {
           id: 4,
           type: 'string',
           label: '剩余可住人数',
           field: 'availableNum',
           minWidth: 170
         },
         {
           id: 5,
           type: 'opt',
           label: '操作',
           children: [
             {
               text: '编辑',
               hidden: false,
               color: '#008080',
               cb: () => {}
             },
             {
               text: '删除',
               hidden: false,
               color: '#f78989',
               cb: () => {}
             }
           ]
         }
       ]
     }
   },
   methods: {
     handleGetAllDormInfo () {
       queryDormMsg().then((response) => {
         const message = response.message;
         if (typeof message === 'string') {
           let showMsg = {
             title: '错误',
             message: '获取宿舍信息出错',
             duration: 0
           };
           Notification.error(showMsg);
           return;
         }
         const { dormList } = message;
         this.dormList = dormList;
       });
     }
   },

   mounted () {
     this.handleGetAllDormInfo();
   }
}
</script>
