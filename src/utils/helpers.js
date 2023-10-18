import React from "react"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { GatsbyImage } from "gatsby-plugin-image"
import { Text, Heading, Box } from "@chakra-ui/react"

const RenderedText = ({ text }) => {
  switch (text.node.style) {
    case "h1":
      return (
        <Heading as="h1" color="black" variant="h1">
          {text.children}
        </Heading>
      )
    case "h2":
      return (
        <Heading as="h2" color="black" variant="h2" mt="2rem">
          {text.children}
        </Heading>
      )
    case "h3":
      return (
        <Heading
          as="h3"
          color="black"
          variant="h3"
          mt="2rem"
          fontSize={["21px", "21px", "24px", "24px", "26px", "26px"]}
        >
          {text.children}
        </Heading>
      )
    case "h4":
      return (
        <Heading as="h4" m="2rem 0 1rem" fontFamily="Fira Sans" color="black">
          {text.children}
        </Heading>
      )

    case "h6":
      return (
        <Text as="p" fontSize={["10px", "11px", "12px", "14px"]}>
          {text.children}
        </Text>
      )

    case "blockquote":
      return (
        <Heading
          as="h4"
          fontSize={["12px", "14px", "16px", "18px"]}
          m="2rem 0 1rem"
          fontFamily="PT Serif"
          color="#929294"
          paddingLeft="1.5rem"
          borderLeft="2px solid #929294"
          fontStyle="italic"
        >
          {text.children}
        </Heading>
      )
    default:
      return (
        <Text
          fontSize={["12px", "14px", "16px", "18px"]}
          maxWidth="640px"
          m="0 auto"
          sx={{
            strong: {
              paddingTop: "1rem",
              paddingBottom: "0.5rem",
              display: "inline-block",
            },
          }}
        >
          {text.children}
        </Text>
      )
  }
}

const sanityConfig = {
  projectId: `7az0ftyp`,
  dataset: `production`,
}

export const serializer = {
  types: {
    block: props => (
      <Box
        sx={{
          a: { textDecoration: "underline" },
        }}
      >
        <RenderedText text={props} />
      </Box>
    ),
    image: props => (
      <Box m="2rem 0">
        <GatsbyImage
          image={getGatsbyImageData(
            props.node.asset._ref,
            { maxWidth: 1240 },
            sanityConfig
          )}
        />
      </Box>
    ),
  },
}
