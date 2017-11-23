<template>
  <div class="view" style="padding-top:40px;">
    <Row class="head-inner" style="height:40px !important;margin-top:-40px;">
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem to="/home">首页</BreadcrumbItem>
          <BreadcrumbItem to="/setting">综合设置</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="12" style="text-align:right;">
      </Col>
    </Row>
    <!-- <h1 class="title">账户设置</h1> -->
    <div class="panel" style="padding:0;padding-left:10px;">
      <Tabs :value="current" @on-click="changeTab" class="full-tab">
        <TabPane label="基本信息" name="info">
          <h2 class="sub-title">头像</h2>
          <edit-face/>
          <h2 class="sub-title">基本信息</h2>
          <edit-info style="width:50%;margin-top:20px;"/>
        </TabPane>
        <TabPane label="分类设置" name="category">
          <edit-user-category/>
          <edit-article-category/>
          <edit-project-category/>
        </TabPane>
        <TabPane label="账户安全" name="name3">标签三的内容</TabPane>
        <TabPane label="消息设置" name="name4">标签三的内容</TabPane>
        <TabPane label="应用管理" name="name5">标签三的内容</TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import EditFace from '@/components/EditFace'
  import EditInfo from '@/components/EditInfo'
  import EditUserCategory from '@/components/EditUserCategory'
  import editArticleCategory from '@/components/editArticleCategory'
  import EditProjectCategory from '@/components/EditProjectCategory'
  export default {
    metaInfo: {
      title: '综合设置'
    },
    components: {
      EditFace,
      EditInfo,
      EditUserCategory,
      EditProjectCategory,
      editArticleCategory
    },
    computed: {
    },
    data () {
      return {
        current: ''
      }
    },
    created () {
      this.current = this.$route.params.category
    },
    methods: {
      changeTab (name) {
        this.$router.replace('/setting/' + name)
      }
    }
  }
</script>
<style>
.view .ivu-tabs-bar{
  background:#EFEFEF;
  border:none;
  margin:0;
}
.view .ivu-tabs-nav .ivu-tabs-tab {
  padding:12px 20px;
}
.view .ivu-tabs .ivu-tabs-tabpane{
  padding:10px;
}
.full-tab{
  height:100%;
  padding-top:44px;
}
.full-tab .ivu-tabs-bar{
  margin-top:-44px;
}
.full-tab .ivu-tabs-content{
  height:100%;
}
.full-tab .ivu-tabs-tabpane{
  height:100%;
  overflow:auto;
}
</style>

