import React from "react";
import "./style.css";
import Modal from "../Modal";
import Calendar from "../Calender";
import { useSiteData } from "../../contexts/DataContext";
import useScreenSize from "../../hooks/useMediaQuery";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CallConsultancy: React.FC = () => {
  const [bookingVisiblity, setBookingVisibility] = React.useState(false);
  const screenSize = useScreenSize();
  const { data } = useSiteData();
  const { isAuthenticated, openAuthModal } = useAuth(); // Get the authentication status from your context
  const navigate = useNavigate();
  const handleBookingVisibility = () => {
    setBookingVisibility(!bookingVisiblity);
  };

  const buttonStyle = {
    width: "300px",
  };

  const handleContactUsOnClick = () => {
    if (!isAuthenticated) {
      openAuthModal();
      // navigate("/");
    } else {
      navigate("/questionare");
    }
  };

  return (
    <>
      <div className="call-consultancy flex flex-col justify-center items-center gap-1 pt-8 pb-8">
        <section
          id="call-consultancy-container"
          className="gap-5 flex flex-col justify-center items-center"
        >
          <p className="text-styled-2">In person site visit</p>
          <p className="center">{data?.callConsultancyTagLine}</p>
          <div
            className={`price-book flex items-center justify-center gap-2 pl-8 pr-8 ml-8 mr-8 mb-2 mt-4 ${
              screenSize === "sm" ? "book-now-button" : "flex"
            }`}
          >
            {/* <Link className="link" to={"/questionare"}> */}
            <button
              className="button button-secondary  mr-auto ml-auto"
              style={buttonStyle}
              onClick={handleContactUsOnClick}
            >
              Contact us
            </button>
            {/* </Link> */}
          </div>
        </section>
      </div>
      <Modal isOpen={bookingVisiblity} onClose={handleBookingVisibility}>
        <Calendar />
      </Modal>
    </>
  );
};

export default CallConsultancy;
