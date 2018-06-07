<template>
  <div id="preview"/>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  mounted () {
    document.getElementById('preview').innerHTML = this.source
  },
  watch: {
    source (newVal) {
      document.getElementById('preview').innerHTML = newVal
    }
  }
}
</script>

<style scoped>
#preview {
  width: 50%;
  height: 600px;
  overflow: scroll;
}
</style>
