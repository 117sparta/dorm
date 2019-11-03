<template>
    <div>
        <el-table :data="tableData">
            <el-table-column label="学号" prop="studentID"></el-table-column>
            <el-table-column label="姓名" prop="Sname"></el-table-column>
            <el-table-column label="性别" prop="Ssex"></el-table-column>
            <el-table-column label="班级" prop="Sclass"></el-table-column>
            <el-table-column label="院系" prop="Sdept"></el-table-column>
            <el-table-column label="楼栋" prop="dormBuilding"></el-table-column>
            <el-table-column label="宿舍号" prop="dormNO"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { roomMateQuery } from '@/request/studentQuery.js'
    export default {
        name: "roomMateQuery",
        data: () => {
            return {
                tableData: null
            }
        },
        mounted: function () {
            roomMateQuery()
                .then((response) =>{
                    const { roomMates } = response.message;
                    //console.log(response);
                    let data1 = JSON.stringify(roomMates);
                    let data = JSON.parse(data1);
                    console.log(data);
                    this.tableData = data;
                });
        }
    }
</script>

<style scoped>

</style>
