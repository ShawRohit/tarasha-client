import React, { useState, ChangeEvent, FormEvent } from "react";
import Cookies from "js-cookie";
import "./style.css";
import { BsArrowRight } from "react-icons/bs";
import { API_ENDPOINT } from "../../utils/constant";
import { useAuth } from "../../contexts/AuthContext";
import eventBus from "../../utils/eventBus";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";

interface Question {
  que: string;
  _id: number;
}

const questions: Question[] = [
  { que: "Each family member’s name, age, & occupation? (in order) ", _id: 1 },
  { que: "Which area to re-design and why?", _id: 2 },
  { que: "Any Pets?", _id: 3 },
  {
    que: "Preferred Design Style (Modern, Neo classical, European, contemprory, traditional, Rustic, Bohemian etc)?",
    _id: 4,
  },
  { que: "Budget, if any?", _id: 5 },
  { que: "Preference in color (Like & Dislike)?", _id: 6 },
  { que: "Time Frame?", _id: 7 },
  { que: "Best time to contact you?", _id: 8 },
  { que: "Anything special to consider during the design process?", _id: 9 },
  { que: "Design Reference or Inspirational images, if any?", _id: 10 },
  { que: "Is it a renovation or revamp work?", _id: 11 },
  { que: "Location of the site?", _id: 12 },
  { que: "Vastu compliant or non-vastu compliant layouts & design?", _id: 13 },
  { que: "Which religion do you follow?", _id: 14 },
  {
    que: "Have you worked with an interior designer before? & who will be taking all the decisions during our design process?",
    _id: 15,
  },
];

const Questionare: React.FC = () => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/dashboard", { state: { s: 1 } });
    } else if (!user?.number) {
      eventBus.emit(
        "toast:error",
        "Please update your phone number in user profile before filling the Questionaire Form"
      );
    }
  }, []);
  const [answers, setAnswers] = useState<{
    [key: string]: { Question: string; Answer: string };
  }>(
    questions.reduce((acc, question) => {
      acc[`ans-${question._id}`] = { Question: question.que, Answer: "" };
      return acc;
    }, {})
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    questionId: number
  ) => {
    const updatedAnswers = { ...answers };
    updatedAnswers[`ans-${questionId}`].Answer = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT.SAVE_QUESTIONARE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          inquiryData: Object.values(answers),
          packageInfo: {
            package_name: "Silver",
            package_option: "Option 1",
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        swal({
          title: "Questions submitted successfully!!",
          text: "Thank you! for reaching us out. We will respond you back within 2 business days.",
          icon: "success",
          dangerMode: false,
          // timer: 10000
        }).then((result) => {
          if (result) {
            navigate("/");
          }
        });
      } else {
        throw new Error("Unable to submit question");
      }
    } catch (error) {
      eventBus.emit("toast:error", "Questions submission failed!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="questionare-container">
      <div className="questionare-header flex flex-col justify-center items-center gap-3">
        <p className="text-styled-2">Thank You For Your Interest</p>
        <p>Let’s get started by filling out this questionaire.</p>
      </div>
      <form onSubmit={handleSubmit} className="p-8 mt-8">
        <div className="flex flex-col gap-3">
          {questions.map((question: Question, index: number) => (
            <div key={question._id}>
              <p className="question">
                {index + 1}. {question.que}
              </p>
              <input
                required={true}
                name={`ans-${question._id}`}
                onChange={(e) => handleInputChange(e, question._id)}
                value={answers[`ans-${question._id}`].answer}
              />
            </div>
          ))}
        </div>
        {!loading && (
          <button
            type="submit"
            className="button button-dark flex flex-row gap-1 mt-8 mb-8"
          >
            <p>Send</p>
            <BsArrowRight />
          </button>
        )}
        {loading && (
          <button className="button button-dark flex flex-row gap-1 mt-8 mb-8">
            <Ring color="#ffffff" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Questionare;
