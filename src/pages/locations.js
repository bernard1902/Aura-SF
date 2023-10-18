import React, { useState, useEffect } from "react"

import { graphql } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { Box, Flex, Text, Heading, Button, Input } from "@chakra-ui/react"
import GoogleMapReact from "google-map-react"

import Marker from "../components/marker"

import haversine from "haversine-distance"

import { usePlacesWidget } from "react-google-autocomplete"

import sortBy from "lodash.sortby"

const defaultProps = {
  center: {
    lat: 37.6393,
    lng: -120.997,
  },
  zoom: 7,
}

const Findastore = ({ data }) => {
  const [distributors, setDistributors] = useState(
    data.allSanityDistributor.edges
  )
  const [marker, setMarker] = useState(false)
  const [center, setCenter] = useState(defaultProps.center)
  const [zoom, setZoom] = useState(defaultProps.zoom)
  const [position, setPosition] = useState(false)

  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyCTBCYDJSav0pZ6L8Q8BOSCFNpURzyz_dg",
    options: {
      componentRestrictions: { country: "us" },
      types: ["geocode", "establishment"],
    },
    onPlaceSelected: place => {
      setPosition({
        x: place.geometry.location.lat(),
        y: place.geometry.location.lng(),
      })
      setDistributors(
        sortBy(distributors, o =>
          haversine(
            {
              lat: o.node.location.lat,
              lng: o.node.location.lng,
            },
            {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }
          )
        )
      )
    },
  })

  return (
    <Layout>
      <Seo title="Find a store" />
      <Banner>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-store-cover.png"}
          formats={["auto", "webp", "avif"]}
          alt="Banner Image"
        />
      </Banner>
      <Box
        w="95%"
        m={["3.5rem auto", "4rem auto", "4.5rem auto", "5rem auto"]}
        maxWidth="1240px"
      >
        <Heading as="h2" mb="1rem" textAlign="center">
          Find a store
        </Heading>
        <Flex alignItems="center" maxWidth="720px" m="0 auto 2rem" flex w="95%">
          <Box pr="1rem">
            <Button
              p="1rem"
              variant="more"
              onClick={() =>
                navigator.geolocation.getCurrentPosition(pos => {
                  setPosition({
                    x: pos.coords.latitude,
                    y: pos.coords.longitude,
                  })
                  setDistributors(
                    sortBy(distributors, o =>
                      haversine(
                        {
                          lat: o.node.location.lat,
                          lng: o.node.location.lng,
                        },
                        { lat: pos.coords.latitude, lng: pos.coords.longitude }
                      )
                    )
                  )
                })
              }
            >
              My location
            </Button>
          </Box>
          <Box w="100%">
            <Input ref={ref} />
          </Box>
        </Flex>
        <Flex flexWrap="wrap">
          <Box
            w={["100%", "100%", "45%", "40%", "35%", "30%"]}
            h={["350px", "375px", "400px", "450px", "500px", "600px"]}
            overflowY="scroll"
            overflowX="hidden"
            mb="2rem"
          >
            {distributors.map((distributor, i) => (
              <Box
                key={i}
                mb="1.5rem"
                mr="1.5rem"
                p="1rem"
                border="1px solid #000"
              >
                <Heading as="h6" variant="h6" color="black" fontWeight="bold">
                  {distributor.node.title}
                </Heading>
                {position ? (
                  <Text>
                    {(
                      haversine(
                        {
                          lat: distributor.node.location.lat,
                          lng: distributor.node.location.lng,
                        },
                        { lat: position.x, lng: position.y }
                      ) * 0.000621371192
                    ).toFixed(2)}{" "}
                    miles
                  </Text>
                ) : (
                  ""
                )}
                <Text>{distributor.node.address}</Text>
                <a
                  href={distributor.node.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>Directions</Button>
                </a>
                <Button
                  onClick={() => {
                    setCenter(distributor.node.location)
                    setZoom(13)
                    setMarker(i)
                  }}
                  ml="10px"
                >
                  Show on Map
                </Button>
              </Box>
            ))}
          </Box>
          <Box
            w={["100%", "100%", "55%", "60%", "65%", "70%"]}
            h={["350px", "375px", "400px", "450px", "500px", "600px"]}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCTBCYDJSav0pZ6L8Q8BOSCFNpURzyz_dg",
                libraries: ["places"],
              }}
              defaultCenter={defaultProps.center}
              center={center}
              zoom={zoom}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
            >
              {distributors.map((distributor, i) => (
                <Box
                  lat={distributor.node.location.lat}
                  lng={distributor.node.location.lng}
                  key={i}
                >
                  <Marker
                    distributor={distributor}
                    marker={marker}
                    uniqueMarker={i}
                    setMarker={setMarker}
                  />
                </Box>
              ))}
            </GoogleMapReact>
          </Box>
        </Flex>
      </Box>
      <Footer>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-product-main-cover-b.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Footer Image"
        />
      </Footer>
    </Layout>
  )
}

export default Findastore

export const query = graphql`
  query LocationsQuery {
    allSanityDistributor {
      edges {
        node {
          location {
            lat
            lng
          }
          title
          address
          mapsLink
        }
      }
    }
  }
`
