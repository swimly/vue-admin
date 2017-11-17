<template>
  <div class="login">
    <div class="login-panel">
      <h1>登录</h1>
      <Form>
        <FormItem>
          <Input placeholder="请输入邮箱\手机号\用户名" size="large" v-model="form.username"/>
        </FormItem>
        <FormItem>
          <Input type="password" placeholder="请输入密码" size="large" v-model="form.password"/>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" long @click="handleLogin">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {login} from '@/config'
  export default {
    metaInfo: {
      title: '系统登录'
    },
    data () {
      return {
        login: login,
        loading: false,
        form: {
          username: '18827078587',
          password: '122514',
          status: 1
        }
      }
    },
    methods: {
      handleLogin () {
        this.loading = !this.loading
        this.$Loading.start()
        if (!this.form.username || !this.form.password) {
          this.$Message.warning('请填写用户名和密码！')
          this.loading = !this.loading
          this.$Loading.error()
        } else {
          axios.get(this.login, {
            params: this.form
          }).then(res => {
            console.log(res)
            this.loading = !this.loading
            if (res.data.status === 1) {
              this.$Message.success(res.data.msg)
              this.$Loading.finish()
              // 成功
              this.$cookie.set('userInfo', JSON.stringify(res.data.data), {expires: '1h'})
              this.$router.replace('/home')
            } else {
              this.$Message.error(res.data.msg)
              this.$Loading.error()
            }
          })
        }
        // this.$router.replace('/home')
      }
    }
  }
</script>
<style>
.login-panel{
  width:400px;
  padding:20px;
  background:rgba(255,255,255,0.95);
  border-radius:10px;
  position: fixed;
  top:50%;
  right: 100px;
  transform:translateY(-50%);
}
.login-panel h1{
  font-size:22px;
  font-weight:normal;margin-bottom:30px;
}
</style>
