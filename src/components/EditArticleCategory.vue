<template>
  <div>
    <h2 class="sub-title">文章</h2>
    <p class='tip'>文章分类，根据文章的性质或者读者群体不同进行划分，更有利于文章的定向发布！</p>
    <div class="category-content">
      <Tag type="dot" closable>普通用户</Tag>
      <Tag type="dot" closable>会员</Tag>
      <Tag type="dot" closable>终身会员</Tag>
      <Tag type="dot" closable>管理员</Tag>
      <Tag type="dot" closable>超级管理员</Tag>
      <Input placeholder="分类名称" style="width: 120px;margin-right:5px;"></Input>
      <Button type="ghost" icon="plus">新增分类</Button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tabs: 2
      }
    },
    methods: {
      handleTabsAdd () {
        this.tabs ++
      }
    }
  }
</script>
<style>
.view .ivu-tabs-bar{
  background:#FAFAFA;
}
</style>
