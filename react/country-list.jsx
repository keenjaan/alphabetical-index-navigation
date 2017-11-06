import React, {Component}     from 'react';
import {country}              from './data';
import './style';

// 头部搜索栏
class Pager extends Component {
  constructor () {
    super();
    this.state = {
      isTouching: false,
      lastChar: 'A'
    }
    this.country = this.initState();
    this.charStr = '*ABCDEFGHIJKLMNOPQRSTUVWXYZ#';
    // this.isTouching = false;
    this.boxClientTop = 50;
    // this.lastChar = 'A';
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.getChar = this.getChar.bind(this);
    this.gotoChar = this.gotoChar.bind(this);
  }
  initState () {
    const obj = {};
    return country.map((item, index) => {
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
  }
  touchStart (e) {
    // e.preventDefault();
    // this.isTouching = true;
    this.setState({isTouching: true});
    const char = this.getChar(e.touches[0].clientY);
    this.gotoChar(char);
  }
  touchMove (e) {
    e.preventDefault();
    const char = this.getChar(e.touches[0].clientY);
    this.gotoChar(char);
  }
  touchEnd (e) {
    e.preventDefault();
    this.setState({isTouching: false});
  }
  getChar (clientY) {
    const charHeight = this.refs.charBar.offsetHeight / this.charStr.length;
    const index = Math.floor((clientY - this.boxClientTop) / charHeight);
    return this.charStr[index];
  }
  gotoChar (char) {
    if (char === this.lastChar) {
      return false;
    }
    this.setState({lastChar: char});
    // this.lastChar = char;
    if (char === '*') {
      this.refs.countryList.scrollTop = 0;
    } else if (char === '#') {
      this.refs.countryList.scrollTop = this.refs.countryList.scrollHeight;
    }
    const target = document.querySelector('[data-en="' + char + '"]');
    if (target) {
      target.scrollIntoView();
    }
  }
  componentWillMount () {
    console.log(this.country);
  }
  render () {
    return (
      <div className="country-list">
        <div className="detial">this is detail page</div>
        <div
          className="country-border"
          ref="countryList"
        >
          {
            this.country.map((item, index) => {
              return (
                <div key={index}>
                  {item.first && <div data-en={item.en.slice(0, 1)}></div>}
                  <div
                    className="item"
                  >
                    <div>{item.en}</div>
                    <div>{item.ch}</div>
                  </div>
                </div>
              )
            })
         }
          <div className="char-list-border">
            <ul
              className="char-list"
              ref="charBar"
              onTouchStart={this.touchStart}
              onTouchMove={this.touchMove}
              onTouchEnd={this.touchEnd}
            >
            {
              this.charStr.split('').map((char, index) => {
                return (
                  <li className="char-item" key={index}>{char}</li>
                )
              })
            }
            </ul>
          </div>
          {this.state.isTouching && <div className="char-tip">{this.state.lastChar}</div>}
        </div>
      </div>
    )
  }
}



export default Pager;
