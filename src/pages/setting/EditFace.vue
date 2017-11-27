<template>
  <div class='crop'>
    <Row>
      <Col span='24'>
        <img class='face v-m' :src='file + userInfo.face' alt='' v-if="userInfo.face">
        <img class='face v-m' src='static/default.png' alt='' v-if="!userInfo.face">
        <Button type='ghost' class='v-m' @click='modal = true'>设置头像</Button>
      </Col>
    </Row>
    <p class='tip'>请选择一张个人正面照片作为头像，让其他成员更容易认识你。</p>
    <Modal
      v-model='modal'
      title='设置头像'
      @on-ok='submit'
    >
      <Row>
        <Col span='12'>
          <croppa
            v-model='croppa'
            placeholder="请选择一张图片"
            :placeholder-font-size="14"
          />
        </Col>
        <Col span='12'>
        </Col>
      </Row>
      <div class='btns' style='margin-top:20px;'>
        <Tooltip content='上移' placement='top'>
          <button @click='croppa.moveUpwards(10)' class='iconfont icon-top'></button>
        </Tooltip>
        <Tooltip content='下移' placement='top'>
          <button @click='croppa.moveDownwards(10)' class='iconfont icon-down'></button>
        </Tooltip>
        <Tooltip content='左移' placement='top'>
          <button @click='croppa.moveLeftwards(10)' class='iconfont icon-left'></button>
        </Tooltip>
        <Tooltip content='右移' placement='top'>
          <button @click='croppa.moveRightwards(10)' class='iconfont icon-right'></button>
        </Tooltip>
        <Tooltip content='放大' placement='top'>
          <button @click='croppa.zoomIn()' class='iconfont icon-zoomin'></button>
        </Tooltip>
        <Tooltip content='缩小' placement='top'>
          <button @click='croppa.zoomOut()' class='iconfont icon-zoomout'></button>
        </Tooltip>
        <Tooltip content='顺时针旋转' placement='top'>
          <button @click='croppa.rotate()' class='iconfont icon-rotateright'></button>
        </Tooltip>
        <Tooltip content='逆时针旋转' placement='top'>
          <button @click='croppa.rotate(2)' class='iconfont icon-rotateleft'></button>
        </Tooltip>
        <Tooltip content='翻转' placement='top'>
          <button @click='croppa.rotate(-1)' class='iconfont icon-rotate'></button>
        </Tooltip>
        <Tooltip content='水平翻转' placement='top'>
          <button @click='croppa.flipX()' class='iconfont icon-horizontal'></button>
        </Tooltip>
        <Tooltip content='垂直翻转' placement='top'>
          <button @click='croppa.flipY()' class='iconfont icon-vertical'></button>
        </Tooltip>
        <!-- <button @click='dataUrl = croppa.generateDataUrl()' class='iconfont icon-crop'></button>
        <button @click='dataUrl = croppa.generateDataUrl('image/jpeg')' class='iconfont icon-crop'></button> -->
        <!-- <Tooltip content='裁剪' placement='top'>
          <button @click='crop' class='iconfont icon-crop'></button>
        </Tooltip> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import {base64, editUser, file} from '@/config'
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      dataUrl: null,
      croppa: null,
      modal: false,
      file: file
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      editFaceModal: 'editFaceModal'
    })
  },
  created () {
    console.log(this.userInfo)
  },
  methods: {
    ...mapMutations({
      updateUserInfo: 'updateUserInfo'
    }),
    crop () {
      this.dataUrl = this.croppa.generateDataUrl('image/jpeg', 0.8)
      this.updateUserInfo({
        face: this.dataUrl
      })
      this.$Message.success('裁剪成功，请点击确认保存！')
      // console.log(this.dataUrl)
    },
    submit () {
      this.dataUrl = this.croppa.generateDataUrl('image/jpeg', 0.8)
      this.updateUserInfo({
        face: this.dataUrl
      })
      // var blob = this.dataURItoBlob(this.dataUrl)
      var formdata = new FormData()
      formdata.append('upFile', this.dataUrl)
      console.log(formdata)
      axios({
        url: base64,
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        axios({
          url: editUser + this.userInfo.uId,
          method: 'get',
          params: {
            'face': res.data
          }
        }).then(res => {
          this.$Message.success('头像修改成功！')
          this.updateUserInfo(res.data)
          this.$cookie.set('userInfo', JSON.stringify(res.data))
          this.modal = false
        })
      })
    },
    dataURItoBlob (base64Data) {
      var byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1])
      } else {
        byteString = unescape(base64Data.split(',')[1])
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
        var ia = new Uint8Array(byteString.length)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ia], {type: mimeString})
      }
    },
    ...mapMutations({
      updateUserInfo: 'updateUserInfo'
    })
  }
}
</script>
<style>
.crop {
  padding: 10px;
  box-sizing: border-box;
  display: inline-block;
}
.btns button {
  border: none;
  background: none;
  font-size: 18px;
  color: #666;
  display: inline-block;
  width: 24px;
  text-align: center;
  height: 24px;
  line-height: 24px;
}
.btns button:hover {
  background: #eee;
}
.face {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}
.face.large {
  width: 100px;
  height: 100px;
}
</style>
