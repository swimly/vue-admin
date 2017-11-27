<template>
  <div>
    <Row class="head-inner">
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem to="/home">首页</BreadcrumbItem>
          <BreadcrumbItem to="/article">文章管理</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="12" style="text-align:right;">
        <Button type="primary" class="v-m" @click="jump('/article/add')">写文章</Button>
      </Col>
    </Row>
    <div class="panel">
      <ul class="article-list">
        <li v-for="(item, index) in list" :key="index">
          <h2><router-link :to="'/article/detail/' + item.aId">{{item.title}}</router-link></h2>
          <img :src="file + item.cover" alt="">
          <p class="summary">{{item.summary}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {articleServer, file} from '@/config'
  import axios from 'axios'
  export default {
    metaInfo: {
      title: '文章管理'
    },
    data () {
      return {
        list: [],
        file: file
      }
    },
    created () {
      this.getList()
    },
    methods: {
      jump (url) {
        this.$router.push(url)
      },
      getList () {
        axios({
          url: articleServer,
          methods: 'get'
        }).then(res => {
          console.log(res)
          this.list = res.data.data
        }).catch(err => {
          this.$Notice.error({
            title: '连接服务器出错！',
            desc: '服务器未开启或者服务器崩溃，请联系管理员进行修复！'
          })
          console.log(err)
        })
      }
    }
  }
</script>
<style>
.article-list h2{font-size:16px;}
.article-list .summary{font-size:14px;}
</style>
