import { useEffect, useState } from "react";
import { CheckoutStepper } from "./components/checkoutStepper/checkout-stepper";
import MultiSearchInput from "./components/multiSearchInput/multi-search-input";
import { OTP } from "./components/otp/otp";
import { useThrottle } from "./hooks/useThrottle";

function App() {
  const [windows, setWindows] = useState({
    width: window.innerWidth,
    heigth: window.innerHeight,
  });

  const handleResize = () => {
    setWindows({
      width: window.innerWidth,
      heigth: window.innerHeight,
    });
  };

  const throttleHandleResize = useThrottle(handleResize, 500);

  useEffect(() => {
    window.addEventListener("resize", throttleHandleResize);

    return () => {
      window.removeEventListener("resize", throttleHandleResize);
    };
  }, []);

  return (
    <>
      <CheckoutStepper />
      <MultiSearchInput />
      <OTP />

      <div>
        windows size : {windows.width} X {windows.heigth}
      </div>
    </>
  );
}

export default App;
