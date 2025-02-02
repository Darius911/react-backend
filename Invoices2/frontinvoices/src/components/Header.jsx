import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function Header() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/v1/invoices");
        setData(response.data.data); 
      } catch (err) {
        setError("Error fetching data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <header className="bg-gray-950 flex justify-between max-w-5xl mx-auto  p-4">
      <div className="flex flex-col justify-start  text-amber-50 ">
        <Link to="/"><h1>Invoice</h1></Link>
        <p>There are {data.length} total invoices</p>
      </div>

      <div className="flex gap-2  justify-end  text-amber-50">
        <div>filtered by status</div>
        <Link to="/newinvoice"><button className="bg-pink-400 text-amber-200 rounded-2xl p-2">New invoice</button></Link>
      </div>
    </header>
  )
}