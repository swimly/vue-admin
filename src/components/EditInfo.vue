<template>
  <Form :model="form" :label-width="80">
    <FormItem label="姓名：">
      <Input placeholder="请填写姓名" v-model="form.name" v-if="edit" style="width:40%;"></Input>
      <span v-if="!edit">{{form.name}}</span>
    </FormItem>
    <FormItem label="性别：">
      <RadioGroup v-model="form.sex" v-if="edit">
        <Radio label="0">男</Radio>
        <Radio label="1">女</Radio>
        <Radio label="2">隐私</Radio>
      </RadioGroup>
      <span v-if="!edit">{{setSex(form.sex)}}</span>
    </FormItem>
    <FormItem label="生日：">
      <DatePicker type="date" placeholder="请选择出生日期" v-model="form.birthday" v-if="edit"></DatePicker>
      <span v-if="!edit">{{form.birthday}}</span>
    </FormItem>
    <FormItem label="手机号码：">
      <!-- <Input v-if="edit" placeholder="请输入手机号码" v-model="form.phone" style="width:50%;"></Input> -->
      <span>{{form.phone}}</span>
    </FormItem>
    <FormItem label="邮箱：">
      <!-- <Input v-if="edit" placeholder="请输入邮箱" v-model="form.email" style="width:50%;"></Input> -->
      <span>{{form.email}}</span>
    </FormItem>
    <FormItem label="QQ：">
      <Input v-if="edit" placeholder="请输入QQ号码" v-model="form.QQ" style="width:40%;"></Input>
      <span v-if="!edit">{{form.QQ}}</span>
    </FormItem>
    <FormItem label="户籍地：">
      <Input v-if="edit" placeholder="请填写户籍所在地" v-model="form.birthplace"></Input>
      <span v-if="!edit">{{form.birthplace}}</span>
    </FormItem>
    <FormItem label="现居地：">
      <Input v-if="edit" placeholder="请填写现居地址" v-model="form.domicile"></Input>
      <span v-if="!edit">{{form.domicile}}</span>
    </FormItem>
    <FormItem>
      <Button v-if="!edit" type="ghost" @click="edit = !edit">编辑资料</Button>
      <Button v-if="edit" type="primary" @click="submit">确认修改</Button>
      <Button v-if="edit" type="warning" @click="edit = !edit">取消</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {editUser} from '@/config'
  import axios from 'axios'
  export default {
    data () {
      return {
        edit: false
      }
    },
    computed: {
      ...mapGetters({
        form: 'userInfo'
      })
    },
    methods: {
      submit () {
        this.edit = !this.edit
        this.form.birthday = this.form.birthday.getTime()
        axios({
          url: editUser + this.form.uId,
          methods: 'get',
          params: this.form
        }).then(res => {
          console.log(res)
          this.updateUserInfo(res.data)
          this.$cookie.set('userInfo', JSON.stringify(res.data))
          this.$Message.success('基本信息修改成功！')
        })
      },
      setSex (sex) {
        switch (parseInt(sex)) {
          case 0:
            return '男'
          case 1:
            return '女'
          case 2:
            return '保密'
        }
      },
      ...mapMutations({
        updateUserInfo: 'updateUserInfo'
      })
    }
  }
</script>
