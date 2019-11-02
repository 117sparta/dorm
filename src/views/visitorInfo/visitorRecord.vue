<template>
    <div>
        <el-container>
            <el-header  class="visitorInfo-head">
                <el-row type="flex" align="middle">
                    <el-col :span="4">
                        <h2>来访人信息登记</h2>
                    </el-col>
                    <el-col :span="5" :offset="15">
                        <el-button type="primary" size="small" @click="newVisitor">新增</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-table :data="tableData">
                    <el-table-column label="时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.visitDateTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名">
                        <template slot-scope="scope">
                            <el-input v-if="scope.$index === editingRow" v-model="editingName"></el-input>
                            <span v-else>{{scope.row.visitorName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="性别">
                        <template slot-scope="scope">
                            <el-select v-if="scope.$index === editingRow" v-model="editingGender">
                                <el-option value="男" label="男"></el-option>
                                <el-option value="女" label="女"></el-option>
                            </el-select>
                            <span v-else>{{scope.row.visitorSex}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="宿舍号">
                        <template slot-scope="scope">
                            <el-input v-if="scope.$index === editingRow" v-model="editingDormNO"></el-input>
                            <span v-else>{{scope.row.visitDormNO}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="宿舍楼栋">
                        <template slot-scope="scope">
                            <el-input v-if="scope.$index === editingRow" v-model="editingDormBuilding"></el-input>
                            <span v-else>{{scope.row.visitBuilding}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="身份证号">
                        <template slot-scope="scope">
                            <el-input v-if="scope.$index === editingRow" v-model="editingVID"></el-input>
                            <span v-else>{{scope.row.visitorID}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="登记人">
                        <template slot-scope="scope">
                            <span>{{scope.row.managerID}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <template v-if="editingRow === scope.$index">
                                <el-button size="small" @click="handleCancel">取消</el-button>
                                <el-button size="small" @click="handleConfirm(scope.$index,scope.row)">确认</el-button>
                            </template>
                            <template v-else>
                                <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index,tableData)">删除</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "visitorRecord",
        data: () => {
            return {
                tableData: [],
                editingRow: -1,
                editingName: '',
                editingTime:'',
                editingGender: '',
                editingDormNO: '',
                editingDormBuilding: '',
                editingVID:'',
                isNew: false
            }
        },
        methods: {
            handleEdit: function (index,data) {
                this.editingRow = index;
                this.editingName = data.visitorName;
                this.editingGender = data.visitorSex;
                this.editingVID = data.visitorID;
                this.editingDormNO = data.visitDormNO;
                this.editingDormBuilding = data.visitBuilding;
            },
            handleDelete: function (index,tableData) {
                tableData.splice(index,1);
            },
            handleConfirm: function (index,data){
                data.visitorName = this.editingName;
                data.visitorSex = this.editingGender;
                data.visitorID = this.editingVID;
                data.visitDormNO = this.editingDormNO;
                data.visitBuilding = this.editingDormBuilding;
                this.editingRow = -1;
                if(this.isNew){
                    this.$http.post('http://localhost:3000/insertVisitor',{
                        visitDateTime: data.visitDateTime,
                        visitorName: data.visitorName,
                        visitorSex: data.visitorSex,
                        visitorID: data.visitorID,
                        visitDormNO: data.visitDormNO,
                        visitBuilding: data.visitBuilding,
                        managerID: data.managerID,
                        ope: 'insert'
                    }).then(response=>{
                        console.log(response);
                    });
                    this.isNew = false;
                } else {
                    this.$http.post('http://localhost:3000/insertVisitor',{
                        visitDateTime: data.visitDateTime,
                        visitorName: data.visitorName,
                        visitorSex: data.visitorSex,
                        visitorID: data.visitorID,
                        visitDormNO: data.visitDormNO,
                        visitBuilding: data.visitBuilding,
                        managerID: data.managerID,
                        ope: 'update'
                    }).then(response=>{
                        console.log(response);
                    });
                }
            },
            handleCancel: function (){
                if(this.isNew) {
                    this.tableData.shift();
                    this.isNew = false;
                }
                this.editingRow = -1;
            },
            newVisitor: function () {
                this.tableData.unshift({
                    managerID: "6859645",
                    visitBuilding: "",
                    visitDateTime: this.transformTime(new Date(Date.now())),
                    visitDormNO: "",
                    visitorID: "",
                    visitorName: "",
                    visitorSex: "",
                });
                this.editingRow = 0;
                this.isNew = true;
            },
            transformTime(date){
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let d = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                return `${year}-${month<10?'0'+month:month}-${d<10?'0'+d:d} ${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`;
            }
        },
        mounted: function () {
            this.$http.get('http://localhost:3000/insertVisitor')
                .then(response => {
                    console.log(response);
                    let data = JSON.stringify(response.data);
                    let data2 = JSON.parse(data);
                    for(let i=0;i<data2.length;i++){
                        let dateTime = data2[i].visitDateTime;
                        data2[i].visitDateTime = this.transformTime(new Date(dateTime));
                    }
                    this.tableData = data2;
                })
        }
    }
</script>

<style scoped>
.visitorInfo-head{
    text-align:left;
}
</style>
