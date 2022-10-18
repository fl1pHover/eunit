import {
     Flex,
     NumberDecrementStepper,
     NumberIncrementStepper,
     NumberInput,
     NumberInputField,
     NumberInputStepper,
     Slider,
     SliderFilledTrack,
     SliderThumb,
     SliderTrack,
} from "@chakra-ui/react";
import React from "react";

function Estimator() {
     const [value, setValue] = React.useState(0);
     const handleChange = (value) => setValue(value);

     return (
          <Flex>
               <NumberInput
                    maxW="100px"
                    mr="2rem"
                    value={value}
                    onChange={handleChange}
               >
                    <NumberInputField />
                    <NumberInputStepper>
                         <NumberIncrementStepper />
                         <NumberDecrementStepper />
                    </NumberInputStepper>
               </NumberInput>
               <Slider
                    flex="1"
                    focusThumbOnChange={false}
                    value={value}
                    onChange={handleChange}
               >
                    <SliderTrack>
                         <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb
                         fontSize="sm"
                         boxSize="32px"
                         children={value}
                    />
               </Slider>
          </Flex>
     );
}

export default Estimator;
