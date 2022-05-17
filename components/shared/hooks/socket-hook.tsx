import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(`${process.env.SOCKETIO}`);

export default function useSocket(eventName: string, cb: any) {
  useEffect(() => {
    socket.on(eventName, cb);

    return function useSocketCleanup() {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);

  return socket;
}
