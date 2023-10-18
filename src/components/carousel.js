import React, { useState, useEffect } from "react"
import { Box, Text, Button } from "@chakra-ui/react"

import { GatsbyImage } from "gatsby-plugin-image"

const Carousel = ({ images, frontPage }) => {
  const [position, setPosition] = useState(0)
  const [intervalId, setIntervalId] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition =>
        prevPosition === images.length - 1 ? 0 : prevPosition + 1
      )
    }, 4500)
    setIntervalId(interval)
  }, [])

  const mImage = frontPage ? images.map((img, i) => img.image) : images
  return (
    <Box
      position="relative"
      overflow="hidden"
      sx={{ _hover: { ".arrows": { opacity: "1 !important" } } }}
    >
      <Text
        position="absolute"
        top="50%"
        transform="translateY(-50%) scaleY(2)"
        color="rgb(225,225,225)"
        fontSize="2.5rem"
        left="15px"
        zIndex="1"
        cursor="pointer"
        className="arrows"
        opacity="0"
        transition="all 475ms ease-in-out"
        onClick={() => {
          clearInterval(intervalId)
          setPosition(position === 0 ? mImage.length - 1 : position - 1)
        }}
      >
        {"<"}
      </Text>
      <Text
        position="absolute"
        top="50%"
        transform="translateY(-50%) scaleY(2)"
        color="rgb(225,225,225)"
        fontSize="2.5rem"
        right="15px"
        zIndex="1"
        cursor="pointer"
        className="arrows"
        opacity="0"
        transition="all 475ms ease-in-out"
        onClick={() => {
          clearInterval(intervalId)
          setPosition(mImage.length - 1 === position ? 0 : position + 1)
        }}
      >
        {">"}
      </Text>
      <Box
        position="absolute"
        bottom="15px"
        zIndex="2"
        left="50%"
        transform="translateX(-50%)"
      >
        {mImage.map((img, i) => (
          <Box
            width="12px"
            height="12px"
            border="1px solid none"
            bg={position === i ? "primary" : "rgb(225,225,225)"}
            borderRadius="50%"
            m="0 0.5rem"
            display="inline-block"
            key={i}
            cursor="pointer"
            onClick={() => {
              clearInterval(intervalId)
              setPosition(i)
            }}
          />
        ))}
      </Box>
      {mImage.map((img, i) => (
        <>
          <Box
            key={i}
            position={i !== 0 ? "absolute" : "relative"}
            top="0"
            left="0"
            opacity={i !== position ? 0 : 1}
            transition="all 475ms ease-in-out"
            width="100%"
            height="100%"
          >
            <GatsbyImage
              image={img.asset.gatsbyImageData}
              layout="fullWidth"
              formats={["auto", "webp", "avif"]}
            />
            {frontPage ? (
              <Box
                position="absolute"
                top="45%"
                textAlign="center"
                width="80%"
                left="50%"
                transform="translateX(-50%)"
                textAlign="center"
              >
                {images[i].title ? (
                  <Text
                    color="white"
                    fontWeight="medium"
                    fontSize={["21px", "24px", "27px", "30px", "33px", "36px"]}
                  >
                    {images[i].title}
                  </Text>
                ) : (
                  ""
                )}
                {images[i].link ? (
                  <a href={images[i].link}>
                    <Button variant="more">LEARN MORE</Button>
                  </a>
                ) : (
                  ""
                )}
              </Box>
            ) : (
              ""
            )}
          </Box>
        </>
      ))}
    </Box>
  )
}

export default Carousel
