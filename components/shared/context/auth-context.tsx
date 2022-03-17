import React, { useCallback, useState } from "react";

type AuthContextObj = {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  login: (uid: string, token: string) => void;
  logout: () => void;
};

//creating the actual store
export const AuthContext = React.createContext<AuthContextObj>({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: (uid: string, token: string) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    //only text, no objs can be stored in localstorage, stringify circumvents this
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  const contextValue: AuthContextObj = {
    isLoggedIn: !!token,
    token: token,
    userId: userId,
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
