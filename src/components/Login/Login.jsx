import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { variables } from "../../Variables";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employee_code: "",
      password: "",
    },
  });
  const toast = useToast();
  const navigate = useNavigate();

  function onsubmit(data) {
    axios
      .post(variables.API_URL + "users/login", data)
      .then((res) => {
        if (res.data.msg === "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง") {
          toast({
            title: "เกิดข้อผิดพลาด",
            description: res.data.msg,
            status: "error",
            duration: 4000,
          });
          return;
        }
        const token = res.data.data.token;
        localStorage.setItem("token", token);
        props.setuserToken(token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onsubmit)}>
      <Flex
        flexDirection="column"
        w="100wh"
        h="100vh"
        bgGradient="linear(to-br, #439cfb, #f187fb)"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          p={5}
          gap={2}
          w={["sm", "md", "lg", "xl"]}
          border={"2px solid rgba(255,255,255, 0.18)"}
          borderRadius={10}
          bgolor={"whiteAlpha.300"}
          boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
          backdropFilter={"blur(1.5px)"}
        >
          {/* Logo Heading */}
          <Box textAlign={"center"}>
            <Heading color="gray.700">Task Management</Heading>
            <Text>เข้าสู่ระบบ</Text>
          </Box>
          {/* Input */}
          <FormControl>
            <FormLabel color="gray.700">รหัสพนักงาน</FormLabel>
            <Input
              {...register("employee_code", {
                required: "กรุณาใส่รหัสพนักงาน",
                minLength: {
                  value: 7,
                  message: "รหัสพนักงานเป็นตัวเลข 7 หลัก",
                },
              })}
              bgColor={"whiteAlpha.700"}
              borderColor={"whiteAlpha.600"}
              type={"text"}
              autoFocus
            />
            <FormHelperText color={"red"}>
              {errors.employee_code?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel color="gray.700">รหัสผ่าน</FormLabel>
            <Input
              {...register("password", {
                required: "กรุณาใส่รหัสผ่าน",
                minLength: { value: 6, message: "รหัสผ่านขั้นต่ำ 6 ตัวอักษร" },
              })}
              bgColor={"whiteAlpha.700"}
              borderColor={"whiteAlpha.600"}
              type={"password"}
            />
            <FormHelperText color="red">
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
          {/* Login Button */}
          <Button
            type="submit"
            variant={"solid"}
            bgColor="#235185"
            color="white"
            _hover={{ bgColor: "#1a3b61" }}
            boxShadow={"0 1px 4px 0 rgba(0,0,0, 0.37)"}
          >
            เข้าสู่ระบบ
          </Button>
        </Stack>
      </Flex>
    </form>
  );
}

export default Login;
