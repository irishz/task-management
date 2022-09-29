import {
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNav from "../Navbar/AdminNav";
import { variables } from "../../Variables";
import { ChevronRightIcon } from "@chakra-ui/icons";

function WaitingApprove() {
  const [jobList, setjobList] = useState([]);
  const [selectedItem, setselectedItem] = useState("");
  const [jobListSelected, setjobListSelected] = useState({});

  useEffect(() => {
    axios.get(variables.API_URL + "job/approveby").then((res) => {
      console.log(res.data);
      setjobList(res.data);
    });

    return () => {
      setjobList([]);
      setselectedItem("");
    };
  }, []);

  useEffect(() => {
    const jobSeleted = jobList.find((job) => selectedItem === job._id);
    setjobListSelected(jobSeleted);
  }, [selectedItem]);

  function handleListItemClick(job_id) {
    setselectedItem(job_id);
  }

  return (
    <Flex>
      <AdminNav />
      <Flex mt={3} w={"25%"}>
        <List
          borderWidth={1}
          m={2}
          borderRadius={"md"}
          w="xs"
          boxShadow={"0 2px 8px 0 rgba(0, 0, 0, 0.18)"}
        >
          {jobList.length < 1 ? (
            <Stack spacing={1}>
              {[1, 2, 3, 4, 5].map(() => (
                <ListItem>
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
      <Flex my={5} mr={5} w="59%">
        {jobListSelected ? (
          <Flex w="100%" py={3} overflowY="auto">
            <Stack color="gray.700" w="inherit">
              <MyHeading text="รายละเอียด" />
              <MyContent jobData={jobListSelected} />
              <MyHeading text="Loss" />
              <MyHeading text="ผู้จัดการอนุมัติ" />
            </Stack>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}

export default WaitingApprove;

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
  const jobData = props.jobData;
  return (
    <Stack
      justifyContent={"space-between"}
      px={7}
      color="gray.600"
      fontSize={14}
      my={10}
    >
      <Flex>
        <Flex flex={0.2}>
          <Text>หัวข้อ</Text>
        </Flex>
        <Flex flex={0.6}>
          <Text>{jobData.job_no}</Text>
        </Flex>
        <Flex flex={0.2}>
          <Text>action</Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex flex={0.2}>
          <Text>หัวข้อ</Text>
        </Flex>
        <Flex flex={0.6}>
          <Text>{jobData.topic}</Text>
        </Flex>
        <Flex flex={0.2}>
          <Text>action</Text>
        </Flex>
      </Flex>
    </Stack>
  );
}
