<template>
  <div class="head-info">
    <Row>
      <Col span="12">欢迎<span class="important">{{userInfo.name || userInfo.email || userInfo.phone}}</span>登录本系统</Col>
      <Col span="12" style="text-align:right;">
        <span class="iconfont icon-xiaoxi"></span>
        <span class="iconfont icon-suoding" title="锁定" @click="lockModal = true"></span>
        <span class="iconfont icon-shezhi"></span>
        <span class="iconfont icon-tuichu" title="退出" @click="logoutModal = true"></span>
      </Col>
    </Row>
    <Modal
        v-model="logoutModal"
        @on-ok="logout">
        <p>确认要退出本系统？</p>
    </Modal>
    <Modal
        v-model="lockModal"
        :mask-closable="false"
        @on-ok="unlock">
        <span slot="close"></span>
        <p>确认要退出本系统？</p>
    </Modal>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        logoutModal: false,
        lockModal: false
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    mounted () {
      this.width = document.body.clientWidth
      this.height = document.body.clientHeight
    },
    methods: {
      logout () {
        this.$cookie.delete('userInfo')
        this.$Message.success('成功退出本系统！')
        this.$router.replace('/login')
      },
      unlock () {}
    }
  }
</script>
<style>
.head-info{
  background:#f5f5f5;
  margin:-33px 0 0 0;
  padding:6px 10px;
}
.head-info .ivu-col{
  font-size:14px;
}
.important{
  color:#f00;
  margin:0 1em;
}
.head-info .iconfont{
  font-size:18px;
  margin-left:10px;
  cursor: pointer;
}
</style>

