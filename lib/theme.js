import { extendTheme } from "@chakra-ui/react";

const styles = {
     global: {
          body: {
               bg: "#eef0f2",
               color: "#36454f",
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
               fontSize: "14px",
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
                    bg: "mainBlue",
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
               mediumHeading: {
                    fontSize: "20px",
               },
          },
     },
     Input: {
          baseStyle: {
               field: {
                    bg: "red.200",
               },
               addon: {
                    border: "#181818",
               },
               borderColor: "#181818",
          },
     },
};

const textStyles = {
     smallHeading: {
          fontSize: "30px",
     },
};
const Input = {
     baseStyle: {
          field: {
               borderColor: "#181818",
               _hover: {
                    borderColor: "#181818",
               },
          },
     },
     sizes: {},
     defaultProps: {},
};
const colors = {
     bgGrey: "#eef0f2",
     grey: "#676767",
     dark: "#181818",
     mainBlossom: "#1d1e44",
     mainBlue: "#4b65f6",
};

const theme = extendTheme({
     styles,
     components,
     // shadows,
     textStyles,
     colors,
     Input,
});
export default theme;
