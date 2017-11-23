<template>
  <div>
    <Row style="margin:0 -10px;">
      <Col span="3" v-for="(item, index) in theme" :key="index" style="padding:10px;">
        <Card :style="'background:#' + item.color" class="theme-item">
          <div @click="setTheme(item)" style="height:200px;">
            <span class="iconfont icon-selected" v-if="current === item.name"></span>
            <h2 class="name">{{item.name}}</h2>
          </div>
        </Card>
      </Col>
      <Col span="3" style="padding:10px;">
        <Card class="theme-btn">
          <div style="height:200px;display:table;width:100%;" @click="addModal = true">
            <div style="display:table-cell;vertical-align:middle;text-align:center;">
              <span class="iconfont icon-add"></span>
              <h2 class="text">添加</h2>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <Modal
      v-model="addModal"
      title="新增主题"
      @on-ok="handleAdd"
    >
      <Form :model="form" :label-width="60">
        <FormItem label="名称：">
          <Input v-model="form.name" placeholder="名称必须为英文，且长度不超过10个字符！"/>
        </FormItem>
        <FormItem label="颜色：">
          <ColorPicker v-model="form.color" />
          <Input v-model="form.color" style="width:80px;"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {updateTheme, addTheme, theme} from '@/config'
  import axios from 'axios'
  export default {
    data () {
      return {
        addModal: false,
        theme: [{
          name: 'default',
          color: '#495060'
        }, {
          name: 'primary',
          color: '#2D8CF0'
        }],
        current: 'default',
        form: {
          uId: '',
          name: '',
          color: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    created () {
      this.current = JSON.parse(this.$cookie.get('userInfo')).theme
      this.form.uId = JSON.parse(this.$cookie.get('userInfo')).uId
      this.getTheme()
    },
    methods: {
      setTheme (item) {
        this.form.theme = item.name
        this.form.id = JSON.parse(this.$cookie.get('userInfo')).uId
        axios({
          url: updateTheme,
          methods: 'get',
          params: this.form
        }).then(res => {
          this.$cookie.set('userInfo', JSON.stringify(res.data))
          this.updateUserInfo(res.data)
          this.current = res.data.theme
        })
      },
      getTheme () {
        axios({
          url: theme,
          methods: 'get'
        }).then(res => {
          console.log(res)
          this.theme = res.data
        })
      },
      handleAdd () {
        console.log(this.form)
        axios({
          url: addTheme,
          methods: 'get',
          params: this.form
        }).then(res => {
          console.log(res)
          this.getTheme()
        })
      },
      ...mapMutations({
        updateUserInfo: 'updateUserInfo'
      })
    }
  }
</script>
<style>
.theme-item{
  cursor: pointer;
}
.theme-item .name{
  font-size:18px;
  color:rgba(255,255,255,0.7);
  font-weight:normal;
  position: absolute;
  bottom:0;
  left:0;
  text-align:center;
  width:100%;
  padding:20px 0;
}
.theme-item .iconfont{
  font-size:24px;
  color:rgba(255,255,255,0.9)
}
.theme-btn{
  color:#999;
  cursor: pointer;
}
.theme-btn:hover{
  color:#2D8CF0;
}
.theme-btn .iconfont{
  font-size:35px;
}
.theme-btn .text{
  display:block;
  font-weight:normal;
}
</style>
