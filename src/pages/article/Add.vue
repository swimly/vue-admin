<template>
  <div>
    <Row class="head-inner">
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem to="/home">首页</BreadcrumbItem>
          <BreadcrumbItem to="/article">文章管理</BreadcrumbItem>
          <BreadcrumbItem to="/article/add">写文章</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="12" style="text-align:right;">
        <span class="v-m text">编写方式：</span>
        <RadioGroup v-model="model" type="button">
          <Radio label="markdown"></Radio>
          <Radio label="富文本"></Radio>
        </RadioGroup>
        <Poptip trigger="hover" title="提示" content="如果您不懂markdown语法，请选择富文本，markdown适合编写代码展示较多的文章，请酌情选择！" placement="left" style="margin-left:10px;">
          <Icon type="help-circled" style="font-size:18px;vertical-align:middle;"></Icon>
        </Poptip>
        <span class="v-m text" style="margin-left:20px;">同步预览：</span>
        <i-switch v-model="preview">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
        <div class="btn-area">
          <Button type="warning">保存</Button>
          <Button type="primary" @click="publish">发表文章</Button>
        </div>
      </Col>
    </Row>
    <div class="panel">
      <Row>
        <Col :span="preview ? '16' : '24'">
          <Form :model="form">
            <FormItem label="标题：">
              <Input v-model="form.title" placeholder="请输入文章标题！" size="large" style="width:60%;"></Input>
            </FormItem>
            <FormItem label="类别：">
              <RadioGroup v-model="form.category" type="button">
                <Radio label="视觉设计"></Radio>
                <Radio label="平面设计"></Radio>
                <Radio label="动画视频"></Radio>
                <Radio label="前端"></Radio>
                <Radio label="团队活动"></Radio>
                <Radio label="招贤纳士"></Radio>
                <Radio label="其他"></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="标签：">
              <Tag type="dot" closable v-for="(item, index) in form.tags" :key="index" @on-close="delTag(index)">{{item}}</Tag>
              <Input v-model="tagValue" placeholder="请输入标签名称" style="width: 120px" v-if="taging" @keyup.enter.native="addTag" ref="saveTagInput" @on-blur="inputBlur"></Input>
              <Button type="ghost" v-if="!taging" @click="inputTag" icon="ios-plus-empty">添加标签</Button>
            </FormItem>
            <FormItem label="摘要：">
              <Input v-model="form.summary" placeholder="请输入摘要，不得超过120个字符！" size="large" type="textarea" :rows="4" style="width:70%;"></Input>
            </FormItem>
            <FormItem label="封面：">
              <Upload
                action="http://192.168.3.214/web/api/public/upload"
                name="upFile"
                :data="{type: 'a', file: this.file}"
                :on-remove="onRemove"
                :on-success="upSuccess"
              >
                <Button type="primary" icon="ios-cloud-upload-outline">选择封面</Button>
              </Upload>
            </FormItem>
            <Row>
              <Col style="width:400px;">
                <FormItem label="作者：">
                  <Input v-model="form.author" placeholder="请输入作者！" size="large" style="width:300px;"></Input>
                </FormItem>
              </Col>
              <Col style="width:150px;">
                <FormItem label="推荐：">
                  <i-switch v-model="result.recommend">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </FormItem>
              </Col>
              <Col style="width:150px;">
                <FormItem label="加精：">
                  <i-switch v-model="result.fine">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <editor-md v-if="model === 'markdown'"/>
              <editor-html v-if="model === '富文本'"/>
            </FormItem>
            <FormItem label="声明原创：">
              <i-switch v-model="result.original">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="原文链接：">
              <Input v-model="form.originallink" placeholder="请输入原文链接" style="width:800px;"></Input>
            </FormItem>
          </Form>
        </Col>
        <Col class="preview" :span="preview ? '8' : '0'" v-if="preview">
          <ButtonGroup>
            <Button :type="platform === 'phone' ? 'primary' : 'ghost'" icon="iphone" @click="platform = 'phone'"></Button>
            <Button :type="platform === 'pad' ? 'primary' : 'ghost'" icon="ipad" @click="platform = 'pad'"></Button>
            <Button :type="platform === 'mac' ? 'primary' : 'ghost'" icon="monitor" @click="platform = 'mac'"></Button>
          </ButtonGroup>
          <div class="container markdown-body" v-if="preview">
            <div class="phone" v-if="platform === 'phone'">
              <div v-html="article" style="width:100%;height:100%;overflow:auto;"></div>
            </div>
            <div class="pad" v-if="platform === 'pad'">
              <div v-html="article" style="width:100%;height:100%;overflow:auto;"></div>
            </div>
            <div class="mac" v-if="platform === 'mac'">
              <div v-html="article" style="width:100%;height:100%;overflow:auto;"></div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import EditorMd from '@/components/EditorMd'
