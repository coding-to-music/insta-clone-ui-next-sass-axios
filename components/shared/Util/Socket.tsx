import { useEffect } from "react";
import io from "Socket.IO-client";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const Socket: React.FC = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const socketInitializer = async () => {
      const socket = io(`${process.env.SOCKETIO}`);
      authCtx.setSocket(socket);
    };
    socketInitializer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Socket;
