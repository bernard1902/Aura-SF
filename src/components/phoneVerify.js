import React, { useEffect, useState, useRef } from "react"
import {
  Box,
  Heading,
  Text,
  Flex,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react"

import { useForm } from "react-hook-form"

import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber,
} from "firebase/auth"

const PhoneVerify = ({ auth, setPhoneNumber }) => {
  const [phoneId, setPhoneID] = useState(false)
  const [linked, setLinked] = useState(false)
  const [changed, setChanged] = useState(false)

  const recaptchaRef = useRef()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const provider = new PhoneAuthProvider(auth)

  const onSubmit = async values => {
    setLinked(false)
    setPhoneID(false)
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear()
      recaptchaRef.current.innerHTML = `<div id="sign-in-button"></div>`
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      auth
    )
    await provider
      .verifyPhoneNumber("+1" + values.phoneNumber, window.recaptchaVerifier)
      .then(function (verificationId) {
        setPhoneID(verificationId)
        return
      })
      .catch(er => console.log(er))
  }

  const handleLink = async values => {
    const authCreds = PhoneAuthProvider.credential(
      phoneId,
      values.verificationCode
    )
    updatePhoneNumber(auth.currentUser, authCreds).then(resp => {
      setLinked(true)
      setPhoneNumber(values.phoneNumber)
    })
  }

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: response => {
          console.log("Done")
        },
      },
      auth
    )
    if (auth.currentUser) {
      setPhoneNumber(auth.currentUser.phoneNumber)
    }
  }, [auth])

  return (
    <Box mt="1rem">
      <Box id="sign-in-wrapper" ref={recaptchaRef}>
        <Box id="sign-in-button" />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.phoneNumber}>
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Box w="60%">
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Input
                errorBorderColor="gray.200"
                type="phoneNumber"
                id="phoneNumber"
                defaultValue={
                  auth.currentUser ? auth.currentUser.phoneNumber : ""
                }
                placeholder="6505130514"
                onKeyDown={() => setChanged(true)}
                {...register("phoneNumber", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.phoneNumber && errors.phoneNumber.message}
              </FormErrorMessage>
            </Box>
            <Box w="35%">
              <Button
                isLoading={isSubmitting}
                type="submit"
                w="100%"
                disabled={changed ? false : true}
              >
                Send SMS
              </Button>
            </Box>
          </Flex>
        </FormControl>
      </form>
      <Box
        transform={phoneId ? "scaleY(100%)" : "scaleY(0)"}
        height={phoneId ? "100%" : "0"}
        overflow="hidden"
        transition="all 275ms ease-in-out"
      >
        <Box display={linked ? "block" : "none"} mt="1rem">
          <Text>Phone number linked!</Text>
        </Box>
        <Box display={linked ? "none" : "block"}>
          <form onSubmit={handleSubmit(handleLink)}>
            <FormControl isInvalid={errors.verificationCode}>
              <Flex
                justifyContent="space-between"
                alignItems="flex-end"
                mt="1rem"
              >
                <Box w="60%">
                  <FormLabel htmlFor="verificationCode">
                    Verification Code
                  </FormLabel>
                  <Input
                    errorBorderColor="gray.200"
                    type="verificationCode"
                    id="verificationCode"
                    {...register("verificationCode")}
                  />
                  <FormErrorMessage>
                    {errors.verificationCode && errors.verificationCode.message}
                  </FormErrorMessage>
                </Box>
                <Box w="35%">
                  <Button
                    isLoading={isSubmitting}
                    variant="more"
                    type="submit"
                    w="100%"
                  >
                    Link Phone
                  </Button>
                </Box>
              </Flex>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default PhoneVerify
