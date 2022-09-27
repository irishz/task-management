import React, { useEffect, useState, useContext } from "react";
import { variables } from "../../Variables";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import AuthContext from "../Context/AuthContext";
import moment from "moment";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function Home() {
  const [jobList, setjobList] = useState([]);
  const [user, setuser] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const userId = authCtx.userData?._id;
    if (userId) {
      axios.get(variables.API_URL + `job/user/${userId}`).then((res) => {
        console.table(res.data);
        setjobList(res.data);
      });
    }
  }, []);

  function getUserData(userId) {
    axios
      .get(variables.API_URL + `users/${userId}`, {
        headers: { Authorization: `Bearer ${authCtx.userToken}` },
      })
      .then((res) => {
        setuser(res.data);
      });
    return user;
  }

  return (
    <Box>
      <Navbar />
      <Container
        maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
      >
        <Heading fontSize={"2xl"} color="gray.600" mb={5}>
          ยินดีต้อนรับ, คุณ{authCtx.userData.name}
        </Heading>

        <TableContainer>
          <Table variant={"striped"} size="sm">
            <TableCaption>งานทั้งหมด: {jobList.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>ลำดับ</Th>
                <Th>Job No.</Th>
                <Th>หัวข้อ</Th>
                <Th>รายละเอียด 1</Th>
                <Th>รายละเอียด 2</Th>
                <Th>ผู้ร้องขอ</Th>
                <Th>แผนก</Th>
                <Th>Ref loss no</Th>
                <Th>มูลค่า Loss</Th>
                <Th>Share Cost</Th>
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
                  <Td textAlign={"center"}>{job.job_detail_1}</Td>
                  <Td>{job.job_detail_2}</Td>
                  <Td>{getUserData(job.staff_req).name}</Td>
                  <Td>{job.department_req}</Td>
                  <Td isNumeric>{job.ref_loss_no}</Td>
                  <Td isNumeric>{job.cost}</Td>
                  <Td isNumeric>{job.share_cost}</Td>
                  <Td>{moment(job.createdAt).format("DD/MM/YYYY HH:mm")}</Td>
                  <Td display="inline-block">
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
                      // onClick={() => handleEditDeleteClick(data.id, "delete")}
                    />
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
