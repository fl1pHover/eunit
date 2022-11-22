import { extendTheme } from "@chakra-ui/react";
const activeLabelStyles = {
     transform: "scale(0.75) translateY(-16px)",
};
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
               fontSize: "13px",
          },
     },
     Form: {
          variants: {
               floating: {
                    container: {
                         _focusWithin: {
                              label: {
                                   ...activeLabelStyles,
                              },
                         },
                         "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
                              {
                                   ...activeLabelStyles,
                              },
                         label: {
                              top: -1,
                              left: 0,
                              zIndex: 2,
                              position: "absolute",
                              backgroundColor: "white",
                              pointerEvents: "none",
                              mx: 3,
                              px: 1,
                              my: 2,
                              transformOrigin: "left top",
                         },
                    },
               },
          },
     },

     Link: {
          baseStyle: {
               _hover: { textDecoration: "none" },
          },
          variants: {
               main: {
                    variants: "outline",
                    borderWidth: "4px",
                    color: "mainBlossom",
               },
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
          },
          variants: {
               whiteButton: {
                    bg: "white",
                    px: "20px",
                    _hover: {
                         bg: "mainBlossom",
                         borderWidth: "1px",
                         borderColor: "white",
                         color: "white",
                    },
               },
               blueButton: {
                    bg: "mainBlue",
                    color: "white",
                    px: "20px",
                    _hover: {
                         bg: "mainBlossom",
                         borderWidth: "1px",
                         borderColor: "white",
                         color: "white",
                    },
               },
               blackButton: {
                    bg: "dark",
                    color: "white",
                    px: "20px",
               },
               darkButton: {
                    bg: "mainBlossom",
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
     MenuItem: {
          baseStyle: {},
          _hover: {
               bgColor: "transparent !important",
          },
          variants: {
               asd: {
                    _hover: {
                         bgColor: "transparent !important",
                    },
               },
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
     blueGrey: "#b1bac5",
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
