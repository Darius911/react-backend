import { Link } from "react-router";

export default function Header({ totalInvoices, filterStatus, setFilterStatus }) {
  
  return (
    <header className="bg-gray-950 flex justify-between max-w-5xl mx-auto p-4">
      <div className="flex flex-col justify-start text-amber-50">
        <Link to="/"><h1>Invoice</h1></Link>
        <p>There are {totalInvoices} total invoices</p>
      </div>

      <div className="flex gap-2 justify-end text-amber-50">
        <div>
        <label htmlFor="filter" className="mr-2"></label>
        <select
          id="filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          
          <option value="all">Filter by status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="draft">Draft</option>
        </select>
        </div>
        <Link to="/newinvoice">
          <button className="bg-pink-400 text-amber-200 rounded-2xl p-2">New invoice</button>
        </Link>
      </div>
    </header>
  );
}
