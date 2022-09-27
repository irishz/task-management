import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import { AddIcon } from "@chakra-ui/icons";

function JobCreate() {
  const authCtx = useContext(AuthContext);
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
          <form noValidate>
            <Stack spacing={3}>
              <Grid gap={4} templateColumns={"repeat(12, 1fr)"}>
                <GridItem colSpan={6}>
                  <FormControl flex={1} isRequired>
                    <FormLabel>ชื่อหัวข้อ</FormLabel>
                    <Input type="text" autoFocus />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl flex={0.5} isReadOnly>
                    <FormLabel>ชื่อผู้ร้องขอ</FormLabel>
                    <Input
                      type="text"
                      value={authCtx.userData.name}
                      color="gray.500"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl flex={0.5}>
                    <FormLabel>แผนก</FormLabel>
                    <Input
                      type="text"
                      readOnly
                      value={authCtx.userData.department}
                      color="gray.500"
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={6}>
                  <FormControl>
                    <FormLabel>รายละเอียด</FormLabel>
                    <Textarea />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={6}>
                  <FormControl>
                    <FormLabel>รายละเอียด 2</FormLabel>
                    <Textarea />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl>
                    <FormLabel>Ref loss no</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl>
                    <FormLabel>Cost</FormLabel>
                    <Input type="number" min={0} />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl>
                    <FormLabel>Share Cost</FormLabel>
                    <Input type="number" min={0} />
                  </FormControl>
                </GridItem>
              </Grid>
              <Button variant={"solid"} leftIcon={<AddIcon />} colorScheme="orange">
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
