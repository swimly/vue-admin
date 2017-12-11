<template>
  <div>
    <Row class="head-inner">
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem to="/home">首页</BreadcrumbItem>
          <BreadcrumbItem to="/article">文章管理</BreadcrumbItem>
          <BreadcrumbItem :to="'/articles/' + info.aId">{{info.title}}</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="12" style="text-align:right;">
        <Button type="primary" class="v-m" @click="download(info.aId)">下载文件</Button>
        <Button type="primary" class="v-m" @click="jump('/article/add')" style="margin-left:10px;">写文章</Button>
      </Col>
    </Row>
    <div class="panel">
      <div class="markdown-body" v-html="info.description" v-if="info.description"></div>
    </div>
  </div>
</template>
<script>
  import {articleInfo, file, articledownload} from '@/config'
  import axios from 'axios'
  export default {
    metaInfo: {
      title: '文章管理'
    },
    data () {
      return {
        info: {
          title: '文章管理'
        },
        file: file
      }
    },
    created () {
      this.getInfo()
    },
    methods: {
      jump (url) {
        this.$router.push(url)
      },
      getInfo () {
        axios({
          url: articleInfo + this.$route.params.id,
          methods: 'get'
        }).then(res => {
          console.log(res)
          this.info = res.data
        })
      },
      download (id) {
        window.location.href = articledownload + id
      }
    }
  }
</script>
<style>
@import '~simplemde-theme-base/dist/simplemde-theme-base.min.css';
@import '~highlight.js/styles/atom-one-light.css';
@import '~github-markdown-css';
.article-list h2{font-size:16px;}
.article-list .summary{font-size:14px;}
.panel{font-size:14px;}
</style>
