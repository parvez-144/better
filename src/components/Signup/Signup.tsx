import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import zxcvbn from "zxcvbn";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.fullName) {
    errors.fullName = "Required";
  } else if (values.fullName.length > 20) {
    errors.fullName = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

function Signup() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      setSuccessMessage("SignUp successful");
    },
  });

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const result = zxcvbn(password);
    setPasswordStrength(result.score); // set password strength score (0-4)
    formik.handleChange(event);
  };

  const getPasswordStrengthText = (score: number): string => {
    switch (score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  return (
    <div className="font-[sans-serif] bg-white h-screen">
      <div className="items-center h-full">
        <div className="flex flex-col items-center md:p-8 p-6 bg-[#0C172C] h-full">
          <form
            className="mt-3 max-w-lg w-full mx-auto"
            onSubmit={formik.handleSubmit}
            aria-labelledby="signup-form"
          >
            <div className="mb-12">
              <h3
                id="signup-form"
                className="text-3xl font-bold text-yellow-400"
                aria-live="assertive"
              >
                Create an account
              </h3>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="text-white text-xs block mb-2"
                aria-label="Full Name"
              >
                Full Name
              </label>
              <div className="relative flex items-center">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  aria-describedby="fullNameError"
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <div
                    id="fullNameError"
                    className="text-red-500 text-xs"
                    role="alert"
                  >
                    {formik.errors.fullName}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8">
              <label
                htmlFor="email"
                className="text-white text-xs block mb-2"
                aria-label="Email"
              >
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  aria-describedby="emailError"
                />
                {formik.errors.email && formik.touched.email && (
                  <div
                    id="emailError"
                    className="text-red-500 text-xs"
                    role="alert"
                  >
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8">
              <label
                htmlFor="password"
                className="text-white text-xs block mb-2"
                aria-label="Password"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={handlePasswordChange}
                  aria-describedby="passwordError passwordStrength"
                />
                {formik.errors.password && formik.touched.password && (
                  <div
                    id="passwordError"
                    className="text-red-500 text-xs"
                    role="alert"
                  >
                    {formik.errors.password}
                  </div>
                )}
              </div>
              {formik.values.password && (
                <div className="mt-2" aria-live="polite">
                  <p
                    id="passwordStrength"
                    className={`text-sm ${
                      passwordStrength === 0
                        ? "text-red-500"
                        : passwordStrength === 1
                        ? "text-orange-500"
                        : passwordStrength === 2
                        ? "text-yellow-500"
                        : passwordStrength === 3
                        ? "text-green-500"
                        : "text-blue-500"
                    }`}
                  >
                    Strength: {getPasswordStrengthText(passwordStrength)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
                aria-label="Accept terms and conditions"
              />
              <label className="text-white ml-3 block text-sm">
                I accept the{" "}
                <a
                  className="text-yellow-500 font-semibold hover:underline ml-1"
                  href="/terms"
                  aria-label="Terms and conditions"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
                aria-label="Submit Registration"
              >
                Register
              </button>
              <p className="text-sm text-white mt-8">
                Already have an account?{" "}
                <Link to="/login">
                  <button
                    className="text-yellow-400 font-semibold hover:underline ml-1"
                    aria-label="Login"
                  >
                    Login
                  </button>
                </Link>
              </p>
            </div>
          </form>
          {successMessage && (
            <div className="mt-6 flex flex-col" aria-live="assertive">
              <p className="text-yellow-400 font-semibold text-lg">
                {successMessage}
              </p>

              <Link to="/">
                <button className="bg-transparent border-2 border-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-md transition-all duration-200">
                  Go to Home
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
