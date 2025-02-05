import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import InvoiceCard from "./InvoiceCard";

export default function InvoicesAll() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // New state for filtering

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/v1/invoices");
        setInvoices(response.data.data);
        setFilteredInvoices(response.data.data); // Initialize with all invoices
      } catch (err) {
        setError("Klaida gaunant duomenis");
        console.error("Klaida gaunant sąskaitas:", err);
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
