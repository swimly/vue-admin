<template>
  <Form :model="form" :label-width="70">
    <Row style="margin:20px 0 20px 0;">
      <Col span="24" style="text-align:center;">
        <RadioGroup v-model="form.mode" type="button" @on-change="changeMode">
          <Radio label="邮箱注册"></Radio>
          <Radio label="手机号注册"></Radio>
        </RadioGroup>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="用户名：">
          <Input v-model="form.username" placeholder="请输入6位以上用户名"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-if="form.mode === '邮箱注册'">
      <Col span="24">
        <FormItem label="邮箱：">
          <Input v-model="form.email" placeholder="请输入手机号"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row v-if="form.mode === '手机号注册'">
      <Col span="24">
        <FormItem label="手机号：">
          <Input v-model="form.tel" placeholder="请输入手机号"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="密码：">
          <Input v-model="form.pwd" :placeholder="pwdPlaceholder"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="身份：">
          <RadioGroup v-model="form.degree" type="button">
            <Radio label="普通用户"></Radio>
            <Radio label="普通会员"></Radio>
            <Radio label="终身会员"></Radio>
            <Radio label="管理员"></Radio>
            <Radio label="超级管理员"></Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <FormItem label="激活：">
          <i-switch></i-switch>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        pwdPlaceholder: '请输入密码！',
        form: {
          tel: '',
          degree: '普通用户',
          email: '',
          username: '',
          pwd: '',
          mode: '邮箱注册'
        }
      }
    },
    methods: {
      submit () {
        console.log(this.form)
        this.$Message.success('用户添加成功！')
      },
      changeMode (status) {
        switch (status) {
          case '邮箱注册':
            this.pwdPlaceholder = '请输入密码！'
            break
          case '手机号注册':
            this.pwdPlaceholder = '密码默认为手机号后6位'
            break
        }
      }
    }
  }
</script>
