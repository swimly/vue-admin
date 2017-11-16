<template>
  <div class="editor">
    <markdown-editor
      v-model="content"
      ref="markdownEditor"
      :highlight="true"
      :configs="configs"
      preview-class="markdown-body"
    />
  </div>
</template>
<script>
  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import hljs from 'highlight.js'
  import {mapMutations} from 'vuex'
  window.hljs = hljs
  export default {
    components: {
      markdownEditor
    },
    computed: {
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      }
    },
    data () {
      return {
        content: '',
        configs: {
          placeholder: 'show time',
          status: false,
          toolbar: ['bold', 'italic', 'strikethrough', '|', 'heading', 'heading-1', 'heading-2', 'heading-3', 'heading-smaller', 'heading-bigger', '|', 'code', 'quote', '|', 'unordered-list', 'ordered-list', '|', 'link', 'image', 'table', 'horizontal-rule', 'clean-block', 'guide', 'preview', 'side-by-side', 'fullscreen']
        }
      }
    },
    watch: {
      'content': 'setValue'
    },
    methods: {
      setValue (v) {
        this.updateArticle(this.simplemde.markdown(v))
      },
      ...mapMutations({
        updateArticle: 'updateArticle'
      })
    }
  }
</script>
<style>
  @import '~simplemde-theme-base/dist/simplemde-theme-base.min.css';
  @import '~highlight.js/styles/atom-one-light.css';
  @import '~github-markdown-css';
  .CodeMirror-scroll{
    min-height:418px;
  }
</style>
