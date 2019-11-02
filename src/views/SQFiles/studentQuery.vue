<template>
    <el-container>
        <el-header class="headerStyle">
            <h3>欢迎使用宿舍查询系统</h3>
        </el-header>
        <el-main class="mainStyle">
            <el-container>
            <el-aside width="150px" class="asideStyle">
                <div class="asideItem el-icon-ice-cream" @click="changeToDormQuery">宿舍查询</div>
                <div class="asideItem el-icon-chicken" @click="changeToRoomMateQuery">舍友查询</div>
                <div class="asideItem el-icon-apple" @click="changeToModifyPassword">修改密码</div>
                <div class="asideItem el-icon-dessert" @click="quitSystem">退出系统</div>
            </el-aside>
            <el-main class="mainStyle">
                <div v-if="!serviceChosen">请在左侧选择你需要的业务</div>
                <component :is="serviceNameChosen"></component>
            </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    import dormQuery from './dormQuery'
    import roomMateQuery from './roomMateQuery'
    import modifyPassword from './modifyPassword'
    export default {
        name: "studentQuery",
        components: {
          dormQuery,
          roomMateQuery,
          modifyPassword
        },
        data: () =>{
            return {
                serviceChosen: false,
                serviceNameChosen: ''
            }
        },
        methods: {
            changeToDormQuery: function () {
               this.serviceChosen = true;
               this.serviceNameChosen = 'dormQuery';
            },
            changeToRoomMateQuery: function () {
                this.serviceChosen = true;
                this.serviceNameChosen = 'roomMateQuery';
            },
            changeToModifyPassword: function () {
                this.serviceChosen = true;
                this.serviceNameChosen = 'modifyPassword';
            },
            quitSystem: function () {
                this.$router.push({path:'/'});
            }
        }
    }
</script>

<style scoped>
.headerStyle{
    text-align:left;
}
    .asideStyle{
        border-radius: 5px;
    }
    .asideItem{
        padding: 20px 20px;
        color: white;
        background-color: #78655b;
        transition: all 120ms ease-in-out;
        cursor: pointer;
    }
    .asideItem:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .asideItem:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .asideItem:hover{
        border-left: 5px solid white;
    }
    .mainStyle{
        background-color: #f1e5be;
        border-radius: 5px;
        box-shadow: 0 0 2px #f1f1f1;
    }
</style>
