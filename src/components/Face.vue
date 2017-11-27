<template>
  <div class="user">
    <div class="faces">
      <img :src="file + userInfo.face" alt="" v-if="userInfo.face">
      <img :src="'static/default.png'" alt="" v-if="!userInfo.face">
    </div>
    <h2 class="name">{{userInfo.username || userInfo.name}}</h2>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {file} from '@/config'
  export default {
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    data () {
      return {
        file: file
      }
    }
  }
</script>
<style>
.faces img{
  width:100%;
  height:100%;
  border-radius:50%;
  border:1px solid rgba(255,255,255,0.6);
}
.faces{
  width:80px;
  height:80px;
  margin:10px auto;
}
.user{
  margin:0 10px;
  padding-bottom:10px;
  margin-bottom:10px;
  border-bottom:1px solid rgba(255,255,255,0.1);
}
.user .name{
  font-size:16px;
  color:#fff;
  text-align:center;
  font-weight:normal;
}
</style>
