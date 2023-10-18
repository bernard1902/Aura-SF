import React from "react"

import { LoadProvider } from "./src/context/LoadContext"
import "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"

export const wrapRootElement = ({ element }) => (
  <LoadProvider>{element}</LoadProvider>
)
