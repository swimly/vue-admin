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
  </div>
</template>
<script>
  export default {
    metaInfo: {
      title: '文章管理'
    },
    methods: {
      jump (url) {
        this.$router.push(url)
      }
    }
  }
</script>
