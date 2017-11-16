<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem to="/user">用户管理</BreadcrumbItem>
    </Breadcrumb>
    首页
    <router-link to="/login">登录</router-link>
  </div>
</template>
<script>
  export default {
    metaInfo: {
      title: '首页'
    }
  }
</script>
