import {  useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import UserContext  from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    console.log(formData);
    
    try {
      //destruktorius kad isvengti  response.data.data
      const { data: response } = await axios.post(
        `${API_URL}/users/login`,
        formData,
        { withCredentials: true }
      );

      console.log(response);

      setUser(response.data);
      setError(null);
      navigate("/appointments");
    } catch (error) {
      // axios.isAxiosError(error) is a built-in method in Axios that checks whether the error object comes from an Axios request.
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message || "An Error occured, please try again"
          );
        } else if (error.request) {
          setError("No respo se from server. Chaeck internet connection");
        } else {
          setError("Something went wrong. Please try again");
        }
      } else {
        setError("An unespected error accured");
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-lg  px-8 p-16 rounded-lg"
      >
        
        <div>
        <label htmlFor="email" className="block text-md font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1  input input-bordered w-full border border-b-blue-950 rounded-md p-1"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-md font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1  input input-bordered w-full border border-b-blue-950 rounded-md p-1"
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
        <div className="flex justify-center">
          <button type="submit" className="w-1/3  bg-blue-950 rounded-xl text-white py-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
