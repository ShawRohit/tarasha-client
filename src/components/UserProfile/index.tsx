import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useAuth } from "../../contexts/AuthContext";
import { API_ENDPOINT } from "../../utils/constant";
import "./style.css";
import eventBus from "../../utils/eventBus";
import { Ring } from "@uiball/loaders";

const UserProfile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      // email: user?.email,
      phoneNumber: user?.number,
      // countryCode: user?.countryCode || '+91',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be a 10-digit number")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formattedNumber = [
          {
            countrycode: user?.countryCode || "+91",
            mobile: values?.phoneNumber,
          },
        ];

        setLoading(true);
        const response = await fetch(API_ENDPOINT.UPDATE_USER, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            ...values,
            mobiles: formattedNumber,
            phoneNumber: undefined,
            countryCode: undefined,
          }),
        });
        const userInfo = await response.json();
        if (response.ok) {
          setUser((prev) => ({
            _id: userInfo?._id,
            countrycode: user?.countryCode || "+91",
            name: userInfo?.name,
            email: userInfo?.email,
            number: userInfo?.mobiles[0]?.mobile,
            countryCode: userInfo?.mobiles[0]?.countrycode,
          }));
          eventBus.emit("toast:success", "User Updated!");
        } else {
          throw new Error("Updation failed");
        }
      } catch (error) {
        eventBus.emit("toast:error", "Updation Failed!!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        {/* <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div> */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="error">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        {!loading && <button type="submit">Save Changes</button>}
        {loading && (
          <button type="submit">
            <Ring color="#000000" />
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
