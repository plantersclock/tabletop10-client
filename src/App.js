import React from "react";

import { Route, Switch } from "react-router-dom";
import Admin from "./pages/admin/Admin.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import PrivateRoute from "./modules/common/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
