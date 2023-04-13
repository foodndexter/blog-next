import { createStitches } from "@stitches/react"
import { colors } from "@/assets"

const { styled } = createStitches({
  media: {
    mobile: "(min-width:320px) and (max-width: 767px)",
    tablet: "(min-width:768px) and (max-width: 1199px)",
    labtop: "(min-width:1200px) and (max-width: 1439px)",
    desktop: "(min-width:1440px)",
    mobileDevice: "(min-width:320px) and (max-width: 1199px)",
    pc: "(min-width:1200px) and (max-width: 1199px)",
    smallerScreen: "(min-width:320px) and (max-width: 899px)",
    largerScreen: "(min-width:900px)",
    min320: "(min-width: 320px)",
    min500: "(min-width: 500px)",
    min768: "(min-width: 768px)",
    min900: "(min-width: 900px)",
    min1200: "(min-width: 1200px)",
  },
})

const View = styled("div", {
  display: "flex",
  flexDirection: "column",
  variants: {
    type: {
      row: {
        flexDirection: "row",
      },
      bg: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,.1)",
      },
    },
    position: {
      fixed: {
        position: "fixed",
      },
      relative: {
        position: "relative",
      },
      absolute: {
        position: "absolute",
      },
    },
    border: {
      on: {
        border: "1px solid",
      },
    },
    transition: {
      on: {
        transition: "all .5s ease-out",
      },
    },
  },
})

const Button = styled("button", {
  border: "none",
  borderRadius: 5,
  padding: 10,
  height: 40,
  backgroundColor: colors.lightGrey,
  variants: {
    color: {
      blue: {
        backgroundColor: colors.blue,
        color: "white",
      },
      red: {
        backgroundColor: colors.red,
        color: "white",
      },
      black: {
        backgroundColor: colors.black,
        color: "white",
      },
      grey: {
        backgroundColor: colors.grey,
        color: "white",
      },
      lightGrey: {
        backgroundColor: colors.lightGrey,
        color: colors.black,
      },
      white: { backgroundColor: "White", color: colors.black },
    },
  },
})

export { View, Button }
