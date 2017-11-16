<template>
  <div class="editor">
    <quill-editor v-model="content"
      ref="myQuillEditor"
      @change="setValue($event)"
      :options="editorOption">
    </quill-editor>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import {mapMutations} from 'vuex'
  export default {
    components: {
      quillEditor
    },
    data () {
      return {
        content: '',
        editorOption: {
          placeholder: 'show time',
          theme: 'snow',
          imageImport: true,
          imageResize: {
            displaySize: true
          }
        }
      }
    },
    methods: {
      setValue ({editor, html, text}) {
        this.updateArticle(html)
      },
      ...mapMutations({
        updateArticle: 'updateArticle'
      })
    }
  }
</script>
<style>
.quill-editor{
  height: 500px;
  padding-top:50px;
  box-sizing: border-box;
}
.quill-editor .ql-toolbar{
  margin-top:-50px;
}
</style>
