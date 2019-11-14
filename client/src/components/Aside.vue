<template>
     <el-row class="menu_page">
         <el-col>
 <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router
      background-color="#324057"
      text-color="#fff"
      active-text-color="#ffd04b">
       <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="fel-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
     </router-link>
      <el-submenu :index="item.path" v-for="item in items" :key="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item :index="item1.path" v-for="(item1) in item.children" :key="item1.path">
            <span>{{item1.name}}</span>
        </el-menu-item>
        
      </el-submenu>
     
    </el-menu>
       </el-col>
    </el-row>
</template>
<script>
export default {
    data(){
        return{
            items: [
        {
          icon: "fa-money",
          name: "资金管理",
          path: "fund",
          children: [{ path: "foundlist", name: "资金流水" }]
        },
        {
          icon: "fa-asterisk",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
        }
    }
}
</script>

<style  scoped>
.menu_page {
  width: 200px;
 display: block;
 float: left;
  left: 1;
  min-height: 100%;
  background-color: #324057;

}
.el-menu
{
  border: none;
    width: 200px;
}
 /* .el-submenu .el-menu-item{
   max-width: 161px;
 } */



</style>