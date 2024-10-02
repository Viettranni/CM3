import React, { useState } from 'react';
import useSignup from "../hooks/useSignup";
import useField from "../hooks/useField";
import CheckBox from '../components/CheckBox';

const SignupComponent = () => {
  // setIsAuthenticated
  const name = useField("text", "name");
  const username = useField('text', 'username');
  const password = useField("password", "password");
  const phone_number = useField("phone_number", "phone_number");
  const gender = useField("select", "gender");
  const date_of_birth = useField("date", "date_of_birth");
  // membership made with useState
  const address = useField('text', 'address')
  const profile_piture = useField('text', 'picture')
  


  const [membershipStatus, setMembershipStatus] = useState('Not a Member')
  const { handleSignup } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSignup(
      name.value,
      username.value,
      password.value,
      phone_number.value,
      gender.value,
      date_of_birth.value,
      membershipStatus,
      address.value,
      profile_piture.value
    );
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign up</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2"
                {...name}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Username:
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2"
                {...username}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password:
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                {...password}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Phone:
              </label>
              <input
                type="number"
                className="border rounded w-full py-2 px-3"
                {...phone_number}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gender:</label>
              <select {...gender} className="border rounded w-full py-2 px-3 mb-2">
                <option value="" disabled selected>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Date of Birth:
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2"
                {...date_of_birth}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Address:
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2"
                {...address}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Not a picture but a string:
              </label>
              <input
                className="border rounded w-full py-2 px-3 mb-2"
                {...profile_piture}
              />
            </div>

            <CheckBox 
                    status={membershipStatus} 
                    onStatusChange={setMembershipStatus} 
                  />

            {/* {(formError || signupError) && (
              <p className="text-red-500" role="alert">
                {formError || signupError}
              </p>
            )} */}
            <br />
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupComponent;