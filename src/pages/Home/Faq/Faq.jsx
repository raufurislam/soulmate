import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    question: "How do I create a profile on the matrimony website?",
    answer:
      "To create a profile, click on 'Sign Up', enter your details, upload a profile picture, and provide information about yourself.",
  },
  {
    question: "Is my personal information safe on this platform?",
    answer:
      "Yes, we prioritize user privacy. Your details are secured, and only registered members can view your profile.",
  },
  {
    question: "Can I communicate with other members?",
    answer:
      "Yes! Once your profile is approved, you can send messages, express interest, and connect with other members.",
  },
  {
    question: "How do I delete my account if I find a match?",
    answer:
      "You can delete your account by going to 'Settings' → 'Account Management' → 'Delete Account.'",
  },
  {
    question: "Are there any membership fees?",
    answer:
      "We offer free and premium memberships. Free members can browse matches, while premium members unlock additional features.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [thought, setThought] = useState("");

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSend = () => {
    // Handle user-submitted thoughts or queries
    setThought("");
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-4 lg:px-2 px-4">
      {/* Heading */}
      <div>
        <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-center text-text1 md:mb-3 mb-2">
          Got Questions? We’ve Got Answers!
        </h1>
        <p className="text-center w-4/5 mx-auto text-text2 md:text-xl mb-8">
          Everything you need to know about our platform, membership, and
          matchmaking process.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-neutral rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium bg-neutral text-text1 transition-all"
            >
              <span>{item.question}</span>
              <span className="text-primary">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 text-left py-4 bg-neutral border-t text-text2">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Extra Questions Section */}
      <div className="mt-8 bg-neutral rounded-lg shadow-md p-4">
        <h3 className="text-xl text-left font-semibold mb-3">
          Need more help? Ask a question
        </h3>
        <div className="flex items-center gap-3">
          <textarea
            className="textarea textarea-bordered w-full p-3 rounded-md"
            placeholder="Type your question here..."
            value={thought}
            onChange={(e) => setThought(e.target.value)}
          />
          <button
            className="bg-primary text-white px-5 py-3 rounded-md hover:bg-primary-dark transition-all"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
