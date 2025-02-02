
  import { useEffect, useState } from "react";
import axios from "axios";
import InvoiceCard from "./InvoiceCard";


export default function InvoicesAll() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/v1/invoices");
        setInvoices(response.data.data); // Atspausdina gautus duomenis
      } catch (err) {
        setError("Klaida gaunant duomenis");
        console.error("Klaida gaunant sąskaitas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) return <p>Įkeliama...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const deleteInvoice = async (invoice_code) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/v1/invoices/${invoice_code}`);
      setInvoices((prevInvoices) => prevInvoices.filter(inv => inv.invoice_code !== invoice_code)); // Iš karto atnaujiname sąrašąs
      console.log('Įrašas ištrintas:', response.data);
    } catch (error) {
      console.error('Klaida trinant įrašą:', error.message);
    }
  };
  
  return (
    <section className="bg-gray-950">
     
      <div>
    {invoices.map((invoice)=>{
      return <InvoiceCard key={invoice.invoice_code} invoice={invoice} deleteInvoice={deleteInvoice}/>;
    })}
      </div>
    </section>
  );
}