import jwtDecode from "jwt-decode";
import React, { useEffect, useState, useContext } from "react";
import { variables } from "../../Variables";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import AuthContext from "../Context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)

  if (authCtx.userData?.role === "admin") {
    navigate("/admin");
  }

  return (
    <Box>
      <Navbar />
      <Container
        maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
      >
        Home
      </Container>
    </Box>
  );
}

export default Home;
