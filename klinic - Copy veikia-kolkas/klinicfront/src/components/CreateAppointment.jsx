import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreateAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const today = moment().format("YYYY-MM-DD");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);

    try {
      const { data: response } = await axios.post(
        `${API_URL}/appointments`,
        formData,
        { withCredentials: true }
      );

      console.log(response);
      setMessage("Appointment successfully created!");
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message || "An error occurred, please try again"
            
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
    <div className="flex flex-col items-center w-xl mx-auto">
      <button
        className="bg-blue-500 w-full text-white px-4 py-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="collapseForm"
      >
        + Add Appointment
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        id="collapseForm"
      >
        <div className="mt-2 p-4 rounded-md shadow">
          <form className="w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {/* Owner Name */}
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <label className="w-32" htmlFor="owner_name">
                  Owner Name
                </label>
                <input
                  type="text"
                  id="owner_name"
                  placeholder="Name"
                  className="flex-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset 
                   ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                   focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("owner_name", {
                    required: "Name field cannot be empty",
                    pattern: {
                      value:
                        /^[A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+(\s[A-ZĄČĘĖĮŠŲŪŽa-ząčęėįšųūž]+)*$/,
                      message: "Name must start with an uppercase letter",
                    },
                    minLength: {
                      value: 2,
                      message: "Field should be at least 2 characters",
                    },
                    maxLength: {
                      value: 80,
                      message: "Field should be at most 80 characters",
                    },
                  })}
                />
              </div>
              {errors.owner_name && (
                <p className="text-red-500 text-sm mt-1 ml-36">
                  {errors.owner_name.message}
                </p>
              )}
            </div>

            {/* Pet Name */}
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <label className="w-32" htmlFor="pets_name">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="pets_name"
                  placeholder="Pet Name"
                  className="flex-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset 
                   ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                   focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("pets_name", {
                    required: "Pet name field cannot be empty",
                    pattern: {
                      value:
                        /^[A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+(\s[A-ZĄČĘĖĮŠŲŪŽa-ząčęėįšųūž]+)*$/,
                      message: "Pet name must start with an uppercase letter",
                    },
                    minLength: {
                      value: 2,
                      message: "Field should be at least 2 characters",
                    },
                    maxLength: {
                      value: 80,
                      message: "Field should be at most 80 characters",
                    },
                  })}
                />
              </div>
              {errors.pets_name && (
                <p className="text-red-500 text-sm mt-1 ml-36">
                  {errors.pets_name.message}
                </p>
              )}
            </div>

            {/* Date and Time */}
            <div className="flex items-center gap-4">
              {/* Date Input */}
              <div className="flex flex-col w-1/2">
                <div className="flex items-center gap-2">
                  <label className="w-24" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="flex-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset 
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                     focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-10"
                    defaultValue={today}
                    min={today}
                    {...register("date", { required: "Date is required" })}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1 ml-36">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Time Input */}
              <div className="flex flex-col w-1/2">
                <div className="flex items-center gap-2">
                  <label className="w-24" htmlFor="time">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="flex-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset 
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                     focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="00:00"
                    {...register("time", { required: "Time is required" })}
                  />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1 ml-26">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <label className="w-32" htmlFor="notes">
                  Notes
                </label>
                <input
                  type="text"
                  id="notes"
                  placeholder="Notes"
                  className="flex-1 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset 
       ring-gray-300 placeholder:text-gray-400 focus:ring-2 
       focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("notes", {
                    required: "Notes field cannot be empty",
                    minLength: {
                      value: 2,
                      message: "Field should be at least 2 characters",
                    },
                    maxLength: {
                      value: 255,
                      message: "Field should be at most 255 characters",
                    },
                  })}
                />
              </div>
              {errors.notes && (
                <p className="text-red-500 text-sm mt-1 ml-36">
                  {errors.notes.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
            <button
              type="submit"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded item text-white"
            >
              Add appointment
            </button>
            </div>
            {message && <p className="text-green-500 mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
