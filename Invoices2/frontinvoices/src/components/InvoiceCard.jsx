import {Link} from "react-router";


export default function InvoiceCard({ invoice, deleteInvoice }) {
  return (
   <div className="flex justify-center gap-4 bg-blue-950 text-amber-50 max-w-5xl mx-auto  p-4 mb-4 rounded-lg shadow-md">
    <div className="w-1/7">{invoice.invoice_code}</div>
    <div className="w-2/7"> due {invoice.due_date}</div>
    <div className="w-2/7">{invoice.name}</div>
    <div className="w-1/7">€ {invoice.money_amount}</div>
    <div className="w-1/7">{invoice.status}</div>
    <div><Link to={`/invoices/${invoice.invoice_code}`}>Update invoice</Link></div>
    <div><button onClick={() => deleteInvoice(invoice.invoice_code)}>Delete</button></div>
   </div>
  )
}