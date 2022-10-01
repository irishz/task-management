import {
  Avatar,
  Badge,
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import NavbarMenuList from "./NavbarData";
import JobContext from "../Context/JobContext";

function AdminNav() {
  const authCtx = useContext(AuthContext);
  const jobCtx = useContext(JobContext);
  const [jobCount, setjobCount] = useState(jobCtx.jobApproveCount);
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token");
    authCtx.setuserToken(null);
  }

  useEffect(() => {
    setjobCount(jobCtx.jobApproveCount);
  }, [jobCtx]);

  return (
    <Flex
      left={0}
      top={0}
      w={"15%"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      h="100vh"
      bgColor="gray.800"
      position={"sticky"}
    >
      {/* Nav Header */}
      <Flex justifyContent={"center"}>
        <Heading
          bgGradient="linear(to-r, #1E6C8E, #2E7775)"
          bgClip={"text"}
          fontSize={20}
          my={3}
        >
          Job Management
        </Heading>
      </Flex>
      {/* Nav Body */}
      <Flex h="full" px={3} py={7} m={0}>
        <Stack w="full">
          {NavbarMenuList.admin.map((menu) => (
            <Link key={menu.name} to={menu.url} w="full">
              <Text
                p={3}
                display={"flex"}
                gap={2}
                color="white"
                bgColor={
                  location.pathname === menu.url ? "whiteAlpha.600" : null
                }
                alignItems={"center"}
                borderRadius={5}
                _hover={{
                  bgColor: "whiteAlpha.300",
                }}
              >
                {menu.icon}
                {menu.name_th}
                {menu.name === "waiting approve" ? (
                  <Badge bgColor="tomato" color="white">
                    {jobCount}
                  </Badge>
                ) : null}
              </Text>
            </Link>
          ))}
        </Stack>
      </Flex>
      {/* Nav Footer */}
      <Flex borderTopWidth={1} borderTopColor="gray" w="full" py={2} px={4}>
        <Button
          w="full"
          variant={"ghost"}
          leftIcon={<BiLogOut />}
          colorScheme="red"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </Button>
      </Flex>
    </Flex>
  );
}

export default AdminNav;
