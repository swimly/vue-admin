<template>
  <div>
    <Row class="head-inner">
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem to="/home">首页</BreadcrumbItem>
          <BreadcrumbItem to="/project">项目管理</BreadcrumbItem>
          <BreadcrumbItem to="/project/add">新增项目</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="12" style="text-align:right;">
        <span class="v-m text">编写方式：</span>
        <RadioGroup v-model="form.mode" type="button">
          <Radio label="markdown"></Radio>
          <Radio label="富文本"></Radio>
        </RadioGroup>
        <Poptip trigger="hover" title="提示" content="如果您不懂markdown语法，请选择富文本，markdown适合编写代码展示较多的文章，请酌情选择！" placement="left" style="margin-left:10px;">
          <Icon type="help-circled" style="font-size:18px;vertical-align:middle;"></Icon>
        </Poptip>
        <Button type="primary" shape="circle" style="margin-left:20px;" @click="submit">发布</Button>
      </Col>
    </Row>
    <div class="panel">
      <Form :model="form" :label-width="80">
        <FormItem label="名称">
          <Input v-model="form.name" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="组别：">
          <RadioGroup v-model="form.group" type="button" @on-change="searchSon">
            <Radio :label="item.name" v-for="(item, index) in groupCategory" :key="index"></Radio>
          </RadioGroup>
          <Tooltip content="前往设置项目组" style="margin-left:20px;" placement="right">
            <router-link to="/setting/category">设置</router-link>
          </Tooltip>
        </FormItem>
        <FormItem label="类别：" v-if="category">
          <RadioGroup v-model="form.category" type="button">
            <Radio :label="item.name" v-for="(item, index) in category" :key="index"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="标签：">
          <Tag type="dot" closable v-for="(item, index) in form.tag" :key="index" @on-close="delTag(index)">{{item}}</Tag>
          <Input v-model="tagValue" placeholder="请输入标签名称" style="width: 120px" v-if="taging" @keyup.enter.native="addTag" ref="saveTagInput" @on-blur="inputBlur"></Input>
          <Button type="ghost" v-if="!taging" @click="inputTag" icon="ios-plus-empty">添加标签</Button>
        </FormItem>
        <FormItem label="封面：">
          <Upload
            :action="upfile"
            name="upFile"
            :data="{type: 'cover', file: this.file}"
            :on-remove="onRemove"
            :on-success="upSuccess"
            :on-error="uperror"
          >
            <Button type="primary" icon="ios-cloud-upload-outline">选择封面</Button>
          </Upload>
        </FormItem>
        <FormItem label="内容：">
          <editor-md v-if="form.mode === 'markdown'"/>
          <editor-html v-if="form.mode === '富文本'"/>
        </FormItem>
        <FormItem label="附件：">
          <Upload
            :action="upfile"
            name="upFile"
            type="drag"
            :data="{type: 'file', file: this.file}"
            :on-remove="onRemove"
            :on-success="upSuccess"
            :on-error="uperror"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖拽文件到此进行上传！</p>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="项目预览：">
          <Input v-model="form.preview" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import {file, upfile, delfile, addProject} from '@/config'
  import EditorMd from '@/components/EditorMd'
  import EditorHtml from '@/components/EditorHtml'
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    metaInfo: {
      title: '新增项目'
    },
    components: {
      EditorMd,
      EditorHtml
    },
    computed: {
      ...mapGetters({
        groupCategory: 'groupCategory',
        article: 'article'
      })
    },
    data () {
      return {
        tagValue: '',
        taging: false,
        file: file,
        upfile: upfile,
        category: undefined,
        form: {
          name: '',
          group: '',
          mode: '富文本',
          category: 'app设计',
          tag: [],
          cover: '',
          content: '',
          file: '',
          preview: '',
          author: '',
          uId: ''
        }
      }
    },
    methods: {
      inputTag () {
        if (this.form.tag.length >= 5) {
          this.$Message.error('最多只能添加5个标签，请适当删除再行添加！')
        } else {
          this.taging = !this.taging
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus()
          })
        }
      },
      addTag () {
        const exist = this.form.tag.indexOf(this.tagValue.replace(/\s+/g, '')) < 0
        if (this.tagValue.replace(/\s+/g, '').length === 0) {
          this.$Message.error('不能添加空标签！')
        } else if (this.tagValue.replace(/\s+/g, '').length > 6) {
          this.$Message.error('每个标签不能超过6个文字！')
        } else {
          if (exist) {
            this.form.tag.push(this.tagValue.replace(/\s+/g, ''))
            this.tagValue = ''
            this.taging = false
          } else {
            this.$Message.error('不能添加重复的标签！')
          }
        }
      },
      delTag (index) {
        this.form.tag.splice(index, 1)
      },
      inputBlur () {
        if (this.tagValue.replace(/\s+/g, '')) {
          if (this.tagValue.length > 6) {
            this.$Message.error('每个标签不能超过6个文字！')
          } else {
            this.form.tag.push(this.tagValue.replace(/\s+/g, ''))
            this.taging = false
            this.tagValue = ''
          }
        } else {
          this.taging = false
          this.tagValue = ''
        }
      },
      upSuccess (res, file, fileList) {
        this.form[res.request.type] = res.data
      },
      onRemove (file, fileList) {
        axios.get(delfile + file.response.data).then(res => {
          if (res.data.status) {
            this.$Message.success(res.data.msg)
          } else {
            this.$Message.error(res.data.msg)
          }
        })
      },
      uperror (error, file, fileList) {
        console.log(error)
        this.$Notice.error({
          title: '文件上传失败！',
          desc: '由于服务器连接失败，请联系网站管理员！ '
        })
      },
      searchSon (name) {
        console.log(name)
        this.groupCategory.map((item, index) => {
          if (item.name === name) {
            this.category = item.children
            console.log(this.category)
          }
        })
      },
      submit () {
        this.form.uId = JSON.parse(this.$cookie.get('userInfo')).uId
        let tag = ''
        this.form.tag.forEach((item, index) => {
          tag += item + ','
        })
        this.form.tag = tag
        var formdata = new FormData()
        for (var j in this.form) {
          formdata.append(j, this.form[j])
        }
        axios({
          url: addProject,
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data) {
            this.$Message.success('项目添加成功')
            this.$router.replace('/project')
          }
        })
      },
      watchContent (v, o) {
        this.form.content = v
        console.log(v)
      }
    },
    watch: {
      'article': 'watchContent'
    }
  }
</script>
