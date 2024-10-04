import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const useSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSignup = async (
    name,
    username,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
    address,
    profile_picture
  ) => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          phone_number,
          gender,
          date_of_birth,
          membership_status,
          address,
          profile_picture
        }),
      });

      if (response.ok) {
        const user = await response.json();
        login(user);
        navigate("/");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An unexpected error occurred');
    }
  };

  return {
    handleSignup,
  };
};

export default useSignup;
