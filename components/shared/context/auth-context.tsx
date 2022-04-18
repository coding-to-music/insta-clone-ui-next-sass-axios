import React from "react";
import useAuth from "../hooks/auth-hook";

type AuthContextObj = {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  avatar: string | null;
  username: string | null;
  login: (
    uid: string,
    token: string,
    username: string,
    avatar: string,
    expirationDate?: Date
  ) => void;
  logout: () => void;
};

//creating the actual store
export const AuthContext = React.createContext<AuthContextObj>({
  isLoggedIn: false,
  token: null,
  userId: null,
  avatar: null,
  username: null,
  login: (
    uid: string,
    token: string,
    username: string,
    avatar: string,
    expirationDate?: Date
  ) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = (props) => {
  const { token, userId, avatar, username, login, logout } = useAuth();

  const contextValue: AuthContextObj = {
    isLoggedIn: !!token,
    token: token,
    userId: userId,
    avatar: avatar,
    username: username,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
