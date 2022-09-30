import React, { useEffect, useState, useContext } from "react";
import { variables } from "../../Variables";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AuthContext from "../Context/AuthContext";
import moment from "moment";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import JobContext from "../Context/JobContext";

function Home() {
  const [jobList, setjobList] = useState([]);
  const [isJobDelete, setisJobDelete] = useState(false);
  const authCtx = useContext(AuthContext);
  const jobCtx = useContext(JobContext);
  const { isOpen, onOpen, onClose } =
    useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const userId = authCtx.userData?._id;
    if (userId) {
      axios.get(variables.API_URL + `job/user/${userId}`).then((res) => {
        setjobList(res.data);
      });
    }
  }, [isJobDelete]);

  function processDeleteJob(job_id) {
    const jobToDelete = jobList.find((job) => job._id === job_id);
    axios
      .delete(variables.API_URL + `job/${jobToDelete._id}`)
      .then((res) => {
        toast({
          title: res.data.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setisJobDelete(true);
        jobCtx.decreaseJobApproveCount();
      })
      .catch((err) => {
        console.log(err);
      });
    onClose();
  }

  return (
    <Box>
      <Container
        maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
      >
        <Heading fontSize={"2xl"} color="gray.600" mb={5}>
          ยินดีต้อนรับ, คุณ{authCtx.userData.name}
        </Heading>

        <TableContainer
          display={"block"}
          overflowX="auto"
          whiteSpace={"break-spaces"}
        >
          <Table variant={"striped"} size="sm">
            <TableCaption>งานทั้งหมด: {jobList.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>ลำดับ</Th>
                <Th>JobNo</Th>
                <Th>หัวข้อ</Th>
                <Th>รายละเอียด 1</Th>
                <Th>รายละเอียด 2</Th>
                <Th>ผู้ร้องขอ</Th>
                <Th>แผนก</Th>
                <Th>Ref loss no</Th>
                <Th>Share Cost</Th>
                <Th>สถานะ</Th>
                <Th>สร้างเมื่อ</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobList.map((job, idx) => (
                <Tr key={job._id}>
                  <Td textAlign={"center"}>{idx + 1}</Td>
                  <Td textAlign={"center"}>{job.job_no}</Td>
                  <Td textAlign={"center"}>{job.topic}</Td>
                  <Td>
                    <Text noOfLines={2}>{job.job_detail_1}</Text>
                  </Td>
                  <Td>
                    <Text noOfLines={2}>{job.job_detail_2}</Text>
                  </Td>
                  <Td>{job.staff_req}</Td>
                  <Td>{job.department_req}</Td>
                  <Td>{job.ref_loss_cost_reduction}</Td>
                  <Td isNumeric>{job.share_cost}</Td>
                  <Td>{job.status}</Td>
                  <Td>{moment(job.createdAt).format("DD/MM/YYYY HH:mm")}</Td>
                  <Td display="inline-flex">
                    <EditIcon
                      w={4}
                      h={4}
                      color="facebook"
                      _hover={{ color: "facebook.300" }}
                      mx={2}
                      // onClick={() => handleEditDeleteClick(data.id, "edit")}
                    />
                    <DeleteIcon
                      w={4}
                      h={4}
                      color="red"
                      _hover={{ color: "red.300" }}
                      onClick={onOpen}
                    />
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay bgColor={"blackAlpha.200"} />
                      <ModalContent>
                        <ModalHeader>ยืนยันการลบ Job</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text>
                            Job No : <strong>{job.job_no}</strong>
                          </Text>
                          <Text>
                            Topic : <strong>{job.topic}</strong>
                          </Text>
                        </ModalBody>
                        <ModalFooter display={"flex"} gap={3}>
                          <Button
                            variant={"solid"}
                            colorScheme="red"
                            leftIcon={<DeleteIcon />}
                            onClick={() => processDeleteJob(job._id)}
                          >
                            ลบ
                          </Button>
                          <Button variant={"outline"} onClick={onClose}>
                            ยกเลิก
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default Home;
