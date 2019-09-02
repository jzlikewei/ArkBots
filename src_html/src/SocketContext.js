import * as React from "react";


let client = new WebSocket('ws://localhost:4242');
client.onopen = () => {
  console.log('WebSocket Client Connected');
};
client.onmessage = (message) => {
  console.log(message);
};
export  const SocketContext = React.createContext(
  {client: client,}
);
