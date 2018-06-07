<template>
  <div id="app">
    <div id="container">
      <editor @change="updateSource" @add="openAdder" ref="editor"/>
      <router-view :source="source" :addTarget="addTarget" @add-icon="addIcon"/>
    </div>
    <div id="form">
      <select v-model="champ" class="form-control">
        <option v-for="(c, key, i) in $store.state.champs" :key="i" :value="c.key">{{ c.name }}</option>
      </select>
      <input v-model="name" class="form-control" type="text" placeholder="공략 이름">
      <input v-model="id" class="form-control" type="text" placeholder="공략이 이미 존재할 경우 ID">
      <button class="btn btn-primary" @click="uploadSource">업로드</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import Axios from 'axios'
import Config from './config'

export default {
  name: 'App',
  components: {
    Editor, Preview
  },
  data () {
    return {
      champ: '',
      name: '',
      season: Number.parseInt(Config.version.charAt(0)),
      source: '',
      id: '',
      addTarget: '챔피언'
    }
  },
  mounted () {
    Axios.get(`https://ddragon.leagueoflegends.com/cdn/${Config.version}/data/ko_KR/champion.json`).then(res => {
      this.$store.state.champs = res.data.data
    })
  },
  methods: {
    updateSource (source) {
      this.source = source
    },
    uploadSource () {
      if (this.id !== '') {
        firebase.firestore().collection('manuals').doc(this.id).set({
          champ: this.champ,
          name: this.name,
          season: this.season,
          value: this.source
        })
      } else {
        firebase.firestore().collection('manuals').add({
          champ: this.champ,
          name: this.name,
          season: this.season,
          value: this.source
        }).then(docRef => alert(`업로드가 완료되었습니다. ID는 '${docRef.id}'입니다. 복사해서 보관하세요.`)).catch(() => alert('업로드에 실패했습니다.'))
      }
    },
    openAdder (target) {
      this.addTarget = target
      this.$router.push('/add')
    },
    addIcon (img) {
      this.$refs.editor.addIcon(img)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');

#app {
  font-family: -apple-system,BlinkMacSystemFont,"Noto Sans KR", "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol" !important;
}
#container {
  width: 100%;
  display: flex;
}
#form {
  display: flex;
}
</style>
