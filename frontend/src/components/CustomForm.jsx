import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';
import api from '../api';
import { useForm } from "react-hook-form";
import { LoadingSpinner } from '../utils';

const CustomForm = ({ route, method }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, clearErrors, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = method === 'login'
        ? { username: data.username, password: data.password }
        : { username: data.username, email: data.email, password: data.password };

      const response = await api.post(route, payload);

      if (method === 'login') {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        window.location.reload();
        navigate('/');
      } else {
        navigate('/login');
      }

      // Reset the form only after successful submission
      reset();

    } catch (error) {
      // Set the error message for the form
      setError("autherror", { message: error?.response?.data?.detail || "Something went wrong" });
    }
  };

  // Clear errors when the input field changes
  const handleInputChange = () => {
    if (errors.autherror) {
      clearErrors("autherror");
    }
  };

  return (
    <div className="md:flex">
      {/* Left Section */}
      <div className="hidden sm:hidden md:flex h-screen w-full bg-indigo-600 items-center justify-center">
        <h1 className="text-5xl text-white font-bold text-center px-10">
          Manifest your thoughts and share them with the world. 😊
        </h1>
      </div>

      {/* Right Section */}
      <div className="form w-full">
        {isSubmitting && <LoadingSpinner />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-center min-h-screen">
          <h1 className="text-3xl text-gray-400">Authentication</h1>

          {/* Username Field */}
          <FormInput
            label="Username"
            name="username"
            type="text"
            register={register}
            rules={{
              required: "Username is required",
              minLength: { value: 3, message: "Min length is 3" },
              maxLength: { value: 10, message: "Max length is 10" }
            }}
            error={errors.username}
            onChange={handleInputChange}  // Clear error on input change
          />

          {/* Email Field (Only for Register) */}
          {method === 'register' && (
            <FormInput
              label="Email"
              name="email"
              type="text"
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              error={errors.email}
              onChange={handleInputChange}  // Clear error on input change
            />
          )}

          {/* Password Field */}
          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Min length is 6" }
            }}
            error={errors.password}
            onChange={handleInputChange}  // Clear error on input change
          />

          {/* Submit Button */}
          <SubmitButton isSubmitting={isSubmitting} />

          {/* Link to Register or Login */}
          <p className="mt-2">
            {method === 'login' ? (
              <>Don't have an account? <a className="text-blue-500 underline" href="/register">Register</a></>
            ) : (
              <>Already have an account? <a className="text-blue-500 underline" href="/login">Login</a></>
            )}
          </p>

          {/* Authentication Error */}
          {errors.autherror && <div className="text-red-500 mt-2">{errors.autherror.message}</div>}
        </form>
      </div>
    </div>
  );
};

// Reusable Form Input Component
const FormInput = ({ label, name, type, register, rules, error, onChange }) => (
  <>
    <input
      className="border border-gray-400 rounded-md w-1/2 p-3 my-2"
      type={type}
      placeholder={label}
      {...register(name, rules)}
      onChange={onChange}  // Trigger error clearing
    />
    {error && <div className="text-red-500">{error.message}</div>}
  </>
);


// Submit Button Component
const SubmitButton = ({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`border border-gray-400 bg-blue-800 rounded-md w-1/2 py-3 mt-2 text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
);

export default CustomForm;
