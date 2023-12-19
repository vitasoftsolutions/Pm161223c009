import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { base_url } from "./shared/Url";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./shared/Loader/Loader";
import { ToastContainer } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const { email: urlEmail, password: urlPassword } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue, // Set form values programmatically
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { email, password } = data;

      const direct_data = {
        email: email,
        password: password,
      };

      const response = await axios.post(`${base_url}/login/`, direct_data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const jwtToken = response.data.access;

        // Save the JWT token to session storage
        sessionStorage.setItem("jwt_token", jwtToken);

        setLoading(false);
        navigate("/");
        setLoginError(null);
      } else {
        // Handle login error
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      setLoginError("An error occurred during login");
    }
  };

  useEffect(() => {
    // Set form values based on URL parameters when component mounts
    if (urlEmail) setValue("email", urlEmail);
    if (urlPassword) setValue("password", urlPassword);

    // If URL parameters are present, automatically submit the form
    if (urlEmail && urlPassword) {
      handleSubmit(onSubmit)();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      {loading ? (
        <Loader text={"Please wait..."} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/4 mx-auto p-4 grid grid-cols-2 gap-2 rounded-md bg-opacity-50 backdrop-blur-md"
        >
          {/* Email */}
          <div className="mb-4 col-span-2">
            <label htmlFor="email" className="block text-black mb-1 font-bold">
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered input-accent w-full"
            />
            {errors?.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 col-span-2 w-full">
            <label
              htmlFor="password"
              className="block text-black mb-1 font-bold"
            >
              Password
            </label>
            <div className="relative bg-white rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", { required: true })}
                className="input input-bordered w-full pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BsEyeSlashFill className="text-gray-500" />
                ) : (
                  <BsEyeFill className="text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="mb-4 col-span-2">
            <input
              type="submit"
              value="Enter"
              className="btn btn-primary w-full"
            />
          </div>
        </form>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default LoginForm;
