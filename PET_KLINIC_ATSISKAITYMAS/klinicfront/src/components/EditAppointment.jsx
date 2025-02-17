import { useForm} from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import moment from "moment";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;
export default function EditAppointment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // setValue, // Naudojame setValue, kad galėtume užpildyti formą esamais duomenimis
  } = useForm();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const today = moment().format("YYYY-MM-DD");
  
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data: response } = await axios.get(
          `${API_URL}/appointments/${id}`,
          {
            withCredentials: true,
          }
        );
        const formattedDate = new Date(response.data.date).toISOString().split("T")[0];

        
        console.log(formattedDate);
        
        // Užpildome formą su gautais duomenimis
        setValue("owner_name", response.data.owner_name);
        setValue("pets_name", response.data.pets_name);
        setValue("date", formattedDate);
        setValue("time", response.data.time);
        setValue("notes", response.data.notes);
       
        setValue("status", response.data.status);
        
      } catch (error) {
        setError("Failed to load appointment data. Please try again.");
        console.log(error);
        
      }
      
    };
    

    if (id) {
      fetchAppointment();
    }
  }, [id, setValue]);
 
  const onSubmit = async (formData) => {
    if (formData.time) {
      formData.time = new Date(
        `1970-01-01T${formData.time}`
      ).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    

    
    try {
      const { data: response } = await axios.put(
        `${API_URL}/appointments/${id}`,
        formData,
        { withCredentials: true }
      );

      console.log(response);
      setMessage("Appointment successfully updated!");
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
    <section className="flex flex-col h-screen">
      <Header />
      <Navigation />

      <div className="h-screen flex  md:flex-row sm:flex-row  gap-4   max-w-3xl mx-auto  xs:px-4 py-2 mb-4 rounded-lg shadow-md  border-box">
        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Owner Name */}
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label
                className="md:w-32 sm:w-32 xs:w-full w-full block text-left text-cyan-900"
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
              className="md:w-32 sm:w-32 xs:w-full w-full block text-left text-blue-800"
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
              {/* status */}
          <div className="flex flex-col sm:flex-row items-center gap-4 "> 
            {user?.role === "admin" && ( // Tik adminas gali matyti šį lauką
              <>
                <label htmlFor="status" className="md:w-32 sm:w-32 xs:w-full w-full block text-left">
                  Status
                </label>
                <select
                  id="status"
                  {...register("status", { required: "Status is required" })}
                  className="w-full sm:w-3/4 md:w-3/4 rounded-md border py-2 px-3 shadow-sm focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
}
