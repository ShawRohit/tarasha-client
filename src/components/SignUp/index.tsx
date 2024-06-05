import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import GoogleImageIcon from "../../assets/google.png";
import "./style.css";
import { AuthState } from "../../utils/type";
import { API_ENDPOINT, countryCodes } from "../../utils/constant";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import eventBus from "../../utils/eventBus";
import { Ring } from "@uiball/loaders";

interface SignUpFormProps {
  handleAuthState: (authState: AuthState) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { handleAuthState } = props;
  const { handleAuthentication, closeAuthModal, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      countryCode: "+91", // Default to India's country code
      number: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /^[a-zA-Z\s]{3,}$/,
          "Name must have at least 3 alphabetic characters"
        )
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      number: Yup.string()
        .matches(/^[1-9][0-9]{9}$/, "Phone number must be a 10-digit number")
        .required("Phone number is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
          "Password must meet following criteria, min-length = 8, with at least 1 digit, lowercase, uppercase, special character"
        )
        .required("Password is required"),

      confirmPassword: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
          "Password must meet following criteria, min-length = 8, with at least 1 digit, lowercase, uppercase, special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formattedNumber = [
          { countrycode: values.countryCode, mobile: values.number },
        ];

        setLoading(true);
        const response = await fetch(API_ENDPOINT.REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, mobiles: formattedNumber }),
        });
        const data = await response.json();
        console.log(data);
        if (data?.data?.token) {
          Cookies.set("token", data.data.token, { expires: 7 });
          handleAuthentication();
          closeAuthModal();
          eventBus.emit("toast:success", "Registration Success!");
          const userInfo = data?.data?.user;
          setUser((prev) => ({
            _id: userInfo?._id,
            name: userInfo?.name,
            email: userInfo?.email,
            number: userInfo?.mobiles[0]?.mobile,
            countryCode: userInfo?.mobiles[0]?.countrycode,
          }));
        } else {
          throw new Error("Registration failed");
        }
      } catch (error) {
        eventBus.emit("toast:error", "Registration Failed!!");
      } finally {
        setLoading(false);
      }
    },
  });

  const useGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true);
        const response = await fetch(API_ENDPOINT.GOOGLE_SIGNIN, {
          method: "POST",
          body: JSON.stringify({
            token: tokenResponse.access_token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const profileData = await response.json();
        if (profileData?.success && profileData?.userData?.token) {
          setUser({
            _id: profileData?.userData?.user?._id,
            name: profileData?.userData?.user?.name,
            email: profileData?.userData?.user?.email,
          });
          Cookies.set("token", profileData?.userData?.token, { expires: 7 });
          handleAuthentication();
          closeAuthModal();
          eventBus.emit("toast:success", "Registration Success!");
        } else {
          throw new Error("Registration failed");
        }
      } catch (error) {
        eventBus.emit("toast:error", "Registration Failed!!");
      } finally {
        setGoogleLoading(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <p className="text-styled auth-header-text pb-2">Create your account</p>
      <form
        onSubmit={formik.handleSubmit}
        className="auth-form rounded-[2px] border-black border-2 p-6 flex flex-col w-96 items-start"
      >
        <input
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="border-2 h-10 p-2 w-full"
          placeholder="Name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 pb-2">{formik.errors.name}</div>
        ) : null}
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="border-2 h-10 p-2 w-full"
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 pb-2">{formik.errors.email}</div>
        ) : null}

        <div className="flex items-center phone-no">
          <select
            id="countryCode"
            name="countryCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.countryCode}
            className="border-2 h-10 p-2"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>

          <input
            id="number"
            name="number"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            className="border-2 h-10 p-2 flex-1"
            placeholder="Phone Number"
          />
        </div>

        {formik.touched.number && formik.errors.number ? (
          <div className="text-red-500 pb-2">{formik.errors.number}</div>
        ) : null}

        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="border-2 h-10 p-2 w-full"
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 pb-2">{formik.errors.password}</div>
        ) : null}

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className="border-2 h-10 p-2 w-full"
          placeholder="Confirm Password"
        />
        {formik.touched.password && formik.errors.confirmPassword ? (
          <div className="text-red-500 pb-2">
            {formik.errors.confirmPassword}
          </div>
        ) : null}

        {!loading && (
          <button
            type="submit"
            className="flex justify-center items-center mt-2"
          >
            Register
          </button>
        )}
        {loading && (
          <button className="flex justify-center items-center mt-2">
            <Ring color="#ffffff" />
          </button>
        )}

        <div className="flex gap-2 items-center mt-8 justify-between center">
          <div className="divider-auth" />
          <p>Or Continue With</p>
          <div className="divider-auth" />
        </div>

        {!googleLoading && (
          <div
            className="flex social-icon-container items-center justify-center mt-4 cursor-pointer"
            onClick={useGoogleAuth}
          >
            <img src={GoogleImageIcon} />
          </div>
        )}
        {googleLoading && (
          <div className="flex social-icon-container items-center justify-center mt-4 cursor-pointer">
            <div className="flex gap-1">
              <Ring color="#0000000" />
              <img src={GoogleImageIcon} />
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <p className="mt-4 center">
            Already Have an Account?{" "}
            <b
              className="text-styled auth-fot-text"
              onClick={() => handleAuthState(AuthState.Login)}
            >
              Login Now
            </b>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
