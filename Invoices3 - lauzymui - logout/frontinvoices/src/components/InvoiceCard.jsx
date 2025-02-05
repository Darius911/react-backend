import {Link} from "react-router";


export default function InvoiceCard({ invoice, deleteInvoice }) {
  const getStatusStyles = () => {
    // switch (invoice.status) {
    //   case "paid":
    //     return "bg-green-950 opacity-50 text-green-500";
    //   case "pending":
    //     return "bg-orange-950 opacity-50 text-orange-500";
    //   case "draft":
    //     return "bg-gray-500 opacity-50 text-black";
    //   default:
    //     return "bg-blue-950 text-amber-50";
    // }
    if (invoice.status === "paid") {
      return "bg-green-950 opacity-50 text-green-500";
    } else if (invoice.status === "pending") {
      return "bg-orange-950 opacity-50 text-orange-500";
    } else if (invoice.status === "draft") {
      return "bg-gray-500 opacity-50 text-black";
    } else {
      return "bg-blue-950 text-amber-50";
    }
  };
  return (
   <div className="flex justify-center gap-4 items-center bg-blue-950 text-amber-50 max-w-5xl mx-auto  p-4 mb-4 rounded-lg shadow-md">
    <div className="w-1/7">{invoice.invoice_code}</div>
    <div className="w-2/7"> due {invoice.due_date.split("T")[0]}</div>
    <div className="w-2/7">{invoice.name}</div>
    <div className="w-1/7">€ {invoice.money_amount}</div>
    <div className={`w-1/7 flex justify-center py-2 rounded-lg ${getStatusStyles()}`}>{invoice.status}</div>
    <div><Link to={`/invoices/${invoice.invoice_code}`}>Update invoice</Link></div>
    <div><button onClick={() => deleteInvoice(invoice.invoice_code)}>Delete</button></div>
   </div>
  )
}