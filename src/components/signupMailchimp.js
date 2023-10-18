import React, { useContext, useState } from "react"
import {
  Box,
  Text,
  Button,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react"

import LoadContext from "../context/LoadContext"

import { StaticImage } from "gatsby-plugin-image"

import { useForm } from "react-hook-form"

import axios from "axios"

const SignupMailchimp = () => {
  const load = useContext(LoadContext)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const actualLoaded = load.loaded && load.signup === false

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm()

  const onSubmit = async values => {
    setError(false)
    await axios
      .post(
        "https://us-central1-aura-website-3616a.cloudfunctions.net/klaviyoHandle",
        {},
        {
          params: {
            emailAddress: values.emailAddress,
          },
        }
      )
      .then(response => {
        setSuccess(true)
        console.log(response)
      })
      .catch(err => {
        setSuccess(true)
        console.log(err)
      })
      .then(response => {
        setSuccess(true)
        console.log(response)
      })

    setSuccess(true)
    return
  }

  return (
    <Box
      position="fixed"
      zIndex="1000"
      bg={actualLoaded ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)"}
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      pointerEvents={actualLoaded ? "all" : "none"}
      transition="all 175ms ease-in-out"
    >
      <Box
        bg="#fff"
        w="95%"
        maxWidth="640px"
        p="1.5rem"
        textAlign="center"
        margin="0 auto"
        transition="all 175ms ease-in-out"
        opacity={actualLoaded ? "1" : "0"}
      >
        <Box w="64px" m="0 auto" mb="1rem">
          <StaticImage
            src={"../images/Blue_L.png"}
            formats={["auto", "webp", "avif"]}
            alt="Aura SF - Stand Logo"
          />
        </Box>
        {success ? (
          <>
            <Text fontFamily="Tenor Sans">
              {"Thanks for signing up! Here's your discount code"}
            </Text>
            <Text fontWeight="700" color="primary" fontSize="4vw" mb="2rem">
              AuraSF2022
            </Text>
            <Text
              mb="1rem"
              onClick={() => load.setSignup(true)}
              textDecoration="underline"
              cursor="pointer"
            >
              Awesome
            </Text>
          </>
        ) : (
          <>
            <Text fontFamily="Tenor Sans" color="primary">
              Enjoy a 10% Discount when you sign up for our mailing list
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box w="95%" m="0 auto">
                <Input
                  id="emailAddress"
                  placeholder="Email Address"
                  {...register("emailAddress", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.emailAddress && errors.emailAddress.message}
                </FormErrorMessage>
                {error ? (
                  <Text color="red" textAlign="left" mt="1rem">
                    This email is already subscribed to our mailing list. Please
                    use another email address.
                  </Text>
                ) : (
                  ""
                )}
              </Box>
              <Button
                variant="more"
                isLoading={isSubmitting}
                type="submit"
                mb="2rem"
                mt="1rem"
              >
                Sign up
              </Button>
            </form>
            <Text
              mb="1rem"
              onClick={() => load.setSignup(true)}
              textDecoration="underline"
              cursor="pointer"
            >
              No thanks
            </Text>
          </>
        )}
      </Box>
    </Box>
  )
}

export default SignupMailchimp
