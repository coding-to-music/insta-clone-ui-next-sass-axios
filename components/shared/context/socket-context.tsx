import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextObj = {
  socket: Socket | null;
};

export const SocketContext = React.createContext<SocketContextObj>({
  socket: null,
});

const SocketContextProvider: React.FC = (props) => {
  const contextValue: SocketContextObj = {
    socket: io(`${process.env.SOCKETIO}`),
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
