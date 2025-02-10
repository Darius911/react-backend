import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect} from "react";
import { useParams } from "react-router";
import moment from "moment";
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
  const { id } = useParams();
  const today = moment().format("YYYY-MM-DD");
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/appointments/${id}`, {
          withCredentials: true,
          
        });
        console.log(response);
        // Užpildome formą su gautais duomenimis
        setValue("owner_name", response.data.owner_name);
        setValue("pets_name", response.data.pets_name);
        setValue("date", response.data.date.toISOString().split("T")[0]);
        setValue("time", response.data.time);
        setValue("notes", response.data.notes);
      } catch (error) {
        setError("Failed to load appointment data. Please try again.");
      }
    };

    if (id) {
      fetchAppointment();
    }
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    
    if (formData.time) {
      formData.time = new Date(`1970-01-01T${formData.time}`).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        
      });
    }

    if (formData.date) {
      const dateObj = new Date(formData.date);
      formData.date = dateObj.toISOString().split("T")[0]; // Paimama tik data be laiko
      console.log(formData.date);
      
    }

    console.log(formData);
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
                    
                    {...register("date", { required: "Date is required" })}
                    defaultValue={today}
                    min={today}
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

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
            {message && <p className="text-green-500 mt-4">{message}</p>}
          </form>
        </div>
  );
}
