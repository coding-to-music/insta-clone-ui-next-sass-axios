import { useCallback, useEffect, useState } from "react";
import io from "Socket.IO-client";
import { Socket } from "socket.io-client";

let logoutTimer: ReturnType<typeof setTimeout>;
// let socket: Socket;

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );

  //init socket connection
  useEffect(() => {
    const socketInitializer = async () => {
      // const mySocket = io(`${process.env.SOCKETIO}`);
    };
    socketInitializer();
  }, []);

  const login = useCallback((uid, token, username, avatar, expirationDate?) => {
    setToken(token);
    //new date obj based on current time + 1hr, gettime returns "cur time" in ms
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    //only text, no objs can be stored in localstorage, stringify circumvents this
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        avatar: avatar,
        username: username,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    // socket.emit("login", uid);
    setUserId(uid);
    setAvatar(avatar);
    setUsername(username);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem("userData");
  }, []);

  //auto login logic
  useEffect(() => {
    let storedUserData;
    if (localStorage.getItem("userData")) {
      storedUserData = JSON.parse(localStorage.getItem("userData")!);
    }
    if (
      storedUserData &&
      storedUserData.token &&
      new Date(storedUserData.expiration) > new Date()
    ) {
      login(
        storedUserData.userId,
        storedUserData.token,
        storedUserData.username,
        storedUserData.avatar,
        new Date(storedUserData.expiration)
      );
    }
  }, [login]);

  //auto logout logic
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, userId, avatar, username, socket, login, logout };
};

export default useAuth;
