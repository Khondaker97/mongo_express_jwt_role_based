import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/";

// axios.interceptors.response.use(
//   (resp) => resp,
//   async (err) => {
//     if (err.response.status === 401) {
//       const response = await axios.post("token", {});
//       if (response.status === 200) {
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data["accessToken"]}`;
//         return axios(err.config);
//       }
//     }
//     return err;
//   }
// );
