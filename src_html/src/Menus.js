import React, { Component } from 'react'
import Menu from './Menu'
import Header from "./Header";

const pageDetails = {
  'root': [
    {  key:"background",text:"后台模式",clickable:true}

    // { image: './imgs/1.png', key: 1,text:'主线' },
    // { image: './imgs/2.png', key: 2,text:'物资筹备' },
    // { image: './imgs/3.png', key: 3,text:'芯片搜索' },
    // { image: './imgs/4.png', key: 4,text:'火蓝之心' }
  ],
  'background':[{
    image:'background',key:'background_card',clickable:false
  }],
  1:[
    {image: './imgs/1.png', key: 17,text:'1-7'}
  ]
}
export default class Menus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'root'
    }
  }
  click(page){
    console.log("page:" +page)
    this.setState({page: page},function(){
      console.log("set state done");
      console.log(this.state.page)
    })
    console.log('set state')
  }
  render() {
    var contents = []
    console.log('rendering, state.page='+this.state.page)
    for (const page of Object.keys(pageDetails[this.state.page])) {
        var props = pageDetails[this.state.page][page]
        if (props.clickable){
          contents.push(<Menu {...props} page={props.key} clickHandler={this.click.bind(this)}/>)
        }else{
          contents.push(<Menu {...props} page={props.key} clickable={false}/>)
        }

    }
    return (
      <div>
        <Header name={this.state.page} page={this.state.page}/>
        {contents}
        {/*<Menu {...pageDetails[this.state.page][0]} page={pageDetails[this.state.page][0].page} clickHandler={this.click.bind(this)}/>*/}
      </div>
    )
  }
}
