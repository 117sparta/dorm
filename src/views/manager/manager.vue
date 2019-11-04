<template>
  <div>
    <el-container>
      <el-aside style="height: 95vh; width: 15%; overflow: hidden;">
        <el-menu
         style="height: 100%;"
         background-color="#222"
         text-color="#fff"
         active-text-color="#4455ff"
         :default-active="defaultActive"
         unique-opened
         menu-trigger="click"
         router>
          <el-menu-item index="0" :route="{ path: '/manager/checkInManager' }">
          学生入住管理
          </el-menu-item>
          <el-menu-item index="1" :route="{ path: '/manager/dormManager' }">
          宿舍管理
          </el-menu-item>
          <el-menu-item index="2" :route="{ path: '/manager/studentManager' }">
          学生信息管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="height: 95vh; overflow:hidden;">
        <el-header>欢迎使用学生宿舍管理系统</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'manager',
  data () {
    return {
      defaultActive: '/manager'
    }
  }
}
</script>
