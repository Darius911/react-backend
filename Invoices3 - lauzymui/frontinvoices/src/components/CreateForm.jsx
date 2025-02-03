import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

export default function CreateForm() {
  const today = moment().format("YYYY-MM-DD");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    data.status = data.status || "draft";
    data.due_date = moment(data.due_date).format("YYYY-MM-DD"); // Formatuojame datą
    console.log(data.due_date);
    

    try {
      const url = "http://localhost:3002/api/v1/invoices";

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setMessage("Atlikta");
      } else {
        setMessage("Įvyko klaida, bandykite dar kartą.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Error submitting the form:", error.message);
      }
    }
  };

  return (
    <section className="bg-gray-950 w-full h-screen">
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-amber-50 block" htmlFor="due_date">
            Due Date
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="date"
            id="due_date"
            defaultValue={today}
            min={today}
            {...register("due_date", {
              required: "Due date is required",
            })}
          />
          {errors.due_date && <p className="text-red-500">{errors.due_date.message}</p>}
        </div>

        <div>
          <label className="text-amber-50 block" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("name", {
              required: "Name field cannot be empty",
              pattern: {
                value: /^[A-ZĄČĘĖĮŠŲŪŽ][a-ząčęėįšųūž]+(\s[A-ZĄČĘĖĮŠŲŪŽa-ząčęėįšųūž]+)*$/,
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
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-amber-50 block" htmlFor="money_amount">
            Money Amount
          </label>
          <input
            type="number"
            id="money_amount"
            placeholder="Money amount"
            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            step="0.01"
            inputMode="decimal"
            {...register("money_amount", {
              required: "Money amount is required",
              min: {
                value: 0.01,
                message: "Minimum amount can be 0.01",
              },
              max: {
                value: 100000,
                message: "Maximum amount can be 100000",
              },
              valueAsNumber: true,
              validate: (value) => value >= 0 || "Amount cannot be negative",
            })}
          />
          {errors.money_amount && <p className="text-red-500">{errors.money_amount.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </form>
    </section>
  );
}
