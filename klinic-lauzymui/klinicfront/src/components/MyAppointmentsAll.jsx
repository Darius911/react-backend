import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import { useParams } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api/v1"; // nurodyti savo API URL

export default function MyAppointmentsAll() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); // gauti id iš URL parametro

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/appointments/${id}/myappointments`, {
          withCredentials: true, // jei reikia prisijungimo sesijos
        });
        
        // Konvertuoti datas į tinkamą formatą
        const appointmentsWithFormattedDate = response.data.data.map(appointment => {
          const formattedDate = new Date(appointment.date).toISOString().split("T")[0]; // "yyyy-MM-dd"
          return { ...appointment, date: formattedDate };
        });
        
        setAppointments(appointmentsWithFormattedDate); // išsaugoti paskyras su teisingu formatu
      } catch (error) {
        console.error("Error fetching appointments:", error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(error.response.data.message || "Something went wrong.");
          } else if (error.request) {
            setError("No response from server.");
          } else {
            setError("An error occurred while setting up the request.");
          }
        } else {
          setError("Unexpected error.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [id]);

  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`${API_URL}/appointments/${appointmentId}`, {
        withCredentials: true,
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== appointmentId)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div>
      {loading && <p>Loading appointments...</p>}
      {error && <p>{error}</p>}
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          deleteAppointment={deleteAppointment}
        />
      ))}
    </div>
  );
}
