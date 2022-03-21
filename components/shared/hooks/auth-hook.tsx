import { useCallback, useEffect, useState } from "react";

let logoutTimer: ReturnType<typeof setTimeout>;

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );

  const login = useCallback((uid, token, expirationDate?) => {
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
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
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

  return { token, userId, login, logout };
};

export default useAuth;
