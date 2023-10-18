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
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import firebase from "../context/firebase"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

import LoadContext from "../context/LoadContext"

const Login = ({ setSignUp, setUserDetails }) => {
  const load = useContext(LoadContext)
  const [error, setError] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const auth = getAuth()

  const onSubmit = values => {
    return new Promise(resolve => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user
          setError(false)
          resolve()
          // ...
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          setError(errorCode)
          resolve()
        })
    })
  }
  console.log(setSignUp)
  return (
    <Box>
      {!load.user ? (
        <>
          <Heading as="h4" variant="h4" mb="0" pb="0.2rem">
            Sign In
          </Heading>
          <Text mt="0">
            Sign in to complete your order. Don’t have an account?{" "}
            <Box
              display="inline-block"
              textDecoration="underline"
              cursor="pointer"
              onClick={() => setSignUp(true)}
            >
              Sign up
            </Box>
            .
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Box mt="1.5rem">
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
              Sign In
            </Button>
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

export default Login
