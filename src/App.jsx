import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./components/AdminHome/AdminHome";
import AuthContext from "./components/Context/AuthContext";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Unauthorized from "./Unauthorized";
import jwtDecode from "jwt-decode";
import { variables } from "./Variables";
import axios from "axios";

function App() {
  const [userToken, setuserToken] = useState(localStorage.getItem("token"));
  const [userData, setuserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setuserToken(token);

    let userId = "";
    if (token) {
      const tokenDecoded = jwtDecode(token);
      console.log(tokenDecoded);
      userId = tokenDecoded.id;
    }
    axios
      .get(variables.API_URL + `users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setuserData(res.data);
      });
  }, []);

  if (!userToken) {
    return <Login setuserToken={setuserToken}></Login>;
  }

  return (
    <AuthContext.Provider
      value={{ setuserToken: setuserToken, userToken, userData }}
    >
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unauth" element={<Unauthorized />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </Box>
    </AuthContext.Provider>
  );
}

export default App;
