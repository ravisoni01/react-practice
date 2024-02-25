import { useRef, useState, useEffect } from "react";
import { MdDone } from "react-icons/md";
import "./style.css";

const STEPPER_DATA = [
  {
    name: "Customer Info",
    Component: () => <div>Customer Info component</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Shipping Info component</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Payment component</div>,
  },
  {
    name: "Delivered",
    Component: () => <div>Delivered component</div>,
  },
];

export const CheckoutStepper = () => {
  const ref = useRef([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const ActiveComponent = STEPPER_DATA[currentStep - 1].Component;

  const handleNext = () => {
    if (STEPPER_DATA.length - 1 >= currentStep) {
      setCurrentStep((prev) => prev + 1);
    }
    if (STEPPER_DATA.length === currentStep) {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => prev - 1);
    setIsComplete(false);
  };

  const handleCalculateProgress = () => {
    return `${((currentStep - 1) / (STEPPER_DATA.length - 1)) * 100}%`;
  };

  useEffect(() => {
    setMargins({
      marginLeft: ref.current[0].offsetWidth / 2,
      marginRight: ref.current[STEPPER_DATA.length - 1].offsetWidth / 2,
    });
  }, [ref]);

  return (
    <div>
      <div className="stepper_container">
        {STEPPER_DATA.map((data, index) => {
          const isStepCompleted = currentStep > index + 1 || isComplete;
          return (
            <div
              ref={(el) => (ref.current[index] = el)}
              className="stepper"
              key={index}
            >
              <div
                className={`stepper_number ${
                  isStepCompleted && "stepper_number_active"
                }`}
              >
                {isStepCompleted ? <MdDone /> : index + 1}
              </div>
              <div className="stepper_name">{data.name}</div>
            </div>
          );
        })}

        <div
          className="progress_bar_container"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress_bar"
            style={{ width: handleCalculateProgress() }}
          ></div>
        </div>
      </div>

      <div className="buttons_container">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="component_container">
        {isComplete ? (
          <div>Delivery completed component</div>
        ) : (
          <ActiveComponent />
        )}
      </div>
    </div>
  );
};
