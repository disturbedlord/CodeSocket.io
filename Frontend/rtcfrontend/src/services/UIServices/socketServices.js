import { io } from "socket.io-client";
class SocketService {
  static socket = io();

  static createSocketInstance = () => {
    if (this.socket) {
      throw new Error("Only One Socket Instance is Allowed!!!");
    } else {
      console.warn("Socket Instance Created1");
      this.socket = io();
    }
  };

  static sendMessage = (topic, payload) => {
    console.log("SocketService : pyaload : ", topic, payload);
    this.socket.emit(topic, payload);
  };

  static getSocketConnection = () => {
    return this.socket;
  };

  static disconnectTopic = (topic) => {
    this.socket.off(topic);
  };

  static disconnect = () => this.socket.disconnect();

  static connectTopic = (topic, callback) => this.socket.on(topic, callback);
}

//console.log("SingleTonSocket : ", singletonSocket);
export default SocketService;
