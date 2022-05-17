import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextObj = {
  socket: Socket | null;
};

export const SocketContext = React.createContext<SocketContextObj>({
  socket: null,
});

const SocketContextProvider: React.FC = (props) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(io(`${process.env.SOCKETIO}`));
  }, []);

  const contextValue: SocketContextObj = {
    socket: socket,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