import EditorHtml from '@/components/EditorHtml'
import {mapGetters} from 'vuex'
import {file, upfile, delfile, addArticle} from '@/config'
import axios from 'axios'
export default {
  metaInfo: {
    title: '写文章'
  },
  components: {
    EditorMd,
    EditorHtml
  },
  computed: {
    ...mapGetters({
      article: 'article'
    })
  },
  data () {
    return {
      model: 'markdown',
      preview: true,
      taging: false,
      tagValue: '',
      file: file,
      upfile: upfile,
      platform: 'phone',
      result: {
        recommend: false,
        fine: false,
        original: false
      },
      form: {
        title: '',
        summary: '',
        cover: '',
        author: '',
        description: '',
        recommend: true,
        tags: [],
        fine: true,
        category: '前端',
        original: false,
        originallink: ''
      }
    }
  },
  methods: {
    inputTag () {
      if (this.form.tags.length >= 5) {
        this.$Message.error('最多只能添加5个标签，请适当删除再行添加！')
      } else {
        this.taging = !this.taging
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      }
    },
    addTag () {
      const exist = this.form.tags.indexOf(this.tagValue.replace(/\s+/g, '')) < 0
      if (this.tagValue.replace(/\s+/g, '').length === 0) {
        this.$Message.error('不能添加空标签！')
      } else if (this.tagValue.replace(/\s+/g, '').length > 6) {
        this.$Message.error('每个标签不能超过6个文字！')
      } else {
        if (exist) {
          this.form.tags.push(this.tagValue.replace(/\s+/g, ''))
          this.tagValue = ''
          this.taging = false
        } else {
          this.$Message.error('不能添加重复的标签！')
        }
      }
    },
    delTag (index) {
      this.form.tags.splice(index, 1)
    },
    inputBlur () {
      if (this.tagValue.replace(/\s+/g, '')) {
        if (this.tagValue.length > 6) {
          this.$Message.error('每个标签不能超过6个文字！')
        } else {
          this.form.tags.push(this.tagValue.replace(/\s+/g, ''))
          this.taging = false
          this.tagValue = ''
        }
      } else {
        this.taging = false
        this.tagValue = ''
      }
    },
    upSuccess (res, file, fileList) {
      this.form.cover = res.data
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
    publish () {
      let tag = ''
      for (var i in this.result) {
        if (typeof this.result[i] === 'boolean') {
          if (this.result[i]) {
            this.form[i] = 1
          } else {
            this.form[i] = 0
          }
        }
      }
      this.form.tags.forEach((item, index) => {
        tag += item + ','
      })
      this.form.tags = tag
      // axios({
      //   url: addArticle,
      //   methods: 'get',
      //   params: this.form
      // }).then(res => {
      //   console.log(res)
      // })
      var formdata = new FormData()
      for (var j in this.form) {
        formdata.append(j, this.form[j])
      }
      axios({
        url: addArticle,
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.data) {
          this.$Message.success('文章发布成功！')
          this.$router.replace('/article')
        }
      })
    },
    watchContent (v, o) {
      this.form.description = v
    }
  },
  created () {
  },
  destroyed () {
  },
  watch: {
    'article': 'watchContent'
  }
}
</script>
<style>
.btn-area{
  display:inline-block;
  vertical-align: middle;
  margin-left:30px;
}
.btn-area button{
  margin-left:10px;
}
.ivu-form-item{
  margin-bottom:20px;
}
.preview{
  font-size:14px;
  vertical-align: top;
  padding:22px 20px;
  text-align:center;
}
.container{
  position: fixed;
  right:100px;
  top:50%;
  margin-top:-333px;
}
.phone{
  display:inline-block;
  text-align:left;
  width:414px;
  height:736px;
  border-radius:5px;
  padding:90px 40px 90px 50px;
}
.pad{
  display:inline-block;
  text-align:left;
  width:480px;
  height:646px;
  padding:40px 30px;
}
.mac{
  display:inline-block;
  text-align:left;
  width:480px;
  height:396px;
  padding:20px 22px 115px 22px;
}
.container img{
  max-width:100%;
}
</style>
