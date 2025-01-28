import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ id }) => {
  // console.lo/g(id);
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: 5 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Confirm the payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
            // biodataId: id,
          },
        },
      });
    if (confirmError) {
      console.log("Payment confirmation error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id"), paymentIntent.id;
        setTransactionId(paymentIntent.id);

        // Now save the payment in the database
        const payment = {
          email: user.email,
          name: user.displayName,
          price: 5,
          transactionId: paymentIntent.id,
          date: new Date(),
          biodataId: id,
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thank you for the taka paisa",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myContact");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Biodata ID (for contact request)
        </label>
        <input
          type="text"
          value={id}
          readOnly
          className="w-full p-3 mt-2 bg-gray-100 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Your Email (Requester)
        </label>
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full p-3 mt-2 bg-gray-100 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Card Details
        </label>
        {/* <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
                height: "200px",

              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        /> */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                fontFamily: "'Roboto', sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              },
              complete: {
                color: "#4caf50",
              },
              invalid: {
                color: "#f44336",
              },
            },
          }}
        />
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay and Request Contact Information
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600">Your transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
