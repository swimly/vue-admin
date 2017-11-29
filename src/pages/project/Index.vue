<template>
  <div>
    <Row class="head-inner">
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem to="/home">首页</BreadcrumbItem>
          <BreadcrumbItem to="/project">项目管理</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="12" style="text-align:right;">
        <Button type="primary" class="v-m" @click="jump('/project/add')">新增项目</Button>
      </Col>
    </Row>
    <div class="panel">
      <div class="text">{{list}}</div>
      <Row v-if="list">
        <Col span="4" v-for="(item, index) in list" :key="index">
          <div class="project">
            <span class="img:s">
              <img :src="file + item.cover" alt="">
            </span>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import {projectServer, file} from '@/config'
  import axios from 'axios'
  export default {
    metaInfo: {
      title: '项目管理'
    },
    data () {
      return {
        list: null,
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
          url: projectServer,
          methods: 'get'
        }).then(res => {
          console.log(res)
          this.list = res.data.data
        })
      }
    }
  }
</script>
