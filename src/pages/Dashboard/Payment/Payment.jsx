import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
console.log(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { id } = useParams();
  console.log(id);
  // const location = useLocation();
  // const { biodataId } = location.state || {}; // Access the biodataId passed from DetailsPage
  // // console.log(biodataId);

  return (
    <div>
      <h1>Payment page</h1>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
