import React, { useCallback, useState } from "react";

type AuthContextObj = {
  isLoggedIn: boolean;
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
};

//creating the actual store
export const AuthContext = React.createContext<AuthContextObj>({
  isLoggedIn: false,
  userId: null,
  login: (uid: string) => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const contextValue: AuthContextObj = {
    isLoggedIn: isLoggedIn,
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
