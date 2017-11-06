<template>
  <div class="country-list">
    <div class="detial">this is detail page</div>
    <div
      class="country-border"
      ref="countryList"
    >
      <div
        v-for="(item, index) in countryModify"
        :key="index"
      >
        <div :data-en="item.en.slice(0, 1)" v-if="item.first"></div>
        <div
          class="item"
        >
          <div>{{item.en}}</div>
          <div>{{item.ch}}</div>
        </div>
      </div>
      <div class="char-list-border">
        <ul
          class="char-list"
          ref="charBar"
          @touchstart="e => touchStart(e)"
          @touchmove="e => touchMove(e)"
          @touchend="e => touchEnd(e)"
        >
          <li
            class="char-item"
            v-for="(char,index) in charList"
            :key="index"
          >{{char}}</li>
        </ul>
      </div>
      <div class="char-tip" v-show="isTouching">{{lastChar}}</div>
    </div>
  </div>
</template>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
  .detial {
    font-size: 16px;
    color: #fff;
    height: 50px;
    line-height: 50px;
    background-color: gray;
  }
  .item {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    text-align: left;
  }
  .country-list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .country-border {
    flex: 1;
    overflow: auto;
    position: relative;
  }
  .char-list-border {
    padding-top: 50px;
    position: fixed;
    right: 0;
    top: 0;
    width: 20px;
    height: 100%;
    margin: 0;
    box-sizing: border-box;
  }
  .char-list {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }
  .char-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
  .char-tip {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background-color: gray;
    border-radius: 6px;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
  }
</style>

<script>
  import {country} from './data.js';
  export default {
    data () {
      return {
        country,
        charList: '*ABCDEFGHIJKLMNOPQRSTUVWXYZ#',
        isTouching: false,
        boxClientTop: 50,
        lastChar: 'A'
      };
    },
    computed: {
      countryModify () {
        const obj = {};
        const arr = this.country.map((item, index) => {
          const i = item.lastIndexOf(' ');
          const en = item.slice(0, i);
          const ch = item.slice(i + 1);
          let first = false;
          if (obj[en.slice(0, 1)]) {
            first = false;
          } else {
            first = true;
            obj[en.slice(0, 1)] = true;
          }
          return {en: en, ch: ch, first: first}
        });
        return arr;
      }
    },
    methods: {
      toList () {
        this.$router.go(-1);
      },
      toPost () {
        this.$router.push('post');
      },
      touchStart (e) {
        e.preventDefault();
        this.isTouching = true;
        const char = this.getChar(e.touches[0].clientY);
        this.gotoChar(char);
      },
      touchMove (e) {
        e.preventDefault();
        const char = this.getChar(e.touches[0].clientY);
        this.gotoChar(char);
      },
      touchEnd (e) {
        e.preventDefault();
        this.isTouching = false;
      },
      getChar (clientY) {
        const charHeight = this.$refs.charBar.offsetHeight / this.charList.length;
        const index = Math.floor((clientY - this.boxClientTop) / charHeight);
        return this.charList[index];
      },
      gotoChar (char) {
        if (char === this.lastChar) {
          return false;
        }
        this.lastChar = char;
        if (char === '*') {
          this.$refs.countryList.scrollTop = 0;
        } else if (char === '#') {
          this.$refs.countryList.scrollTop = this.$refs.countryList.scrollHeight;
        }
        const target = document.querySelector('[data-en="' + char + '"]');
        if (target) {
          target.scrollIntoView();
        }
      }
    }
  }
</script>

