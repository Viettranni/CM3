import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useField from '../hooks/useField';

const AddJobPage = ({ addJobSubmit }) => {
  const title = useField('text', 'title');
  const description = useField('textarea', 'description');
  const salary = useField('select', 'salary');
  const companyName = useField('text', 'company');
  const companyDescription = useField('textarea', 'company_description');
  const contactEmail = useField('email', 'contact_email');
  const contactPhone = useField('tel', 'contact_phone');
  const location = useField('text', 'location');
  const postedDate = useField('date', 'postedDate');
  const type = useField('select','Full-Time');
  const status = useField('select', 'closed');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      title: title.value,
      type: type.value,
      description: description.value,
      company: {
        name: companyName.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      },
      location: location.value,
      salary: salary.value,
      postedDate: postedDate.value,
      status: status.value,
    };

    addJobSubmit(newJob);
    
    navigate('/jobs');
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                Job Type
              </label>
              <select
                {...type}
                className="border rounded w-full py-2 px-3"
                required
                value={type.value}
              > 
                <option value="" disabled>
                  Select your type
                </option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor={title.id} className="block text-gray-700 font-bold mb-2">
                Job Listing Name
              </label>
              <input
                {...title}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Make it sound cooler than it is!"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor={description.id} className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                {...description}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What's the role? (No, 'professional snacker' doesn't count)"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor={salary.id} className="block text-gray-700 font-bold mb-2">
                Salary
              </label>
              <select
                {...salary}
                className="border rounded w-full py-2 px-3"
                value={salary.value}
                required
              >
                <option value="" disabled>Select salary level</option>
                <option value={parseInt('50000')}>Under $50K</option>
                <option value={parseInt('60000')}>$50K - $60K</option>
                <option value={parseInt('70000')}>$60K - $70K</option>
                <option value={parseInt('80000')}>$70K - $80K</option>
                <option value={parseInt('90000')}>$80K - $90K</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor={location.id} className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                {...location}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Where are we pretending to be located?"
                required
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label htmlFor={companyName.id} className="block text-gray-700 font-bold mb-2">
                Company Name
              </label>
              <input
                {...companyName}
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor={companyDescription.id} className="block text-gray-700 font-bold mb-2">
                Company Description
              </label>
              <textarea
                {...companyDescription}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Your business in a nutshell (or a really big nut)"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor={contactEmail.id} className="block text-gray-700 font-bold mb-2">
                Contact Email
              </label>
              <input
                {...contactEmail}
                className="border rounded w-full py-2 px-3"
                placeholder="donotsend@wasteoftime.com"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor={contactPhone.id} className="block text-gray-700 font-bold mb-2">
                Contact Phone
              </label>
              <input
                {...contactPhone}
                className="border rounded w-full py-2 px-3"
                required
                placeholder="Call us! (Unless you’re a telemarketer)"
              />
            </div>

            <div className="mb-4">
              <label htmlFor={postedDate.id} className="block text-gray-700 font-bold mb-2">
                Posted Date
              </label>
              <input
                {...postedDate}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                Job Status:
              </label>
              <select
                {...status}
                className="border rounded w-full py-2 px-3"
                value={status.value}
              >
                <option value="" disabled>
                  Is this position still relevant?
                </option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;