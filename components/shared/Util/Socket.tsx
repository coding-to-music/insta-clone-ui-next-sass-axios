import { useEffect } from "react";
import io from "Socket.IO-client";

const Socket = () => {
  useEffect(() => {
    const socketInitializer = async () => {
      const socket = io(`${process.env.SOCKETIO}`);
    };
    socketInitializer();
  }, []);

  return null;
};

export default Socket;
