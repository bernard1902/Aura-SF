import React, { useState, useEffect, useContext } from "react"
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
import { useForm, Controller } from "react-hook-form"

import { useStaticQuery, graphql, navigate } from "gatsby"

import { getAuth } from "firebase/auth"

import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore"

import { getFirestore } from "firebase/firestore"

import LoadContext from "../context/LoadContext"

import Select from "react-select"

import find from "lodash.find"

import { zipcodes } from "../utils/zipcodes"

import PhoneVerify from "./phoneVerify"

const Details = ({
  setCartStatus,
  userDetails,
  setUserDetails,
  discounts,
  subTotal,
  settings,
  cityTax,
}) => {
  const auth = getAuth()
  const user = auth.currentUser
  const [error, setError] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [discountType, setDiscountType] = useState(false)
  const [city, setCity] = useState(false)

  const [discountCode, setDiscountCode] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState(false)

  const discountedSubtotal = (subTotal * (discount / 100)).toFixed(2)

  const cityRate = city ? find(cityTax, { node: { city: city } }).node.rate : ""

  const cityRateComputed = (
    ((subTotal - discountAmount) * parseFloat(cityRate.slice(0, -1))) /
    100
  ).toFixed(2)

  const db = getFirestore()

  const load = useContext(LoadContext)

  const exciseTax = settings.exciseTax

  const exciseTaxComputed = ((subTotal - discountAmount) * exciseTax) / 100

  const totalTax =
    ((subTotal - discountAmount) * parseFloat(cityRate.slice(0, -1))) / 100 +
    exciseTaxComputed

  const total =
    discountType === "percentage"
      ? (subTotal * (1 - discount / 100) + totalTax).toFixed(2)
      : discountType === "fixed"
      ? (parseFloat(subTotal) - discount + totalTax).toFixed(2)
      : (parseFloat(subTotal) + totalTax).toFixed(2)

  const handleDiscount = value => {
    const searchedDiscount = find(discounts.edges, { node: { code: value } })
    if (searchedDiscount) {
      if (
        searchedDiscount.node.expiry &&
        new Date(Date.parse(searchedDiscount.node.expiry.replace(/-/g, " "))) <=
          new Date()
      ) {
        setDiscount(0)
        setDiscountAmount(0)
        setDiscountType("This discount code has expired")
        setDiscountCode(false)
        return
      }
      if (userDetails.discounts && userDetails.discounts.includes(value)) {
        setDiscount(0)
        setDiscountAmount(0)
        setDiscountType("This discount code has already been used")
        setDiscountCode(false)
        return
      }
    }
    if (searchedDiscount) {
      setDiscount(searchedDiscount.node.amount)
      setDiscountType(searchedDiscount.node.type)
      setDiscountCode(value)
      if (searchedDiscount.node.type === "fixed") {
        setDiscountAmount(searchedDiscount.node.amount)
      } else {
        setDiscountAmount(
          subTotal * (searchedDiscount.node.amount / 100).toFixed(2)
        )
      }
    } else {
      setDiscount(0)
      setDiscountAmount(0)
      setDiscountCode(false)
      setDiscountType("This discount code is invalid")
    }
    return
  }

  const cities = cityTax.map(city => ({
    value: city.node.city,
    label: city.node.city,
  }))

  const timeslots = [
    {
      value: "2pm-4pm",
      label: "2pm-4pm",
    },
    {
      value: "4pm-6pm",
      label: "4pm-6pm",
    },
    {
      value: "6pm-8pm",
      label: "6pm-8pm",
    },
  ]

  let dates = []

  const startDate = 1
  const endDate = 8

  for (var i = startDate; i < endDate; i++) {
    let date = new Date()
    date.setDate(date.getDate() + i)
    dates.push({ value: date.toDateString(), label: date.toDateString() })
  }

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  useEffect(async () => {
    if (auth.currentUser) {
      if (auth.currentUser.phoneNumber) {
        setPhoneNumber(auth.currentUser.phoneNumber)
      }
    }
    if (user) {
      setUserDetails(user.uid)
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setUserDetails(data)
        setCity(data.city)
        reset({ city: data.city })
      }
    }
  }, [user])

  const onSubmit = async values => {
    if (phoneNumber) {
      if (user) {
        let usedCodes = userDetails.discounts ? userDetails.discounts : []
        usedCodes.push(discountCode)
        await setDoc(doc(db, "users", user.uid), {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          city: city,
          zipcode: values.zipcode,
          discounts: usedCodes,
        })
          .then(resp => {
            console.log(resp)
          })
          .catch(err => console.log(err))
      }
      await addDoc(collection(db, "orders"), {
        cart: load.cart,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        zipcode: values.zipcode,
        collectionDate: values.collectionDate,
        timeslot: values.timeslot,
        email: user ? user.email : values.email,
        exciseTax: exciseTaxComputed,
        cityRate: cityRateComputed,
        phoneNumber: phoneNumber,
        total: total,
        discount: discountedSubtotal,
      })
        .then(resp => {
          setCartStatus(false)
          navigate("/thank-you/")
        })
        .catch(err => console.log(err))
    } else {
      window.alert("Please verify your phone number")
    }
  }

  return (
    <Box mt="2rem">
      <Heading as="h4" variant="h4" mb="0" pb="0">
        User Details
      </Heading>
      <PhoneVerify auth={auth} setPhoneNumber={setPhoneNumber} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={
            errors.email ||
            errors.firstName ||
            errors.lastName ||
            errors.zipcode ||
            errors.city ||
            errors.collectionDate ||
            errors.timeslot
          }
        >
          <Flex flexWrap="wrap" justifyContent="space-between">
            <Box
              mt="1.5rem"
              w={["100%", "100%", "47%", "47%", "47%", "47%"]}
              color="black"
            >
              <FormLabel htmlFor="name">First Name</FormLabel>
              <Input
                errorBorderColor="gray.200"
                type="firstName"
                defaultValue={userDetails ? userDetails.firstName : ""}
                id="firstName"
                {...register("firstName", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </Box>
            <Box
              mt="1.5rem"
              w={["100%", "100%", "47%", "47%", "47%", "47%"]}
              color="black"
            >
              <FormLabel htmlFor="name">Last Name</FormLabel>
              <Input
                errorBorderColor="gray.200"
                type="lastName"
                id="lastName"
                defaultValue={userDetails ? userDetails.lastName : ""}
                {...register("lastName", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </Box>
            <Box
              mt="1.5rem"
              w={["100%", "100%", "47%", "47%", "47%", "47%"]}
              color="black"
            >
              <FormLabel htmlFor="name">City</FormLabel>
              <Controller
                name="city"
                control={control}
                rules={{ required: "This is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable
                    options={cities}
                    onChange={e => {
                      field.onChange(e.value)
                      setCity(e.value)
                    }}
                    value={{
                      value: city,
                      label: city,
                    }}
                  />
                )}
              />
              <FormErrorMessage>
                {errors.city && errors.city.message}
              </FormErrorMessage>
            </Box>
            <Box
              mt="1.5rem"
              w={["100%", "100%", "47%", "47%", "47%", "47%"]}
              color="black"
            >
              <FormLabel htmlFor="name">Zipcode</FormLabel>
              <Input
                errorBorderColor="gray.200"
                type="zipcode"
                id="zipcode"
                defaultValue={userDetails ? userDetails.zipcode : ""}
                {...register("zipcode", {
                  required: "This is required",
                  validate: value =>
                    zipcodes.includes(parseInt(value)) ||
                    "We currently do not deliver to this zipcode",
                })}
              />
              <FormErrorMessage>
                {errors.zipcode && errors.zipcode.message}
              </FormErrorMessage>
            </Box>
            <Box mt="1.5rem" w={["100%"]} color="black">
              <FormLabel htmlFor="name">Address</FormLabel>
              <Input
                errorBorderColor="gray.200"
                type="address"
                id="address"
                defaultValue={userDetails ? userDetails.address : ""}
                {...register("address", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.address && errors.address.message}
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
          <Heading as="h4" variant="h4" pb="0" pt="1rem" mb="1rem" mt="1rem">
            Delivery Details
          </Heading>
          <Flex flexWrap="wrap" justifyContent="space-between" mb="2rem">
            <Box
              mt="1.5rem"
              w={["100%", "100%", "47%", "47%", "47%", "47%"]}
              color="black"
            >
              <FormLabel htmlFor="name">Collection Date</FormLabel>
              <Controller
                name="collectionDate"
                control={control}
                rules={{ required: "This is required" }}
                render={({ field }) => <Select {...field} options={dates} />}
              />
              <FormErrorMessage>
                {errors.collectionDate && errors.collectionDate.message}
              </FormErrorMessage>
            </Box>
            <Box
              mt="1.5rem"
              w={["100%", "100%", "47%", "47%", "47%", "47%"]}
              color="black"
            >
              <FormLabel htmlFor="name">Timeslot</FormLabel>
              <Controller
                name="timeslot"
                control={control}
                rules={{ required: "This is required" }}
                render={({ field }) => (
                  <Select {...field} options={timeslots} />
                )}
              />
              <FormErrorMessage>
                {errors.timeslot && errors.timeslot.message}
              </FormErrorMessage>
            </Box>
          </Flex>
          <Heading as="h4" variant="h4" pb="0" pt="1rem" mb="1rem" mt="1rem">
            Discount Code
          </Heading>
          <Flex flexWrap="wrap" justifyContent="space-between" mb="2rem">
            <Text>If you have a discount code, enter it here.</Text>
            <Box w={["100%"]} color="black">
              <FormLabel htmlFor="name">Discount Code</FormLabel>
              <Input
                errorBorderColor="gray.200"
                type="discount"
                id="discount"
                {...register("discount")}
                onChange={o => handleDiscount(o.target.value)}
              />
              {discountType !== "fixed" && discountType !== "percentage" ? (
                <Text color="red">{discountType}</Text>
              ) : discountType ? (
                <Text color="primary">Code applied successfully</Text>
              ) : (
                ""
              )}
            </Box>
          </Flex>
          {discountType &&
          discountType !== "This discount code has expired" &&
          discountType !== "This discount code has already been used" &&
          discountType !== "This discount code is invalid" ? (
            <Box w="100%" pb="3rem">
              <Text float="left">
                Discount{" "}
                {discountType === "fixed"
                  ? "(-$" + discount + ")"
                  : discountType === "percentage"
                  ? "(" + discount + "%)"
                  : "error"}
              </Text>
              <Text float="right">
                -{"$"}
                {discountedSubtotal}
              </Text>
            </Box>
          ) : (
            ""
          )}
          <Box w="100%" pb="3rem">
            <Text float="left">Excise Tax {"(" + exciseTax + "%)"}</Text>
            <Text float="right">
              {"$"}
              {exciseTaxComputed.toFixed(2)}
            </Text>
          </Box>
          {city ? (
            <Box w="100%" pb="3rem">
              <Text float="left">
                City Tax - {city} {"(" + cityRate + ")"}
              </Text>
              <Text float="right">
                {"$"}
                {cityRateComputed}
              </Text>
            </Box>
          ) : (
            <Text w="100%" pb="1rem" color="red">
              Please select a City
            </Text>
          )}
          {city ? (
            <Box borderTop={["1px solid #91929b"]} pt="1rem">
              <Box pt="1rem" w="100%">
                <Heading float="left" variant="h4" as="h6">
                  Estimated Total
                </Heading>
                <Heading
                  float="right"
                  variant="h4"
                  as="p"
                  color="black"
                  fontFamily="Fira Sans"
                >
                  {"$"}
                  {total}
                </Heading>
              </Box>
            </Box>
          ) : (
            <Text color="red">
              Total can only be calculated when city is selected
            </Text>
          )}

          <Button
            isLoading={isSubmitting}
            variant="more"
            mt="1.5rem"
            type="submit"
            w="100%"
          >
            SUBMIT ORDER
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}

export default Details
