import { useRouter } from "next/router";

const Back = () => {
     const router = useRouter();
     return (
          <    >
               <button onClick={() => router.back()}>Back</button>
          </>
     );
};

export default Back;
