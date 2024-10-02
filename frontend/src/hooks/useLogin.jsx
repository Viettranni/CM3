import useField from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../context/AuthContext';

const useLogin = () => {
  // const location = useLocation();
  const usernameField = useField("username", "username");
  const passwordField = useField("password", "password");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (username, password) => {

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log("Values", username, password);

      if (response.ok) {
        const user = await response.json();
        toast.success("User Login Successful");
        login()
        navigate("/");

      } else {
        const errorData = await response.json(); // Get error details
        console.error("Login failed:", errorData);
        toast.error(errorData.message || "Login failed. Please try again.");
      }

    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return { usernameField, passwordField, handleLogin };
};

export default useLogin;
