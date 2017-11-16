<template>
  <div class="vertical">
    <Row>
      <Col span="3" class="aside">
        <Face/>
        <Menu mode="vertical" width="auto" :theme="'dark'" :active-name="active" @on-select="jump">
          <MenuItem name="/home">
            <Icon type="ios-paper"></Icon>
            首页
          </MenuItem>
          <MenuItem name="/user">
            <Icon type="ios-people"></Icon>
            用户管理
          </MenuItem>
          <MenuItem name="/article">
            <Icon type="ios-people"></Icon>
            文章管理
          </MenuItem>
          <MenuItem name="/project">
            <Icon type="ios-people"></Icon>
            项目管理
          </MenuItem>
          <!-- <Submenu name="3">
            <template slot="title">
              <Icon type="stats-bars"></Icon>
              统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu> -->
          <MenuItem name="/setting">
            <Icon type="settings"></Icon>
            综合设置
          </MenuItem>
          <MenuItem name="/count">
            <Icon type="ios-people"></Icon>
            统计
          </MenuItem>
        </Menu>
      </Col>
      <Col span="21" class="content">
        <head-info/>
        <router-view name="content" class="view"></router-view>
      </Col>
    </Row>
  </div>
</template>
<script>
  import Face from '@/components/Face'
  import HeadInfo from '@/components/HeadInfo'
  export default {
    data () {
      return {
        active: '/home'
      }
    },
    components: {
      Face,
      HeadInfo
    },
    created () {
      this.change()
    },
    methods: {
      jump (name) {
        this.$router.replace(name)
      },
      change (v, o) {
        this.active = '/' + this.$route.path.split('/')[1]
      }
    },
    watch: {
      '$route': 'change'
    }
  }
</script>
<style>
.vertical{
  height:100%;
}
.vertical .ivu-row{
  height:100%;
}
.vertical .ivu-col{
  height:100%;
}
.vertical .aside{
  background:#495060;
}
.content{
  box-sizing:border-box;
}
</style>
