import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUpForm() {
  const [error, setError] = useState(null);

  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // getValues metodas patikrinimui, kad slaptažodžiai sutaptų
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    
    
    try {
      // Destruktorius, kad išvengtumėte `response.data.data` naudojimo
      const { data: response } = await axios.post(
        `${API_URL}/users/signup`,
        formData,
        { withCredentials: true }
        
        
      );

      

      

      setUser(response.data);
      setError(null);
      navigate("/appointments"); // Peradresavimas į paskyras, kai registracija sėkminga
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message || "An Error occurred, please try again"
          );
        } else if (error.request) {
          setError("No response from server. Check internet connection");
        } else {
          setError("Something went wrong. Please try again");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto flex flex-col w-full h-screen"
    >
      <div>{error && <p className="text-red-500 text-sm">{error}</p>}</div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Username
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Username is required" })}
          className="mt-1 w-full border border-green-500 rounded-xl"
          placeholder="Enter your username"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="mt-1 w-full border border-green-500 rounded-xl"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 w-full border border-green-500 rounded-xl"
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match", // Patikrinama, ar slaptažodžiai sutampa
          })}
          className="mt-1 w-full border border-green-500 rounded-xl"
          placeholder="Confirm your password"
        />
        {errors.password_confirm && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" className="w-1/3 bg-pink-400 rounded-xl flex justify-center py-2">
        Sign Up
      </button>
    </form>
  );
}
