import axios from 'axios';
import { useForm } from 'react-hook-form';
import bgImage from '../assets/images/background-desktop.png';
import logoFull from '../assets/images/logo-full.svg';

export default function TicketForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = 'http://localhost:3002/api/v1/tickets';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <section
      className="w-full h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h3 className="py-8">
        <img src={logoFull} alt="Logo" />
      </h3>
      <h1 className="text-white text-5xl mb-8 text-center">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullname"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('fullname', {
              required: 'Full Name field cannot be empty',
            })}
          />
          {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('email', {
              required: 'Email field cannot be empty',
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="github_username" className="block text-gray-700">GitHub Username</label>
          <input
            type="text"
            id="github_username"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('github_username', {
              required: 'GitHub Username field cannot be empty',
            })}
          />
          {errors.github_username && <p className="text-red-500 text-sm mt-1">{errors.github_username.message}</p>}
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Submit
        </button>
      </form>
    </section>
  );
}