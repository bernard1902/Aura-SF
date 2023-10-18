import React from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Table,
  Tr,
  Td,
  Th,
  Tfoot,
  Thead,
  Tbody,
} from "@chakra-ui/react"

import { Bar } from "react-chartjs-2"

const Profile = ({ profile, setProfile, terpeneProfile, product }) => {
  const options = {
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  }

  const data = {
    labels: terpeneProfile.map((terp, i) => terp.title),
    datasets: [
      {
        data: terpeneProfile.map((terp, i) => terp.percentage),
        backgroundColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  }
  return (
    <Box
      w="100vw"
      h="100vh"
      overflowY="scroll"
      position="fixed"
      top="0"
      left="0"
      zIndex="911"
      bg="white"
      opacity={profile ? "1" : "0"}
      pointerEvents={profile ? "all" : "none"}
      transition="all 575ms ease-in-out"
    >
      <Box
        w="95%"
        maxWidth="1240px"
        m="0 auto"
        pt="5.5rem"
        pb="3rem"
        height="85%"
      >
        <Box w="95%" maxWidth="720px" m="0 auto 3rem" textAlign="center">
          <Button
            onClick={() => setProfile(false)}
            textAlign="center"
            cursor="pointer"
            position="sticky"
            top="5rem"
            bg="black"
            color="white"
            m="0 auto 3rem"
            variant="more"
            transition="all 475ms ease-in-out"
            transform={profile ? "translateY(0)" : "translateY(-50px)"}
          >
            <b style={{ marginRight: "1rem" }}>X</b> Close profile
          </Button>
          <Heading as="h4" variant="h4" textAlign="center">
            Product profile
          </Heading>
          <Text textAlign="center">
            These are approximate numbers. Measurements on actual products may
            vary due to plant-to-plant variances and are subject to change. Aura
            shall not be held liable for any changes.
          </Text>
        </Box>
        <Flex justifyContent="space-between" h="100%" flexWrap="wrap">
          <Box
            w={["100%", "100%", "100%", "45%", "45%", "45%"]}
            h={["45%", "45%", "45%", "100%", "100%", "100%"]}
          >
            <Bar
              data={data}
              labels={false}
              options={options.options}
              height={"100%"}
              redraw={profile ? true : false}
            />
            <Box pb="2rem" />
          </Box>
          <Box w={["100%", "100%", "100%", "45%", "45%", "45%"]}>
            <Heading as="h6" variant="h6">
              Terpene Profile
            </Heading>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Analyte</Th>
                  <Th>Percentage (%)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {terpeneProfile.map((terp, i) => (
                  <Tr key={i}>
                    <Td>{terp.title}</Td>
                    <Td>{terp.percentage}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total</Th>
                  <Th>
                    {terpeneProfile.reduce((a, b) => a + b.percentage, 0)}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Profile
