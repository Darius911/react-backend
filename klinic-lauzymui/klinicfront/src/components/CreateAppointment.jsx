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
    // console.log("Formos duomenys" +formData.date);

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
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-blue-950 w-full text-white px-4 py-2 rounded-md flex justify-center">
        <button
          className="w-full text-white font-semibold py-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="collapseForm"
        >
          + Add Appointment
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        id="collapseForm"
      >
        <div className="flex flex-col mt-2 p-4 rounded-md shadow bg-white">
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Owner Name */}
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label
                  className="md:w-32 sm:w-32 xs:w-full w-full block text-left"
                  htmlFor="owner_name"
                >
                  Owner Name
                </label>
                <input
                  type="text"
                  id="owner_name"
                  placeholder="Name"
                  className="w-full sm:w-3/4 md:w-3/4 rounded-md border py-2 px-3 shadow-sm focus:ring-2 focus:ring-indigo-600"
                  {...register("owner_name", {
                    required: "Name field cannot be empty",
                  })}
                />
              </div>
              {errors.owner_name && (
                <p className="text-red-500 text-sm mt-1 text-left xs:ml-0 sm:ml-73 md:ml-73">
                  {errors.owner_name.message}
                </p>
              )}
            </div>

            {/* Pet Name */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label
                className="md:w-32 sm:w-32 xs:w-full w-full block text-left"
                htmlFor="pets_name"
              >
                Pet Name
              </label>
              <input
                type="text"
                id="pets_name"
                placeholder="Pet Name"
                className="w-full sm:w-3/4 md:w-3/4 rounded-md border py-2 px-3 shadow-sm focus:ring-2 focus:ring-indigo-600"
                {...register("pets_name", {
                  required: "Pet name field cannot be empty",
                })}
              />
            </div>
            {errors.pets_name && (
              <p className="text-red-500 text-sm mt-1 text-left xs:ml-0 sm:ml-73 md:ml-73">
                {errors.pets_name.message}
              </p>
            )}

            {/* Date and Time */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              {/* Date Input */}
              <div className="flex flex-col w-full sm:w-1/2">
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                  <label
                    className="md:w-32 sm:w-32 xs:w-full w-full block text-left"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full sm:w-35 md:w-35 rounded-md border py-2 px-3 shadow-sm focus:ring-2 focus:ring-indigo-600"
                    {...register("date", { required: "Date is required" })}
                    defaultValue={today}
                    min={today}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1 text-left sm:ml-28">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Time Input */}
              <div className="flex flex-col w-full sm:w-1/2">
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                  <label
                    className="md:w-fit sm:w-fit xs:w-full w-full block text-left"
                    htmlFor="time"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="w-full sm:w-58 md:w-58 rounded-md border py-2 px-3 shadow-sm focus:ring-2 focus:ring-indigo-600"
                    {...register("time", { required: "Time is required" })}
                  />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1 text-left sm:ml-28">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label
                className="md:w-32 sm:w-32 xs:w-full w-full block text-left"
                htmlFor="notes"
              >
                Notes
              </label>
              <textarea
                id="notes"
                placeholder="Notes"
                className="w-full sm:w-3/4 md:w-3/4 rounded-md border py-2 px-3 shadow-sm focus:ring-2 focus:ring-indigo-600"
                {...register("notes", {
                  required: "Notes field cannot be empty",
                })}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white"
              >
                Add appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
