# Coding Marathon 3

- **Group #:** [Your group number]
- **Link to the backend repositories:**
  - [Backend repo for API V1]
  - [Backend repo for API V2]
- **Link to the frontend repository:**
  - [Frontend repo]
- **URLs for the deployed APIs:**
  - [URL for API V1]
  - [URL for API V2]

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

Explanation:
We replaced the useState hooks with a custom useField hook to manage the form fields. This reduces boilerplate code and makes the form fields more reusable and easier to manage. Each field now maintains its own value and type, which makes the component more maintainable and improves readability.

We also applied this approach in EditJobPage, resulting in a more concise and consistent way to handle all form inputs across the component. This not only improves code readability but also ensures easier future modifications, as each form field is managed uniformly with the useField hook.

Source:
We used ChatGPT and Vercel AI (v0) to improve our code for readability, maintainability, reusability, and overall code quality.
```

### Backend

```js
// File name or function
// Your code part A
```

```js
// File name or function
// Your code part B
```