import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Menus from './Menus'
import {SocketContext} from './SocketContext'

const style={
  maxWidth:(400 / 3) * 2,
}

class App extends Component {
  componentWillMount() {

  }
  componentDidMount() {
    console.log(this.context);
    this.context.socket.openBackend()
  }
  render() {
    return (
      <div className="App" style={style}>
        <Menus />
      </div>
    )
  }
}
App.contextType= SocketContext
export default App
