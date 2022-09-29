import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import AdminNav from "../Navbar/AdminNav";
import axios from "axios";
import { variables } from "../../Variables";
function MyJob() {
  const authCtx = useContext(AuthContext);
  const [jobList, setjobList] = useState([]);

  useEffect(() => {
    axios
      .get(variables.API_URL + `job/user/${authCtx.userData._id}`)
      .then((res) => {
        setjobList(res.data);
      });
  }, []);

  return (
    <Flex>
      <AdminNav />
      <Flex mt={3}>
        <Heading color={"gray.600"} fontSize="2xl">
          My Job
        </Heading>
      </Flex>
    </Flex>
  );
}

export default MyJob;
