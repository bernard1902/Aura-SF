import { useForm, Controller } from "react-hook-form"
import React, { useState } from "react"
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Box,
  Divider,
  Text,
  Checkbox,
} from "@chakra-ui/react"

import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore"

import { getFirestore } from "firebase/firestore"

const ContactForm = () => {
  const [distributor, setDistributor] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm()

  const half = ["100%", "100%", "100%", "45%", "45%", "45%"]

  const distributorFields = [
    {
      label: "Legal (Licensed) Business Name",
      value: "legalName",
      required: false,
    },
    {
      label: "FEIN-Federal ID Number ",
      value: "feinNumber",
      required: false,
    },
    {
      label: "DBA-Doing Business As ",
      value: "dba",
      required: false,
    },
    {
      label: "Street Address",
      value: "streetAddress",
      required: false,
    },
    {
      label: "Street Address Line 2",
      value: "streetAddressTwo",
      required: false,
    },
    {
      label: "City",
      value: "city",
      required: false,
    },
    {
      label: "State",
      value: "state",
      width: half,
      required: false,
    },
    {
      label: "Postal / Zip Code",
      value: "postalCode",
      type: "number",
      width: half,
      required: false,
    },
    {
      label: "Primary Contact First & Last Name",
      value: "primaryContact",
      required: false,
    },
    {
      label: "Primary Contact Phone Number",
      value: "primaryContactPhone",
      required: false,
    },
    {
      label: "Primary Contact Email",
      value: "primaryContactEmail",
      required: false,
    },
    {
      label: "License Holder's Name",
      value: "licenseHolderName",
      required: false,
    },
    {
      label: "License Holder's Phone Number",
      value: "licenseHolderPhoneNumber",
      required: false,
    },
    {
      label: "License Holder's Email",
      value: "licenseHolderEmail",
      required: false,
    },
  ]

  const checkBoxes = [
    {
      label: "Type of BCC Licenses",
      value: "bccLicenses",
      data: [
        { label: "Cultivation", value: "cultivation" },
        { label: "Manufacturing", value: "manufacturing" },
        { label: "Distribution", value: "distribution" },
        { label: "Retail", value: "retail" },
        { label: "Micro-business", value: "microbusiness" },
      ],
    },
    {
      label: "Products / Service able to provide (Check all that Apply)",
      value: "productsProvided",
      data: [
        { label: "Manufacturing", value: "manufacturing" },
        { label: "Distribution", value: "distribution" },
        { label: "Retail", value: "retail" },
        { label: "Delivery", value: "delivery" },
        { label: "Veg/Teens", value: "vegTeens" },
        { label: "Extracts", value: "extracts" },
        { label: "CBD Distillate or Products", value: "cbdDistilateProducts" },
        { label: "Edibles / Beverages", value: "ediblesBeverages" },
        { label: "Testing", value: "testing" },
        { label: "Other", value: "other" },
      ],
    },
  ]

  const db = getFirestore()

  const onSubmit = async values => {
    await addDoc(collection(db, "contact"), {
      distributor: distributor,
      response: values,
    })
      .then(resp => {
        setSubmitted(true)
        console.log(resp)
      })
      .catch(err => console.log(err))
    return
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Button
          w={["100%", "100%", "100%", "45%", "45%", "45%"]}
          variant={distributor ? "less" : "more"}
          onClick={() => setDistributor(false)}
          mb="2rem"
        >
          I am a customer
        </Button>
        <Button
          w={["100%", "100%", "100%", "45%", "45%", "45%"]}
          variant={distributor ? "more" : "less"}
          onClick={() => setDistributor(true)}
          mb="2rem"
        >
          I would like to be a distributor
        </Button>
      </Flex>
      {distributor ? (
        <Box m="2rem 0">
          <Text>
            We appreciate your interest in doing business with us. Please
            provide us with the following details:
          </Text>
        </Box>
      ) : (
        ""
      )}
      <FormControl isInvalid={errors.name}>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Box w={["100%", "100%", "49%", "49%"]} mt="1.5rem">
            <FormLabel htmlFor="name">First name *</FormLabel>
            <Input
              id="firstName"
              {...register("firstName", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </Box>
          <Box w={["100%", "100%", "49%", "49%"]} mt="1.5rem">
            <FormLabel htmlFor="name">Last name *</FormLabel>
            <Input
              id="lastName"
              {...register("lastName", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </Box>
          <Box w={["100%"]} mt="1.5rem">
            <FormLabel htmlFor="name">Email Address *</FormLabel>
            <Input
              id="emailAddress"
              {...register("emailAddress", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.emailAddress && errors.emailAddress.message}
            </FormErrorMessage>
          </Box>
          <Box w={["100%"]} mt="1.5rem">
            <FormLabel htmlFor="name">Phone *</FormLabel>
            <Input
              id="phone"
              {...register("phone", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </Box>
          {distributor ? (
            <>
              <Divider mt="2rem" />
              {distributorFields.map((field, i) => (
                <Box
                  w={field.width ? field.width : ["100%"]}
                  mt="1.5rem"
                  key={i}
                >
                  <FormLabel htmlFor={field.value}>{field.label}</FormLabel>
                  <Input
                    id={field.value}
                    {...register(
                      field.value,
                      field.required === false
                        ? ""
                        : {
                            required: "This is required",
                            minLength: {
                              value: 4,
                              message: "Minimum length should be 4",
                            },
                          }
                    )}
                  />
                  <FormErrorMessage>
                    {errors[field.value] && errors[field.value].message}
                  </FormErrorMessage>
                </Box>
              ))}
              {checkBoxes.map((field, i) => (
                <Box
                  w={field.width ? field.width : ["100%"]}
                  mt="1.5rem"
                  key={i}
                >
                  <FormLabel mb="1.5rem">{field.label}</FormLabel>
                  {field.data.map((dat, k) => (
                    <Box key={k} mb="1rem">
                      <Controller
                        control={control}
                        name={field.value + "." + dat.value}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <Checkbox
                            onChange={onChange}
                            isChecked={value}
                            ref={ref}
                          >
                            {dat.label}
                          </Checkbox>
                        )}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </>
          ) : (
            ""
          )}
        </Flex>
      </FormControl>
      {submitted ? (
        <Text mt="1rem">
          Thank you for reaching out to us! We'll get back to you shortly.
        </Text>
      ) : (
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      )}
    </form>
  )
}
export default ContactForm
