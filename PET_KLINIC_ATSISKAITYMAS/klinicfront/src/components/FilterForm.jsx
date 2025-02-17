import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default function FilterForm({ setAppointments, setLoading, setError }) {
  const [filterField, setFilterField] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = async () => {
    setLoading(true);
    try {
      console.log("Sending filter request with:", {
        sort: sortOrder,
        [filterField]: searchTerm,
      });
  
      const response = await axios.get(`${API_URL}/appointments/filter`, {
        params: {
          sort: sortOrder,
          [filterField]: searchTerm,
        },
        withCredentials: true,
      });
  
      
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching filtered appointments:", error);
      setError("Error fetching filtered appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap  md:flex-row sm:flex-row  gap-4 justify-between  max-w-3xl mx-auto  xs:px-4 py-2 mb-4 rounded-lg shadow-md  border-box ">
      <div className="mx-2 flex-col" >
        <label htmlFor="filterField" className=""></label>
        <select
          id="filterField"
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          className="border p-2"
        >
          <option value="">Select field</option>
          <option value="pets_name">Pet name</option>
          <option value="owner_name">Owner</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div>
        <label htmlFor="sortOrder" className=""></label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2"
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      <div>
        <label htmlFor="searchTerm" className="mr-2"></label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="flex flex-1 justify-end">
      <button onClick={handleFilterChange} className="bg-blue-950 hover:bg-blue-700 font-bold py-2 px-4 rounded text-white ">Find</button>
      </div>
     
    </div>
  );
}
