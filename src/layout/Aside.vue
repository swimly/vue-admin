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
  import {mapMutations} from 'vuex'
  import {categoryArticle, categoryUser} from '@/config'
  import axios from 'axios'
  export default {
    data () {
      return {
        active: '/home',
        count: 0,
        time: 30,
        timer: null
      }
    },
    components: {
      Face,
      HeadInfo
    },
    mounted () {
      document.onmousemove = (e) => {
        this.count = 0
      }
      this.timer = setInterval(this.setTime, 1000)
    },
    created () {
      if (!this.$cookie.get('userInfo')) {
        this.$Message.warning('非法进入，您尚未登录本系统，请先登录！')
        this.$router.replace('/login')
      } else {
        this.change()
        this.updateUserInfo(JSON.parse(this.$cookie.get('userInfo')))
        this.getUserCategory()
        this.getArticleCategory()
      }
      // console.log(this.$cookie.get('userInfo'))
    },
    methods: {
      getArticleCategory () {
        axios({
          url: categoryArticle,
          methods: 'get'
        }).then(res => {
          this.updateArticleCategory(res.data)
        })
      },
      getUserCategory () {
        axios({
          url: categoryUser,
          methods: 'get'
        }).then(res => {
          this.updateUserCategory(res.data)
        })
      },
      setTime () {
        this.count ++
        if (this.count > this.time * 60) {
          clearInterval(this.timer)
          console.log('超时')
          this.$cookie.delete('userInfo')
          this.$Message.warning('登录超时，即将跳转到登录页面，请重新登录！')
          setTimeout(() => {
            this.$router.replace('/login')
          }, 1000)
        }
      },
      jump (name) {
        this.$router.replace(name)
      },
      change (v, o) {
        this.active = '/' + this.$route.path.split('/')[1]
      },
      ...mapMutations({
        updateUserInfo: 'updateUserInfo',
        updateArticleCategory: 'updateArticleCategory',
        updateUserCategory: 'updateUserCategory'
      })
    },
    watch: {
      '$route': 'change'
    },
    destroyed () {
      clearInterval(this.timer)
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
