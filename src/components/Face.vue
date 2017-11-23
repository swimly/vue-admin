<template>
  <div class="user">
    <img :src="file + userInfo.face" alt="" v-if="userInfo.face">
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
