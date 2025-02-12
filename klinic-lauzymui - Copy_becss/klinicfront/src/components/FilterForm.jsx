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
  
      console.log("Filtered response:", response.data.data);
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching filtered appointments:", error);
      setError("Error fetching filtered appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-4 items-center max-w-5xl mx-auto  p-4 mb-4 rounded-lg shadow-md">
      <div>
        <label htmlFor="filterField" className="mr-2">Sort by:</label>
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
        <label htmlFor="sortOrder" className="mr-2">Order:</label>
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
        <label htmlFor="searchTerm" className="mr-2">Search:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2"
        />
      </div>

      <button onClick={handleFilterChange} className="bg-blue-500 text-white p-2 mt-2">Apply Filters</button>
    </div>
  );
}
