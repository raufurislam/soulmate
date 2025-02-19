import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { id } = useParams();

  return (
    <div className="max-w-screen-xl p-5 mx-auto">
      <div className=" lg:mx-40 p-10 rounded-xl bg-neutral shadow-lg">
        <h1 className="text-2xl font-semibold text-text1">Payment page</h1>

        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm id={id}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
