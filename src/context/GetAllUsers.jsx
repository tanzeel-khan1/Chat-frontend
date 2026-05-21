// import { useEffect, useState } from "react";
// import cookies from "js-cookie";
// import axios from "axios";

// const GetAllUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const token = cookies.get("jwt");

//         const response = await axios.get(
//           "https://my-app1111.bonto.run/api/get-all-users",
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setAllUsers(response.data);
//       } catch (error) {
//         console.log("Error in GetAllUsers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   return [allUsers, loading];
// };

// export default GetAllUsers;
import { useEffect, useState } from "react";
import axios from "axios";

const GetAllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://my-app1111.bonto.run/api/get-all-users"
        );

        console.log(res.data);

        setAllUser(res.data.users); // ✅ IMPORTANT FIX
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return [allUser, loading];
};

export default GetAllUsers;