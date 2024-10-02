import useField from "../hooks/useField"; // Make sure to import the hook
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { handleLogin } = useLogin();
  const emailField = useField("email", "email"); // Pass id as second argument
  const passwordField = useField("password", "password");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call handleLogin with the email and password values
    handleLogin(emailField.value, passwordField.value);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

            <div className="mb-4">
              <label
                htmlFor={emailField.id} // Using the id from the hook
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                id={emailField.id}
                type={emailField.type}
                value={emailField.value}
                onChange={emailField.onChange}
                // {...emailField} // Spreading the props
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor={passwordField.id} // Using the id from the hook
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                {...passwordField} // Spreading the props
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
