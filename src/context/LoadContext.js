import React from "react"

import firebase from "./firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const defaultState = {
  loaded: false,
  cart: [],
  items: 0,
  signup: false,
  setSignup: () => {},
  setLoaded: () => {},
  setCart: () => {},
  setItems: () => {},
  cartStatus: false,
  setCartStatus: () => {},
  user: false,
}

const LoadContext = React.createContext(defaultState)

const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorage = (key, initialValue) => {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  } catch (e) {
    return initialValue
  }
}

class LoadProvider extends React.Component {
  state = {
    loaded: false,
    signup: false,
    cart: getLocalStorage("cart", []),
    items: getLocalStorage("cart", [])
      .map((item, i) => item.quantity)
      .reduce((a, b) => a + b, 0),
    cartStatus: false,
    user: false,
  }

  setUser = user => {
    this.setState({
      user: user,
    })
  }

  componentDidMount() {
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
      if (user) {
        this.setState({ user: user })
      } else {
        this.setState({ user: false })
      }
    })
  }

  setLoaded = value => {
    this.setState({
      loaded: value,
    })
  }
  setCart = value => {
    setLocalStorage("cart", value)
    this.setState({
      cart: value,
    })
  }
  setItems = value => {
    this.setState({
      items: value,
    })
  }
  setCartStatus = value => {
    this.setState({
      cartStatus: value,
    })
  }
  setSignup = value => {
    setLocalStorage("signup", value)
    console.log(value)
    this.setState({
      signup: value,
    })
  }
  render() {
    const { children } = this.props
    const { loaded, cart, items, cartStatus, user, signup } = this.state
    return (
      <LoadContext.Provider
        value={{
          loaded,
          cart,
          items,
          cartStatus,
          user,
          signup,
          setLoaded: this.setLoaded,
          setCart: this.setCart,
          setItems: this.setItems,
          setCartStatus: this.setCartStatus,
          setSignup: this.setSignup,
        }}
      >
        {children}
      </LoadContext.Provider>
    )
  }
}

export default LoadContext

export { LoadProvider }
