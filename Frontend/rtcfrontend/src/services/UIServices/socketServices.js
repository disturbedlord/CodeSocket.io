import { io } from "socket.io-client";
class SocketService {
  constructor() {
    if (this.socket) {
      throw new Error("Only One Socket Instance is Allowed!!!");
    }
    this.socket = io();
  }

  sendMessage = (topic, payload) => {
    console.log("SocketService : pyaload : ", topic, payload);
    this.socket.emit(topic, payload);
  };

  getSocketConnection = () => {
    return this.socket;
  };

  disconnectTopic = (topic) => {
    this.socket.off(topic);
  };

  disconnect = () => this.socket.disconnect();

  connectTopic = (topic, callback) => this.socket.on(topic, callback);
}

const singletonSocket = Object.freeze(new SocketService());

export default singletonSocket;
