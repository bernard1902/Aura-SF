import { extendTheme } from "@chakra-ui/react"
import fonts from "./fonts"
import colors from "./colors"

const line = {
  borderBottom: "1px solid black",
  width: "100%",
  position: "absolute",
  bottom: "-0.2rem",
  left: "0",
  transformOrigin: "left center",
  transition: "all 215ms ease-in-out",
}

const theme = {
  ...fonts,
  ...colors,
  components: {
    Text: {
      baseStyle: {
        fontSize: ["14px", "15px", "16px", "17px", "18px", "21px"],
        fontWeight: "light",
        color: "rgb(75,75,75)",
        fontFamily: "Fira Sans, Tenor Sans, Work Sans, Helvetica",
        marginBottom: "1rem",
      },
      variants: {
        caption: {
          fontSize: ["11px", "12px", "14px", "18px"],
          fontWeight: "400",
        },
        toggled: {
          position: "relative",
          _after: {
            content: '" "',
            ...line,
          },
        },
        link: {
          position: "relative",
          _after: {
            content: '" "',
            ...line,
            transform: "scaleX(0)",
          },
          _hover: {
            _after: {
              transform: "scaleX(1)",
            },
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "primary",
        fontFamily: "Tenor Sans, Fira Sans, Work Sans, Helvetica",
        fontWeight: "400",
        paddingBottom: "1rem",
      },
      variants: {
        h1: {
          fontSize: ["24px", "26px", "28px", "31px", "34px", "38px"],
        },
        h4: {
          fontSize: ["22px", "24px", "26px", "28px", "31px", "34px"],
        },
        h6: {
          fontSize: ["14px", "14px", "16px", "16px", "21px", "21px"],
          fontFamily: "Fira Sans, Tenor Sans, Work Sans, Helvetica",
        },
        caption: {
          fontSize: ["14px", "14px", "15px", "15px", "16px", "16px"],
          fontFamily: "Fira Sans, Work Sans, Helvetica",
        },
      },
    },
    Divider: {
      baseStyle: {
        color: "primary",
        opacity: 1,
      },
    },
    Button: {
      baseStyle: {
        fontSize: ["14px", "16px", "18px", "26px"],
        fontFamily: "Work Sans, Helvetica",
        fontWeight: "500",
      },
      variants: {
        more: {
          borderRadius: "5px",
          bg: "primary",
          color: "white",
          padding: "1.5rem 2.5rem",
          fontWeight: "bold",
          letterSpacing: "1px",
          _hover: {
            bg: "secondary",
          },
        },
        less: {
          borderRadius: "5px",
          bg: "none",
          color: "#000",
          padding: "1.5rem 3rem",
          border: "1px solid rgba(0,0,0,0.6)",
          _hover: {
            bg: "#000",
            color: "#fff",
          },
        },
      },
    },
  },

  styles: {
    global: {
      html: {
        height: "-webkit-fill-available",
      },
      ".tl-edges": {
        minHeight: "100vh",
        minHeight: "-webkit-fill-available",
      },
    },
  },
}

export default extendTheme(theme)
