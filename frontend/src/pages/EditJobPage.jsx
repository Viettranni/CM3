import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useField from '../hooks/useField';

const EditJobPage = ({ updateJobSubmit }) => {
  const job = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  const title = useField('text', 'title', job.title);
  const description = useField('textarea', 'description', job.description);
  const salary = useField('number', 'salary', job.salary);
  const location = useField('text', 'location', job.location);
  const companyName = useField('text', 'company', job.company.name);
  const contactEmail = useField('email', 'contact_email', job.company.contactEmail);
  const contactPhone = useField('tel', 'contact_phone', job.company.contactPhone);
  const postedDate = useField('date', 'postedDate', new Date(job.postedDate).toISOString().substring(0, 10));

  const type = useField("select", "type", job.type);
  const status  = useField('select', 'status', job.status);

  const submitForm = async (e) => {
    e.preventDefault();

    const salaryNumber = parseFloat(salary.value);

    if (isNaN(salaryNumber)) {
      toast.error('Invalid salary value');
      return;
    }

    const updatedJob = {
      id,
      title: title.value,
      type: type.value, 
      location: location.value,
      description: description.value,
      salary: salaryNumber,
      company: {
        name: companyName.value,
        description: companyDescription.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      },
      postedDate: new Date(postedDate.value),
      status: status.value,
    };

    try {
      await updateJobSubmit(updatedJob);
      toast.success('Job Updated Successfully');
      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update the job. Please try again.');
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Update Job</h2>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                Job Type
              </label>
              <select
                {...type}
                className="border rounded w-full py-2 px-3"
                required
                value={type}
              >
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
                placeholder="e.g. Software Engineer"
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
                placeholder="Add any job duties, expectations, requirements, etc."
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor={salary.id} className="block text-gray-700 font-bold mb-2">
                Salary
              </label>
              <input
                {...salary}
                className="border rounded w-full py-2 px-3"
                placeholder="Enter salary in USD"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor={location.id} className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                {...location}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
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
              />
            </div>

            <div className="mb-4">
              <label htmlFor={contactEmail.id} className="block text-gray-700 font-bold mb-2">
                Contact Email
              </label>
              <input
                {...contactEmail}
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
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
                placeholder="Optional phone for applicants"
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
                Status
              </label>
              <select
                {...status}
                className="border rounded w-full py-2 px-3"
                value={status}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;