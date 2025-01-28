import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios';

export default function Ticket() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        console.log('Fetching ticket with ID:', id); // Debugging line
        const response = await axios.get(`http://localhost:3002/api/v1/tickets/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response data:', response.data); // Debugging line
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the ticket:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchTicket();
    } else {
      setError('Invalid ticket ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log('Ticket data:', ticket); // Debugging line

  return (
    <div>
      <div>
        <h2>Ticket Details</h2>
        <p>Full Name: {ticket.fullname}</p>
        <p>Email: {ticket.email}</p>
        <p>GitHub Username: {ticket.github_username}</p>
        <p>Unique Code: {ticket.unique_code}</p>
      </div>
    </div>
  );
}