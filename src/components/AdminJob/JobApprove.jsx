import { CheckIcon, ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Skeleton,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import JobContext from "../Context/JobContext";

function JobApprove() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [jobList, setjobList] = useState([]);
  const [jobListSelected, setjobListSelected] = useState({});
  const [selectedItem, setselectedItem] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isBtnApproveLoading, setisBtnApproveLoading] = useState(false);
  const [reason, setreason] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const jobCtx = useContext(JobContext);

  useEffect(() => {
    console.log("fetch data");
    axios.get(API_URL + "job/approveby").then((res) => {
      // console.log(res.data);
      setjobList(res.data);
    });

    return () => {
      setjobList([]);
      setselectedItem("");
    };
  }, [isBtnApproveLoading]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(API_URL + "job/approveby").then((res) => {
        // console.log(res.data);
        setjobList(res.data);
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const jobSeleted = jobList.find((job) => selectedItem === job._id);
    setjobListSelected(jobSeleted);
  }, [selectedItem]);

  function handleListItemClick(job_id) {
    setselectedItem(job_id);
  }

  async function handleApproveButtonClick(jobId) {
    console.log("approve");
    let job_no = "";
    let changeStatusJob = false;
    let insertJobTrans = false;
    let err_msg;
    setisBtnApproveLoading(true);
    await axios
      .put(API_URL + `job/${jobId}`, { status: "approved" })
      .then((res) => {
        if (res.status === 200) {
          job_no = res.data?.job_no;
          jobCtx.decreaseJobApproveCount();
          changeStatusJob = true;
          return;
        }
      });

    //TODO insert to job transaction table
    

    console.log(changeStatusJob, insertJobTrans, job_no);
    if (changeStatusJob && insertJobTrans) {
      toast({
        title: `อนุมัติ Job หมายเลข ${job_no} สำเร็จ`,
        status: "success",
        position: "bottom-right",
        isClosable: true,
        duration: 3000,
      });
      setselectedItem("");
      setisBtnApproveLoading(false);
      return;
    }
    if (!changeStatusJob && !insertJobTrans) {
      err_msg = "ไม่สามารถอัพเดทและบันทึก job";
    } else if (!changeStatusJob) {
      err_msg = "อัพเดท job status ไม่สำเร็จ!";
    } else if (!insertJobTrans) {
      err_msg = "ไม่สามารถบันทึก job!";
    }
    toast({
      title: "เกิดข้อผิดพลาดบางอย่าง",
      description: err_msg,
      status: "error",
      isClosable: true,
      duration: 99999,
      onCloseComplete: () => {
        setisBtnApproveLoading(false);
      },
    });
  }

  function handleRejectButtonClick(jobId) {
    //TODO change job status to 'rejected' and reason
    //TODO insert to job transaction table
    console.log(`reject : ${reason}`);
    setisLoading(true);
    onClose();

    setTimeout(() => {
      //Reset
      setreason("");
      toast({
        title: "อนุมัติสำเร็จ",
        status: "success",
        isClosable: true,
        duration: 3000,
        position: "bottom-right",
      });
      setisLoading(false);
    }, 3000);
  }

  function handleReasonInputChange(value) {
    setreason(value);
  }

  return (
    <Flex gap={5}>
      <Flex mt={3} position="sticky" top={0} left={0}>
        <List
          h="95vh"
          m={2}
          w="xs"
          borderWidth={1}
          borderRadius={"md"}
          boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.18)"}
          overflowY="auto"
        >
          {jobList.length < 1 ? (
            <Stack spacing={1}>
              {[1, 2, 3, 4, 5].map((item) => (
                <ListItem key={item}>
                  <Skeleton height={7} />
                </ListItem>
              ))}
            </Stack>
          ) : (
            jobList.map((job, idx) => (
              <ListItem
                key={job._id}
                display={"flex"}
                justifyContent="space-between"
                alignItems={"center"}
                p={2}
                borderBottomWidth={1}
                color={"gray.600"}
                _hover={{ bgColor: "blackAlpha.300" }}
                bgColor={selectedItem === job._id ? "blackAlpha.300" : "white"}
                borderTopRadius={idx === 0 ? "md" : "none"}
                onClick={() => handleListItemClick(job._id)}
              >
                {job.topic}
                {selectedItem === job._id ? null : (
                  <ListIcon as={ChevronRightIcon} />
                )}
              </ListItem>
            ))
          )}
        </List>
      </Flex>
      <Flex my={5} mr={5} w="full" overflowY={"auto"}>
        {jobListSelected ? (
          <Flex w="100%" py={3}>
            <Stack color="gray.700" w="inherit">
              <Section
                children={
                  <>
                    <MyContent
                      jobData={jobListSelected}
                      handleApproveButtonClick={handleApproveButtonClick}
                      handleRejectButtonClick={handleRejectButtonClick}
                      handleReasonInputChange={handleReasonInputChange}
                      reason={reason}
                      isLoading={isLoading}
                      isBtnApproveLoading={isBtnApproveLoading}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                    />
                  </>
                }
              />
            </Stack>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}

export default JobApprove;

function Section({ children }) {
  return <Box pb={5}>{children}</Box>;
}

function MyHeading(props) {
  return (
    <Heading
      fontSize={"md"}
      color="gray.700"
      px={3}
      py={1}
      bgColor="blackAlpha.300"
      borderRadius={"md"}
    >
      {props.text}
    </Heading>
  );
}

function MyContent(props) {
  let jobData = props.jobData;
  return (
    <>
      <Section
        children={
          <>
            <MyHeading text="รายละเอียด" />
            <Stack
              justifyContent={"space-between"}
              px={7}
              color="gray.600"
              fontSize={14}
              mt={3}
              spacing={5}
            >
              <Flex>
                <Flex flex={0.2}>
                  <Text>Job Number</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.job_no}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>หัวข้อ</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.topic}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>รายละเอียด1</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.job_detail_1}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>รายละเอียด2</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.job_detail_2}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>ผู้ร้องขอ</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.staff_req}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>แผนก</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.department_req}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>สถานะ</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.status}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>สร้างเมื่อ</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>
                    {moment(jobData.createdAt).format("DD/MM/YYYY HH:mm")}
                  </Text>
                </Flex>
              </Flex>
            </Stack>
          </>
        }
      />
      <Section
        children={
          <>
            <MyHeading text="Loss" />
            <Stack
              justifyContent={"space-between"}
              px={7}
              color="gray.600"
              fontSize={14}
              mt={3}
              spacing={5}
            >
              <Flex>
                <Flex flex={0.2}>
                  <Text>
                    Ref Loss Number &<br /> Cost Reduction
                  </Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.ref_loss_cost_reduction}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex flex={0.2}>
                  <Text>Share Cost</Text>
                </Flex>
                <Flex flex={0.8}>
                  <Text>{jobData.share_cost}</Text>
                </Flex>
              </Flex>
            </Stack>
          </>
        }
      />
      <Section
        children={
          <>
            <MyHeading text="ผู้จัดการอนุมัติ" />
            <Stack
              justifyContent={"space-between"}
              px={7}
              color="gray.600"
              fontSize={14}
              mt={3}
              spacing={5}
            >
              <Flex gap={5}>
                <Button
                  alignItems={"center"}
                  variant={"solid"}
                  colorScheme="teal"
                  leftIcon={<CheckIcon w={3} h={3} />}
                  onClick={() => props.handleApproveButtonClick(jobData._id)}
                  isLoading={props.isBtnApproveLoading}
                  loadingText="อนุมัติ"
                >
                  อนุมัติ
                </Button>
                <Popover isOpen={props.isOpen} onClose={props.onClose}>
                  <PopoverTrigger>
                    <Button
                      alignItems={"center"}
                      variant={"solid"}
                      colorScheme="red"
                      leftIcon={
                        props.isLoading ? (
                          <Spinner />
                        ) : (
                          <CloseIcon w={3} h={3} />
                        )
                      }
                      onClick={props.onOpen}
                      isLoading={props.isLoading}
                      loadingText="ไม่อนุมัติ"
                    >
                      ไม่อนุมัติ
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent
                      bgColor={"#1c3c4e"}
                      borderColor="#1c3c4e"
                      color="white"
                      blur={"10px"}
                    >
                      <PopoverArrow />
                      <PopoverHeader border={"none"} color="#4ac2c0">
                        หมายเหตุ
                      </PopoverHeader>
                      <PopoverCloseButton onClick={props.onClose} />
                      <PopoverBody>
                        <FormControl>
                          <Textarea
                            borderTopRadius={"sm"}
                            borderColor="#4ac2c0"
                            size="sm"
                            onChange={(e) =>
                              props.handleReasonInputChange(e.target.value)
                            }
                            placeholder="ใส่หมายเหตุที่นี่..."
                          />
                        </FormControl>
                      </PopoverBody>
                      <PopoverFooter
                        display={"flex"}
                        justifyContent="end"
                        border={"none"}
                      >
                        <Button
                          variant={"outline"}
                          color="#4ac2c0"
                          borderColor="#2d7675"
                          size={"sm"}
                          onClick={() =>
                            props.handleRejectButtonClick(jobData._id)
                          }
                          _hover={{ bgColor: "rgb(45, 118, 117, 0.5)" }}
                          disabled={props.reason.length < 1 ? true : false}
                        >
                          ตกลง
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Flex>
            </Stack>
          </>
        }
      />
    </>
  );
}
