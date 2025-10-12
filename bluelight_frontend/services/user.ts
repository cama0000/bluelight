import { User } from "@/types/user";
import axios from "axios";

export const login = async(userBody : User, token : string) => {
    // axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}user/add`, userBody)
    // .then((res) =>{
    //     // toast.success("Registration successful!");

    //     const token = res.data.token;
    //     // localStorage.setItem('access_token', token)
    //     // setStudentFromToken();
    // })
    // .catch((res) =>{
    //     // toast.error("Registration unsuccessful.");
    //     console.log(res)
    // })

    await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}user/login`, userBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
}