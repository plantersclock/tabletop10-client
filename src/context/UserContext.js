import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import domain from "../util/domain";
const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  const getUser = async () => {
    const userRes = await axios.get(`${domain}/auth/loggedIn`);
    setUser(userRes.data);
    setUserLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoading, getUser }}>
      {!userLoading && children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
