import * as React from "react";
import isElectron from 'is-electron';
import { SheetsRegistry } from "jss";


// const electron = require('electron');

class Socket {
  constructor() {
    this.client = null

    
  }
  connect() {
    try {
      this.client = new WebSocket('ws://localhost:4242');
      this.client.onopen=this.onopen
      this.client.onclose=this.onclose.bind(this)
      // this.client.onerror=this.onerror
    } catch (error) {
      setTimeout(this.connect, 3000);
    }
   
  }
  onerror(){
    this.onclose()
  }
  send(data){
    this.client.send(data)
  }
  onopen() {
    console.log('WebSocket Client Connected');
  }
  onmessage(data) {
    console.log('WebSocket Client Connected');
  }
  onclose() {
    console.log('WebSocket Client Cloesed');
    setTimeout(this.connect.bind(this), 3000);
  }
  openBackend() {
    if (!isElectron) {
      return 
    }
    const { ipcRenderer } = window.require('electron')
    ipcRenderer.send('openBackend', {})
  }
}
var socket =  new Socket()
socket.connect()
export const SocketContext = React.createContext(
  { socket:socket }
);
