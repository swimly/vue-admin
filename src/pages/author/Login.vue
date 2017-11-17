<template>
  <div class="login">
    <div class="login-panel">
      <h1>登录</h1>
      <Form>
        <FormItem>
          <Input placeholder="请输入邮箱\手机号\用户名" size="large"/>
        </FormItem>
        <FormItem>
          <Input placeholder="请输入密码" size="large"/>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="login">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      title: '系统登录'
    },
    methods: {
      login () {
        this.$router.replace('/home')
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
