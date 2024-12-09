import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface FormValues {
  email: string;
  password: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "password must be of minimum 8 characters";
  }

  return errors;
};

function Login() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      setSuccessMessage("Login successfull");
      
      navigate("/");
    },
  });
  return (
    <div className="font-[sans-serif] bg-white h-screen">
      <div className=" items-center  h-full">
        <div className="flex flex-col items-center md:p-8 p-6 bg-[#0C172C] h-full">
          <form
            className="mt-10 max-w-lg w-full mx-auto"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">
                Login to your account
              </h3>
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center mt-8">
              <input type="checkbox" className="h-4 w-4 shrink-0 rounded" />
              <label className="text-white ml-3 block text-sm">
                I accept the{" "}
                <a className="text-yellow-500 font-semibold hover:underline ml-1">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
              >
                Login
              </button>
              <p className="text-sm text-white mt-8">
                Dont have an account?{" "}
                <Link to="/signup">
                  <button className="text-yellow-400 font-semibold hover:underline ml-1">
                    SignUp
                  </button>
                </Link>
              </p>
            </div>
          </form>
          {successMessage && (
            <div className="mt-6 text-yellow-400 font-semibold text-lg">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
