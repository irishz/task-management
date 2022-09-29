import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputAddon,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { variables } from "../../Variables";
import { useNavigate } from "react-router-dom";

function JobCreate() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic: "",
      staff_req: authCtx.userData.name,
      department_req: authCtx.userData.department,
      job_detail_1: "",
      job_detail_2: "",
      ref_loss_cost_reduction: "",
      share_cost: "",
    },
  });
  const toast = useToast();
  const navigate = useNavigate();

  function onSubmit(data) {
    const formData = data;
    formData.staff_req = authCtx.userData._id;
    formData.status = "wait for approve";
    // console.log(formData);
    setisLoading(true);
    axios
      .post(variables.API_URL + "job", formData)
      .then((res) => {
        if (res) {
          toast({
            title: res.data.msg,
            description: "กำลังกลับไปยังหน้าหลัก",
            status: "success",
            duration: 3000,
          });
          setisLoading(false);
          setTimeout(() => {
            navigate(-1);
          }, 3000);
          return;
        }
      })
      .catch((err) => {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: err,
          status: "error",
          isClosable: true,
          duration: 10000,
        });
      });
  }

  return (
    <Box>
      <Navbar />
      <Container maxW={["container.sm", "container.md", "container.lg"]} p={5}>
        <Stack
          borderWidth={1}
          borderRadius={10}
          boxShadow="0 1px 4px 0 rgba( 31, 38, 135, 0.37 )"
          p={3}
          spacing={3}
        >
          <Heading textAlign={"center"} fontSize={32} color={"gray.600"}>
            คำร้องของานใหม่
          </Heading>
          <Divider borderWidth={1} />
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Grid gap={4} templateColumns={"repeat(12, 1fr)"}>
                {/* Topic */}
                <GridItem colSpan={6}>
                  <FormControl
                    flex={1}
                    isRequired
                    isInvalid={errors.topic ? true : false}
                  >
                    <FormLabel>ชื่อหัวข้อ</FormLabel>
                    <Input
                      {...register("topic", { required: "กรุณาใส่ชื่อหัวข้อ" })}
                      type="text"
                      autoFocus
                    />
                    <FormHelperText color={"red"}>
                      {errors.topic?.message}
                    </FormHelperText>
                  </FormControl>
                </GridItem>
                {/* Staff Req */}
                <GridItem colSpan={3}>
                  <FormControl flex={0.5} isReadOnly>
                    <FormLabel>ชื่อผู้ร้องขอ</FormLabel>
                    <Input
                      {...register("staff_req")}
                      type="text"
                      value={authCtx.userData.name}
                      color="gray.500"
                    />
                  </FormControl>
                </GridItem>
                {/* Department Req */}
                <GridItem colSpan={3}>
                  <FormControl flex={0.5}>
                    <FormLabel>แผนก</FormLabel>
                    <Input
                      {...register("department_req")}
                      type="text"
                      readOnly
                      value={authCtx.userData.department}
                      color="gray.500"
                    />
                  </FormControl>
                </GridItem>
                {/* Job Detail 1 */}
                <GridItem colSpan={6}>
                  <FormControl>
                    <FormLabel>รายละเอียด</FormLabel>
                    <Textarea {...register("job_detail_1")} />
                  </FormControl>
                </GridItem>
                {/* Job Detail 2 */}
                <GridItem colSpan={6}>
                  <FormControl>
                    <FormLabel>รายละเอียด 2</FormLabel>
                    <Textarea {...register("job_detail_2")} />
                  </FormControl>
                </GridItem>
                {/* Ref Loss and Cost Reduction */}
                <GridItem colSpan={6}>
                  <FormControl
                    isRequired
                    isInvalid={errors.ref_loss_cost_reduction ? true : false}
                  >
                    <FormLabel>Ref loss no. & Cost reduction</FormLabel>
                    <Input
                      {...register("ref_loss_cost_reduction", {
                        required: "กรุณาใส่หมายเลขอ้างอิง Loss",
                      })}
                      type="text"
                      placeholder="xxx/xxxx-xxxxxxx"
                    />
                    <FormHelperText color={"red"}>
                      {errors.ref_loss_cost_reduction?.message}
                    </FormHelperText>
                  </FormControl>
                </GridItem>
                {/* Share Cost */}
                <GridItem colSpan={4}>
                  <FormControl
                    isRequired
                    isInvalid={errors.share_cost ? true : false}
                  >
                    <FormLabel>Share Cost</FormLabel>
                    <InputGroup>
                      <Input
                        {...register("share_cost", {
                          required: "กรุณาใส่มูลค่า Share cost",
                          min: 0,
                        })}
                        type="number"
                      />
                      <InputRightAddon children="฿" fontWeight={"semibold"} />
                    </InputGroup>
                    <FormHelperText color={"red"}>
                      {errors.share_cost?.message}
                    </FormHelperText>
                  </FormControl>
                </GridItem>
              </Grid>
              <Button
                type="submit"
                variant={"solid"}
                leftIcon={<AddIcon size={"1.2em"} />}
                colorScheme="orange"
                isLoading={isLoading}
                loadingText="กำลังทำงาน"
              >
                ร้องของานใหม่
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}

export default JobCreate;
