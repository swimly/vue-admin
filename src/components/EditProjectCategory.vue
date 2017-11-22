<template>
  <div>
    <h2 class="sub-title">项目</h2>
    <Tabs type="card">
      <TabPane v-for="tab in tabs" :key="tab" :label="'标签' + tab">标签{{ tab }}</TabPane>
      <Button type="ghost" shape="circle" slot="extra" icon="plus">添加</Button>
    </Tabs>
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
