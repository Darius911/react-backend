import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import InvoiceCard from "./InvoiceCard";
import Navigation from "./Navigation";
const API_URL = import.meta.env.VITE_API_URL

export default function InvoicesAll() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // New state for filtering

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${API_URL}/invoices`, {
          withCredentials: true,
        });
        setInvoices(response.data.data);
        setFilteredInvoices(response.data.data); // Initialize with all invoices
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
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    // Filter invoices based on the selected filterStatus
    if (filterStatus === "all") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(invoices.filter(invoice => invoice.status === filterStatus));
    }
  }, [filterStatus, invoices]); // Re-run this when invoices or filterStatus changes

  const deleteInvoice = async (invoice_code) => {
    try {
      await axios.delete(`http://localhost:3002/api/v1/invoices/${invoice_code}`);
      setInvoices((prevInvoices) => prevInvoices.filter(inv => inv.invoice_code !== invoice_code));
    } catch (error) {
      console.error("Klaida trinant įrašą:", error.message);
    }
  };

  if (loading) return <p>Įkeliama...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="bg-gray-950 w-full min-h-screen">
      <Navigation />
      <Header totalInvoices={filteredInvoices.length} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      
      

      {/* Display filtered invoices */}
      <div>
        {filteredInvoices.map((invoice) => (
          <InvoiceCard key={invoice.invoice_code} invoice={invoice} deleteInvoice={deleteInvoice} />
        ))}
      </div>
    </section>
  );
}
