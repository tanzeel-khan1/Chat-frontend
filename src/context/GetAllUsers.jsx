import { useEffect, useState } from "react";
import cookies from "js-cookie";
import axios from "axios";

const GetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = cookies.get("jwt");

        const response = await axios.get(
          "https://my-app1111.bonto.run/api/get-all-users",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in GetAllUsers:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
};

export default GetAllUsers;
