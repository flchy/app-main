<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="menulogo">
      <a class="logo" href="/">
        <img
          :src="logo"
          style="-moz-border-radius: 21px;-webkit-border-radius: 21px;">
      </a>
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import logo from '@/assets/logo.jpg'

export default {
  components: { SidebarItem },
  data() {
    return { logo: logo }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }

}
</script>
