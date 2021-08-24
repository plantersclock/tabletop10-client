import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import domain from "../util/domain";
const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState();

  async function getUser() {
    const userRes = await axios.get(`${domain}/auth/loggedIn`);
    setUser(userRes.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
