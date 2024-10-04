# Coding Marathon 3

- **Group #:** 1
- **Link to the backend repositories:**
  - We've decided with the teacher to proceed directly with the backend that includes authentication, skipping the version without auth. This has been approved by the teacher.
  - [\[Backend repo for API V2\]](https://github.com/Viettranni/CM3/tree/main/backend)
- **Link to the frontend repository:**
  - [\[Frontend repo\]](https://github.com/Viettranni/CM3/tree/frontend)
- **URLs for the deployed APIs:**
  - We've decided with the teacher to proceed directly with the backend that includes authentication, skipping the version without auth. This has been approved by the teacher.
  - [\[URL for API V2\]](https://cm3-b.onrender.com/)

---

## Self-Assessment of Code

### Frontend

```js
SignupComponent.jsx:

Before:
<select {...gender} className="border rounded w-full py-2 px-3 mb-2">
  <option value="" disabled selected>Select your gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
  <option value="Prefer not to say">Prefer not to say</option>
</select>

After:
<select {...gender} className="border rounded w-full py-2 px-3 mb-2" value={gender.value}>
  <option value="" disabled>Select your gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
  <option value="Prefer not to say">Prefer not to say</option>
</select>

Explanation:
We removed the `selected` attribute from the `<option>` tag and used the `value` attribute on the `<select>` element instead. This follows React's controlled component pattern, avoiding a warning about the improper use of the `selected` attribute in React. Now, React controls the selected option based on the state of the `gender` field.
```

```js
AddJobPage.jsx and EditJobPage.jsx:

Before:
const AddJobPage = ({ addJobSubmit }) => {  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  // More useState declarations...

After:
const AddJobPage = ({ addJobSubmit }) => {  
  const title = useField('text', 'title');
  const type = useField('select', 'Full-Time');
  // More useField declarations...

```

###

Explanation:
We replaced the useState hooks with a custom useField hook to manage the form fields. This reduces boilerplate code and makes the form fields more reusable and easier to manage. Each field now maintains its own value and type, which makes the component more maintainable and improves readability.

We also applied this approach in EditJobPage, resulting in a more concise and consistent way to handle all form inputs across the component. This not only improves code readability but also ensures easier future modifications, as each form field is managed uniformly with the useField hook.

Source:
We used ChatGPT and Vercel AI (v0) to improve our code for readability, maintainability, reusability, and overall code quality.

### Backend

```js
// UserController.js
// Token Generation Function

Before:
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

After:
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "30m",
  });
};
```

###

Explanation:
During our backend code review, we carefully evaluated each part of the code for potential improvements. Most suggestions were considered unnecessary, as we were satisfied with the current structure and approach. However, we did make a change to the token expiration time in the `generateToken` function.

Previously, the expiration time was set to "3d". For better security and user session management, we reduced this duration to "30 minutes". Along with this, we also implemented logic that would automatically log out the user when the token expires, providing a more secure experience. When the token expires, the user receives a toast notification prompting them to log in again. This change ensures shorter-lived tokens and reduces security risks associated with long-lived access tokens.

For this we added new hook `useAutoLogout.jsx` which was then imported straight to `ProtectedRoute.jsx`


```js
useAutoLogout.jsx small code block:

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user && user.token) {
        const payload = JSON.parse(atob(user.token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        const timeUntilExpiration = expirationTime - Date.now();

ProtectedRoute.jsx small code block:

import { useAutoLogout } from '../hooks/useAutoLogout';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  useAutoLogout();
  ```