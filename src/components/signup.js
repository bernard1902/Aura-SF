import React, { useContext, useState } from "react"
import {
  Box,
  Heading,
  Text,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import firebase from "../context/firebase"
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth"

import LoadContext from "../context/LoadContext"

const SignUp = ({ setSignUp, setUserDetails }) => {
  const load = useContext(LoadContext)
  const [error, setError] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm()

  const auth = getAuth()

  const passwordCurrent = watch("password", "")

  const onSubmit = values => {
    return new Promise(resolve => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user
          setError(false)
          // ...
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          setError(errorCode)
        })
    })
  }
  return (
    <Box>
      {!load.user ? (
        <>
          <Heading as="h4" variant="h4" mb="0" pb="0.2rem">
            Sign Up
          </Heading>
          <Text mt="0">
            Sign up to complete your order. Already have an account?{" "}
            <Box
              display="inline-block"
              textDecoration="underline"
              cursor="pointer"
              onClick={() => setSignUp(false)}
            >
              Sign in
            </Box>{" "}
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors}>
              <Box mt="1.5rem">
                <FormLabel htmlFor="name">Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i,
                      message: "Enter a valid e-mail address",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </Box>
              <Flex flexWrap="wrap" justifyContent="space-between">
                <Box mt="1.5rem" w={["100%", "100%", "45%", "45%"]}>
                  <FormLabel htmlFor="name">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "This is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </Box>
                <Box mt="1.5rem" w={["100%", "100%", "45%", "45%"]}>
                  <FormLabel htmlFor="name">Verify Password</FormLabel>
                  <Input
                    id="passwordVerification"
                    type="password"
                    {...register("passwordVerification", {
                      validate: value =>
                        value === passwordCurrent ||
                        "The passwords do not match",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.passwordVerification &&
                      errors.passwordVerification.message}
                  </FormErrorMessage>
                </Box>
              </Flex>
              {error ? (
                <Text color="red" mt="1rem">
                  {error === "auth/user-not-found"
                    ? "User not found"
                    : "Incorrect password"}
                </Text>
              ) : (
                ""
              )}
              <Button
                variant="more"
                mt="1.5rem"
                type="submit"
                isLoading={isSubmitting}
              >
                Sign Up
              </Button>
            </FormControl>
          </form>
        </>
      ) : (
        <>
          <Heading as="h4" variant="h4" mb="0">
            Welcome back {load.user.email}
          </Heading>
          <Text>
            Not you?{" "}
            <a
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                signOut(auth)
                setSignUp(false)
                setUserDetails(false)
              }}
            >
              Sign in with a different account
            </a>
          </Text>
        </>
      )}
    </Box>
  )
}

export default SignUp
