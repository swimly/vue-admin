<template>
  <div class="head-info">
    <Row>
      <Col span="12">欢迎<span class="important">{{userInfo.name || userInfo.email || userInfo.phone}}</span>登录本系统</Col>
      <Col span="12"></Col>
    </Row>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    }
  }
</script>
<style>
.head-info{
  background:#f5f5f5;
  margin:-33px 0 0 0;
  padding:6px 10px;
}
.head-info .ivu-col{
  font-size:14px;
}
.important{
  color:#f00;
  margin:0 1em;
}
</style>

