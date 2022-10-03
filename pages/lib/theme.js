import { extendTheme } from "@chakra-ui/react";

const styles = {
     global: {
          body: {
               bg: "#eef0f2",
               color: "#181818",
          },
     },
     // global: {
     //      body: {
     //           backgroundColor: "#ececec",
     //      },
     // },
};

// const shadows = {
//      "dark-lg":
//           "#ff6263 0px 0px 0px 1px, #ff6263 0px 5px 10px, #ff6263  0px 15px 40px",
// };

const components = {
     Text: {
          baseStyle: {
               fontSize: "13px",
          },
     },

     Link: {
          baseStyle: {
               _hover: { textDecoration: "none" },
          },
     },
     Select: {
          baseStyle: {
               bgColor: "mainBlossom",
          },
     },
     Button: {
          baseStyle: {
               borderRadius: "30px",
               bgColor: "red",
               px: "10px",
               borderWidth: "1px",
               borderColor: "transparent",
               _hover: {
                    bg: "mainBlossom",
                    borderWidth: "1px",
                    borderColor: "white",
                    color: "white",
               },
          },
          variants: {
               whiteButton: {
                    bg: "white",
                    px: "20px",
               },
               blackButton: {
                    bg: "black",
                    color: "white",
                    px: "20px",
               },
          },
     },
     Heading: {
          baseStyle: {
               fontWeight: "bold",
               fontSize: "12px",
          },
          variants: {
               smallHeading: { fontSize: "16px" },
          },
     },
};

const textStyles = {
     // asd
};

const colors = {
     bgGrey: "#eef0f2",
     grey: "#676767",
     dark: "#181818",
     mainBlossom: "#ff6263",
};

const theme = extendTheme({
     styles,
     components,
     // shadows,
     textStyles,
     colors,
});
export default theme;
