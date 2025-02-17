import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import CreateAppointment from "./CreateAppointment";
import FilterForm from "./FilterForm";
import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
import Pagination from "./Pagination"; //  Importuojame Pagination komponentą

const API_URL = import.meta.env.VITE_API_URL;

export default function AppointmentsAll() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Puslapiavimas
  const [currentPage, setCurrentPage] = useState(0);
  const appointmentsPerPage = 5;
  
  useEffect(() => {
    
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/appointments`, {
          withCredentials: true,
        });
        setAppointments(response.data.data);
      } catch (error) {
        console.log(error.message);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        withCredentials: true,
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.id !== id)
      );
    } catch (error) {
      console.error("Klaida trinant įrašą:", error.message);
    }
  };

  if (loading && appointments.length === 0) return <p>Įkeliama...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Puslapiavimas
  const offset = currentPage * appointmentsPerPage;
  const currentAppointments = appointments.slice(offset, offset + appointmentsPerPage);
  const pageCount = Math.ceil(appointments.length / appointmentsPerPage);

  return (
    <section className="flex flex-col  h-screen"> 
      <Header />
      <Navigation />
      <CreateAppointment />
      <FilterForm 
        setAppointments={setAppointments} 
        setLoading={setLoading} 
        setError={setError} 
      />
      
      <div className="h-screen">
        {currentAppointments.map((appointment) => (
          <AppointmentCard 
            key={appointment.id} 
            appointment={appointment} 
            deleteAppointment={deleteAppointment} 
          />
        ))}
      </div>

      {/* Naudojame sukurtą Pagination komponentą */}
      <Pagination pageCount={pageCount} onPageChange={({ selected }) => setCurrentPage(selected)} />

      <Footer />
    </section>
  );
}
