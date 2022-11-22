import { GridItem, Heading, Select, TabPanel, Text } from "@chakra-ui/react";
import { Input } from "postcss";
import { Grid } from "swiper";

const Personal = () => {
     return (
          <TabPanel>
               <Heading variant={"mediumHeading"}>Хувийн мэдэээлэл</Heading>
               <Grid templateColumns={"repeat(2,1fr)"} gap={5} mt={5}>
                    <GridItem>
                         <Text fontWeight={"bold"} mb={2}>
                              Нэр
                         </Text>
                         <Input type={"text"} placeholder="Нэр" />
                    </GridItem>
                    <GridItem>
                         <Text fontWeight={"bold"} mb={2}>
                              Овог
                         </Text>
                         <Input type={"text"} placeholder="Овог" />
                    </GridItem>
                    <GridItem>
                         <Text fontWeight={"bold"} mb={2}>
                              Хүйс
                         </Text>
                         <Select variant="outline">
                              <option value="option1">Эрэгтэй</option>
                              <option value="option2">Эмэгтэй</option>
                         </Select>
                    </GridItem>
                    <GridItem>
                         <Text fontWeight={"bold"} mb={2}>
                              Төрсөн өдөр
                         </Text>

                         <Input type={"date"} placeholder="yyyy/mm/dd" />
                    </GridItem>
               </Grid>
          </TabPanel>
     );
};

export default Personal;
