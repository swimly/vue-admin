<template>
  <div class="user">
    <img :src="userInfo.face" alt="">
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
.user img{
  width:100%;
  height:100%;
  border-radius:50%;
}
.user{
  width:80px;
  height:80px;
  margin:10px auto;
}
</style>
