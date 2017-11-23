<template>
  <div>
    <Row style="margin-top:20px;">
      <Col span="12">
        <h2 class="title">项目组及项目分类 <span class="count">({{groupCategory.length}})</span></h2>
      </Col>
      <Col span="12" style="text-align:right;">
        <Button type="ghost" shape="circle" icon="plus" @click="modal = true"></Button>
      </Col>
    </Row>
    <p class='tip'>项目分类分为两层，第一层是组别，点击右侧的添加按钮进行添加，第二层才是项目分类，不同的组别拥有不同的分类，点击每个组别内部的添加分类按钮进行添加！</p>
    <Row style="margin:0 -10px;">
      <Col span="6" v-for="(item, index) in groupCategory" :key="index" style="padding:10px;">
        <Card class="move-box">
          <Button type="text" icon="close" slot="extra" @click="del(item)"></Button>
          <span class="icon"></span>
          <h2 class="name" :style="'color:' + item.color">{{item.name}} <span class="count" v-if="item.children">({{item.children.length}})</span><span class="count" v-if="!item.children">(0)</span></h2>
          <div class="son">
            <Tag type="dot" class="none" closable v-for="(item, index) in item.children" :key="index" @on-close="delSon(item)">
              <span class="circle" :style="'background:' + item.color"></span>
              <span>{{item.name}}</span>
            </Tag>
            <Button type="ghost" @click="addSon(item)" icon="ios-plus-empty">添加分类</Button>
          </div>
        </Card>
      </Col>
    </Row>
    <!-- <Tabs type="card" style="margin-top:10px;" closable>
      <TabPane v-for="(item, index) in groupCategory" :key="index" :label="item.name">标签</TabPane>
      <Button type="ghost" shape="circle" slot="extra" icon="plus">添加</Button>
    </Tabs> -->
    <Modal
      title="添加组别"
      @on-ok="submit"
      v-model="modal">
      <Form :model="form" :label-width="75">
        <Row>
          <Col span="12">
            <FormItem label="项目组：">
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
          <Slider v-model="form.sort" :min="0" :max="10"></Slider>
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
      title="添加组别分类"
      @on-ok="addSonOk"
      v-model="addSonModal">
      <Form :model="form" :label-width="75">
        <Row>
          <Col span="12">
            <FormItem label="项目组：">
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
          <Slider v-model="form.sort" :min="0" :max="10"></Slider>
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
      <p>您确认要删除该项(<span :style="'margin:0 5px;color:' + current.color">{{current.name}}</span>)，一旦删除将会同时删除所有二级分类，且该操作不可逆，您确认还要删除吗？</p>
    </Modal>
    <Modal
      title="删除"
      v-model="delSonModal"
      @on-ok="delok"
    >
      <p>您确认要删除该项(<span :style="'margin:0 5px;color:' + current.color">{{current.name}}</span>),该操作不可逆，您确认还要删除吗？</p>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import {categoryGroupAdd, categoryGroup, categoryGroupDel} from '@/config'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        modal: false,
        delModal: false,
        addSonModal: false,
        delSonModal: false,
        current: {},
        form: {
          name: '',
          en: '',
          sort: 0,
          color: '',
          icon: '',
          uId: '',
          pId: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        groupCategory: 'groupCategory'
      })
    },
    created () {
      this.form.uId = JSON.parse(this.$cookie.get('userInfo')).uId
    },
    methods: {
      getList () {
        axios({
          url: categoryGroup,
          methods: 'get'
        }).then(res => {
          console.log(res)
          this.updateGroupCategory(res.data)
        })
      },
      submit () {
        axios({
          url: categoryGroupAdd,
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
            uId: '',
            pId: ''
          }
        })
      },
      del (item) {
        this.current = item
        this.delModal = true
      },
      delSon (item) {
        this.current = item
        this.delSonModal = true
      },
      delok () {
        axios({
          url: categoryGroupDel + this.current.gId,
          methods: 'get'
        }).then(res => {
          this.$Message.success('删除成功！')
          this.getList()
        })
      },
      addSon (item) {
        this.addSonModal = true
        this.form.pId = item.gId
      },
      addSonOk () {
        this.submit()
      },
      ...mapMutations({
        updateGroupCategory: 'updateGroupCategory'
      })
    }
  }
</script>
<style>
.view .ivu-tabs-bar{
  background:#FAFAFA;
}
.move-box .name{
  font-size:20px;
  font-weight:normal;
}
.move-box .son{
  margin-top:20px;
  min-height:100px;
}
</style>
