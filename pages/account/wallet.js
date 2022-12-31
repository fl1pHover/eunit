import { Heading, Stack, TabPanel } from "@chakra-ui/react";

const Wallet = () => {
     return (
          <>
               <TabPanel display={{ base: "block", md: "none" }}>
                    <Heading variant={"mediumHeading"}>Хэтэвч</Heading>
               </TabPanel>
               <Stack display={{ base: "none", md: "flex" }}>asd</Stack>
          </>
     );
};

export default Wallet;
