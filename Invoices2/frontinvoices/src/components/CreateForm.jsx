import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
export default function CreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState(false);

  const onSubmit = async (data) => {
    data.status = data.status || "draft"; // Jei status nėra, nustatome "draft"
  // Siunčiame duomenis...
    try {
      const url = "http://localhost:3002/api/v1/invoices";
  
      
  
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setMessage("Atlikta"); // Jei sėkmingai įkelta, rodoma žinutė
      } else {
        setMessage("Įvyko klaida, bandykite dar kartą.");
      }
      
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data); // Aiškesnė klaida
      } else {
        console.error("Error submitting the form:", error.message);
      }
    }
  };
  return(
    <section className="bg-gray-950 w-full h-screen">
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label className="text-amber-50 block" htmlFor="due_date">due date</label>
          <input
          className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="date"
            id="due_date"
            placeholder="Due date"
            {...register("due_date", {
              required: "Due date is required",
              //date must be today or in the future
              validate: (value) => {
                const today = new Date().toISOString().split("T")[0];
                return value >= today || "Date must be today or in the future";
              },
            })}
          />
          {errors.due_date && <p className="text-red-500">{errors.due_date.message}</p>}
        </div>

        <div >
          <label className="text-amber-50 block" htmlFor="name">name</label>
            
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("name", {
                required: true,
                //vardas pavarde lietuviski simboliai
                pattern: /^[A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+(\s[A-ZĄČĘĖĮŠŲŪŽa-ząčęėįšųūž]+)*$/,
                minLength: 2,
                maxLength: 80,
              })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name field cannot be empty</p>
            )}
            {errors.name?.type === "pattern" && (
              <p className="text-red-500">
                Name must start with an uppercase letter
              </p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="text-red-500">field shoud be min 2 symbol </p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className="text-red-500">field shoud be max 80 symbol </p>
            )}
        </div>


        <div>
          <label className="text-amber-50 block" htmlFor="money_amount">money_amount</label>

          <input
            type="number"
            id="money_amount"
            placeholder="Money amount"
            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            step="0.01"
            inputMode="decimal"
            {...register("money_amount", {
              required: "Money amount is required",
              min: 0.01,
              max: 100000,
              valueAsNumber: true,
              validate: (value) => value >= 0 || "Amount cannot be negative",
              
            })}
          />
          {errors.money_amount?.type === "required" && (
              <p className="text-red-500">money_amount field cannot be empty</p>
            )}

          {errors.money_amount?.type === "min" && (
                <p className="text-red-500">min amount can be 0.01 </p>
              )};
              {errors.money_amount?.type === "max" && (
                <p className="text-red-500">max amount can be 100000 </p>
              )}
        </div>

        

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      </form>
    </section>
  )
}