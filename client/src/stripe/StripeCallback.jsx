import React, { useEffect } from "react";
import { SpinningCircles } from "react-loading-icons";

const StripeCallback = () => {
  useEffect(() => {}, []);

  return (
    <div className="flex justify-center items-center">
      <SpinningCircles stroke="#98ff98" speed={0.75} />
    </div>
  );
};

export default StripeCallback;
