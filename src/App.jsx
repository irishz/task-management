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
import JobCreate from "./components/Home/JobCreate";
import MyJob from "./components/AdminJob/MyJob";
import Report from "./components/AdminJob/Report";
import WaitingApprove from "./components/AdminJob/WaitingApprove";

function App() {
  const [userToken, setuserToken] = useState(localStorage.getItem("token"));
  const [userData, setuserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setuserToken(token);

    let userId = "";
    if (token) {
      const tokenDecoded = jwtDecode(token);
      // console.log(tokenDecoded);
      userId = tokenDecoded.id;
    }
    axios
      .get(variables.API_URL + `users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setuserData(res.data);
      });
    return () => {
      setuserData({});
      setuserToken(null);
    };
  }, [userToken]);

  if (!userToken) {
    return <Login setuserToken={setuserToken}></Login>;
  }

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setuserToken: setuserToken,
        userData,
        setuserData: setuserData,
      }}
    >
      <Box>
        {userData.role === "normal" ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/job/new" element={<JobCreate />} />
            <Route path="/unauth" element={<Unauthorized />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/job-me" element={<MyJob />} />
            <Route path="/report" element={<Report />} />
            <Route path="/approve" element={<WaitingApprove />} />
            <Route path="/unauth" element={<Unauthorized />} />
          </Routes>
        )}
      </Box>
    </AuthContext.Provider>
  );
}

export default App;
