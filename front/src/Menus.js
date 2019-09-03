import React, { Component } from 'react'
import Menu from './Menu'
import Header from './Header'

var _ = require('lodash')

const pageDetails = {
  root: [
    { key: 'background', text: '后台模式', clickable: true },
    { key: 'help', text: '帮助', clickable: false, link:"https://github.com/jzlikewei/ArkBots" },
    { key: 'tools', text: '工具', clickable: true }
  ],
  background: [
    {
      image: 'background',
      key: 'background_card',
      clickable: false
    }
  ],
  tools: [{ key: 'timer_card' }],
  1: [{ image: './imgs/1.png', key: 17, text: '1-7' }]
}
export default class Menus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageStack: ['root']
    }
  }
  back() {
    var new_stack = this.state.pageStack
    new_stack.pop()
    this.setState({ pageStack: new_stack })
  }
  click(page) {
    console.log('page:' + page)
    var new_stack = this.state.pageStack
    new_stack.push(page)
    this.setState({ pageStack: new_stack })
    console.log('set state')
  }
  get page() {
    return _(this.state.pageStack).last()
  }
  render() {
    var contents = []
    console.log('rendering, state.page=' + this.page)
    for (const page of Object.keys(pageDetails[this.page])) {
      var props = pageDetails[this.page][page]
      if (props.clickable) {
        contents.push(
          <Menu
            {...props}
            page={props.key}
            clickHandler={this.click.bind(this)}
          />
        )
      } else {
        contents.push(<Menu {...props} page={props.key} clickable={false} />)
      }
    }
    return (
      <div>
        <Header
          name={this.page}
          page={this.page}
          backHandler={this.back.bind(this)}
        />
        {contents}
        {/*<Menu {...pageDetails[this.state.page][0]} page={pageDetails[this.state.page][0].page} clickHandler={this.click.bind(this)}/>*/}
      </div>
    )
  }
}
