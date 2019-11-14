<template>
    <div class="index">
     <head-nav></head-nav>
     <aside-nav></aside-nav>
     <router-view></router-view>
    </div>
</template>

<script>
import headNav from '../components/Header'

import asideNav from '../components/Aside'  

export default {
    components:{
        headNav,
        asideNav,
      
    }
}
</script>
<style scoped>
.index{
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>