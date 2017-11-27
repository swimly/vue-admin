<template>
  <div :class="'vertical ' + userInfo.theme">
    <Row>
      <Col span="3" class="aside">
        <Face/>
        <Menu mode="vertical" width="auto" :theme="'dark'" :active-name="active" @on-select="jump">
          <MenuItem name="/home">
            <Icon type="ios-home-outline" class="v-m"></Icon>
            <span class="v-m">首页</span>
          </MenuItem>
          <MenuItem name="/user">
            <Icon type="ios-people-outline" class="v-m"></Icon>
            <span class="v-m">用户管理</span>
          </MenuItem>
          <MenuItem name="/article">
            <Icon type="ios-bookmarks-outline" class="v-m"></Icon>
            <span class="v-m">文章管理</span>
          </MenuItem>
          <MenuItem name="/project">
            <Icon type="ios-analytics-outline" class="v-m"></Icon>
            <span class="v-m">项目管理</span>
          </MenuItem>
          <MenuItem name="/setting">
            <Icon type="ios-settings" class="v-m"></Icon>
            <span class="v-m">综合设置</span>
          </MenuItem>
          <MenuItem name="/count">
            <Icon type="ios-speedometer-outline" class="v-m"></Icon>
            <span class="v-m">统计</span>
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
  import {mapMutations, mapGetters} from 'vuex'
  import {categoryArticle, categoryUser, categoryGroup, themecontent, file} from '@/config'
  import axios from 'axios'
  export default {
    metaInfo () {
      return {
        link: [{
          rel: 'stylesheet', href: this.file + this.css
        }]
      }
    },
    data () {
      return {
        active: '/home',
        count: 0,
        time: 30,
        theme: '',
        timer: null,
        file: file,
        css: ''
      }
    },
    components: {
      Face,
      HeadInfo
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
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
        this.getThemeContent()
        this.change()
        this.updateUserInfo(JSON.parse(this.$cookie.get('userInfo')))
        this.getUserCategory()
        this.getArticleCategory()
        this.getGroupCategory()
      }
      // console.log(this.$cookie.get('userInfo'))
      console.log(this.userInfo.uId, 'userInfo')
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
      getGroupCategory () {
        axios({
          url: categoryGroup,
          methods: 'get'
        }).then(res => {
          this.updateGroupCategory(res.data)
        })
      },
      getThemeContent () {
        axios({
          url: themecontent + JSON.parse(this.$cookie.get('userInfo')).theme,
          methods: 'get'
        }).then(res => {
          console.log(res, 'css')
          this.css = res.data.css
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
        updateUserCategory: 'updateUserCategory',
        updateGroupCategory: 'updateGroupCategory'
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
.content{
  box-sizing:border-box;
}
.ivu-menu-item span{font-size:12px;}
</style>
