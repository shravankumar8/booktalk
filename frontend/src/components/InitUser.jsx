// components/InitUser.jsx

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import url from "../assets/url";
import { userState } from "../store/atom/admin";
export function InitUser() {
  const setAdmin = useSetRecoilState(userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/profile/me`, {
          headers: {
            authorization: "bearer " + localStorage.getItem("JwtToken"),
          },
        });

        if (response.data.username) {
          setAdmin({
            isLoading: false,
            userMail: response.data.username,
          });
        } else {
          setAdmin({
            isLoading: false,
            userMail: null,
          });
        }
      } catch (e) {
        setAdmin({
          isLoading: false,
          userMail: null,
        });
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [setAdmin]);

  return null; // InitUser doesn't render anything
}
export default InitUser;