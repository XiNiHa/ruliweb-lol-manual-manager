<template>
  <div id="adder">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <h1>{{ addTarget }} 아이콘 추가</h1>
    <select v-if="addTarget === '스킬'" v-model="champ" class="form-control">
      <option v-for="(c, key, i) in $store.state.champs" :key="i" :value="key">{{ c.name }}</option>
    </select>
    <div class="icons">
      <img v-for="(img, i) in imgs" :key="i" :src="img" class="icon" @click="$emit('add-icon', img)">
    </div>
    <button class="btn btn-primary" @click="$router.push('/')">완료</button>
  </div>
</template>

<script>
import Config from '../config'
import Axios from 'axios'

export default {
  props: {
    addTarget: {
      type: String,
      default: '챔피언'
    }
  },
  data () {
    return {
      imageURLs: {
        챔피언: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/img/champion/`,
        스킬: {
          passive: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/img/passive/`,
          active: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/img/spell/`
        },
        스펠: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/img/spell/`,
        아이템: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/img/item/`
      },
      dataURLs: {
        챔피언: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/data/ko_KR/champion.json`,
        스킬: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/data/ko_KR/champion/<name>.json`,
        스펠: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/data/ko_KR/summoner.json`,
        아이템: `https://ddragon.leagueoflegends.com/cdn/${Config.version}/data/ko_KR/item.json`
      },
      imgs: [],
      champ: ''
    }
  },
  mounted () {
    if (this.addTarget !== '스킬') {
      this.updateIcons()
    }
  },
  watch: {
    champ () {
      Axios.get(this.dataURLs.스킬.replace(/<name>/, this.champ)).then(res => {
        this.imgs.push(this.imageURLs[this.addTarget].passive + res.data.data[this.champ].passive.image.full)
        for (let spell of res.data.data[this.champ].spells) {
          this.imgs.push(this.imageURLs[this.addTarget].active + spell.image.full)
        }
      })
    },
    addTarget () {
      this.updateIcons()
    }
  },
  methods: {
    updateIcons () {
      Axios.get(this.dataURLs[this.addTarget]).then(res => {
        for (let item in res.data.data) {
          this.imgs.push(this.imageURLs[this.addTarget] + res.data.data[item].image.full)
        }
      })
    }
  }
}
</script>

<style scoped>
#adder {
  width: 50%;
  height: 600px;
  overflow: scroll;
}

.icon {
  width: 50px;
  height: 50px;
}
</style>
