import { io } from "socket.io-client";

class socketService {
  static socket = io();

  static sendMessage = (topic, payload) => {
    console.log("SocketService : pyaload : ", topic, payload);
    socketService.socket.emit(topic, payload);
  };

  static getSocketConnection = () => {
    return socketService.socket;
  };

  static disconnectTopic = (topic) => {
    socketService.socket.off(topic);
  };

  static disconnect = () => socketService.socket.disconnect();

  static connectTopic = (topic, callback) =>
    socketService.socket.on(topic, callback);
}

export default socketService;
