import {useState, useEffect} from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
export default function Tours() {
    const [tours, setTours] = useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchTours = async () => {
          try {
            const response = await axios.get(`${API_URL}/tours`, {
              withCredentials: true,
            });
            setTours(response.data.data);
          } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
              // Check if response exists it means the request was successful and server responded with error
              if (error.response) {
                setError(
                  error.response.data.message ||
                    "An error occurred. Please try again."
                );
                //check if request exists and no response it means the request was not successful
              } else if (error.request) {
                setError(
                  "No response from server. Check your internet connection."
                );
              } else {
                // Something happened in setting up the request, some other axios error eg. JavaScript runtime error, an issue with another part of your code
                setError("Something went wrong. Please try again.");
              }
            } else {
              //some other not axios error
              setError("An unexpected error occurred.");
            }
          }
        };
        fetchTours();
      }, []);
      
    return (
        <div>
            <p className="text-orange-700">{error}</p>
            <h1>Tours</h1>
            <p>{tours.map((tour) => tour.name)}</p>
        </div>
    );
}