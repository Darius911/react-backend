import { CiStar } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
const API_URL = import.meta.env.VITE_API_URL;

export default function StarsRating({ onRate }) {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { id } = useParams();
  
  const handleRating = async (star) => {
    if (!star || isNaN(star)) {
      console.error("Invalid rating:", star);
      return;
    }

    setRating(star);
    if (onRate) onRate(star);

    try {
      const { data: response } = await axios.patch(
        `${API_URL}/appointments/${id}/rating`,
        { rating: star },
        { withCredentials: true }
      );

      console.log(response);
      setMessage("Appointment successfully updated!");
      setError(null);
    } catch (error) {
      console.error("Error updating rating:", error);
      setError("An error occurred while updating the rating.");
    }
  };

  return (
    <section className="w-full h-screen">
      <Header />
      <Navigation />
      <div className="flex  md:flex-row sm:flex-row  gap-4 items-center justify-center  max-w-3xl mx-auto   py-2 mb-4 rounded-lg shadow-md  border-box min-h-85">
        <div className="flex self-col">
          <p className="text-2xl sm:text-md font-bolder text-blue-800 ">
            Rate Appointment
          </p>
        </div>
        {[1, 2, 3, 4, 5].map((star) => (
          <CiStar
            key={star}
            className={`h-10 w-10 cursor-pointer transition-colors ${
              (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
      <div className="flex  md:flex-row sm:flex-row  gap-4 items-center justify-center  max-w-3xl mx-auto   py-2 mb-4 rounded-lg shadow-md  border-box">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
      </div>
      <Footer />
    </section>
  );
}
