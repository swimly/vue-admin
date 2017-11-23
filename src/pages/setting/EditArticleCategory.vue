<template>
  <div>
    <Row style="margin-top:20px;">
      <Col span="12">
        <h2 class="title">文章分类 <span class="count">({{articleCategory.length}})</span></h2>
      </Col>
      <Col span="12" style="text-align:right;">
        <Button type="ghost" shape="circle" icon="plus" @click="modal = true"></Button>
      </Col>
    </Row>
    <p class='tip'>配置用户等级，不同的会员身份享有不同的特权，从左到右，权限越大，享有的特权越多！</p>
    <div class="category-content">
      <Row>
        <Col span="4" v-for="(item, index) in articleCategory" :key="index">
          <Card><span class="dot" :style="'background-color:' + item.color"></span><span class="v-m">{{item.name}}</span><Button type="text" icon="close" slot="extra" @click="del(item)"></Button></Card>
        </Col>
      </Row>
    </div>
    <Modal
      title="添加用户分类"
      @on-ok="submit"
      v-model="modal">
      <Form :model="form" :label-width="75">
        <Row>
          <Col span="12">
            <FormItem label="分类名称：">
              <Input v-model="form.name"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="英文：">
              <Input v-model="form.en"/>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="排序：">
          <Slider v-model="form.sort" :tip-format="format" :min="0" :max="10"></Slider>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="图标：">
              <Input v-model="form.icon" placeholder="默认为iconfont，填写icon-xxx"/>
            </FormItem>
          </Col>
          <Col span="4"></Col>
          <Col span="8">
            <FormItem label="颜色：">
              <ColorPicker v-model="form.color" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <Modal
      title="删除"
      v-model="delModal"
      @on-ok="delok"
    >
      <p>您确认要删除该项(<span :style="'margin:0 5px;color:' + current.color">{{current.name}}</span>)？</p>
    </Modal>
  </div>
</template>
<script>
  import {categoryArticleAdd, categoryArticle, categoryArticleDel} from '@/config'
  import {mapMutations, mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    data () {
      return {
        modal: false,
        delModal: false,
        current: {
          color: '',
          name: ''
        },
        form: {
          name: '',
          en: '',
          sort: 0,
          color: '',
          icon: '',
          uId: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        articleCategory: 'articleCategory'
      })
    },
    created () {
      this.form.uId = JSON.parse(this.$cookie.get('userInfo')).uId
    },
    methods: {
      ...mapMutations({
        updateArticleCategory: 'updateArticleCategory'
      }),
      format (val) {
        return val
      },
      getList () {
        axios({
          url: categoryArticle,
          methods: 'get'
        }).then(res => {
          this.updateArticleCategory(res.data)
        })
      },
      submit () {
        console.log(this.form)
        axios({
          url: categoryArticleAdd,
          methods: 'get',
          params: this.form
        }).then(res => {
          console.log(res)
          this.$Message.success('添加成功！')
          this.getList()
          this.form = {
            name: '',
            en: '',
            sort: 0,
            color: '',
            icon: '',
            uId: ''
          }
        })
      },
      del (item) {
        this.current = item
        this.delModal = true
      },
      delok () {
        axios({
          url: categoryArticleDel + this.current.cId,
          methods: 'get'
        }).then(res => {
          this.$Message.success('删除成功！')
          this.getList()
        })
      }
    }
  }
</script>
<style>
.view .ivu-tabs-bar{
  background:#FAFAFA;
}
.category-content{
  margin:0 -10px;
}
.category-content .ivu-col{
  padding:10px;
}
.dot{
  display:inline-block;
  width:12px;
  height: 12px;
  border-radius:50%;
  vertical-align: middle;
  margin-right:10px;
}
.ivu-card-extra .ivu-icon{
  color:#999;
  cursor: pointer;
}
.ivu-card-extra .ivu-icon:hover{
  color:#2D8CF0;
}
</style>
