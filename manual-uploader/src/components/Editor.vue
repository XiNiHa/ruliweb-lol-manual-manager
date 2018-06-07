<template>
  <div class="editor-wrapper">
    <div id="editor">Loading...</div>
    <div class="buttons">
      <button class="btn btn-secondary" @click="$emit('add', '챔피언')">챔피언</button>
      <button class="btn btn-secondary" @click="$emit('add', '스킬')">스킬</button>
      <button class="btn btn-secondary" @click="$emit('add', '스펠')">스펠</button>
      <button class="btn btn-secondary" @click="$emit('add', '아이템')">아이템</button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      editor: undefined
    }
  },
  mounted () {
    // eslint-disable-next-line
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode('ace/mode/html')
    this.editor.on('change', this.updateSource)
    this.updateSource()
    Axios.get('https://anesin1109.github.io/ruliweb-lol-manual-template/index.html').then(res => this.editor.setValue(res.data))
  },
  methods: {
    updateSource () {
      this.$emit('change', this.editor.getValue())
    },
    addIcon (img) {
      this.editor.insert(`<img src="${img}" class='manual_icon'`)
    }
  }
}
</script>

<style scoped>
.editor-wrapper {
  width: 50%;
  height: 600px;
}
#editor {
  width:100%;
  height: 550px;
}
.buttons {
  text-align: center;
}
</style>
