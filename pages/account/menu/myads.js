import AdContent from '../../../components/home/adContent'
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Myads = () => {
     const [products, setProducts] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const getData = async () => {
          setIsLoading(true);
          try {
               await fetch("https://bom-location.herokuapp.com/ad")
                    .then((r) => r.json())
                    .then((d) => setProducts(d))
                    .then((a) => setIsLoading(false));
          } catch (error) {
               console.log(error);
          }
     };

     const toLowerCase = (text) => {
          if (text) {
               return text.toLowerCase();
          }
     };
     useEffect(() => {
          getData();
     }, []);

     const router = useRouter();

     return (
          <Stack display={{ base: "flex", md: "none" }} mx={5}>
             
               <AdContent data={products} tlc={toLowerCase} title=" " />
          </Stack>
     );
};

export default Myads;
