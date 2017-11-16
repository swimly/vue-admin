<template>
  <div class="view">
    <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem to="/setting">综合设置</BreadcrumbItem>
    </Breadcrumb>
    <!-- <h1 class="title">账户设置</h1> -->
    <Tabs value="name1">
      <TabPane label="基本信息" name="name1">
        <h2 class="sub-title">头像</h2>
        <edit-face/>
        <h2 class="sub-title">基本信息</h2>
        <edit-info style="width:50%;margin-top:20px;"/>
      </TabPane>
      <TabPane label="个性化设置" name="name2">
      </TabPane>
      <TabPane label="账户安全" name="name3">标签三的内容</TabPane>
      <TabPane label="消息设置" name="name4">标签三的内容</TabPane>
      <TabPane label="应用管理" name="name5">标签三的内容</TabPane>
    </Tabs>
  </div>
</template>
<script>
  import EditFace from '@/components/EditFace'
  import EditInfo from '@/components/EditInfo'
  export default {
    metaInfo: {
      title: '综合设置'
    },
    components: {
      'edit-face': EditFace,
      'edit-info': EditInfo
    },
    computed: {
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
</style>

