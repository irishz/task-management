import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./components/AdminHome/AdminHome";
import Home from "./components/Home/Home";
import MyJob from "./components/AdminJob/MyJob";
import Report from "./components/AdminJob/Report";
import WaitingApprove from "./components/AdminJob/WaitingApprove";
import AuthContext from "./components/Context/AuthContext";
import JobCreate from "./components/Home/JobCreate";
import Login from "./components/Login/Login";
import AdminNav from "./components/Navbar/AdminNav";
import Navbar from "./components/Navbar/Navbar";
import Unauthorized from "./Unauthorized";
import { variables } from "./Variables";
import JobContext from "./components/Context/JobContext";

function App() {
  const [userToken, setuserToken] = useState(localStorage.getItem("token"));
  const [userData, setuserData] = useState({});
  const [jobApproveCount, setjobApproveCount] = useState(0);

  const jobCountProviderVal = useMemo(
    () => ({
      jobApproveCount,
      setjobApproveCount,
      increaseJobApproveCount,
      decreaseJobApproveCount,
    }),
    [jobApproveCount, setjobApproveCount]
  );

  function increaseJobApproveCount() {
    setjobApproveCount(jobApproveCount++);
  }
  function decreaseJobApproveCount() {
    setjobApproveCount(jobApproveCount--);
  }

  useEffect(() => {
    console.log(`job approve change: ${jobApproveCount}`);
  }, [jobApproveCount]);

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

    //Get Job Count
    axios.get(variables.API_URL + "job/approveby").then((res) => {
      let jobCount = res.data.length;
      setjobApproveCount(jobCount);
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
      <JobContext.Provider value={jobCountProviderVal}>
        <Flex direction={userData.role === "normal" ? "column" : "row"}>
          {userData.role === "normal" ? <Navbar /> : <AdminNav />}
          <Box w="full" bgColor={"#fdfdfd"} pl={3}>
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
        </Flex>
      </JobContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
