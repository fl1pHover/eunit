import urls from "@/constants/api";
import { getCookie } from "cookies-next";

const Admin = ({ propAds }) => {};
export default Admin;

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });

  if (token) {
    try {
      const response = await fetch(`${urls["test"]}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // const adRes = await
      if (user?.userType == "admin" || user?.userType == "system") {
        return {
          redirect: {
            destination: "/admin/request/realState",
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    } catch (err) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
