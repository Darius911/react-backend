import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      //destruktorius kad isvengti  response.data.data
      const { data: response } = await axios.post(
        `${API_URL}/users/login`,
        formData,
        { withCredentials: true }
      );

      // console.log(response.data);

      setUser(response.data);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto"
    >
      <div>{error}</div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full border border-green-500  rounded-xl"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="mt-1 w-full border border-green-500  rounded-xl"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="w-full">
        Login
      </button>
    </form>
  );
}
