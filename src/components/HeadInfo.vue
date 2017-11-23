<template>
  <div class="head-info">
    <Row>
      <Col span="12">欢迎<span class="important">{{userInfo.name || userInfo.email || userInfo.phone}}</span>登录本系统</Col>
      <Col span="12" style="text-align:right;">
        <span class="iconfont icon-peise"></span>
        <span class="iconfont icon-xiaoxi"></span>
        <span class="iconfont icon-suoding" title="锁定" @click="handleLock"></span>
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
        <div style="text-align:center;">
          <img src="static/lock.png" style="margin-top:20px;" alt="">
          <p style="font-size:12px;color:#999;margin-top:10px;">系统已经锁定，请输入密码重新进入！</p>
          <Input type="password" v-model="form.password" placeholder="请输入登录密码！" style="width:200px;margin-top:20px;margin-bottom:20px;"/>
        </div>
        <p slot="footer" style="text-align:center;">
          <Button type="primary" style="width:200px;" @click="unlock">验证</Button>
        </p>
    </Modal>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {unlock} from '@/config'
  import axios from 'axios'
  export default {
    data () {
      return {
        logoutModal: false,
        lockModal: false,
        form: {
          id: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    created () {
      if (this.$cookie.get('lock') === 'true') {
        this.lockModal = true
        this.form.id = JSON.parse(this.$cookie.get('userInfo')).uId
      }
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
      unlock () {
        if (!this.form.password) {
          this.$Message.warning('请输入登录密码！')
        } else {
          axios({
            url: unlock,
            methods: 'get',
            params: this.form
          }).then(res => {
            console.log(res)
            if (res.data) {
              this.$cookie.delete('lock')
              this.lockModal = false
              this.$Message.success('认证成功！')
            } else {
              this.$Message.error('密码有误，请重新输入！')
            }
          })
        }
      },
      handleLock () {
        this.lockModal = true
        this.$cookie.set('lock', true)
      }
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

