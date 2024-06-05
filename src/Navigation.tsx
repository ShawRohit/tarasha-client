import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OurWork from "./pages/OurWork";
import Packages from "./pages/Packages";
import Services from "./pages/Services";
import Questionare from "./pages/Questionare";
import Blog from "./pages/Blog";
import ScrollToTop from "./ScrollToTop";
import MainBlog from "./pages/MainBlog";
import SavePayment from "./pages/SavePayment";
import DashboardUser from "./pages/DashboardUser";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import TermsAndConditions from "./pages/Terms&Conditions";
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function Navigation() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <Routes>
        {/* Define a layout route for pages with header and footer */}
        <Route
          path=""
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="our-works" element={<OurWork />} />
          <Route path="packages" element={<Packages />} />
          <Route path="services" element={<Services />} />
          <Route path="questionare" element={<Questionare />} />
          <Route
            path="dashboard"
            element={<PrivateRoute element={<DashboardUser />} />}
          />
          <Route path="save-payment" element={<SavePayment />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<MainBlog />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* Define a route without layout for the "Not Found" page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
